/** @format */

import { AccessLevel, SingletonProto } from '@eggjs/tegg'
import { Service } from 'egg'
import { ChatCompletionRequestMessage, CreateChatCompletionResponse, CreateEmbeddingResponse } from 'openai'
import { IncomingMessage } from 'http'
import glm from '@util/glm'
import vec from '@util/text2vec'
import gpt from '@util/openai'
import $ from '@util/util'
import { Page } from '@model/Page'
import { WhereOptions } from 'sequelize'
import { Op } from 'sequelize'

const SAME_SIMILARITY = 0.01
const MAX_PAGE = 5
const MAX_TOKEN = 3500
const TOKEN_FIRST_PAGE = 800
const TOKEN_ONE_PAGE = 400

@SingletonProto({ accessLevel: AccessLevel.PUBLIC })
export default class UniAI extends Service {
    // query resource
    async findResource(
        prompts: ChatCompletionRequestMessage[],
        resourceId?: number,
        maxPage: number = MAX_PAGE,
        maxToken: number = MAX_TOKEN,
        model: AIModelEnum = 'GLM'
    ) {
        const { ctx } = this
        let userInput: string = ''
        for (const item of prompts) userInput += `${item.content}\n`
        let pages: Page[] = []
        let embed: number[] = []
        let res: CreateEmbeddingResponse | Text2VecResponse | undefined
        const where: WhereOptions = {}
        if (model === 'GPT') {
            if (resourceId) {
                const resource = await ctx.model.Resource.findByPk(resourceId, { attributes: ['embedding'] })
                if (!resource) throw new Error('Resource not found')
                if (!resource.embedding) throw new Error('GPT embedding not found')
                where.resourceId = resourceId
            }
            where.embedding = { [Op.ne]: null }
            res = (await gpt.embedding([userInput])) as CreateEmbeddingResponse
            embed = res.data[0].embedding
            pages = await ctx.model.Page.similarFindAll(embed, maxPage, where)
        }
        if (model === 'GLM') {
            if (resourceId) {
                const resource = await ctx.model.Resource.findByPk(resourceId, { attributes: ['embedding2'] })
                if (!resource) throw new Error('Resource not found')
                if (!resource.embedding2) throw new Error('GLM embedding not found')
                where.resourceId = resourceId
            }
            where.embedding2 = { [Op.ne]: null }
            res = (await vec.embedding([userInput])) as Text2VecResponse
            embed = res.data[0]
            pages = await ctx.model.Page.similarFindAll2(embed, maxPage, where)
        }
        if (!pages.length) throw new Error('Page not found')
        while (pages.reduce((n, p) => n + $.countTokens(p.content), 0) > maxToken) pages.pop()
        return { pages: pages.sort((a, b) => a.id - b.id), embed, model: res?.model }
    }
    // chat to model
    async chat(
        prompts: ChatCompletionRequestMessage[],
        stream: boolean = false,
        model: AIModelEnum = 'GLM',
        maxLength?: number,
        top?: number,
        temperature?: number
    ) {
        if (stream) {
            if (model === 'GPT') return await gpt.chat<IncomingMessage>(prompts, true, top, temperature)
            if (model === 'GLM') return await glm.chat<IncomingMessage>(prompts, true, maxLength, top, temperature)
        } else {
            if (model === 'GPT') return await gpt.chat<CreateChatCompletionResponse>(prompts, false, top, temperature)
            if (model === 'GLM') return await glm.chat<GLMChatResponse>(prompts, false, maxLength, top, temperature)
        }
    }
    // embed content
    async embedding(content: string, fileName: string, filePath: string, fileSize: number, model: AIModelEnum = 'GPT') {
        const { ctx } = this
        const userId = 0
        const typeId = 1

        if (model === 'GPT') {
            // check same similarity for first one page, 1000 tokens
            const p: string[] = await $.splitPage(content, TOKEN_FIRST_PAGE)
            if (!p.length) throw new Error('File content cannot be split')
            const embed = await gpt.embedding([p[0]])
            await gpt.log(ctx, userId, embed, '[AI/embedding]: check similarity for first page')
            const { embedding } = embed.data[0]
            const result = await ctx.model.Resource.similarFindAll(embedding, 1, SAME_SIMILARITY)
            if (result.length) return result[0]

            // embedding all pages, sentence-level, 500 token per page
            const s: string[] = await $.splitPage(content, TOKEN_ONE_PAGE)
            if (!s.length) throw new Error('File content cannot be split')
            const res = await gpt.embedding(s)
            await gpt.log(ctx, 0, res, '[AI/embedding]: embedding all pages (sentences)')

            // save resource + pages
            return await ctx.model.Resource.create(
                {
                    page: s.length, // sentence num
                    typeId,
                    userId,
                    embedding,
                    filePath,
                    fileName,
                    fileSize,
                    promptTokens: res.usage.prompt_tokens,
                    totalTokens: res.usage.total_tokens,
                    pages: res.data.map((v, i) => {
                        return {
                            page: i + 1,
                            embedding: v.embedding,
                            content: s[i],
                            length: $.countTokens(s[i])
                        }
                    })
                },
                { include: ctx.model.Page }
            )
        }
        if (model === 'GLM') {
            // check same similarity for first one page, 800 tokens
            const p: string[] = await $.splitPage(content, TOKEN_FIRST_PAGE)
            if (!p.length) throw new Error('File content cannot be split')
            const embed = await vec.embedding([p[0]])
            await vec.log(ctx, userId, embed, '[AI/embedding]: check similarity for first page')
            const embedding = embed.data[0]
            const result = await ctx.model.Resource.similarFindAll2(embedding, 1, SAME_SIMILARITY)
            if (result.length) return result[0]

            // embedding all pages, sentence-level, 400 token per page
            const s: string[] = await $.splitPage(content, TOKEN_ONE_PAGE)
            if (!s.length) throw new Error('File content cannot be split')
            const res = await vec.embedding(s)
            await vec.log(ctx, 0, res, '[AI/embedding]: embedding all pages (sentences)')

            // save resource + pages
            return await ctx.model.Resource.create(
                {
                    page: s.length, // sentence num
                    typeId,
                    userId,
                    embedding2: embedding,
                    filePath,
                    fileName,
                    fileSize,
                    promptTokens: $.countTokens(content),
                    totalTokens: $.countTokens(content),
                    pages: res.data.map((v, i) => {
                        return {
                            page: i + 1,
                            embedding2: v,
                            content: s[i],
                            length: $.countTokens(s[i])
                        }
                    })
                },
                { include: ctx.model.Page }
            )
        }
    }
}
