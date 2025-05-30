import {
  Dashboard,
  DesignServicesRounded,
  Explore,
  HomeOutlined,
  NotificationsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { SUPER_ADMIN, STORE_OWNER } from "../constant/LookupConst.js";
import asyncComponent from "../utils/asyncComponent.jsx";
import React from "react";

export const authRouters = [
  {
    path: "/",
    component: asyncComponent(() => import("../pages/homePage.jsx")),
    isLayout: false,
    showInMenu: false,
  },
  {
    path: "/auth/signin",
    component: asyncComponent(() => import("../pages/auth/signin/index.jsx")),
    isLayout: false,
    showInMenu: false,
  },
  {
    path: "/auth/signup",
    component: asyncComponent(() => import("../pages/auth/signup/index.jsx")),
    isLayout: false,
    showInMenu: false,
  },
  {
    path: "/templates/paws-n-play",
    component: asyncComponent(() =>
      import("../pages/templates/templates1/index.jsx")
    ),
    isLayout: false,
    showInMenu: false,
  },
  {
    path: "/templates/shop",
    component: asyncComponent(() =>
      import("../pages/templates/templates2/index.jsx")
    ),
    isLayout: false,
    showInMenu: false,
  },
  {
    path: "/templates/education",
    component: asyncComponent(() =>
      import("../pages/templates/templates3/index.jsx")
    ),
    isLayout: false,
    showInMenu: false,
  },
];

export const appRouters = [
  {
    path: "/admin/dashboard",
    component: asyncComponent(() =>
      import("../pages/Admin/home/dashboard.jsx")
    ),
    role: [SUPER_ADMIN],
    isLayout: true,
    showInMenu: false,
  },
  {
    title: "sidebar.home",
    role: [SUPER_ADMIN, STORE_OWNER],
    icon: React.createElement(HomeOutlined),
    isLayout: true,
    showInMenu: true,
    subMenu: true,
  },
  {
    path: "/admin/home/dashboard",
    role: [SUPER_ADMIN],
    title: "sidebar.dashboard",
    subMenuTitle: "sidebar.home",
    icon: React.createElement(Dashboard),
    component: asyncComponent(() =>
      import("../pages/Admin/home/dashboard.jsx")
    ),
    isLayout: true,
    showInSubMenu: true,
  },
  {
    path: "/user/home/dashboard",
    role: [STORE_OWNER],
    title: "sidebar.dashboard",
    subMenuTitle: "sidebar.home",
    icon: React.createElement(Dashboard),
    component: asyncComponent(() => import("../pages/user/home/index.jsx")),
    isLayout: true,
    showInSubMenu: true,
  },
  {
    path: "/user/home/create-store",
    role: [STORE_OWNER],
    title: "sidebar.createStore",
    subMenuTitle: "sidebar.home",
    icon: React.createElement(DesignServicesRounded),
    component: asyncComponent(() => import("../pages/user/createStore/index.jsx")),
    isLayout: true,
    showInSubMenu: true,
    subscriptionRequired: true,
  },
  {
    path: "/user/community",
    role: [STORE_OWNER],
    title: "sidebar.community",
    icon: React.createElement(Explore),
    component: asyncComponent(() =>
      import("../pages/user/community/index.jsx")
    ),
    isLayout: true,
    showInMenu: true,
  },
  {
    path: "/user/notifications",
    role: [STORE_OWNER],
    title: "sidebar.notification",
    icon: React.createElement(NotificationsOutlined),

    component: asyncComponent(() =>
      import("../pages/user/notification/index.jsx")
    ),
    isLayout: true,
    showInMenu: true,
  },
  {
    path: "/user/settings",
    role: [STORE_OWNER],
    title: "sidebar.settings",
    icon: React.createElement(SettingsOutlined),
    component: asyncComponent(() => import("../pages/user/settings/index.jsx")),
    isLayout: true,
    showInMenu: true,
  },
  {
    path: "/subscription/payment",
    role: [STORE_OWNER],
    component: asyncComponent(() => import("../pages/subscription/payments.jsx")),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: "/subscription/plans",
    role: [STORE_OWNER],
    component: asyncComponent(() => import("../pages/subscription/plans.jsx")),
    isLayout: true,
    showInMenu: false,
  },
];

export const routers = [...authRouters, ...appRouters];
