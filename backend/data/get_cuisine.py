import json
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

cuisine_country_dict = {
    "Thai": "Thailand",
    "Bangladeshi": "Bangladesh",
    "Tex-Mex": "United States of America",
    "Cuban": "Cuba",
    "German": "Germany",
    "Paraguayan": "Paraguay",
    "Taiwanese": "Taiwan",
    "Nicaraguan": "Nicaragua",
    "Trinidad And Tobago": "Trinidad And Tobago",
    "Greek": "Greece",
    "Scandinavian": "Norway",
    "Southwestern": "United States of America",
    "Moroccan": "Morocco",
    "Creole": "United States of America",
    "Albanian": "Albania",
    "British": "United Kingdom of Great Britain and Northern Ireland",
    "Australian": "Australia",
    "Iranian": "Iran",
    "Welsh": "United Kingdom of Great Britain and Northern Ireland",
    "Israeli": "Israel",
    "Mongolian": "Mongolia",
    "Amish": "United States of America",
    "Canadian": "Canada",
    "American": "United States of America",
    "Singaporean": "Singapore",
    "Ukrainian": "Ukraine",
    "Spanish": "Spain",
    "Irish": "Ireland",
    "Vietnamese": "Vietnam",
    "New American": "United States of America",
    "Armenian": "Armenia",
    "Colombian": "Colombia",
    "Moldovan": "Moldova",
    "New Mexican": "United States of Ammerica",
    "Syrian": "Syria",
    "Pakistani": "Pakistan",
    "Hungarian": "Hungary",
    "Guyanese": "Guyana",
    "Bolivian": "Bolivia",
    "California": "United States of America",
    "Turkish": "Turkey",
    "Yemeni": "Yemen",
    "Tibetan": "China",
    "Chinese": "China",
    "Jewish": "Israel",
    "Korean": "Korea",
    "Nepalese": "Nepal",
    "Cambodian": "Cammbodia",
    "Sri Lankan": "Sri Lanka",
    "Southern": "United States of America",
    "Caribbean": "Belize",
    "Mexican": "Mexico",
    "Peruvian": "Peru",
    "Afghan": "Afghanistan",
    "Dominican": "Dominican Republic",
    "Austrian": "Austria",
    "New Zealand": "New Zealand",
    "Danish": "Denmark",
    "Icelandic": "Iceland",
    "Punjabi": "India",
    "Filipino": "Philippines",
    "Chilean": "Chile",
    "Cajun": "United States of America",
    "Balearic": "Spain",
    "Portuguese": "Portugal",
    "Somali": "Somalia",
    "Ecuadorian": "Ecuador",
    "Burmese": "Myanmar",
    "Soul Food": "United States of America",
    "Ethiopian": "Ethiopia",
    "Saudi Arabian": "Saudi Arabia",
    "Hong Kong": "China",
    "Sichuan": "China",
    "Tunisian": "Tunisia",
    "Nigerian": "Nigeria",
    "Jamaican": "Jamaica",
    "Brazilian": "Brazil",
    "French": "France",
    "Salvadorean": "El Salvador",
    "Venezuelan": "Venezuela",
    "Uruguayan": "Uruguay",
    "Indonesian": "Indonesia",
    "Cantonese": "China",
    "South African": "South Africa",
    "Uzbek": "Uzbekistan",
    "Puerto Rican": "Puerto Rico",
    "Swedish": "Sweden",
    "Haitian": "Haiti",
    "Polish": "Poland",
    "Scottish": "Scotland",
    "Italian": "Italy",
    "Russian": "Russia",
    "Georgian": "Georgia",
    "Japanese": "Japan",
    "Indian": "India",
    "Argentine": "Argentina",
    "Swiss": "Sweden",
    "Hawaiian": "United States of America",
    "Lebanese": "Lebanon",
    "Malaysian": "Malaysia",
    "Belgian": "Belgium",
}


def get_world_food_per_cuisine(cuisine):
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    cuisine = cuisine.replace(" ", "_")
    driver.get(
        "https://worldfood.guide/cuisinedishes/" + cuisine.lower() + "/" + str(1) + "/"
    )
    elements = driver.find_elements_by_class_name("title3.color2")
    result = []
    for item in elements:
        result.append(item.text)

    return result


def get_description(cuisine):
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    cuisine = cuisine.replace(" ", "_")
    url = "https://worldfood.guide/cuisine/" + cuisine.lower() + "/"
    print("url: ", url)
    driver.get(url)
    elements = driver.find_elements_by_class_name("description")
    description = ""
    for item in elements:
        description += item.text
    return description


def get_world_food_dishes():
    result = []
    not_found = []
    for cuisine in cuisine_country_dict.keys():
        print(cuisine)
        cuisine_dict = {}
        cuisine_dict["name"] = cuisine
        cuisine_dict["country"] = cuisine_country_dict[cuisine]
        all_dishes = get_world_food_per_cuisine(cuisine)
        if all_dishes == []:
            not_found.append(cuisine)
        cuisine_dict["dishes"] = all_dishes
        cuisine_dict["description"] = get_description(cuisine)
        result.append(cuisine_dict)

    f = open("all_cuisines.json", "w")
    json.dump(result, f)
    print(not_found)


def find_country(country):
    countries_f = open("countryData.json")
    countries_data = json.load(countries_f)

    for country_data in countries_data:
        if country in country_data["name"]:
            return [country_data["id"]]
    return "no id"


def get_country_data():
    cuisines_f = open("all_cuisines.json")
    cuisines_data = json.load(cuisines_f)

    for i in range(0, len(cuisines_data)):
        cuisine = cuisines_data[i]
        cuisine["countryID"] = find_country(cuisine["country"])

    with open("all_cuisines.json", "w") as file:
        json.dump(cuisines_data, file)


def remove_country_data():
    cuisines_f = open("all_cuisines.json")
    cuisines_data = json.load(cuisines_f)

    for cuisine in cuisines_data:
        cuisine.pop("countryData", None)

    with open("all_cuisines.json", "w") as file:
        json.dump(cuisines_data, file)


def sort_cuisines():
    cuisines_f = open("all_cuisines.json")
    cuisines_data = json.load(cuisines_f)

    cuisines_data = sorted(cuisines_data, key=lambda k: k["name"])

    with open("all_cuisines.json", "w") as file:
        json.dump(cuisines_data, file)


def insert_ids():
    f = open("new_restaurants.json")
    cities = json.load(f)

    # cities_sorted_data = sorted(cities, key=lambda k: k["name"])
    city_list = []
    id = 1
    for city in cities:
        city_dict = dict()
        city_dict["id"] = id
        city_dict.update(city)
        city_list.append(city_dict)
        id += 1

    with open("all_restaurants.json", "w") as file:
        json.dump(city_list, file)


def get_cuisines_in_a_city():
    f = open("all_cities.json")
    cities = json.load(f)

    headers = {"user-key": "612a084253c196424b159e02fcd54569"}
    base_url_location = "https://developers.zomato.com/api/v2.1/locations?query="
    base_url_cuisines_in_city = (
        "https://developers.zomato.com/api/v2.1/cuisines?city_id="
    )

    for city in cities:
        url_location = base_url_location + city["name"]
        r = requests.get(url_location, headers=headers).json()
        result = []
        for location in r["location_suggestions"]:
            city_id = location["city_id"]
            url_cuisines = base_url_cuisines_in_city + str(city_id)
            r_cuisines = requests.get(url_cuisines, headers=headers).json()
            for cuisines in r_cuisines["cuisines"]:
                elements = cuisines["cuisine"]
                cuisine = elements["cuisine_name"]
                result.append(cuisine)
        city["cuisines"] = result

    with open("all_cities.json", "w") as file:
        json.dump(cities, file)


all_cuisines_names = {
    "Afghan": 1,
    "Albanian": 2,
    "American": 3,
    "Amish": 4,
    "Argentine": 5,
    "Armenian": 6,
    "Australian": 7,
    "Austrian": 8,
    "Balearic": 9,
    "Bangladeshi": 10,
    "Belgian": 11,
    "Bolivian": 12,
    "Brazilian": 13,
    "British": 14,
    "Burmese": 15,
    "Cajun": 16,
    "California": 17,
    "Cambodian": 18,
    "Canadian": 19,
    "Cantonese": 20,
    "Caribbean": 21,
    "Chilean": 22,
    "Chinese": 23,
    "Colombian": 24,
    "Creole": 25,
    "Cuban": 26,
    "Danish": 27,
    "Dominican": 28,
    "Ecuadorian": 29,
    "Ethiopian": 30,
    "Filipino": 31,
    "French": 32,
    "Georgian": 33,
    "German": 34,
    "Greek": 35,
    "Guyanese": 36,
    "Haitian": 37,
    "Hawaiian": 38,
    "Hong Kong": 39,
    "Hungarian": 40,
    "Icelandic": 41,
    "Indian": 42,
    "Indonesian": 43,
    "Iranian": 44,
    "Irish": 45,
    "Israeli": 46,
    "Italian": 47,
    "Jamaican": 48,
    "Japanese": 49,
    "Jewish": 50,
    "Korean": 51,
    "Lebanese": 52,
    "Malaysian": 53,
    "Mexican": 54,
    "Moldovan": 55,
    "Mongolian": 56,
    "Moroccan": 57,
    "Nepalese": 58,
    "New American": 59,
    "New Mexican": 60,
    "New Zealand": 61,
    "Nicaraguan": 62,
    "Nigerian": 63,
    "Pakistani": 64,
    "Paraguayan": 65,
    "Peruvian": 66,
    "Polish": 67,
    "Portuguese": 68,
    "Puerto Rican": 69,
    "Punjabi": 70,
    "Russian": 71,
    "Salvadorean": 72,
    "Saudi Arabian": 73,
    "Scandinavian": 74,
    "Scottish": 75,
    "Sichuan": 76,
    "Singaporean": 77,
    "Somali": 78,
    "Soul Food": 79,
    "South African": 80,
    "Southern": 81,
    "Southwestern": 82,
    "Spanish": 83,
    "Sri Lankan": 84,
    "Swedish": 85,
    "Swiss": 86,
    "Syrian": 87,
    "Taiwanese": 88,
    "Tex-Mex": 89,
    "Thai": 90,
    "Tibetan": 91,
    "Trinidad And Tobago": 92,
    "Tunisian": 93,
    "Turkish": 94,
    "Ukrainian": 95,
    "Uruguayan": 96,
    "Uzbek": 97,
    "Venezuelan": 98,
    "Vietnamese": 99,
    "Welsh": 100,
    "Yemeni": 101,
}

all_cuisines_ids = {
    1: "Afghan",
    2: "Albanian",
    3: "American",
    4: "Amish",
    5: "Argentine",
    6: "Armenian",
    7: "Australian",
    8: "Austrian",
    9: "Balearic",
    10: "Bangladeshi",
    11: "Belgian",
    12: "Bolivian",
    13: "Brazilian",
    14: "British",
    15: "Burmese",
    16: "Cajun",
    17: "California",
    18: "Cambodian",
    19: "Canadian",
    20: "Cantonese",
    21: "Caribbean",
    22: "Chilean",
    23: "Chinese",
    24: "Colombian",
    25: "Creole",
    26: "Cuban",
    27: "Danish",
    28: "Dominican",
    29: "Ecuadorian",
    30: "Ethiopian",
    31: "Filipino",
    32: "French",
    33: "Georgian",
    34: "German",
    35: "Greek",
    36: "Guyanese",
    37: "Haitian",
    38: "Hawaiian",
    39: "Hong Kong",
    40: "Hungarian",
    41: "Icelandic",
    42: "Indian",
    43: "Indonesian",
    44: "Iranian",
    45: "Irish",
    46: "Israeli",
    47: "Italian",
    48: "Jamaican",
    49: "Japanese",
    50: "Jewish",
    51: "Korean",
    52: "Lebanese",
    53: "Malaysian",
    54: "Mexican",
    55: "Moldovan",
    56: "Mongolian",
    57: "Moroccan",
    58: "Nepalese",
    59: "New American",
    60: "New Mexican",
    61: "New Zealand",
    62: "Nicaraguan",
    63: "Nigerian",
    64: "Pakistani",
    65: "Paraguayan",
    66: "Peruvian",
    67: "Polish",
    68: "Portuguese",
    69: "Puerto Rican",
    70: "Punjabi",
    71: "Russian",
    72: "Salvadorean",
    73: "Saudi Arabian",
    74: "Scandinavian",
    75: "Scottish",
    76: "Sichuan",
    77: "Singaporean",
    78: "Somali",
    79: "Soul Food",
    80: "South African",
    81: "Southern",
    82: "Southwestern",
    83: "Spanish",
    84: "Sri Lankan",
    85: "Swedish",
    86: "Swiss",
    87: "Syrian",
    88: "Taiwanese",
    89: "Tex-Mex",
    90: "Thai",
    91: "Tibetan",
    92: "Trinidad And Tobago",
    93: "Tunisian",
    94: "Turkish",
    95: "Ukrainian",
    96: "Uruguayan",
    97: "Uzbek",
    98: "Venezuelan",
    99: "Vietnamese",
    100: "Welsh",
    101: "Yemeni",
}

all_cities = {}


def get_cuisines_and_id():
    f = open("all_cuisines.json")
    cuisines = json.load(f)

    result = dict()
    for cuisine in cuisines:
        result[cuisine["id"]] = cuisine["name"]
    print(result)


def get_cities_and_id():
    f = open("all_cities.json")
    cities = json.load(f)

    result = dict()
    for city in cities:
        result[city["id"]] = city["name"]
    print(result)


def get_cuisines_in_a_city_from_restaurants():
    f = open("all_restaurants.json")
    restaurants = json.load(f)

    f = open("all_cities.json")
    cities = json.load(f)

    # val = False

    for restaurant in restaurants:
        city = restaurant["location"]["city"]
        if city in all_cities:
            city_id = all_cities[city] - 1
            for cuisine in restaurant["cuisines"].split(", "):
                # print(cities[city_id]["cuisines"])
                if (
                    not (str(cuisine) in cities[city_id]["cuisines"])
                    and str(cuisine) in all_cuisines_names
                ):
                    # print(restaurant["name"])
                    # print(city)
                    # print(cuisine)
                    # print(cities[city_id]["cuisines"])
                    cities[city_id]["cuisines"].append(cuisine)

    with open("all_cities.json", "w") as file:
        json.dump(cities, file)


def remove_cuisines_data_from_cities():
    f = open("all_cities.json")
    cities = json.load(f)

    id = 1
    for city in cities:
        city["id"] = id
        id += 1

    with open("all_cities.json", "w") as file:
        json.dump(cities, file)


def insert_city_id():
    f = open("cities_zomato_id.json")
    cities_zomato = json.load(f)

    f = open("all_cities.json")
    cities = json.load(f)

    count = 1
    for city in cities:
        city_name = city["full_name"]
        found = False
        for city_zomato in cities_zomato:
            city_zomato_full_name = city_zomato + ", United States"
            if city_name == city_zomato_full_name:
                count += 1
                found = True
        if not found:
            print("city: ", city_name)
    print("valid cities count: ", count)


def check_if_we_have_enough_cuisines_dammit():
    f = open("temp.json")
    restaurants = json.load(f)

    for restaurant in restaurants:
        # city_id = restaurant["location"]["city_id"]
        # country_id = restaurant["location"]["country_id"]
        # if country_id == 216:
        for cuisine in restaurant["cuisines"].split(", "):
            if cuisine in all_cuisines_names:
                all_cuisines_names.pop(cuisine)

    print("remaining cuisines: ", all_cuisines_names)


def remove_restaurants_not_in_US():
    f = open("all_restaurants.json")
    restaurants = json.load(f)

    print("len: ", len(restaurants))

    result = []
    for restaurant in restaurants:
        country_id = restaurant["location"]["country_id"]
        if country_id == 216:
            result.append(restaurant)

    with open("all_restaurants.json", "w") as file:
        json.dump(result, file)

    print("len: ", len(result))


def check_for_duplicate_city_ids():
    f = open("cities_zomato_id.json")
    cities = json.load(f)

    city_ids = {}  # id: name
    for city in cities:
        city_id = city[city]["city_id"]
        if city_id in city_ids:
            print("Duplicate FOUND")
            print(city)
            print(city_ids[city_id])
        else:
            city_ids[city_id] = city


def check_len():
    f = open("all_restaurants.json")
    orig_rest = json.load(f)

    print("total num of restaurants: ", len(orig_rest))

    f = open("all_restaurants_improved.json")
    part = json.load(f)

    print("part num of restaurants: ", len(part))


def remove_attributes_from_json():
    f = open("countryData.json")
    data = json.load(f)

    # things_to_pop = ["R", "apikey", "id", "switch_to_order_menu", "offers",
    # "opentable_support", "is_zomato_book_res", "mezzo_provider", "is_book_form_web_view", "book_form_web_view_url", "book_again_url",
    # "all_reviews_count", "photos_url", "photo_count", "medio_provider", "deeplink", "events_url", "all_reviews", "establishment", "establishment_types",

    # things_to_pop = ["currency", "featured_image", "has_online_delivery",
    # "has_table_booking", "include_bogo_offers", "is_delivering_now", "is_table_reservation_supported",
    # "store_type", "thumb", "user_rating"]

    things_to_pop = ["topLevelDomain", "callingCodes", "altSpellings", "cioc"]

    for one in data:
        for pop in things_to_pop:
            one.pop(pop)

    with open("newCountryData.json", "w") as file:
        json.dump(data, file)


def use_keys_as_attributes():
    f = open("all_restaurants.json")
    data = json.load(f)

    for restaurant in data:
        address = restaurant["location"]["address"]
        city = restaurant["location"]["city"]
        latitude = restaurant["location"]["latitude"]
        longitude = restaurant["location"]["longitude"]
        state_abbrev = restaurant["location"]["state_abbrev"]
        zipcode = restaurant["location"]["zipcode"]

        restaurant["address"] = address
        restaurant["city"] = city
        restaurant["latitude"] = latitude
        restaurant["longitude"] = longitude
        restaurant["state_abbrev"] = state_abbrev
        restaurant["zipcode"] = zipcode

        restaurant.pop("location")

    f = open("new_restaurants.json", "w")
    json.dump(data, f)


def get_aggregate_rating():
    f = open("all_restaurants.json")
    data = json.load(f)

    for restaurant in data:
        rating = restaurant["user_rating"]["aggregate_rating"]
        restaurant["aggregate_rating"] = rating

    f = open("all_restaurants.json", "w")
    json.dump(data, f)


def remove_dict_keys():
    f = open("all_restaurants.json")
    data = json.load(f)

    for restaurant in data:
        del restaurant["location"]["locality"]
        del restaurant["location"]["locality_verbose"]

    f = open("all_restaurants.json", "w")
    json.dump(data, f)


def arrayToOneString():
    f = open("all_cuisines.json")
    data = json.load(f)

    for cuisine in data:
        # countries = "".join(str(cuisine["countryID"]))

        cuisine["countryID"] = cuisine["countryID"][1:-1]

    f = open("all_cuisines.json", "w")
    json.dump(data, f)

arrayToOneString()


def dictToOneString():
    f = open("newCountryData2.json")
    data = json.load(f)

    for country in data:
        currencies = (
            country["currencies"][0]["code"] + "-" + country["currencies"][0]["name"]
        )

        if country["currencies"][0]["symbol"]:
            currencies += "-" + country["currencies"][0]["symbol"]

        for i in range(1, len(country["currencies"]) - 1):
            currency = (
                country["currencies"][i]["code"]
                + "-"
                + country["currencies"][i]["name"]
            )

            if country["currencies"][i]["symbol"]:
                currency += "-" + country["currencies"][i]["symbol"]

            currencies += ", " + currency

        country["currencies"] = currencies

    # f = open("newCountryData.json", "w")
    # json.dump(data, f)


# dictToOneString()


def combine_json_files():
    f = open("final_all_restaurants.json")
    orig_rest = json.load(f)

    f = open("missing_cuisine_restaurants.json")
    cuisines = json.load(f)

    print("num: ", len(cuisines))

    data = orig_rest + cuisines

    with open("final_restaurants.json", "w") as file:
        json.dump(data, file, sort_keys=True)


# combine_json_files()
# remove_attributes_from_restaurants()
# check_len()
# check_for_duplicate_city_ids()
# remove_restaurants_not_in_US()
# check_if_we_have_enough_cuisines_dammit()
# insert_city_id()
# remove_cuisines_data_from_cities()
# remove_cuisines_not_in_list()
# get_cuisines_in_a_city_from_restaurants()
# get_cities_and_id()
# get_cuisines_in_a_city()
# get_country_data()