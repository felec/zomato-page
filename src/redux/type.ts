export interface State {
  homeReducer: {
    citiesState: {
      cities: City[];
      loading: boolean;
      error: string;
    };
    selectedCity: City | null;
  };
  restaurantReducer: {
    restaurantState: {
      restaurants: Restaurant[];
      loading: boolean;
      error: string;
    };
    selectedRestaurant: Restaurant | null;
  };
}

export interface City {
  id: number;
  name: string;
  country_id: number;
  country_name: string;
  country_flag_url: string;
  should_experiment_with: number;
  has_go_out_tab: number;
  discovery_enabled: number;
  has_new_ad_format: number;
  is_state: number;
  state_id: number;
  state_name: string;
  state_code: string;
}

export interface Restaurant {
  R: R;
  apikey: string;
  id: string;
  name: string;
  url: string;
  location: Location;
  switch_to_order_menu: number;
  cuisines: string;
  timings: string;
  average_cost_for_two: number;
  price_range: number;
  currency: string;
  highlights: string[];
  offers: any[];
  opentable_support: number;
  is_zomato_book_res: number;
  mezzo_provider: string;
  is_book_form_web_view: number;
  book_form_web_view_url: string;
  book_again_url: string;
  thumb: string;
  user_rating: User_Rating;
  all_reviews_count: number;
  photos_url: string;
  photo_count: number;
  menu_url: string;
  featured_image: string;
  has_online_delivery: number;
  is_delivering_now: number;
  store_type: string;
  include_bogo_offers: boolean;
  deeplink: string;
  is_table_reservation_supported: number;
  has_table_booking: number;
  events_url: string;
  phone_numbers: string;
  all_reviews: All_Review;
  establishment: string[];
  establishment_types: any[];
}

export interface Location {
  address: string;
  locality: string;
  city: string;
  latitude: string;
  longitude: string;
  zipcode: string;
  country_id: string;
}

export interface Photo {
  id: string;
  url: string;
  thumb_url: string;
  user: User;
  res_id: string;
  caption: string;
  timestamp: string;
  friendly_time: string;
  width: string;
  height: string;
  comments_count: string;
  likes_count: string;
}

export interface Has_Menu_Status {
  delivery: number;
  takeaway: number;
}

export interface R {
  has_menu_status: Has_Menu_Status;
  res_id: number;
  is_grocery_store: boolean;
}

export interface Bg_Color {
  type: string;
  tint: string;
}

export interface Rating_Obj {
  title: string;
  bg_color: Bg_Color;
}

export interface User_Rating {
  aggregate_rating: number;
  rating_text: string;
  rating_color: string;
  rating_obj: Rating_Obj;
  votes: number;
}

export interface User {
  name: string;
  zomato_handle: string;
  foodie_level: string;
  foodie_level_num: string;
  foodie_color: string;
  profile_url: string;
  profile_deeplink: string;
  profile_image: string;
}

export interface All_Review {
  reviews: any[];
}
