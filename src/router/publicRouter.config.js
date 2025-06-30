import asyncComponent from "../utils/asyncComponent.jsx";

export const publicRouters = [
  {
    path: "/hive/:subdomain",
  },
];

export const templateRouters = [
  {
    key: "1",
    component: asyncComponent(() =>
      import("../pages/templates/templates2/index.jsx")
    ),
  },
];
