chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ url: 'http://yuron.xyz:2086/*' }, (tabs) => {
    if (!tabs.length) {
      chrome.tabs.create({ url: 'http://yuron.xyz:2086/', active: true });
    } else {
      chrome.tabs.update(tabs[0].id, { active: true });
    }
  });
});

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
	await chrome.alarms.create('saveBuffSkins', {
		delayInMinutes: 0.5,
		periodInMinutes: 1
	});
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const buffSkins = await getBuffSkins()
  chrome.storage.local.set({ buffSkins });
});

async function getBuffSkins() {
	try {
		const response = await fetch('http://localhost:3000/skins')
		if (response.ok) {
			const data = await response.json()
			return data.reduce((obj, item) => {
				obj[item.name] = item.price;
				return obj;
			}, {});
		} else {
			console.log('Server error: ' + response.status)
		}
	} catch (error) {
		console.log(error)
	}
}

