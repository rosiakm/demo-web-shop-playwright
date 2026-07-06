export type FooterSection = 
    | "information"
    | "customerService"
    | "myAccount"
    | "followUs";

export type FooterLinks = {
    [key: string]: string;
};

export const footerNavigation: {
    [key in FooterSection]: FooterLinks;
} = {
    information: {
        sitemap: "/sitemap",
        shippingAndReturns: "/shipping-returns",
        privacyNotice: "/privacy-policy",
        conditionsOfUse: "/conditions-of-use",
        aboutUs: "/about-us",
        contactUs: "/contactus"
    },

    customerService: {
        search: "/search",
        news: "/news",
        blog: "/blog",
        recentlyViewedProducts: "/recentlyviewedproducts",
        compareProductsList: "/compareproducts",
        newProducts: "/newproducts"
    },

    myAccount: {
        myAccount: "/customer/info",
        orders: "/customer/orders",
        addresses: "/customer/addresses",
        shoppingCart: "/cart",
        wishlist: "/wishlist"
    },

    followUs: {
        facebook: "http://www.facebook.com/nopCommerce",
        twitter: "https://twitter.com/nopCommerce",
        rss: "/news/rss/1",
        youtube: "http://www.youtube.com/user/nopCommerce",
        googlePlus: "https://plus.google.com/+nopcommerce"
    }
}