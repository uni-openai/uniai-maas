/** @format */

import { Benefit, ConfigMenu, ConfigMenuV2, ConfigTask, ConfigVIP } from '@interface/Config'
import { ChatModel, ChatModelProvider, ChatRoleEnum, ModelProvider } from 'uniai'

export interface ChatRequest {
    input: string
    dialogId?: number
    sse?: boolean
}

export interface ChatResponse {
    content: string
    dialogId: number
    resourceId: number | null
    chatId: number | null
    role: ChatRoleEnum
    avatar: string | null
    model: ChatModelProvider | string | null
    subModel: ChatModel | string | null
    isEffect: boolean
}

export interface ChatListRequest {
    dialogId?: number
    lastId?: number
    pageSize?: number
}

export interface LoginRequest {
    phone?: string
    code?: string
    password?: string
    fid?: number
    token?: string
}

export interface SignUpRequest {
    code: string
    iv: string
    cloudID: string
    openid: string
    encryptedData: string
    fid: number
}

export interface UploadRequest {
    fileName?: string
}

export interface UploadResponse {
    id: number
    typeId: number
    page: number
    tokens: number
    fileName: string
    fileSize: number
    filePath: string
    userId: number
    createdAt: Date
    updatedAt: Date
    dialogId: number
}
export interface UploadAvatarResponse {
    id: number
    avatar: string | null
}
export interface UpdateUserRequest {
    name?: string
}

export interface ResourceRequest {
    id: number
}

export interface ResourceResponse {
    id: number
    name: string
    size: number
    ext: string
    path: string
    pages: string[]
}

export interface DialogRequest {
    pageSize?: number
    lastId?: number
}

export interface DialogResponse {
    dialogId: number
    resourceId: number | null
    page: number
    fileSize: number
    fileName: string
    filePath: string
    updatedAt: Date
    typeId: number
    type: string
    description: string | null
}

export interface UserinfoResponse {
    id: number
    tokenTime: number
    token: string | null
    name: string | null
    username: string | null
    avatar: string | null
    wxOpenId: string | null
    chance: {
        level: number
        levelExpiredAt: number
        uploadSize: number
        totalChatChance: number
        totalUploadChance: number
    }
    task: ConfigTask[]
    benefit: Benefit[]
}

export interface ConfigResponse {
    appName: string
    appVersion: string
    footer: string
    footerCopy: string
    officialAccount: string
    shareTitle: string
    shareDesc: string
    shareImg: string
    menu: ConfigMenu[]
    task: ConfigTask[]
    vip: ConfigVIP[]
    menuMember: ConfigMenuV2
    menuInfo: ConfigMenuV2
    menuShare: ConfigMenuV2
    menuFocus: ConfigMenuV2
    menuAdv: ConfigMenuV2
    showNewApp: string
    newAppId: string
}

export interface AnnounceResponse {
    id: number
    title: string
    content: string
    closeable: boolean
}

export interface TabResponse {
    id: number
    name: string
    desc: string
    pid: number
    child?: TabResponse[]
}

/* From WeChat APIs */
export interface WXAuthCodeRequest {
    grant_type: 'authorization_code'
    appid: string
    secret: string
    js_code: string
}

export interface WXAuthCodeResponse {
    openid?: string
    unionid?: string
    session_key?: string
    errcode?: number
    errmsg?: string
}

export interface WXAccessTokenRequest {
    grant_type: 'client_credential'
    appid: string
    secret: string
}

export interface WXAccessTokenResponse {
    access_token?: string
    expires_in?: number
    errcode?: number
    errmsg?: string
}

export interface WXSecCheckAPI {
    errcode?: number
    errmsg?: string
}

export interface WXUserPhoneNumberAPI {
    errcode?: number
    errmsg?: string
    phone_info?: {
        phoneNumber?: string
        purePhoneNumber?: string
        countryCode?: string
        watermark?: {
            timestamp?: number
            appid?: string
        }
    }
}

export interface WXDecodedData {
    phoneNumber: string
    purePhoneNumber: string
    countryCode: number
    watermark: {
        appid: string
        timestamp: number
    }
}

export interface WXMsgCheckRequest {
    content?: string
    media?: { contentType: string; value: Buffer }
    version?: number
    scene?: number
    openid?: string
    title?: string
    nickname?: string
    signature?: string
}

export interface WXMsgCheckResponse {
    errcode?: number
    errmsg?: string
    detail?: {
        strategy: string
        errcode: number
        suggest: string
        label: number
        keyword?: string
        prob?: number
        level?: number
    }[]
    trace_id?: string
    result?: {
        suggest: string
        label: number
    }
}

export interface WXGetQRCodeRequest {
    page: string
    scene: string
    check_path: boolean
    env_version: string
}
export interface WXGetQRCodeResponse {
    errcode: number
    errmsg: string
}
