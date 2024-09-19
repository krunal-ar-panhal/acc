import { AlignLeft, Archive, Flag ,BarChart, Box, Camera, Chrome, Clipboard, DollarSign, Home, LogIn, Settings, Tag, UserPlus, Users ,List} from "react-feather";

export const MENUITEMS: any = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    path: "/banner",
    title: "Banner",
    icon: Flag ,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      { path: "/products/physical/category", title: "Category", type: "link" },
      // { path: "/products/physical/sub-category", title: "Sub Category", type: "link" },
      { path: "/products/physical/product-list", title: "Product List", type: "link" },
      // { path: "/products/physical/add-product", title: "Add Product", type: "link" },
      { path: "/products/physical/rating-list", title: "Rating", type: "link" },
    ],
    // children: [
    //   {
    //     // title: "Physical",
    //     type: "sub",
    //     active: false,
    //     children: [
    //       { path: "/products/physical/category", title: "Category", type: "link" },
    //       // { path: "/products/physical/sub-category", title: "Sub Category", type: "link" },
    //       { path: "/products/physical/product-list", title: "Product List", type: "link" },
    //       { path: "/products/physical/product-detail", title: "Product Detail", type: "link" },
    //       { path: "/products/physical/add-product", title: "Add Product", type: "link" },
    //       { path: "/products/physical/rating-list", title: "Rating", type: "link" },
    //     ],
    //   },
    //   // {
    //   //   title: "digital",
    //   //   type: "sub",
    //   //   active: false,
    //   //   children: [
    //   //     { path: "/products/digital/digital-category", title: "Category", type: "link" },
    //   //     { path: "/products/digital/digital-sub-category", title: "Sub Category", type: "link" },
    //   //     { path: "/products/digital/digital-product-list", title: "Product List", type: "link" },
    //   //     { path: "/products/digital/digital-add-product", title: "Add Product", type: "link" },
    //   //   ],
    //   // },
    // ],
  },
  {
    title: "Masters",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      { path: "/masters/attributes", title: "Attributes", type: "link" },
      { path: "/masters/options", title: "Options", type: "link" },
      // { path: "/masters/coupon", title: "Coupon", type: "link" },
    ],
  },
  {
    title: "Sales",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/sales/orders", title: "Orders", type: "link" },
      { path: "/sales/transactions", title: "Transactions", type: "link" },
    ],
  },
  {
    title: "Coupons",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      { path: "/coupons", title: "List Coupons", type: "link" },
      // { path: "/coupons/create-coupons", title: "Create Coupons", type: "link" },
    ],
  },
  // {
  //   title: "Pages",
  //   icon: Clipboard,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/pages/list-page", title: "List Page", type: "link" },
  //     { path: "/pages/create-page", title: "Create Page", type: "link" },
  //   ],
  // },
  // {
  //   title: "Media",
  //   path: "/media",
  //   icon: Camera,
  //   type: "link",
  //   active: false,
  // },
  // {
  //   title: "Menus",
  //   icon: AlignLeft,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/menus/list-menu", title: "List Menu", type: "link" },
  //     { path: "/menus/create-menu", title: "Create Menu", type: "link" },
  //   ],
  // },
  {
    title: "Customers",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "Customer List", type: "link" },
      { path: "/users/create-user", title: "Customer User", type: "link" },
    ],
  },
  {
    title: "Admin User",
    icon: Users,
    type: "sub",
    active: false,
    children: [
      { path: "/vendors/list-vendors", title: "Admin User List", type: "link" },
      { path: "/vendors/create-vendors", title: "Create Admin User", type: "link" },
    ],
  },
  // {
  //   title: "Localization",
  //   icon: Chrome,
  //   type: "sub",
  //   children: [
  //     { path: "/localization/translations", title: "Translations", type: "link" },
  //     { path: "/localization/currency-rates", title: "Currency Rates", type: "link" },
  //     { path: "/localization/taxes", title: "Taxes", type: "link" },
  //   ],
  // },
  {
    title: "Subscribe",
    path: "/subscribe",
    icon: List,
    type: "link",
    active: false,
  },
  {
    title: "Invoice",
    path: "/invoice",
    icon: Archive,
    type: "link",
    active: false,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart,
    type: "link",
    active: false,
  },
  {
    title: "Settings",
    path:'/settings',
    icon: Settings,
    type: "link",
    // children: [{ path: "/settings", title: "Profile", type: "link" }],
  },
  
  // {
  //   title: "Login",
  //   path: "/auth/login",
  //   icon: LogIn,
  //   type: "link",
  //   active: false,
  // },
];