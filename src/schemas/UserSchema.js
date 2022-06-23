export class UserSchema {
    businessName = ''
    businessContact = ''
    email = ''
    token = ''
    id = ''
    cards = []
    logoRef = ''
    username = ''
    links = {
        successURL:'',
        rejectURL:''
    }
    businessLocation = {
        city:'',
        area:'',
        line1:'',
        line2:''
    }

    constructor(name, contact, email, token, id, cards, logoRef, username){
        this.businessName = name;
        this.businessContact = contact;
        this.email = email;
        this.token = token;
        this.id = id;
        this.cards = cards;
        this.logoRef = logoRef;
        this.username = username;
    }
}