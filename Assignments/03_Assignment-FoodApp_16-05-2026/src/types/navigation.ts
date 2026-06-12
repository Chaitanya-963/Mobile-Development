export type RestaurantStackParamList = {
  Home: undefined;

  RestaurantDetail: {
    restaurantId: string;
  };

  Cart: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Onboarding: undefined;
};


export type BottomTabParamList = {
  HomeTab: undefined;
  Search: undefined;
  Orders: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type ProfileDrawerParamList = {
  Profile: undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
};
