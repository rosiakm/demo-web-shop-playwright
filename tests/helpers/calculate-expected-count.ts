import { Categories } from "../../enums/categories";
import { PriceFilters } from "../../enums/filters";
import { Subcategories } from "../../enums/subcategories";
import { getPriceFilters } from "./price-filter-calculator";

type ExpectedCounts = Record<PriceFilters, number>;

export function calculateExpectedCounts(
    prices: number[],
    category: Categories,
    subcategory?: Subcategories
): Partial<ExpectedCounts>{
    
    const filters = getPriceFilters(category, subcategory);
    const result: Partial<ExpectedCounts> = {};

    for(const filter of filters){
        result[filter.name!] = prices.filter(price => {
            const meetsMin = filter.min === undefined || price >= filter.min;
            const meetsMax = filter.max === undefined || price <= filter.max;

            return meetsMin && meetsMax;
        }).length;
    }
    return result;
}