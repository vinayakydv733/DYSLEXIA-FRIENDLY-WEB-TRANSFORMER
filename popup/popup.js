document.addEventListener('DOMContentLoaded', () => {
    const bionicToggle = document.getElementById('toggle-bionic');
    const dictToggle = document.getElementById('toggle-dict');
    const ttsToggle = document.getElementById('toggle-tts');
    const bgColorSelect = document.getElementById('bg-color');
    const textColorSelect = document.getElementById('text-color');
    const cbModeSelect = document.getElementById('cb-mode');

    // Load saved settings
    chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'ttsEnabled', 'bgColor', 'textColor', 'cbMode'], (data) => {
        bionicToggle.checked = data.bionicEnabled !== false; // Default true
        dictToggle.checked = data.dictEnabled !== false; // Default true
        ttsToggle.checked = data.ttsEnabled === true; // Default false
        if (data.bgColor) bgColorSelect.value = data.bgColor;
        if (data.textColor) textColorSelect.value = data.textColor;
        if (data.cbMode) cbModeSelect.value = data.cbMode;
    });

    function saveSettings() {
        const settings = {
            bionicEnabled: bionicToggle.checked,
            dictEnabled: dictToggle.checked,
            ttsEnabled: ttsToggle.checked,
            bgColor: bgColorSelect.value,
            textColor: textColorSelect.value,
            cbMode: cbModeSelect.value
        };
        chrome.storage.sync.set(settings, () => {
            // Tell content script to update live
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if(tabs[0]) {
                    // Send to the active tab to update live
                    // Will fail on protected pages like chrome:// but that's expected
                    chrome.tabs.sendMessage(tabs[0].id, {action: "updateSettings", settings: settings}).catch(err => {
                        // Ignore errors from tabs that don't have the content script injected
                        console.log("Could not send message to tab");
                    });
                }
            });
        });
    }

    bionicToggle.addEventListener('change', saveSettings);
    bgColorSelect.addEventListener('change', saveSettings);
    textColorSelect.addEventListener('change', saveSettings);
    dictToggle.addEventListener('change', saveSettings);
    ttsToggle.addEventListener('change', saveSettings);
    cbModeSelect.addEventListener('change', saveSettings);
});
