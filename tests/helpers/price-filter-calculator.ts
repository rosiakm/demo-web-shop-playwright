import { categoriesConfig } from "../../config/categories-config";
import { Categories } from "../../enums/categories";
import { Subcategories } from "../../enums/subcategories";

export function getPriceFilters(
    category: Categories,
    subcategory?: Subcategories
) {
    const categoryConfig = categoriesConfig[category];

    if(subcategory){
        return categoryConfig.subcategories.find(
            s => s.name === subcategory
        )?.filters?.price??[];
    }

    return categoryConfig.filters?.price ?? [];
}