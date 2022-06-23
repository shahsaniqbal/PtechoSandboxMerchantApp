export class CardSchema {
    cardholderName = ''
    cardNumber = ''
    cvv = ''
    amount = 0.0
    expiryMMYY = ''
    merchantID = ''
    refBills = []
    topups = []

    constructor(cardholderName, cardNumber, cvv, amount, expiryMMYY, merchantID, refBills){
        this.cardholderName = cardholderName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.amount = amount;
        this.expiryMMYY = expiryMMYY;
        this.merchantID = merchantID;
        this.refBills = refBills;
    }
}