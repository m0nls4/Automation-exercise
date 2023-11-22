const {expect} = require ('@playwright/test');

class CartPage{

    constructor (page){
    
    this.page = page;
    this.tablerow = page.locator("table tr");
    this.cartProduct = this.tablerow.locator(".cart_product");
    this.checkout = page.locator(".check_out");
    this.registerFromDialog = page.locator(".modal-confirm [href*='login']");
   
    
    }
    
    
    async cartPageDisplayed(){
        
        await this.cartProduct.first().waitFor();
        await expect (this.cartProduct.last()).toBeVisible();
        
    }

    async proceedToCheckout(){

        await this.checkout.click();
    }

    async navigateToSignup(){

        await this.registerFromDialog.click();
    }

    }
    
    module.exports = {CartPage};