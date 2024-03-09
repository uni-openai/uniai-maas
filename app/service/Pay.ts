/** @format */
// Pay services

import { AccessLevel, SingletonProto } from '@eggjs/tegg'
import { PayType } from '@interface/Enum'
import { WXNotifyRequest, WXPaymentResult } from '@interface/controller/Pay'
import { Service } from 'egg'
import WxPay from 'wechatpay-node-v3'
const { WX_PAY_KEY, WX_PAY_CERT, WX_APP_ID, WX_MCH_ID, WX_PAY_PRIVATE } = process.env

const wx = new WxPay({
    appid: WX_APP_ID,
    mchid: WX_MCH_ID,
    publicKey: Buffer.from(WX_PAY_CERT),
    privateKey: Buffer.from(WX_PAY_KEY)
})

@SingletonProto({ accessLevel: AccessLevel.PUBLIC })
export default class Pay extends Service {
    // list shop items
    async list() {
        return await this.ctx.model.PayItem.findAll({
            attributes: ['id', 'title', 'description', 'price'],
            where: { isEffect: true, isDel: false }
        })
    }

    // create a payment
    async create(id: number, type: PayType, userId: number = 0) {
        const { ctx } = this
        if (type === PayType.WeChat) {
            const item = await ctx.model.PayItem.findByPk(id, { attributes: ['id', 'title', 'price'] })
            if (!item) throw new Error('Can not find item')

            const transactionId = `${Date.now()}${userId}${Math.floor(Math.random() * 10000)}`.substring(0, 32)

            // generate a transaction, amount must be int, *100
            const res = await wx.transactions_native({
                description: item.title,
                out_trade_no: transactionId,
                notify_url: ctx.service.util.paybackURL(),
                amount: { total: parseInt(item.price.mul(100).toFixed(0)) }
            })
            if (res.error) throw new Error(res.error)

            return await ctx.model.Payment.create({
                userId,
                itemId: item.id,
                platform: type,
                type: 'naive',
                amount: item.price,
                currency: 'CNY',
                transactionId,
                detail: res.data
            })
        } else throw new Error('Pay type not support')
    }

    // payment callback notify
    async callback(type: PayType, result: WXNotifyRequest) {
        const { ctx } = this
        const { transaction } = ctx

        if (type === PayType.WeChat)
            if (result.event_type === 'TRANSACTION.SUCCESS') {
                // decrypt transaction detail
                const { ciphertext, associated_data, nonce } = result.resource
                const res: WXPaymentResult = wx.decipher_gcm(ciphertext, associated_data, nonce, WX_PAY_PRIVATE)

                const update = await ctx.model.Payment.update(
                    { status: 1 },
                    { where: { transactionId: res.out_trade_no }, transaction }
                )
                // update payment status and add user chance, score, level
                if (update[0]) {
                    // write to db
                    const payment = await ctx.model.Payment.findOne({
                        where: { transactionId: res.out_trade_no },
                        include: { model: ctx.model.PayItem, attributes: ['id', 'score', 'chance'] },
                        transaction
                    })
                    if (!payment) throw new Error('Payment not found')
                    await ctx.service.user.updateLevel(payment.userId, payment.item.score)
                    await ctx.service.user.addUserChance(payment.userId, payment.item.chance)
                    payment.status = 1
                    payment.result = res
                    payment.currency = res.amount.currency
                    payment.type = res.trade_type
                    await payment.save({ transaction })
                }
            } else throw new Error('Pay type not support')
    }

    // check payment
    async check(id: number, userId: number) {
        const { ctx } = this
        const { transaction } = ctx

        // find payment by id
        const payment = await ctx.model.Payment.findOne({
            where: { id, userId },
            include: { model: ctx.model.PayItem, attributes: ['id', 'score', 'chance'] },
            transaction
        })
        if (!payment) throw new Error('Payment not found')
        if (payment.status === 1) return payment

        // check pay status from provider
        if (payment.platform === PayType.WeChat) {
            const res = await wx.query({ out_trade_no: payment.transactionId })
            const result: WXPaymentResult = res.data
            // success, write to db
            if (result.trade_state === 'SUCCESS') {
                const update = await ctx.model.Payment.update({ status: 1 }, { where: { id }, transaction })
                if (update[0]) {
                    await ctx.service.user.updateLevel(payment.userId, payment.item.score)
                    await ctx.service.user.addUserChance(payment.userId, payment.item.chance)
                    payment.status = 1
                    payment.result = result
                    payment.currency = result.amount.currency
                    payment.type = result.trade_type
                    await payment.save({ transaction })
                } else return payment
            }
        } else throw new Error('Pay type not support')

        return payment
    }
}
