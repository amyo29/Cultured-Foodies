import json
import requests

"""
PURPOSE: Python file for scraping Restaurant data supported by Zomato, across cities sorted by high to low population size.
TODO: Rerun restaurant scraping calls on Zomato, adding "&start=<number>" to url for top 40 restaurants across 147 cities and top 120 restaurants on select cities.
NOTE: WorldFood API list of cuisines limited us to cuisine type matches in Zomato.
New approach: Many:1 mapping of cuisines to country. Multiple Cuisines (model) can map to the same country.
This maximizes number of Cuisine instances.

Examples:
China --> Cantonese, Chinese, Hong Kong, Sichuan
United States --> American, Tex-Mex, Cajun, Hawaiian
"""

# scrape data for aggregate restaurants across all US cities 
def scrape_restaurants():
    # Zomato API endpoint to get list of restaurants for a city
    base_url = "https://developers.zomato.com/api/v2.1/search?entity_type=city&entity_id="
    headers = {"user-key": "612a084253c196424b159e02fcd54569"}
    # load file containing list of top 200 city entities supported by Zomato with corresponding Zomato city ID's
    f_cities = open("cities_zomato_id.json")
    city_entities_zomato = json.load(f_cities)
    print("number city entities: ", len(city_entities_zomato)) # 200
    # generate list of Zomato city ID's for our top 141 cities
    cities_ids = set([city_entities_zomato[x][0]["entity_id"] for x in city_entities_zomato])
    print("number of unique cities: ", len(cities_ids)) # 147
    
    restaurant_list = []
    # get aggregate top 40 restaurants across all 147 cities 
    for city_id in cities_ids:
        print(city_id)
        url = base_url + str(city_id)
        r = requests.get(url, headers=headers).json()
        restaurant_list += r["restaurants"]
        r = requests.get(url + "&start=20", headers=headers).json()
        restaurant_list += r["restaurants"]
    
    f_restaurants = open("/Users/aouyang/Downloads/College/2020-21/Spring-2021/CS-373/cultured-foodies/backend/data/top_40_restaurants_all_cities.json", "w")
    json.dump(restaurant_list, f_restaurants)

# get unique cuisines across all restaurants 
def get_unique_cuisines():
    f_restaurants = open(
        "all_60-120_restaurants.json", encoding="utf8", errors="ignore"
    )
    restaurant_entities = json.load(f_restaurants, encoding="utf8")
    all_cuisines = []
    for restaurant in restaurant_entities:
        all_cuisines += restaurant["restaurant"]["cuisines"].split(", ")

    all_cuisines = set(all_cuisines)

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


def get_cuisine_ids():
    new_cuisine_ids = {}
    need_ids  = total_available_cuisines - set(current_cuisines_id.keys())
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
    
    print(len(need_ids))
    print(need_ids - set(new_cuisine_ids.keys()))


scrape_restaurants()