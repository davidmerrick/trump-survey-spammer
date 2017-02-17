import axios from 'axios'
import MessageType from '../constants/MessageType'

function submitForm(payload, callback){
    const FORM_ACTION = "https://action.donaldjtrump.com/survey/mainstream-media-accountability-survey/";
    console.log("submitting form");
    axios.post(FORM_ACTION, payload).then(response => {
        console.log("SUCCESS: submitted form.");
        return callback();
    });
};


chrome.runtime.onMessage.addListener((message, sender, callback) => {
    switch (message.id) {
        case MessageType.SUBMIT_FORM:
            let payload = message.payload;
            submitForm(payload, callback);
            return true;
            break;
    }
});
