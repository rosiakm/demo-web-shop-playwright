import { test, expect } from '../fixtures/fixtures'
import { ProductDetailsPage } from '../../page-objects/pages/product-details-page'
import { Categories } from '../../enums/categories';
import { Subcategories } from '../../enums/subcategories';
import { categoriesConfig } from '../../config/categories-config';
import { ReviewPage } from '../../page-objects/pages/review-page';

for(const categoryKey in categoriesConfig){
    const category = categoryKey as Categories;
    const categoryData = categoriesConfig[category] as any;

    if(categoryData.hasProducts){
        test(`Product details in ${category}`, async ({page, sidebarPage, categoryPage}) => {
            await sidebarPage.Sidebar.navigateTo(category);

            const productDetailsPage = await categoryPage.openFirstProductDetails();
            await page.waitForLoadState();
            expect(await productDetailsPage.isProductNameVisible()).toBeTruthy();
            expect(await productDetailsPage.isProductDescriptionVisible()).toBeTruthy();
            expect(await productDetailsPage.isPriceValueVisible()).toBeTruthy();
        })
    }
    for(const subcategory of categoryData.subcategories){
        test(`Product details in ${category} -> ${subcategory.name}`, async({page, sidebarPage, categoryPage}) => {
            await sidebarPage.Sidebar.navigateToSubcategory(category, subcategory.name);
            
            const productDetailsPage = await categoryPage.openFirstProductDetails();
            
            await page.waitForLoadState();
            expect(await productDetailsPage.isProductNameVisible()).toBeTruthy();
            expect(await productDetailsPage.isProductDescriptionVisible()).toBeTruthy();
            expect(await productDetailsPage.isPriceValueVisible()).toBeTruthy();
        })
    }
}

test('Add product review - logged in user', async({page, loggedInUser, categoryPage}) => {
    await loggedInUser.Sidebar.navigateToSubcategory(Categories.ELECTRONICS, Subcategories.CELL_PHONES);
    
    const productDetailsPage = await categoryPage.openProductDetailsByName("Used phone");
    await productDetailsPage.openAddReviewLink();
    
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
    await productDetailsPage.openReviewsLink();

    const reviewPage = new ReviewPage(page);
    const expectedMessage = reviewPage.texts.errorMessage;
    const actualMessage = await reviewPage.nonRegisteredUserMessageError.getText();
    expect(actualMessage.trim()).toEqual(expectedMessage);
    expect(await reviewPage.reviewTitle.textbox.isDisabled()).toBeTruthy();
    expect(await reviewPage.reviewText.textbox.isDisabled()).toBeTruthy();
})