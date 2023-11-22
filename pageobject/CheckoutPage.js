const { expect } = require("@playwright/test");

class CheckoutPage {

constructor(page){

    this.page = page;
    
    this.namefirstlast = page.locator(".address_firstname");
    this.deliveryAddress = page.locator("#address_delivery .address_address1");
    this.billingAddress = page.locator("#address_invoice .address_address1");
    this.location = page.locator(".address_city");
    this.countryName = page.locator(".address_country_name");
    this.addressPhone = page.locator(".address_phone")
    this.productName = page.locator("table .cart_description a");
    this.message = page.locator("[name='message']");
    this.placeOrderbtn = page.locator(".check_out");


    
}

async deliveryAddressDetails(fullName, address,fullAddress, country, mobileNum){

    await expect(this.namefirstlast.first()).toHaveText(fullName);
    await expect(this.deliveryAddress.nth(1)).toHaveText(address);
    await expect(this.location.first()).toHaveText(fullAddress);
    await expect(this.countryName.first()).toHaveText(country);
    await expect(this.addressPhone.first()).toHaveText(mobileNum);

}

async billingAddressDetails(fullName, address, fullAddress, country, mobileNum){

    await expect(this.namefirstlast.last()).toHaveText(fullName);
    await expect(this.billingAddress.nth(1)).toHaveText(address);
    await expect(this.location.last()).toHaveText(fullAddress);
    await expect(this.countryName.last()).toHaveText(country);
    await expect(this.addressPhone.last()).toHaveText(mobileNum);
}

async reviewProductByName (prodName){
    await expect(this.productName).toHaveText(prodName);
}

async addMessage(comment){
    await this.message.fill(comment);
}

async placeOrder(){
    await this.placeOrderbtn.click();
}

}

module.exports = {CheckoutPage};