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
