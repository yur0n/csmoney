window.addEventListener("message", (e) => {
	if (e.data.start === true) {
		chrome.runtime.sendMessage({ start: true });
	}
	if (e.data.start === false) {
		chrome.runtime.sendMessage({ start: false });
	}
	if (message.type == "toBuff") {
		console.log('Redirecting message to Buff');
		chrome.tabs.query({ url: 'https://buff.163.com/*' }, (tabs) => {
			if (!tabs.length) {
				chrome.tabs.create({ url: 'https://buff.163.com/', active: false });
			} else {
				const tabId = tabs[0].id;
				chrome.tabs.sendMessage(tabId, message);
			}
		});
	} else if (message.type == "toParser") {
		console.log('Redirecting message to Parser');
		chrome.tabs.query({ url: ["*://*.yuron.xyz/*", "*://localhost/*"] }, (tabs) => {
			for (const tab of tabs) {
				chrome.tabs.sendMessage(tab.id, message);
			}
		});
	}
});