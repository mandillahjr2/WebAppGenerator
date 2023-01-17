chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: "path/to/your/app"});
});

document.getElementById("install-button").addEventListener("click", function(){
    // code to trigger app installation
    function retrieveManifest() {
        return fetch("/manifest.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => {
                console.log("Error retrieving manifest: " + error);
            });
    }
    document.getElementById("install-button").addEventListener("click", function(){
        retrieveManifest().then(manifest => {
            if (manifest && "beforeinstallprompt" in window) {
                // Start the installation process
                let promptEvent = null;
                try {
                    promptEvent = new BeforeInstallPromptEvent("beforeinstallprompt", {
                      bubbles: true,
                      cancelable: true
                    });
                    window.dispatchEvent(promptEvent);
                } catch (e) {
                    // No support for beforeinstallprompt
                }
                promptEvent.prompt();
            } else {
                console.log("Error: website does not have a valid Web App Manifest or the browser does not support the beforeinstallprompt event.");
            }
        });
    });
    
    
});