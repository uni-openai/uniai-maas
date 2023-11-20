/** @format */

import { ChatModelEnum } from '@interface/Enum'

export interface ChatStreamCache {
    chatId: number
    dialogId: number
    content: string
    time: number
    resourceId: number | null
    model: ChatModelEnum
}

export interface UserTokenCache {
    id: number
    token: string
    time: number
}