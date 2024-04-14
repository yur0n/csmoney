window.addEventListener("message", (e) => {
	if (e.data.parse === true) {
		chrome.runtime.sendMessage(e.data);
	}
	// if (message.type == "toBuff") {
	// 	console.log('Redirecting message to Buff');
	// 	chrome.tabs.query({ url: 'https://buff.163.com/*' }, (tabs) => {
	// 		if (!tabs.length) {
	// 			chrome.tabs.create({ url: 'https://buff.163.com/', active: false });
	// 		} else {
	// 			const tabId = tabs[0].id;
	// 			chrome.tabs.sendMessage(tabId, message);
	// 		}
	// 	});
	// } else if (message.type == "toParser") {
	// 	console.log('Redirecting message to Parser');
	// 	chrome.tabs.query({ url: ["*://*.yuron.xyz/*", "*://localhost/*"] }, (tabs) => {
	// 		for (const tab of tabs) {
	// 			chrome.tabs.sendMessage(tab.id, message);
	// 		}
	// 	});
	// }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.parsedSkins) {
		window.postMessage({ parsedSkins: message.parsedSkins }, "*");
	}
});