import axios from 'axios'
import jquery from 'jquery'
import MessageType from '../constants/MessageType'

let url = "https://randomuser.me/api/?inc=name,location&?nat=us";

// Strip out spaces in name so it can be jammed in an e-mail address
function sanitizeNameForEmail(name){
    return name.replace(' ', '').toLowerCase();
}

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// First, fetch random user data
axios.get(url).then(response => {
    let data = response.data;

    let results = data.results;
    let firstName = results[0].name.first;
    firstName = ucFirst(firstName);
    let lastName = results[0].name.last;
    lastName = ucFirst(lastName);
    let zipCode = results[0].location.postcode;
    let email = `${sanitizeNameForEmail(firstName)}.${sanitizeNameForEmail(lastName)}@gmail.com`;

    // Fetch CSRF token
    let csrfToken = jquery("input[name=csrfmiddlewaretoken]").val();
    console.log(`CSRF token: ${csrfToken}`);

    // Assemble payload
    let payload = `csrfmiddlewaretoken=${csrfToken}`;
    payload += `&question_3382_0=No`;
    payload += `&question_3382_1=`;
    payload += `&question_3383_0=Yes`;
    payload += `&question_3383_1=`;
    payload += `&question_3384_0=Yes`;
    payload += `&question_3384_1=`;
    payload += `&question_3385_0=No`;
    payload += `&question_3385_1=`;
    payload += `&question_3387=CNN`;
    payload += `&question_3387=MSNBC`;
    payload += `&question_3387=Local+news`;
    payload += `&question_3388=Washington+Post`;
    payload += `&question_3390=New+York+Times`;
    payload += `&question_3392_0=Yes`;
    payload += `&question_3392_1=`;
    payload += `&question_3393_0=Yes`;
    payload += `&question_3393_1=`;
    payload += `&question_3394_0=No`;
    payload += `&question_3394_1=`;
    payload += `&question_3395_0=Other`;
    payload += `&question_3395_1=false`;
    payload += `&question_3396_0=No`;
    payload += `&question_3396_1=`;
    payload += `&question_3397_0=No+opinion`;
    payload += `&question_3397_1=`;
    payload += `&question_3399_0=No`;
    payload += `&question_3399_1=`;
    payload += `&question_3400_0=No`;
    payload += `&question_3400_1=`;
    payload += `&question_3402_0=No`;
    payload += `&question_3402_1=`;
    payload += `&question_3403_0=No`;
    payload += `&question_3403_1=`;
    payload += `&question_3404_0=No`;
    payload += `&question_3404_1=`
    payload += `&question_3406_0=No`;
    payload += `&question_3406_1=`;
    payload += `&question_3407_0=No`;
    payload += `&question_3407_1=`;
    payload += `&question_3408_0=Yes`;
    payload += `&question_3408_1=`;
    payload += `&question_3409_0=No`;
    payload += `&question_3409_1=`;
    payload += `&question_3410_0=No`;
    payload += `&question_3410_1=`;
    payload += `&question_3411_0=No`;
    payload += `&question_3411_1=`;
    payload += `&full_name=${firstName}+${lastName}`;
    payload += `&first_name=${firstName}`;
    payload += `&last_name=${lastName}`;
    payload += `&email=${email}`;
    payload += `&postal_code=${zipCode}`;
    payload += `&svid=306&utm_source=e_p-p&utm_medium=email`;
    payload += `&utm_campaign=GOP_surveys_Mainstream-Media-Accountability-Survey`;
    payload += `&utm_content=021617-media-survey-djt-jfc-p-p-hf-e`;
    payload += `&ad_flight=NA`;
    payload += `&ilist=`;
    payload += `&pgtype=None`;

    let message = {
        id: MessageType.SUBMIT_FORM,
        payload: payload
    };
    chrome.runtime.sendMessage(message, callback => {
        window.location.reload();
    });
});
