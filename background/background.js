chrome.runtime.onInstalled.addListener(() => {
    // Set default settings if not already set
    chrome.storage.sync.get(['bionicEnabled', 'stylingEnabled', 'dictEnabled'], (data) => {
        chrome.storage.sync.set({
            bionicEnabled: data.bionicEnabled !== undefined ? data.bionicEnabled : true,
            stylingEnabled: data.stylingEnabled !== undefined ? data.stylingEnabled : true,
            dictEnabled: data.dictEnabled !== undefined ? data.dictEnabled : true
        });
    });
});
