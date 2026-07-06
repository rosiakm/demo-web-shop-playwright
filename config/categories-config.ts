import { Categories } from "../enums/categories";
import { Subcategories } from "../enums/subcategories";
import { PriceFilters } from "../enums/filters";

export type FiltersConfig = {
    price?: Array<{
        name?: string,
        min?: number,
        max?: number
    }>
    attributes?: {
        cpu?: string[],
        memory?: string[]
        }
}

export const categoriesConfig: Record<
    Categories,
    {
        hasProducts: boolean,
        subcategories: Array<{
            name: Subcategories,
            filters?: FiltersConfig
        }>,
        filters?: FiltersConfig
    }
    > = {
        [Categories.BOOKS]: {
            hasProducts: true,
            subcategories: [],
            filters:{
                price: [
                    {
                        name: PriceFilters.UNDER_25,
                        min: 0,
                        max: 24
                    },
                    {
                        name: PriceFilters.FROM_25_TO_50,
                        min: 25,
                        max: 50
                    },
                    {
                        name: PriceFilters.OVER_50,
                        min: 51
                    }
                ]
            }
    },
        [Categories.COMPUTERS]: {
            hasProducts: false,
            subcategories: [
                {
                    name: Subcategories.DESKTOPS,
                    filters: {
                        price: [
                            {
                                name: PriceFilters.UNDER_1000,
                                min: 0,
                                max: 999
                            },
                            {
                                name: PriceFilters.FROM_1000_TO_1200,
                                min: 1000,
                                max: 1200
                            },
                            {
                                name: PriceFilters.OVER_1200,
                                min: 1201
                            }
                        ]
                    }
                },
                {
                    name: Subcategories.NOTEBOOKS,
                    filters: {
                        attributes: {
                            cpu: [
                                "Intel"
                            ],
                            memory: [
                                "3GB"
                            ]
                        }
                    }
                },
                {
                    name: Subcategories.ACCESSORIES,
                    filters: {
                        price: [
                            {
                                name: PriceFilters.UNDER_100,
                                min: 0,
                                max: 100
                            },
                            {
                                name: PriceFilters.OVER_100,
                                min: 101
                            }
                        ]
                    }
                }
            ]
        },
        [Categories.ELECTRONICS]: {
            hasProducts: false,
            subcategories: [
                {
                    name: Subcategories.CAMERA_PHOTO,
                    filters: {
                        price: [
                            {
                                name: PriceFilters.UNDER_500,
                                min: 0,
                                max: 500
                            },
                            {
                                name: PriceFilters.OVER_500,
                                min: 501
                            }
                        ]
                    }
                },
                {
                    name: Subcategories.CELL_PHONES,
                }
            ]
        },
        [Categories.APPAREL_SHOES]: {
            hasProducts: true,
            subcategories: [],
        },
        [Categories.DIGITAL_DOWNLOADS]: {
            hasProducts: true,
            subcategories: [],
        },
        [Categories.JEWELRY]: {
            hasProducts: true,
            subcategories: [],
            filters: {
                price: [
                    {
                        name: PriceFilters.FROM_0_TO_500,
                        min: 0,
                        max: 500
                    },
                    {
                        name: PriceFilters.FROM_500_TO_700,
                        min: 501,
                        max: 700
                    },
                    {
                        name: PriceFilters.FROM_700_TO_3000,
                        min: 701,
                        max: 3000
                    }
                ]
            }
        },
        [Categories.GIFT_CARDS]: {
            hasProducts: true,
            subcategories: [],
        }
};
