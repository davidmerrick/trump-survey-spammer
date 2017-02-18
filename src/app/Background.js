import axios from 'axios'
import MessageType from '../constants/MessageType'

function submitForm(tabId, payload){
    const FORM_ACTION = "https://action.donaldjtrump.com/survey/mainstream-media-accountability-survey/";
    axios.post(FORM_ACTION, payload).then(response => {
        console.log("SUCCESS: submitted form.");

        // Now, remove the CSRF token cookie
        let cookieDetails = {
            url: "https://action.donaldjtrump.com",
            name: "csrftoken"
        };
        chrome.cookies.remove(cookieDetails, callback => {
            console.log("SUCCESS: removed CSRF token cookie");
            let reloadProperties = {
                bypassCache: true
            };
            chrome.tabs.reload(tabId, reloadProperties);
        });
    });

    // Record Submission Counter
    chrome.storage.local.get("fucksGiven", function(data) {
        if (data.hasOwnProperty("fucksGiven")) {
            data.fucksGiven += 1;
        } else if (chrome.runtime.lastError) {
            console.log("Encountered error: " + chrome.extension.lastError.toString());
        } else {
            data = {"fucksGiven": 1};
        }

        chrome.storage.local.set(data, function(r) {
          if (!chrome.runtime.lastError) {
            console.log("Successfully recorded form submission #" + data.fucksGiven.toString());
          } else {
            console.log('An error occurred: ' + chrome.extension.lastError.message);
          }
        });
        chrome.browserAction.setBadgeText({text: data.fucksGiven.toString()});
        // TODO: Handle when integer becomes larger than 4 characters. This is truncated in the badge text.
    });
};

chrome.runtime.onMessage.addListener((message, sender, callback) => {
    switch (message.id) {
        case MessageType.SUBMIT_FORM:
            let payload = message.payload;
            let tabId = sender.tab.id;
            submitForm(tabId, payload);
            return true;
            break;
    }
});
