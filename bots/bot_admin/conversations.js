import { Sub } from '../../src/models/models.js'
import { InlineKeyboard } from 'grammy'
import { replyAndDel, deleteMsg, deleteMsgTime } from './functions.js'

// const setSubTime = (days) => {
// 	days = Math.min(Math.max(days, 1), 10000)
// 	return new Date(Date.now() + (days * 24 * 3600 * 1000))
// }

// const checkID = (id) => /^[0-9]{17}$/.test(id)

// export async function addSub(conversation, ctx) {
// 	try {
// 		let ask = await ctx.reply('⌨️ Введите SteamID подписчика', {
// 			reply_markup: new InlineKeyboard().text('🚫 Отменить')
// 		}); 
// 		ctx = await conversation.wait();
// 		deleteMsg(ctx, ask.chat.id, ask.message_id)
// 		if (ctx.update.callback_query?.data) return
// 		let id = ctx.msg.text; 
// 		if (!checkID(id)) {
// 			replyAndDel(ctx, `⚠️ Неверное значение SteamID`)
// 			return
// 		}
// 		let ask2 = await ctx.reply('⌨️ Введите дни подписки');
// 		ctx = await conversation.wait();
// 		deleteMsg(ctx, ask2.chat.id, ask2.message_id)
// 		let ttl = ctx.msg.text;
// 		if (isNaN(ttl)) {
// 			replyAndDel(ctx, `⚠️ Неверное значение`)
// 			return
// 		}
// 		let subscriber = await Subscriber.findById(id)
// 		if (subscriber) {
// 			replyAndDel(ctx, `ℹ️ Подписчик ${id} уже был добавлен`)
// 		} else {
// 			let subscriber = new Subscriber({ _id: id, expirationDate: setSubTime(ttl) })
// 			await subscriber.save()
// 			replyAndDel(ctx, `✅ Подписчик добавлен`) 
// 		}
// 	} catch (error) {
// 		console.log('Bot admin error:', error)
// 		replyAndDel(ctx, `Ошибка с базой данных`)
// 	}
// }

export async function deleteSub(conversation, ctx) {
	try {
		let ask = await ctx.reply('⌨️ Enter user index', {
			reply_markup: new InlineKeyboard().text('🚫 Cancel')
		});
		ctx = await conversation.wait();
		deleteMsg(ctx, ask.chat.id, ask.message_id)
		if (ctx.update.callback_query?.data) return
		let id = ctx.msg.text;
		let subscriber = await Sub.findById(id)
		if (subscriber) {
			await subscriber.deleteOne()
			replyAndDel(ctx, `✅ User ${id} subscription deleted`)
		} else {
			replyAndDel(ctx, `ℹ️ User ${id} subscription not found`)
		}
	} catch (error) {
		console.log('Bot admin error:', error)
		replyAndDel(ctx, `Database error`)
	}
}

export async function updateSub(conversation, ctx) {
	try {
		let ask = await ctx.reply('⌨️ Enter user index', {
			reply_markup: new InlineKeyboard().text('🚫 Cancel')
		});
		ctx = await conversation.wait();
		deleteMsg(ctx, ask.chat.id, ask.message_id)
		if (ctx.update.callback_query?.data) return
		let id = ctx.msg.text;
		let subscriber = await Sub.findById(id)
		if (subscriber) {
			let newTtl = new Date (subscriber.expirationDate.getTime() + (0.01 * 24 * 3600 * 1000))
			await subscriber.updateOne({ expirationDate: newTtl })
			replyAndDel(ctx, `✅ User ${id} subscription updated`)
		} else {
			replyAndDel(ctx, `ℹ️ User ${id} subscription not found`)
		}
	} catch (error) {
		console.log('Bot admin error:', error)
		replyAndDel(ctx, `Database error`)
	}
}