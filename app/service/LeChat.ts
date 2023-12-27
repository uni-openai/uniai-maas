/** @format */

import { AccessLevel, SingletonProto } from '@eggjs/tegg'
import { Service } from 'egg'
import { PassThrough } from 'stream'
import md5 from 'md5'
import { random } from 'lodash'
import { ChatResponse } from '@interface/controller/LeChat'
import $ from '@util/util'

const MAX_PAGE_TOKEN = 1600
const SEARCH_PAGE_NUM = 2

@SingletonProto({ accessLevel: AccessLevel.PUBLIC })
export default class LeChat extends Service {
    // get user info
    async getUser(id: number) {
        const { ctx } = this
        return await ctx.model.User.findOne({
            where: {
                id,
                isDel: false,
                isEffect: true
            },
            include: [{ model: ctx.model.UserChance }]
        })
    }

    // common sign in
    async signIn(username: string, password: string) {
        const { ctx } = this
        // check user
        const user = await ctx.model.User.findOne({ where: { username: username, isEffect: true, isDel: false } })
        if (!user || user.password !== md5(`${password}${user.id}`)) throw new Error('Invalid username or password')

        // update login token
        user.token = md5(`${new Date()}${user.phone}${random(1000, 9999)}${password}`)
        user.tokenTime = new Date()
        await user.save()

        return user
    }

    // common sign up with phone
    async signUp(username: string, password: string, phone: string) {
        const { ctx } = this
        // create user by username
        const user = await ctx.model.User.create({ name: username })
        user.password = md5(`${password}${user.id}`)
        user.phone = phone
        return await user.save()
    }
}
