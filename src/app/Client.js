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
    payload += `&question_3382_0=No`; // Do you believe that the mainstream media has reported unfairly on our movement?
    payload += `&question_3382_1=`;
    payload += `&question_3383_0=Yes`; // Do you trust MSNBC to report fairly on Trump's presidency?
    payload += `&question_3383_1=`;
    payload += `&question_3384_0=Yes`; // Do you trust CNN to report fairly on Trump's presidency?
    payload += `&question_3384_1=`;
    payload += `&question_3385_0=No`; // Do you trust Fox News to report fairly on Trump's presidency?
    payload += `&question_3385_1=`;
    payload += `&question_3387=CNN`; // Which television source do you primarily get your news from?
    payload += `&question_3387=MSNBC`; // Which television source do you primarily get your news from?
    payload += `&question_3387=Local+news`; // Which television source do you primarily get your news from?
    payload += `&question_3388=Washington+Post`; // Do you use a source not listed above?
    payload += `&question_3390=New+York+Times`; // Which online source do you use the most?
    payload += `&question_3392_0=Yes`; // Do you trust the mainstream media to tell the truth about the Republican Party’s positions and actions?
    payload += `&question_3392_1=`;
    payload += `&question_3393_0=No`; // Do you believe that the mainstream media does not do their due diligence fact-checking before publishing stories on the Trump administration?
    payload += `&question_3393_1=`;
    payload += `&question_3394_0=No`; // Do you believe that the media unfairly reported on President Trump’s executive order temporarily restricting people entering our country from nations compromised by radical Islamic terrorism?
    payload += `&question_3394_1=`;
    payload += `&question_3395_0=Other`; // Were you aware that a poll was released revealing that a majority of Americans actually supported President Trump's temporary restriction executive order?
    payload += `&question_3395_1=false`; // Other, please specify
    payload += `&question_3396_0=No`; // Do you believe that political correctness has created biased news coverage on both illegal immigration and radical Islamic terrorism?
    payload += `&question_3396_1=`;
    payload += `&question_3397_0=No+opinion`; // Do you believe that contrary to what the media says, raising taxes does not create jobs?
    payload += `&question_3397_1=`;
    payload += `&question_3399_0=No`; // Do you believe that people of faith have been unfairly characterized by the media?
    payload += `&question_3399_1=`;
    payload += `&question_3400_0=No`; // Do you believe that the media wrongly attributes gun violence to Second Amendment rights?
    payload += `&question_3400_1=`;
    payload += `&question_3402_0=No`; // Do you believe that the media has been far too quick to spread false stories about our movement?
    payload += `&question_3402_1=`;
    payload += `&question_3403_0=No`; // Do you believe that the media uses slurs rather than facts to attack conservative stances on issues like border control, religious liberties, and ObamaCare?
    payload += `&question_3403_1=`;
    payload += `&question_3404_0=No`; // Do you believe that the media purposely tries to divide Republicans against each other in order to help elect Democrats?
    payload += `&question_3404_1=`
    payload += `&question_3406_0=No`; // Do you believe that the media creates false feuds within our Party in order to make us seem divided?
    payload += `&question_3406_1=`;
    payload += `&question_3407_0=No`; // Do you believe that the mainstream media has been too eager to jump to conclusions about rumored stories?
    payload += `&question_3407_1=`;
    payload += `&question_3408_0=Yes`; // Do you believe that if Republicans were obstructing Obama like Democrats are doing to President Trump, the mainstream media would attack Republicans?
    payload += `&question_3408_1=`;
    payload += `&question_3409_0=No`; // Do you agree with the President’s decision to break with tradition by giving lesser known reporters and bloggers the chance to ask the White House Press Secretary questions?
    payload += `&question_3409_1=`;
    payload += `&question_3410_0=No`; // Do you agree with President Trump’s media strategy to cut through the media’s noise and deliver our message straight to the people?
    payload += `&question_3410_1=`;
    payload += `&question_3411_0=No`; // Do you believe that our Party should spend more time and resources holding the mainstream media accountable?
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
