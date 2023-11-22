const {expect} = require ('@playwright/test');
const { builtinModules } = require('module');

class PaymentPage{

    constructor(page){

        this.page = page;
        this.nameOnCard = page.locator("[data-qa='name-on-card']");
        this.cardNum = page.locator(".card-number");
        this.cvc = page.locator("[data-qa='cvc']");
        this.expMonth = page.locator(".card-expiry-month");
        this.expYear = page.locator(".card-expiry-year");
        this.submit = page.locator("#submit");
        this.successMsg = page.locator("#success_message");

    }

    async enterPaymentDetails(cardHolderName, cardnumber, cvcOnCard, expiryMonth, expiryYear){
        await this.nameOnCard.fill(cardHolderName);
        await this.cardNum.fill(cardnumber);
        await this.cvc.fill(cvcOnCard);
        await this.expMonth.fill(expiryMonth);
        await this.expYear.fill(expiryYear);
    }

    async payAndConfirm(){
        await this.submit.click();
    }

    async verifyOrderSuccessMessage(successMessage){
        this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain(successMessage);
            });
        
            //await expect (this.successMsg).toHaveText(successMessage);
    }






}

module.exports = {PaymentPage};