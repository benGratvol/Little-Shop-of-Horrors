const auth_routes = require("./allRoutes/auth_routes");
const register_routes = require("./allRoutes/regester_routs");

const blacklist_routes = require("./allRoutes/blackList_routes");
const config_routes = require("./allRoutes/config_routes");

const allroutes = [
  {
    file: auth_routes,
    path: "/account",
  },
  {
    file: register_routes,
    path: "/account",
  },

  {
    file: blacklist_routes,
    path: "/regein",
  },
  {
    file: config_routes,
    path: "/config",
  },
];
module.exports = allroutes;
