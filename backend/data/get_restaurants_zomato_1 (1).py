"""
Need 20 cuisines

---> Can have multiple cuisines per country
China: cantonese, chinese, hong kong
United States: American, Tex-Mex, Cajun, Hawaian, 

Not rely on world food anymore

go through all the 140 cities and scrap restaurants
--> get all the cuisines supported
--> ...someones about to remove cuisnes manually (goal: 100 cuisines)

"""
import json
import requests


current_cuisines_id = {  # cuisines we can collect data on
    "Austrian": 201,
    "Sri Lankan": 86,
    "Tunisian": 761,
    "Dominican": 958,
    "Uruguayan": 264,
    "Danish": 203,
    "Swedish": 211,
    "Australian": 131,
    "Nepalese": 117,
    "Indonesian": 114,
    "South African": 267,
    "Polish": 219,
    "Jewish": 265,
    "Ecuadorian": 316,
    "Chilean": 229,
    "Tibetan": 93,
    "Israeli": 218,
    "Malaysian": 69,
    "European": 38,
    "Singaporean": 119,
    "Venezuelan": 641,
    "African": 152,
    "Georgian": 205,
    "Scottish": 210,
    "Canadian": 381,
    "Nicaraguan": 962,
    "Somali": 611,
    "Welsh": 965,
    "Cambodian": 111,
    "Hungarian": 228,
    "New Zealand": 961,
    "Swiss": 213,
    "Syrian": 212,
    "Nigerian": 296,
}


revised_cuisines = {  # cuisines supported by restaurants.json
    "Mongolian",
    "British",
    "Japanese",
    "Burmese",
    "Peruvian",
    "Colombian",
    "Hawaiian",
    "Irish",
    "Eastern European",
    "Puerto Rican",
    "Vietnamese",
    "Indian",
    "Afghan",
    "German",
    "Mediterranean",
    "Russian",
    "Filipino",
    "American",
    "Ethiopian",
    "Portuguese",
    "Pakistani",
    "Salvadorean",
    "Latin American",
    "Greek",
    "Turkish",
    "Thai",
    "Chinese",
    "Korean",
    "Iranian",
    "Armenian",
    "Belgian",
    "Moroccan",
    "Cantonese",
    "French",
    "Brazilian",
    "Spanish",
    "Argentine",
    "Middle Eastern",
    "Ukrainian",
    "Cuban",
    "Mexican",
    "Jamaican",
    "Caribbean",
    "Lebanese",
    "Italian",
    "Taiwanese",
}

def scrape_restaurants():
    base_url = (
        "https://developers.zomato.com/api/v2.1/search?entity_type=city&entity_id="
    )
    headers = {"user-key": "612a084253c196424b159e02fcd54569"}
    f_cities = open("cities_zomato_id.json")
    city_entities = json.load(f_cities)
    cities_id = [city_entities[x][0]["entity_id"] for x in city_entities]

    f_cities = open("cities_zomato_id2.json")
    city_entities_2 = json.load(f_cities)
    cities_id += [city_entities_2[x][0]["entity_id"] for x in city_entities_2]

    print("number of cities", len(set(cities_id)))

    restaurant_list = []
    # import pdb

    # pdb.set_trace()
    for city in cities_id:
        print(city)
        url = base_url + str(city)
        r = requests.get(url, headers=headers).json()
        restaurant_list += r["restaurants"]
        r = requests.get(url + "&start=20", headers=headers).json()
        restaurant_list += r["restaurants"]
    f_restaurants = open(
        "all_20_restaurants.json",
        "w",
    )
    json.dump(restaurant_list, f_restaurants)


def get_unique_cuisines():
    f_restaurants = open(
        "all_60-120_restaurants.json", encoding="utf8", errors="ignore"
    )
    restaurant_entities = json.load(f_restaurants, encoding="utf8")
    all_cuisines = []
    for restaurant in restaurant_entities:
        all_cuisines += restaurant["restaurant"]["cuisines"].split(", ")

    all_cuisines = set(all_cuisines)

    print(len(all_cuisines))
    print(all_cuisines)

# scrape_restaurants()
# get_unique_cuisines()

first_40_set = {
    "Continental",
    "California",
    "Po'Boys",
    "Taiwanese",
    "Andhra",
    "New Mexican",
    "Armenian",
    "Ukrainian",
    "Crepes",
    "Canadian",
    "Salad",
    "Argentine",
    "BBQ",
    "Mediterranean",
    "Soul Food",
    "Cuban",
    "Southern",
    "Southwestern",
    "Juices",
    "Vietnamese",
    "Latin American",
    "Sandwich",
    "Vegetarian",
    "Tea",
    "Asian",
    "Mexican",
    "Scottish",
    "Pacific Northwest",
    "New American",
    "French",
    "Japanese",
    "Irish",
    "Others",
    "Pizza",
    "Steak",
    "Singaporean",
    "Coffee",
    "Sushi",
    "Burmese",
    "Brazilian",
    "Indonesian",
    "Caribbean",
    "Diner",
    "Korean",
    "Pakistani",
    "Hawaiian",
    "Mongolian",
    "Tex-Mex",
    "British",
    "Tapas",
    "Healthy Food",
    "Iranian",
    "Taco",
    "Pub Food",
    "African",
    "Turkish",
    "Bar Food",
    "Beverages",
    "Peruvian",
    "Cafe",
    "Jamaican",
    "Breakfast",
    "Seafood",
    "Bakery",
    "Ethiopian",
    "Afghan",
    "Russian",
    "Finger Food",
    "Belgian",
    "Spanish",
    "Dim Sum",
    "Kebab",
    "Filipino",
    "Teriyaki",
    "Ice Cream",
    "North Indian",
    "Korean BBQ",
    "Indian",
    "Desserts",
    "Donuts",
    "Burger",
    "Thai",
    "International",
    "Greek",
    "Frozen Yogurt",
    "Middle Eastern",
    "Modern Australian",
    "Biryani",
    "Deli",
    "Ramen",
    "Fast Food",
    "Bagels",
    "Moroccan",
    "German",
    "Bubble Tea",
    "Coffee and Tea",
    "Chinese",
    "Colombian",
    "Fusion",
    "American",
    "South Indian",
    "Eastern European",
    "Australian",
    "Fish and Chips",
    "Cambodian",
    "Cantonese",
    "Cajun",
    "European",
    "Lebanese",
    "Italian",
    "Tibetan",
    "Portuguese",
}
total_available = revised_cuisines | set(current_cuisines_id.keys())
total_available = total_available | first_40_set
# print(total_available)
total_available_cuisines = {
    "Singaporean",
    "Puerto Rican",
    "Lebanese",
    "Welsh",
    "South Indian",  # India
    "Tex-Mex",  # USA
    "Pakistani",
    "New Zealand",
    "Mexican",
    "American",
    "Soul Food",  # USA
    "Israeli",
    "Swiss",
    "Ethiopian",
    "Cantonese",
    "Irish",
    "Filipino",
    "Peruvian",
    "Nicaraguan",
    "Syrian",
    "New Mexican",
    "Vietnamese",
    "French",
    "African",
    "New American",
    "Georgian",
    "Mongolian",
    "Caribbean",
    "South African",
    "Hawaiian",
    "Jewish",
    "Spanish",
    "Iranian",
    "Italian",
    "Venezuelan",
    "Austrian",
    "Cajun",  # USA
    "Russian",
    "Nepalese",
    "Argentine",
    "Ecuadorian",
    "Salvadorean",
    "Malaysian",
    "Tibetan",
    "Dominican",
    "Portuguese",
    "Cambodian",
    "Burmese",
    "Belgian",
    "Nigerian",
    "Hungarian",
    "California",  # USA
    "Jamaican",
    "Indonesian",
    "Tunisian",
    "Taiwanese",
    "Swedish",
    "Chinese",
    "Uruguayan",
    "Somali",
    "Afghan",
    "Indian",
    "Canadian",
    "German",
    "Chilean",
    "Mediterranean",
    "Danish",
    "Japanese",
    "Greek",
    "Fast Food",  # USA
    "Armenian",
    "Colombian",
    "Australian",
    "Brazilian",
    "Turkish",
    "Ukrainian",
    "Thai",
    "Scottish",
    "Cuban",
    "Korean",
    "Sri Lankan",
    "British",
    "North Indian",  # India
    "Polish",
    "Moroccan",
}
special_cuisines = {
    "Bangladeshi",          # Bangladesh, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Bangladeshi
    "Paraguayan",           # Paraguay,  https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Paraguayan
    "Punjabi",              # India,  https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Punjabi
    "Moldovan",             # Moldova, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Moldovan
    "Haitian",              # Haiti, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Haitian
    "Albanian",             # Albania, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Albanian
    "Uzbek",                # Uzbekistan, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Uzbek
    "Hong Kong",            # China, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Hong Kong
    "Bolivian",             # Bolivia, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Bolivian
    "Icelandic",            # Iceland, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Icelandic
    "Balearic",             # Spain, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Balearic
    "Trinidad And Tobago",  # Trinidad and Tobago, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Trinidad
    "Guyanese",             # Guyana, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Guyanese
    "Yemeni",               # Yemen, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Yemeni
    "Saudi Arabian"         # Saudi Arabia, https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=Saudi Arabian
}
# print(len(total_available))
# print(len(total_available_cuisines))

need_ids  = total_available_cuisines - set(current_cuisines_id.keys())
# print(len(need_ids))
new_cuisine_ids = {}
def get_cuisine_ids():
    base_url = (
        "https://developers.zomato.com/api/v2.1/cuisines?city_id=280"
    )
    headers = {"user-key": "612a084253c196424b159e02fcd54569"}
    r = requests.get(base_url, headers=headers).json()
    for x in need_ids:
        for cuisine in r["cuisines"]:
            if x == cuisine["cuisine"]["cuisine_name"]:
                new_cuisine_ids[x] = cuisine["cuisine"]["cuisine_id"]
    print(new_cuisine_ids)

get_cuisine_ids()
print(len(new_cuisine_ids))
print(len(need_ids))
print(need_ids - set(new_cuisine_ids.keys()))