/** @format */
// This is a middleware to check personal user login auth, add to controller -> action

// app/middleware/auth.ts
import { UserCache } from '@interface/Cache'
import { UserContext } from '@interface/Context'
import $ from '@util/util'

const EXPIRE = 1000 * 60 * 60 * 24

// check user auth
export default function auth() {
    return async (ctx: UserContext, next: () => Promise<any>) => {
        const id = parseInt(ctx.get('id'))
        const token = ctx.get('token')
        if (!id || !token) return ctx.service.res.noAuth()

        const user = $.json<UserCache>(await ctx.app.redis.get(`user_${id}`))

        const now = Date.now()
        // find user in redis
        if (user && user.token === token && now - user.tokenTime < EXPIRE) ctx.user = user
        // find user in db
        else {
            const user = await ctx.model.User.findOne({
                where: { id, isDel: false, isEffect: true },
                include: { model: ctx.model.UserChance }
            })
            if (user && user.token === token && now - user.tokenTime.getTime() < EXPIRE) {
                const cache: UserCache = {
                    ...user.dataValues,
                    tokenTime: user.tokenTime.getTime(),
                    chance: {
                        ...user.chance.dataValues,
                        chatChanceUpdateAt: user.chance.chatChanceUpdateAt.getTime(),
                        uploadChanceUpdateAt: user.chance.uploadChanceUpdateAt.getTime(),
                        chatChanceFreeUpdateAt: user.chance.chatChanceFreeUpdateAt.getTime(),
                        uploadChanceFreeUpdateAt: user.chance.uploadChanceFreeUpdateAt.getTime()
                    }
                }
                // save to cache
                await ctx.app.redis.set(`user_${cache.id}`, JSON.stringify(cache))

                ctx.user = cache
            }
        }
        if (!ctx.user) return ctx.service.res.noAuth()

        await next()
    }
}