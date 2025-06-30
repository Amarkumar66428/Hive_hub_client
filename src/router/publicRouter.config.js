import asyncComponent from "../utils/asyncComponent.jsx";

export const publicRouters = [
  {
    path: "/hive/:subdomain",
    component: asyncComponent(() => import("../pages/public/index.jsx")),
    isLayout: false,
    showInMenu: false,
  },
];
