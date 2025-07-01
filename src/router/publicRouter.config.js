import asyncComponent from "../utils/asyncComponent.jsx";

export const publicRouters = [
  {
    path: "/hive/:subdomain",
  },
  {
    path: "/hive/:subdomain/cart",
    component: asyncComponent(() =>
      import("../pages/templates/shoppingCart.jsx")
    ),
  },
  {
    path: "/hive/:subdomain/checkout",
    component: asyncComponent(() =>
      import("../pages/templates/checkout.jsx")
    ),
  },
];

export const templateRouters = [
  {
    key: ["eCommerce", "1"],
    component: asyncComponent(() =>
      import("../pages/templates/templates2/index.jsx")
    ),
  },
];
