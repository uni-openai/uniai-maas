/** @format */

import Decimal from 'decimal.js'
import { ChatModel, ModelProvider } from 'uniai'

export interface ChatStreamCache {
    chatId: number
    dialogId: number
    content: string
    resourceId: number | null
    model: ModelProvider | null
    subModel: ChatModel | string | null
    isEffect: boolean
}

export interface UserCache {
    id: number
    username: string | null
    phone: string | null
    email: string | null
    password: string | null
    token: string | null
    name: string | null
    countryCode: number | null
    avatar: string | null
    wxOpenId: string | null
    wxPublicOpenId: string | null
    wxUnionId: string | null
    tokenTime: number
    level: number
    levelExpiredAt: number
    score: number
    uploadSize: number
    chatChance: number
    chatChanceFree: number
    uploadChance: number
    uploadChanceFree: number
    freeChanceUpdateAt: number
    isEffect: boolean
    isDel: boolean
}

export interface WXAccessTokenCache {
    token: string
    expire: number
}

export interface AdvCache {
    count: number
    time: number
}

export interface WXAppQRCodeCache {
    id: number
    token: string | null
}

export interface PayItemCache {
    id: number
    title: string
    description: string[]
    price: string
    score: number
    chance: number
}
