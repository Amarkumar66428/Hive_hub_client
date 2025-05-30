import { routers } from "../router/router.confg";

class Utils {
  getRoute = (path) => {
    return routers.filter((route) => route.path === path)[0];
  };
}

const utils = new Utils();

export default utils;
