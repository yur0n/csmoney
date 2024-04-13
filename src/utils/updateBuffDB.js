import { Skin } from '../models/skin.js'
import skinIDs from './getSkinIDs.js';
import '../db/connection.js'
// fetch('https://www.currency.me.uk/convert/usd/cny').then

updateSkins();

async function updateSkins() {
  for (const { name, id } of skinIDs) {
    try {
      console.log(id, name)
      const price = await getSkinPrice(id);
      if (!price) {
				console.log(`skin ${name} price not found`)
        continue;
			}
      await saveSkin(id, name, price);
      console.log(`skin ${name} saved`)
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error updating skin ${name}:`, error);
    }
  }
}

async function saveSkin(_id, name, price ) {
	try {
    await Skin.findOneAndUpdate(
      { _id }, 
      { $set: { name, price } }, 
      { upsert: true }
    );
  } catch (error) {
    console.error(`Error saving skin ${name}:`, error);
  }
}

async function getSkinPrice(id, attmeps = 0) {
	if (attmeps > 1) return 0;
  let price = 0;
  try {
    const usdToCny = await fetchCurrency();
    const url = `https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id=${id}&page_num=1&sort_by=default&mode=&allow_tradable_cooldown=1`
    const response = await fetch(url);
    if (response.ok) {
      const res = await response.json();
      const cnyPrice = res.data.items[0]?.lowest_bargain_price;
      price = cnyPrice ? Math.max(0.01, parseFloat((cnyPrice / usdToCny).toFixed(2))) : 0;
    } else {
      console.error(`HTTP-Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching skin price:`, error);
		return getSkinPrice(id, ++attmeps);
  }

  return price;
}

async function fetchCurrency() {
	return 7.236
}


