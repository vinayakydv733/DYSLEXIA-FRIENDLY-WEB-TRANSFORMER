chrome.runtime.onInstalled.addListener(() => {
    // Set default settings if not already set
    chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'bgColor', 'textColor'], (data) => {
        chrome.storage.sync.set({
            bionicEnabled: data.bionicEnabled !== undefined ? data.bionicEnabled : true,
            dictEnabled: data.dictEnabled !== undefined ? data.dictEnabled : true,
            bgColor: data.bgColor || 'default',
            textColor: data.textColor || 'default'
        });
    });
});
