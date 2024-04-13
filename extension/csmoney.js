const maxPrice = 1000
const minPrice = 100
const minProfit = 1
const maxProfit = 1.5

async function compareSkins() {
	const skins = await getSkins()
	for (const skin of skins) {
		buffSkins = await chrome.storage.local.get('buffSkins')
		const buffPrice = buffSkins[skin.name]
		if (!buffPrice) continue;
		if (buffPrice >= (skin.price * minProfit) && buffPrice <= (skin.price * maxProfit)) {
			const diff = (buffPrice / skin.price - 1) * 100
			console.log(`Skin: ${skin.name} | Buff price: ${buffPrice} | CS.Money price: ${skin.price} | Profit: ${diff.toFixed(2)}%`)
		}
	}
}

async function getSkins() {
	for (let i = 0; i <= 60; i += 60) {
		try {
			// let skins = {}
			const skins = [];
			const offset = i
			const url = `https://cs.money/1.0/market/sell-orders?limit=60` // &maxPrice=${maxPrice}&minPrice=${minPrice}&offset=${offset}&order=desc&sort=insertDate`
			const response = await fetch(url);
			if (response.ok) {
					const data = await response.json()
					data.items.forEach(item => {
						skins.push({
							name: item.asset.names.full,
							image: item.asset.images.steam,
							price: item.pricing.computed
						});
					});
				return skins;
			} else {
				console.log('Failed to fetch: ' + response.status)
				return { error: 'Failed to fetch', status: response.status }
			}
		} catch (error) {
			console.log(error)
			return { error: error.message }
		}
	}
}