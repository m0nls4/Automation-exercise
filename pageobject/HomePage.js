const {expect} = require ('@playwright/test');

class HomePage{

    constructor (page){
    
    this.page = page;
    this.featureItem = page.locator(".features_items .col-sm-4");
    //this.addToCart = page.locator("[class*=add-to-cart]");
    this.addToCart = page.locator(".features_items [class*=add-to-cart]");
    this.contShop = page.locator("[class*=close-modal]");
    this.cart = page.locator("[href*='cart']:visible");
    
    }
    
    
    async goTo (url){
    
       
        await this.page.goto(url);
        
    }
    
    async homePageVisible(){
        
        await this.featureItem.last().waitFor();
        await expect (this.featureItem.last()).toBeVisible();
        
    }

    async addItemTocart(){

        await this.addToCart.first().click();
        await this.contShop.click();

    }

    async navigateTocart(){

        await this.cart.click();

    }
    
    }
    
    module.exports = {HomePage};