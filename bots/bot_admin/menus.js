import { Menu } from "@grammyjs/menu"
import { User, Sub } from "../../src/models/models.js"

const main = new Menu('main-menu')
	.text('➕ Generate code', async ctx => {
		const code = await generateCode();
		ctx.reply(`Generated code: ${code.code}, user index: ${code.index}`);
	}).row()
	.text('❌ Delete subscription by user index', async ctx => {
		await ctx.conversation.enter('deleteSub')
	}).row()
    .text('✏️ Update subscription by user index', async ctx => {
		await ctx.conversation.enter('updateSub')
	})
	// .url('👥 Все подписчики', 'http://yuron.xyz:8080/allsubs?token=ht2a33B4EQ4226dpH')

export default main

const setSubTime = (days) => {
	// days = Math.min(Math.max(days, 1), 10000);
	return new Date(Date.now() + (days * 24 * 3600 * 1000));
}

function hash(buyerIndex, productCode) {
	function char() {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZa%$#@!*()^bcdefghijklmnopqrstuvwxyz';
		return chars[Math.floor(Math.random() * chars.length)];
	}

  const date = new Date();
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const rawCode = `${productCode}${char()}${year}${char()}${month}${char()}${day}${char()}${buyerIndex}`;
  const hash = Math.floor(Math.random() * 104729);
  return `${rawCode}${char()}${hash}`;
}

async function generateCode(productCode = '10') {
	try {
		const lastBuyer = await User.findOne({}).sort({_id: -1});
		const index = lastBuyer ? lastBuyer._id + 1 : 1;
		const code = hash(index, productCode);
		await User.create({ _id: index, code });
		await Sub.create({ _id: index, code, expirationDate: setSubTime(0.01) });
		return { code, index}
	} catch (error) {
		console.log('Bot admin error:', error)
	}
}

