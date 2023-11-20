/** @format */

import {
    ChatCompletion,
    ChatCompletionChunk,
    EmbeddingCreateParams,
    CreateEmbeddingResponse,
    ImageGenerateParams,
    ImagesResponse,
    ChatCompletionCreateParamsNonStreaming,
    ChatCompletionCreateParamsStreaming,
    ChatCompletionSystemMessageParam,
    ChatCompletionUserMessageParam,
    ChatCompletionAssistantMessageParam,
    ChatCompletionToolMessageParam,
    ChatCompletionFunctionMessageParam
} from 'openai/resources'

export interface GPTChatResponse extends ChatCompletion {}
export interface GPTChatStreamResponse extends ChatCompletionChunk {}

export interface GPTEmbeddingRequest extends EmbeddingCreateParams {}
export interface GPTEmbeddingResponse extends CreateEmbeddingResponse {}

export interface GPTChatRequest extends ChatCompletionCreateParamsNonStreaming {}
export interface GPTChatStreamRequest extends ChatCompletionCreateParamsStreaming {}

export interface GPTImagineRequest extends ImageGenerateParams {}
export interface GPTImagineResponse extends ImagesResponse {}

// equal to original ChatCompletionMessage
export type GPTChatMessage =
    | ChatCompletionSystemMessageParam
    | ChatCompletionUserMessageParam
    | ChatCompletionAssistantMessageParam
    | ChatCompletionToolMessageParam
    | ChatCompletionFunctionMessageParam