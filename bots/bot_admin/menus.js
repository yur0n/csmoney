import { Menu } from "@grammyjs/menu"
import { createUserAndSub } from "./conversations.js"

const main = new Menu('main-menu')
	.text('➕ Generate code', async ctx => {
		const code = await createUserAndSub();
		ctx.reply(`Generated code: ${code.code}\nUser index: ${code.index}`);
	}).row()
	.text('❌ Delete subscription by user index', async ctx => {
		await ctx.conversation.enter('deleteSub')
	}).row()
    .text('✏️ Update subscription by user index', async ctx => {
		await ctx.conversation.enter('updateSub')
	})

export default main


