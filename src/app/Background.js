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
    chrome.storage.local.get("submitCount", data => {
        if (data.hasOwnProperty("submitCount")) {
            data.submitCount += 1;
        } else if (chrome.runtime.lastError) {
            console.error(`ERROR: ${chrome.extension.lastError.toString()}`);
        } else {
            data = {"submitCount": 1};
        }

        chrome.storage.local.set(data, r => {
          if (!chrome.runtime.lastError) {
            console.log(`Successfully recorded form submission #${data.submitCount.toString()}`);
          } else {
            console.log(`An error occurred: ${chrome.extension.lastError.message}`);
          }
        });
        chrome.browserAction.setBadgeText({text: data.submitCount.toString()});
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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-92229338-1', 'auto');
ga('send', 'pageview');
