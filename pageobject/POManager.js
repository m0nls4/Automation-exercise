const { HomePage } = require('../pageobject/HomePage');
const {CartPage} = require('../pageobject/CartPage');
const { Signup } = require('../pageobject/SignupPage');
const { CheckoutPage } = require('../pageobject/CheckoutPage');
const { PaymentPage } = require('../pageobject/PaymentPage');

class POManager {

constructor(page){
    this.page = page; 
    this.homePage = new HomePage (this.page);
    this.cartPage = new CartPage (this.page);
    this.signupPage = new Signup (this.page);
    this.checkOutPage = new CheckoutPage (this.page);
    this.payment = new PaymentPage (this.page);

}

gethomePage(){
    return this.homePage;
}

getcartPage(){
    return this.cartPage;
}

getsignupPage(){
    return this.signupPage;
}

getcheckOutPage(){
    return this.checkOutPage;
}

getpaymentPage(){
    return this.payment;
}


}

module.exports = {POManager};