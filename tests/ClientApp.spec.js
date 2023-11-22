const {expect, test} = require ('@playwright/test');
const { POManager } = require('../pageobject/POManager');
const dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppTestData.json')));


//test.describe.configure({mode:'serial'});

test ("HomePage visible", async ({page})=> 
{
    const poManager = new POManager (page);
    const homePage = poManager.gethomePage();
    await homePage.goTo(dataset.url);
    await homePage.homePageVisible();

});

test ("Display Cart", async ({page})=>
{
    const poManager = new POManager (page);
    const homePage = poManager.gethomePage();
    await homePage.goTo(dataset.url);
    await homePage.homePageVisible();
    await homePage.addItemTocart();
    await homePage.navigateTocart();

    const cartPage = poManager.getcartPage();
    await cartPage.cartPageDisplayed();
});

test ("Verify Account is Created", async ({page})=>
{
    const poManager = new POManager (page);
    const homePage = poManager.gethomePage();
    await homePage.goTo(dataset.url);
    await homePage.homePageVisible();
    await homePage.addItemTocart();
    await homePage.navigateTocart();

    const cartPage = poManager.getcartPage();
    await cartPage.cartPageDisplayed();
    await cartPage.proceedToCheckout();
    await cartPage.navigateToSignup();

    const signupPage = poManager.getsignupPage();
    let email = signupPage.generateRandomEmail();
    await signupPage.signup(dataset.name, email);
    await signupPage.createAccount(dataset.password, dataset.firstName, dataset.lastName, dataset.address, dataset.country, dataset.state, dataset.city, dataset.zipcode, dataset.mobileNum);
    await signupPage.accountSuccessfulcreation(dataset.createdText);

});

test ("Varify login as username", async ({page})=>
{
    const poManager = new POManager (page);
    const homePage = poManager.gethomePage();
    await homePage.goTo(dataset.url);
    await homePage.homePageVisible();
    await homePage.addItemTocart();
    await homePage.navigateTocart();

    const cartPage = poManager.getcartPage();
    await cartPage.cartPageDisplayed();
    await cartPage.proceedToCheckout();
    await cartPage.navigateToSignup();

    const signupPage = poManager.getsignupPage();
    let email = signupPage.generateRandomEmail();
    await signupPage.signup(dataset.name, email);
    await signupPage.createAccount(dataset.password, dataset.firstName, dataset.lastName, dataset.address, dataset.country, dataset.state, dataset.city, dataset.zipcode, dataset.mobileNum);
    await signupPage.accountSuccessfulcreation(dataset.createdText);
    await signupPage.verifylogin(dataset.name);

});

test ("Verify Address Details and Review Order", async ({page})=>

{
    const poManager = new POManager (page);
    const homePage = poManager.gethomePage();
    await homePage.goTo(dataset.url);
    await homePage.homePageVisible();
    await homePage.addItemTocart();
    await homePage.navigateTocart();

    const cartPage = poManager.getcartPage();
    await cartPage.cartPageDisplayed();
    await cartPage.proceedToCheckout();
    await cartPage.navigateToSignup();

    const signupPage = poManager.getsignupPage();
    let email = signupPage.generateRandomEmail();
    await signupPage.signup(dataset.name, email);
    await signupPage.createAccount(dataset.password, dataset.firstName, dataset.lastName, dataset.address, dataset.country, dataset.state, dataset.city, dataset.zipcode, dataset.mobileNum);
    await signupPage.accountSuccessfulcreation(dataset.createdText);
    await signupPage.verifylogin(dataset.name);
    await signupPage.cartNavigation();

    //click cart again
    //await homePage.navigateTocart();
    await cartPage.proceedToCheckout();

    const checkOutPage = poManager.getcheckOutPage();

    //variables for checkoutpage
    const fullName = ". "+dataset.firstName.concat(" ", dataset.lastName);
    const fullAddress = dataset.city.concat(" ",dataset.state).concat(" ",dataset.zipcode);

    await checkOutPage.deliveryAddressDetails(fullName, dataset.address,fullAddress, dataset.country, dataset.mobileNum);
    await checkOutPage.billingAddressDetails(fullName, dataset.address,fullAddress, dataset.country, dataset.mobileNum);
    await checkOutPage.reviewProductByName(dataset.prodName);

});

test ("Order successful", async ({page})=>
{   
    const poManager = new POManager (page);
    const homePage = poManager.gethomePage();
    await homePage.goTo(dataset.url);
    await homePage.homePageVisible();
    await homePage.addItemTocart();
    await homePage.navigateTocart();

    const cartPage = poManager.getcartPage();
    await cartPage.cartPageDisplayed();
    await cartPage.proceedToCheckout();
    await cartPage.navigateToSignup();

    const signupPage = poManager.getsignupPage();
    let email = signupPage.generateRandomEmail();
    await signupPage.signup(dataset.name, email);
    await signupPage.createAccount(dataset.password, dataset.firstName, dataset.lastName, dataset.address, dataset.country, dataset.state, dataset.city, dataset.zipcode, dataset.mobileNum);
    await signupPage.accountSuccessfulcreation(dataset.createdText);
    await signupPage.verifylogin(dataset.name);
    await signupPage.cartNavigation();

    //click cart again
    //await homePage.navigateTocart();
    await cartPage.proceedToCheckout();

    const checkOutPage = poManager.getcheckOutPage();

    //variables for checkoutpage
    const fullName = ". "+dataset.firstName.concat(" ", dataset.lastName);
    const fullAddress = dataset.city.concat(" ",dataset.state).concat(" ",dataset.zipcode);

    await checkOutPage.deliveryAddressDetails(fullName, dataset.address,fullAddress, dataset.country, dataset.mobileNum);
    await checkOutPage.billingAddressDetails(fullName, dataset.address,fullAddress, dataset.country, dataset.mobileNum);
    await checkOutPage.reviewProductByName(dataset.prodName);
    await checkOutPage.addMessage(dataset.comment);
    await checkOutPage.placeOrder();
    
    //Payment page
    const payment = poManager.getpaymentPage();
    await payment.enterPaymentDetails(dataset.cardHolderName, dataset.cardnumber, dataset.cvcOnCard, dataset.expiryMonth, dataset.expiryYear);
    await payment.payAndConfirm();
    await payment.verifyOrderSuccessMessage(dataset.successMessage);

});