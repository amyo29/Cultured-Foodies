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


all_cuisines = {
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

all_cities = {
    "Albuquerque": 1,
    "Alexandria": 2,
    "Anaheim": 3,
    "Anchorage": 4,
    "Arlington": 6,
    "Atlanta": 7,
    "Aurora": 9,
    "Austin": 10,
    "Baltimore": 11,
    "Bellevue": 12,
    "Birmingham": 13,
    "Boise": 14,
    "Boston": 15,
    "Buffalo": 16,
    "Carrollton": 17,
    "Cary": 18,
    "Chandler": 19,
    "Charlotte": 20,
    "Chattanooga": 21,
    "Chicago": 22,
    "Chula Vista": 23,
    "Cincinnati": 24,
    "Cleveland": 25,
    "Colorado Springs": 26,
    "Columbus": 27,
    "Corona": 28,
    "Dallas": 29,
    "Denton": 30,
    "Denver": 31,
    "Des Moines": 32,
    "Detroit": 33,
    "Durham": 34,
    "Elk Grove": 35,
    "Enterprise": 36,
    "Eugene": 37,
    "Fontana": 38,
    "Fort Collins": 39,
    "Fort Lauderdale": 40,
    "Fort Worth": 41,
    "Fremont": 42,
    "Frisco": 43,
    "Garden Grove": 44,
    "Garland": 45,
    "Gilbert": 46,
    "Glendale": 48,
    "Grand Prairie": 49,
    "Hayward": 50,
    "Henderson": 51,
    "Hialeah": 52,
    "Hollywood": 53,
    "Honolulu": 54,
    "Houston": 55,
    "Huntington Beach": 56,
    "Indianapolis": 57,
    "Irvine": 58,
    "Irving": 59,
    "Jacksonville": 60,
    "Jersey City": 61,
    "Joliet": 62,
    "Kansas City": 64,
    "Knoxville": 65,
    "Lakewood": 66,
    "Las Vegas": 67,
    "Long Beach": 68,
    "Los Angeles": 69,
    "Louisville": 70,
    "Madison": 71,
    "McKinney": 72,
    "Memphis": 73,
    "Mesa": 74,
    "Metairie Terrace": 75,
    "Miami": 76,
    "Milwaukee": 77,
    "Minneapolis": 78,
    "Miramar": 79,
    "Moreno Valley": 80,
    "Naperville": 81,
    "Nashville": 82,
    "New Orleans": 83,
    "New York City": 84,
    "Newark": 85,
    "North Las Vegas": 86,
    "Oakland": 87,
    "Oklahoma City": 88,
    "Olathe": 89,
    "Omaha": 90,
    "Ontario": 91,
    "Orlando": 92,
    "Overland Park": 93,
    "Oxnard": 94,
    "Palmdale": 95,
    "Paradise": 96,
    "Pasadena": 97,
    "Paterson": 98,
    "Pembroke Pines": 99,
    "Peoria": 100,
    "Philadelphia": 101,
    "Phoenix": 102,
    "Pittsburgh": 103,
    "Plano": 104,
    "Pomona": 105,
    "Portland": 106,
    "Providence": 107,
    "Raleigh": 108,
    "Rancho Cucamonga": 109,
    "Richmond": 110,
    "Riverside": 111,
    "Rochester": 112,
    "Round Rock": 113,
    "Sacramento": 114,
    "Saint Paul": 115,
    "Salt Lake City": 116,
    "San Antonio": 117,
    "San Bernardino": 118,
    "San Diego": 119,
    "San Francisco": 120,
    "San Jose": 121,
    "San Juan": 122,
    "Santa Ana": 123,
    "Santa Clarita": 124,
    "Santa Rosa": 125,
    "Scottsdale": 126,
    "Seattle": 127,
    "Spring Valley": 128,
    "St. Louis": 129,
    "St. Petersburg": 130,
    "Stockton": 131,
    "Sunnyvale": 132,
    "Sunrise Manor": 133,
    "Surprise": 134,
    "Tacoma": 135,
    "Tampa": 136,
    "Tempe": 137,
    "Thornton": 138,
    "Vancouver": 139,
    "Washington, D.C.": 140,
    "Worcester": 141,
    "Yonkers": 142,
}


def get_cuisines_and_id():
    f = open("all_cuisines.json")
    cuisines = json.load(f)

    result = dict()
    for cuisine in cuisines:
        result[cuisine["name"]] = cuisine["id"]
    print(result)


def get_cities_and_id():
    f = open("all_cities.json")
    cities = json.load(f)

    result = dict()
    for city in cities:
        result[city["name"]] = city["id"]
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
                    and str(cuisine) in all_cuisines
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

    for city in cities:
        city.pop("cuisines", None)

    with open("all_cities.json", "w") as file:
        json.dump(cities, file)


remove_cuisines_data_from_cities()
# remove_cuisines_not_in_list()
# get_cuisines_in_a_city_from_restaurants()
# get_cities_and_id()
# get_cuisines_in_a_city()
# get_country_data()