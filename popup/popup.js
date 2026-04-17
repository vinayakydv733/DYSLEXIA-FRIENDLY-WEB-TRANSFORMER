document.addEventListener('DOMContentLoaded', () => {
    const bionicToggle = document.getElementById('toggle-bionic');
    const stylingToggle = document.getElementById('toggle-styling');
    const dictToggle = document.getElementById('toggle-dict');

    // Load saved settings
    chrome.storage.sync.get(['bionicEnabled', 'stylingEnabled', 'dictEnabled'], (data) => {
        bionicToggle.checked = data.bionicEnabled !== false; // Default true
        stylingToggle.checked = data.stylingEnabled !== false; // Default true
        dictToggle.checked = data.dictEnabled !== false; // Default true
    });

    function saveSettings() {
        const settings = {
            bionicEnabled: bionicToggle.checked,
            stylingEnabled: stylingToggle.checked,
            dictEnabled: dictToggle.checked
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
    stylingToggle.addEventListener('change', saveSettings);
    dictToggle.addEventListener('change', saveSettings);
});
