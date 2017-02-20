class RandomUser {

    constructor(userData) {
        this.firstName = userData.name.first;
        this.lastName = userData.name.last;
        this.zipCode = userData.location.postcode;
    }

    sanitizeNameForEmail(name){
        // Strip out spaces in name so it can be jammed in an e-mail address
        return name.replace(' ', '').toLowerCase();
    }

    ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    makeId(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i=0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    makeSeparator(){
        let possible = "-_.";
        let separator = possible.charAt(Math.floor(Math.random() * possible.length));
        return separator;
    }

    getDomain(){
        let domains = [
            "gmail.com",
            "yahoo.com",
            "msn.com"
        ];

        let index = Math.floor(Math.random() * domains.length);
        return domains[index];
    }

    getFirstName(){
        return this.ucFirst(this.firstName);
    }

    getLastName(){
        return this.ucFirst(this.lastName);
    }

    getZipCode(){
        return this.zipCode;
    }

    getEmailAddress() {
        let randomId = this.makeId();
        let separator1 = this.makeSeparator();
        let separator2 = this.makeSeparator();
        let domain = this.getDomain();

        let { firstName, lastName } = this;

        let emailAddress = `${this.sanitizeNameForEmail(firstName)}${separator1}${this.sanitizeNameForEmail(lastName)}${separator2}${randomId}@${domain}`;
        return emailAddress;
    }
}

export default RandomUser