import {test, expect} from '../fixtures/fixtures'
import { Categories } from "../../enums/categories"
import { categoriesConfig } from "../../config/categories-config"
import { PriceFilters } from '../../enums/filters';
import { calculateExpectedCounts } from '../helpers/calculate-expected-count';

for(const category of Object.values(Categories)){
    const config = categoriesConfig[category as Categories];

    if(config.hasProducts) {
        test(`${category} category page has any product`, async ({sidebarPage, categoryPage}) => {
            await sidebarPage.Sidebar.navigateTo(category as Categories);

            expect(await categoryPage.isProductGridVisible()).toBeTruthy();
            expect(await categoryPage.isAnyProductItemVisible()).toBeTruthy();
        })
    }
    for(const subcategory of config.subcategories){
        test(`${category} -> ${subcategory.name} has any product`, async({sidebarPage, categoryPage}) => {
            await sidebarPage.Sidebar.navigateToSubcategory(category as Categories, subcategory.name);

            expect(await categoryPage.isProductGridVisible()).toBeTruthy();
            expect(await categoryPage.isAnyProductItemVisible()).toBeTruthy();
        })
    }
}

test('Product grid - product items limit', async ({sidebarPage, categoryPage}) => {
    await sidebarPage.Sidebar.navigateTo(Categories.BOOKS);

    const gridSize = await categoryPage.getSelectedPageSize();
    const productItemsNumber = await categoryPage.getProductItemsCount();

    await expect(productItemsNumber).toBeLessThanOrEqual(gridSize);
    expect(await categoryPage.isCurrentPageButtonVisible()).toBeFalsy();
    expect(await categoryPage.isIndividualPageButtonVisible()).toBeFalsy();
    expect(await categoryPage.isNextPageButtonVisible()).toBeFalsy();
})

test('Product grid - change grid size', async ({page, categoryPage, sidebarPage}) => {
    await sidebarPage.Sidebar.navigateTo(Categories.BOOKS);

    const productItemsNumberBeforeChangingGridSize = await categoryPage.getProductItemsCount();
    const limit = 4;

    await categoryPage.selectPageSize(String(limit));
    await page.waitForFunction((expected) => {
        return document.querySelectorAll('.product-item').length === expected;
    }, limit);
    const productItemsNumberAfterChangingGridSize = await categoryPage.getProductItemsCount();

    await expect(productItemsNumberAfterChangingGridSize).toBeLessThan(productItemsNumberBeforeChangingGridSize);
    await expect(productItemsNumberAfterChangingGridSize).toEqual(limit);
    expect(await categoryPage.isCurrentPageButtonVisible()).toBeTruthy();
    expect(await categoryPage.isIndividualPageButtonVisible()).toBeTruthy();
    expect(await categoryPage.isNextPageButtonVisible()).toBeTruthy();
})

test("Product grid - filter products", async ({categoryPage, sidebarPage}) => {
    await sidebarPage.Sidebar.navigateTo(Categories.JEWELRY);
    
    const prices = await categoryPage.getActualPrices();
    const expected = calculateExpectedCounts(prices, Categories.JEWELRY);
    console.log(expected);

    await categoryPage.selectPriceFilter(PriceFilters.FROM_700_TO_3000);

    const actual = await categoryPage.getProductItemsCount();

    expect(actual).toBe(expected[PriceFilters.FROM_700_TO_3000]);
})