const {expect} = require ('@playwright/test');

class Signup{

constructor(page){

    this.page = page;
    this.name = page.locator("[data-qa='signup-name']");
    this.email = page.locator("[data-qa='signup-email']");
    this.submit = page.locator("[data-qa='signup-button']");
    this.password = page.locator("#password");
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.address = page.locator("#address1");
    this.country = page.locator("#country");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipcode = page.locator("#zipcode");
    this.mobileNum = page.locator("#mobile_number");
    this.createAcc = page.locator("[data-qa='create-account']");
    this.cretedText = page.locator("[data-qa='account-created']");
    this.continuebtn = page.locator("[data-qa='continue-button']");


     


}

async signup (name, email){

    await this.name.fill(name);
    await this.email.fill(email);
    await this.submit.click(); 
}

async createAccount(password, firstName, lastName, address, country, state, city, zipcode, mobileNum){

    await this.password.fill(password);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.address.fill(address);
    await this.country.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.mobileNum.fill(mobileNum);
    await this.createAcc.click();

}

async accountSuccessfulcreation(createdText){

    await expect(this.cretedText).toHaveText(createdText);
    await this.continuebtn.click();
}



}

module.exports = {Signup};