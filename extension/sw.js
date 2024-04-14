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
	if (alarm.name === 'saveBuffSkins') {
		console.log('Saving buffSkins')
		const buffSkins = await getBuffSkins()
		if (!buffSkins) return;
		chrome.storage.local.set({ buffSkins });
	}
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// if (sender.url.includes('http://yuron.xyz:2086/'))
	if (message.parse) {
		chrome.tabs.query({ url: 'https://cs.money/*' }, (tabs) => {
			if (!tabs.length) {
				chrome.tabs.create({ url: 'https://cs.money/', active: false });
			} else {
				const tabId = tabs[0].id;
				chrome.tabs.sendMessage(tabId, message);
			}
    });
	}
	if (message.parsedSkins) {
		chrome.tabs.query({ url: ["*://*.yuron.xyz/*", "*://localhost/*"] }, (tabs) => {
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
	}
});

async function getBuffSkins() {
	try {
		const response = await fetch('http://localhost:2086/skins')
		if (response.ok) {
			const data = await response.json()
			return data.reduce((obj, item) => {
				obj[item.name] = item.price;
				return obj;
			}, {});
		} else {
			console.log('Server error getting buffSkins: ' + response.status)
		}
	} catch (error) {
		console.log(error)
	}
}