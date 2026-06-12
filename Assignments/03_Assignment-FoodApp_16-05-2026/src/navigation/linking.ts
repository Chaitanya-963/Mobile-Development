import { LinkingOptions } from "@react-navigation/native";

const linking: LinkingOptions<any> = {
  prefixes: ["foodapp://"],

  config: {
    screens: {
      HomeTab: {
        screens: {
          Home: "",
          RestaurantDetail:
            "restaurant/:restaurantId",
          Cart: "cart",
        },
      },

      Search: "search",
      Orders: "orders",
      ProfileTab: "profile",
    },
  },
};

export default linking;