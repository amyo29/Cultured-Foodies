import json
import requests

top_cities_by_population = [
    "New York City, New York",
    "Los Angeles, California",
    "Chicago, Illinois",
    "Houston, Texas",
    "Phoenix, Arizona",
    "Philadelphia, Pennsylvania",
    "San Antonio, Texas",
    "San Diego, California",
    "Dallas, Texas",
    "Austin, Texas",
    "San Jose, California",
    "Fort Worth, Texas",
    "Jacksonville, Florida",
    "Columbus, Ohio",
    "Charlotte, North Carolina",
    "Indianapolis, Indiana",
    "San Francisco, California",
    "Seattle, Washington",
    "Denver, Colorado",
    "Washington, District of Columbia",
    "Boston, Massachusetts",
    "Nashville, Tennessee",
    "Oklahoma City, Oklahoma",
    "Las Vegas, Nevada",
    "Detroit, Michigan",
    "Portland, Oregon",
    "Memphis, Tennessee",
    "Louisville, Kentucky",
    "Milwaukee, Wisconsin",
    "Baltimore, Maryland",
    "Albuquerque, New Mexico",
    "Mesa, Arizona",
    "Sacramento, California",
    "Atlanta, Georgia",
    "Kansas City, Missouri",
    "Colorado Springs, Colorado",
    "Raleigh, North Carolina",
    "Omaha, Nebraska",
    "Miami, Florida",
    "Long Beach, California",
    "Oakland, California",
    "Minneapolis, Minnesota",
    "Tampa, Florida",
    "Arlington, Texas",
    "Aurora, Colorado",
    "New Orleans, Louisiana",
    "Cleveland, Ohio",
    "Anaheim, California",
    "Henderson, Nevada",
    "Honolulu, Hawaii",
    "Riverside, California",
    "Santa Ana, California",
    "San Juan, Puerto Rico",
    "Stockton, California",
    "St. Paul, Minnesota",
    "Cincinnati, Ohio",
    "Pittsburgh, Pennsylvania",
    "Irvine, California",
    "St. Louis, Missouri",
    "Orlando, Florida",
    "Durham, North Carolina",
    "Plano, Texas",
    "Anchorage, Alaska",
    "Newark, New Jersey",
    "Chula Vista, California",
    "Chandler, Arizona",
    "St. Petersburg, Florida",
    "Scottsdale, Arizona",
    "North Las Vegas, Nevada",
    "Madison, Wisconsin",
    "Gilbert, Arizona",
    "Jersey City, New Jersey",
    "Glendale, Arizona",
    "Buffalo, New York",
    "Fremont, California",
    "Irving, Texas",
    "Garland, Texas",
    "Paradise, Nevada",
    "Arlington, Virginia",
    "Richmond, Virginia",
    "Hialeah, Florida",
    "Boise, Idaho",
    "Frisco, Texas",
    "Moreno Valley, California",
    "Tacoma, Washington",
    "Fontana, California",
    "San Bernardino, California",
    "McKinney, Texas",
    "Santa Clarita, California",
    "Des Moines, Iowa",
    "Oxnard, California",
    "Birmingham, Alabama",
    "Spring Valley, Nevada",
    "Rochester, New York",
    "Tempe, Arizona",
    "Yonkers, New York",
    "Overland Park, Kansas",
    "Salt Lake City, Utah",
    "Huntington Beach, California",
    "Glendale, California",
    "Grand Prairie, Texas",
    "Aurora, Illinois",
    "Sunrise Manor, Nevada",
    "Ontario, California",
    "Knoxville, Tennessee",
    "Vancouver, Washington",
    "Worcester, Massachusetts",
    "Chattanooga, Tennessee",
    "Peoria, Arizona",
    "Fort Lauderdale, Florida",
    "Providence, Rhode Island",
    "Elk Grove, California",
    "Rancho Cucamonga, California",
    "Pembroke Pines, Florida",
    "Santa Rosa, California",
    "Eugene, Oregon",
    "Cary, North Carolina",
    "Fort Collins, Colorado",
    "Corona, California",
    "Enterprise, Nevada",
    "Garden Grove, California",
    "Lakewood, Colorado",
    "Alexandria, Virginia",
    "Hayward, California",
    "Hollywood, Florida",
    "Kansas City, Kansas",
    "Palmdale, California",
    "Sunnyvale, California",
    "Pomona, California",
    "Bellevue, Washington",
    "Surprise, Arizona",
    "Naperville, Illinois",
    "Pasadena, Texas",
    "Denton, Texas",
    "Joliet, Illinois",
    "Thornton, Colorado",
    "Paterson, New Jersey",
    "Carrollton, Texas",
    "Miramar, Florida",
    "Round Rock, Texas",
    "Metairie, Louisiana",
    "Olathe, Kansas",
]

# get city data
def get_city_data():
    # list of aggregrate city data
    cities_data = []
    # generate unique id for each city for our sql database
    id = 0
    base_url = "https://api.teleport.org/api/cities/?search="
    for city in top_cities_by_population:
        search_city_url = base_url + city
        r = requests.get(search_city_url).json()
        body = r["_embedded"]["city:search-results"][0]
        # get general city data
        city_data_general_link = body["_links"]["city:item"]["href"]
        city_data_general = requests.get(city_data_general_link).json()
        # construct city object with customized city data
        city_obj = {
            "id": id,
            "name": city_data_general["name"],
            "full_name": city_data_general["full_name"],
            "population": city_data_general["population"],
            "latitude": city_data_general["location"]["latlon"]["latitude"],
            "longitude": city_data_general["location"]["latlon"]["longitude"],
            "state": city_data_general["_links"]["city:admin1_division"]["name"],
            "timezone": city_data_general["_links"]["city:timezone"]["name"],
        }
        # get urban area city data - mayor, link to images, link to quality of life scores, link to salaries
        city_data_urban_link = city_data_general["_links"]["city:urban_area"]["href"]
        city_data_urban = requests.get(city_data_urban_link).json()
        # get city mayor
        # city_obj["mayor"] = city_data_urban["mayor"]
        city_data_urban_image_link = city_data_urban["_links"]["ua:images"]["href"]
        city_data_urban_scores_link = city_data_urban["_links"]["ua:scores"]["href"]
        city_data_image = requests.get(city_data_urban_image_link).json()
        # get city images = web + mobile
        city_obj["images"] = city_data_image["photos"][0]["image"]
        # get city urban quality of life category scores, add to city data object
        city_data_urban_scores = requests.get(city_data_urban_scores_link).json()
        for category in city_data_urban_scores["categories"]:
            city_obj[category["name"]] = category["score_out_of_10"]

        id += 1
        cities_data.append(city_obj)

    f_cities = open(
        "/Users/aouyang/Downloads/College/2020-21/Spring-2021/CS-373/cultured-foodies/backend/data/cities_data.json",
        "w",
    )
    json.dump(cities_data, f_cities)


# get the cityID for each city   ZOMATO
def zomato_cityid():
    base_url = "https://developers.zomato.com/api/v2.1/locations?query="
    headers = {"user-key": "612a084253c196424b159e02fcd54569"}
    city_dict = {}
    import pdb

    # pdb.set_trace()
    for city_name in top_cities_by_population:
        url = base_url + city_name
        r = requests.request("GET", url, headers=headers).json()
        city_dict[city_name] = r["location_suggestions"]

    print(city_dict)
    f_cities = open(
        "/Users/aouyang/Downloads/College/2020-21/Spring-2021/CS-373/cultured-foodies/backend/data/cities_zomato_id.json",
        "w",
    )
    json.dump(city_dict, f_cities)


# get all the cities in restaurant.json


def ping_request(url):
    r = None

    while r is None:
        try:
            # get
            r = requests.get(url).json()
        except:
            pass
    return r


def get_zomato_cities_in_restaurant_file():
    f = open("all_restaurants.json", "r")
    data = json.load(f, encoding="utf8")
    count = 0
    city_state = set()
    list_restaurants = []
    url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=formatted_address&key=AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8&input="

    restaurant_list = []
    count = 0

    for restaurant in data[0:]:
        print(restaurant["name"])
        restaurant_address = restaurant["location"]["address"]
        restaurant_city = restaurant["location"]["city"]
        print(restaurant_city)
        if restaurant_city not in restaurant_address:
            restaurant_address += " , " + restaurant_city
        req_url = url + restaurant_address

        res = ping_request(req_url)
        if len(res["candidates"]) == 0:
            print("THIS HAS TO BE HARDCODED", restaurant_address)
            continue
        formatted_address = res["candidates"][0]["formatted_address"]
        parts = formatted_address.split(", ")
        state_abbrev = parts[2].split(" ")[0]
        restaurant["location"]["address"] = formatted_address
        restaurant["location"]["state_abbrev"] = state_abbrev
        city_state.add(restaurant_city + ", " + state_abbrev)
        restaurant_list.append(restaurant)
        if count % 20 == 0:
            f = open("all_restaurants_better_address" + str(count) + ".json", "w")
            json.dump(restaurant_list, f)
        count += 1
        print("count", count)
    f = open("all_restaurants_better_address.json", "w")
    json.dump(restaurant_list, f)
    print(city_state)


"""
{'Danville, California', 'Palo Alto, California', 'Alameda, California', 'Saratoga, California', 'Corona, South Dakota', 'Los Gatos, California', 'Fremont, California', 'Albany, California', 'Denton, Texas', 'New York City, New York', 'Mountain View, California', 'Alvarado, Texas', 'Campbell, California', 'Castro Valley, California', 'Houston, Texas', 'Florida Keys, Florida', 'Nashville, Tennessee', 'Reidsville, Georgia', 'Statesboro, Georgia', 'Mc Cormick, South Carolina', 'Menlo Park, California', 'Oakland, California', 'Pittsburgh, Pennsylvania', 'Cincinnati, Kentucky', 'Hillsboro, Texas', 'Cleburne, Texas', 'Tampa Bay, Florida', 'Dublin, California', 'Palmdale, California', 'Oklahoma City, Oklahoma', 'Sweet Home, Oregon', 'San Jose, California', 'Hinesville, Georgia', 'Redwood City, California', 'Providence, Rhode Island', 'Sunnyvale, California', 'Milbank, South Dakota', 'Jacksonville, Florida', 'San Francisco, California', 'Eugene, Oregon', 'Whitney, Texas', 'Hoboken, New Jersey', 'Hayward, California', 'Santa Clara, California', 'Pleasanton, California', 'Belmont, California', 'Cincinnati, Ohio', 'Colorado Springs, Colorado', 'Orlando, Florida', 'San Leandro, California', 'Greensboro, Georgia', 'Fort Myers, Florida', 'Cleveland, Ohio'}


"""

""" handle restaurants that don't have a zipcode"""

get_zomato_cities_in_restaurant_file()