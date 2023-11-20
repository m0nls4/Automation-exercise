const {expect, test} = require ('@playwright/test');
const { HomePage } = require('../pageobject/HomePage');
const {CartPage} = require('../pageobject/CartPage');
const { Signup } = require('../pageobject/SignupPage');


test ("HomePage", async ({page})=> 
{

    const homePage = new HomePage (page);

    await homePage.goTo();
    await homePage.homePageVisible();
    await homePage.addItemTocart();
    await homePage.navigateTocart();


    const cartPage = new CartPage (page);
    await cartPage.cartPageDisplayed();
    await cartPage.proceedToCheckout();
    await cartPage.navigateToSignup();

    const signupPage = new Signup (page);
    const name = "Rave";
    const email = "rfoe@gati.com";
    const password = "1234";
    const firstName= "John";
    const lastName= "Ab";
    const address= "Ontario"; 
    const country = "Canada"; 
    const state= "Ontario"; 
    const city= "Ottawa";
    const zipcode = "1234";
    const mobileNum = "1234567890";
    const createdText = "Account Created!";
    await signupPage.signup(name, email);
    await signupPage.createAccount(password, firstName, lastName, address, country, state, city, zipcode, mobileNum);
    await signupPage.accountSuccessfulcreation(createdText);

});