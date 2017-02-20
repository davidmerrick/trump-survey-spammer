import axios from 'axios'
import MessageType from '../constants/MessageType'
import Constants from '../constants/Constants'
import SubmitCountUtil from '../util/SubmitCountUtil'

let submitCount = 0;

// Google Analytics tracking
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

ga('create', Constants.GA_TRACKING_CODE, 'auto');
ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('require', 'displayfeatures');
ga('send', 'pageview', '/background.html');

function trackFormSubmit(){
    ga('send', {
        hitType: 'event',
        eventCategory: 'submit',
        eventAction: 'formSubmit',
        eventLabel: 'Trump Survey Spammer'
    });
}

function removeCsrfCookie(callback){
    let cookieDetails = {
        url: "https://action.donaldjtrump.com",
        name: "csrftoken"
    };
    chrome.cookies.remove(cookieDetails, () => {
        callback();
    });
}

function updateSubmitCount(){
    submitCount++;
    let formattedCount = SubmitCountUtil.formatSubmitCount(submitCount);
    chrome.browserAction.setBadgeText({text: formattedCount});
}

function submitForm(tabId, payload, callback){
    const FORM_ACTION = Constants.SURVEY_ACTION_URL;
    axios.post(FORM_ACTION, payload).then(response => {
        console.log("SUCCESS: submitted form.");
        updateSubmitCount();
        trackFormSubmit();
        removeCsrfCookie(() => {
            console.log("SUCCESS: removed CSRF token cookie");
            let reloadProperties = {
                bypassCache: true
            };
            return callback(null);
            chrome.tabs.reload(tabId, reloadProperties);
        });
    }).catch(error => {
        return callback({
            error: error.message
        });
    });
};

chrome.runtime.onMessage.addListener((message, sender, callback) => {
    switch (message.id) {
        case MessageType.SUBMIT_FORM:
            let payload = message.payload;
            let tabId = sender.tab.id;
            submitForm(tabId, payload, callback);
            return true;
            break;
    }
});
