import { test, expect } from '../fixtures/fixtures'
import { ProductDetailsPage } from '../../page-objects/pages/product-details-page'
import { Categories } from '../../enums/categories';
import { Subcategories } from '../../enums/subcategories';
import { categoriesConfig } from '../../config/categories-config';
import { LoginPage } from '../../page-objects/pages/login-page';
import { ReviewPage } from '../../page-objects/pages/review-page';
import { CategoryPage } from '../../page-objects/pages/category-page';

for(const categoryKey in categoriesConfig){
    const category = categoryKey as Categories;
    const categoryData = categoriesConfig[category] as any;

    if(categoryData.hasProducts){
        test(`Product details in ${category}`, async ({page, sidebarPage, categoryPage}) => {
            test.setTimeout(10_000);
            await sidebarPage.Sidebar.navigateTo(category);
            await categoryPage.openFirstProductDetails();

            const productDetailsPage = new ProductDetailsPage(page);
            expect(await productDetailsPage.isProductNameVisible()).toBeTruthy();
            expect(await productDetailsPage.isProductDescriptionVisible()).toBeTruthy();
            expect(await productDetailsPage.isPriceValueVisible()).toBeTruthy();
        
            const stockStatus = productDetailsPage.getStockStatus();
            if(await stockStatus === "In stock"){
                expect(await productDetailsPage.isAddToCartButtonVisible()).toBeTruthy();
            } else {
                expect(await productDetailsPage.isAddToCartButtonVisible()).toBeFalsy();
            }
        })
    }
    for(const subcategory of categoryData.subcategories){
        test(`Product details in ${category} -> ${subcategory.name}`, async({page, sidebarPage, categoryPage}) => {
            test.setTimeout(10_000);
            await sidebarPage.Sidebar.navigateToSubcategory(category, subcategory);
            await categoryPage.openFirstProductDetails();
            console.log(await page.url());
            
            const productDetailsPage = new ProductDetailsPage(page);
            expect(await productDetailsPage.isProductNameVisible()).toBeTruthy();
            expect(await productDetailsPage.isProductDescriptionVisible()).toBeTruthy();
            expect(await productDetailsPage.isPriceValueVisible()).toBeTruthy();
    
            const stockStatus = await productDetailsPage.getStockStatus();
            if(stockStatus === "In stock"){
                expect(await productDetailsPage.isAddToCartButtonVisible()).toBeTruthy();
            } else {
                expect(await productDetailsPage.isAddToCartButtonVisible()).toBeFalsy();
            }
        })
    }
}

test('Add product review - logged in user', async({page, loggedInUser, categoryPage}) => {
    await loggedInUser.Sidebar.navigateToSubcategory(Categories.ELECTRONICS, Subcategories.CELL_PHONES);
    await categoryPage.openProductDetailsByName("Used phone");
    
    const productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.addReviewLink.click();
    const reviewPage = new ReviewPage(page);
    await reviewPage.sendReview("Test title", "This is random test text");

    const expectedMessage = reviewPage.texts.addedReview;
    const actualMessage = await reviewPage.resultText.getText();
    expect(actualMessage.trim()).toEqual(expectedMessage);
})

test('Add product review - log out user', async({page, homePage, categoryPage}) => {
    await homePage.Sidebar.navigateToSubcategory(Categories.COMPUTERS, Subcategories.DESKTOPS);
    await categoryPage.openProductDetailsByName("Elite Desktop PC");

    const productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.reviewsLink.click();

    const reviewPage = new ReviewPage(page);
    const expectedMessage = reviewPage.texts.errorMessage;
    const actualMessage = await reviewPage.nonRegisteredUserMessageError.getText();
    expect(actualMessage.trim()).toEqual(expectedMessage);
    expect(await reviewPage.reviewTitle.textbox.isDisabled()).toBeTruthy();
    expect(await reviewPage.reviewText.textbox.isDisabled()).toBeTruthy();
})