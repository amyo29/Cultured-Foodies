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

new_cities = {
    "Columbus, OH",
    "Canby, OR",
    "Novato, CA",
    "Rest of Hawaii, HI",
    "Wallowa, OR",
    "Monte Rio, CA",
    "Torrance, CA",
    "Denton, TX",
    "Lynwood, CA",
    "Gilbert, TX",
    "Dublin, CA",
    "Waseca, MN",
    "San Leandro, CA",
    "Eugene, OR",
    "Lakewood, WA",
    "Tomales, CA",
    "Parma, ID",
    "Santa Clara, CA",
    "Lake Oswego, OR",
    "Tempe, TX",
    "Louisiana, MO",
    "Penngrove, CA",
    "Felton, DE",
    "Camas, WA",
    "Duncan Mills, CA",
    "Hurst, TX",
    "Florida Keys, FL",
    "Claremont, CA",
    "Philadelphia, PA",
    "Woodland Park, NJ",
    "Joseph, OR",
    "Rochester, NY",
    "Cerritos, CA",
    "Tualatin, OR",
    "Hannibal, MO",
    "Albuquerque, NM",
    "Santa Rosa, CA",
    "Albert Lea, MN",
    "Henderson, KY",
    "Palmdale, TX",
    "Georgetown, TX",
    "Sumner, WA",
    "San Francisco, CA",
    "Graton, CA",
    "Elberton, GA",
    "Cotati, CA",
    "St. Louis, MO",
    "Ortonville, MN",
    "Madison, WI",
    "Louisville, KY",
    "Rancho Palos Verdes, CA",
    "Covina, CA",
    "Plano, TX",
    "Anchorage, TX",
    "Lewisville/Flower Mound, TX",
    "Corona, SD",
    "Mesa, TX",
    "Pittsburgh, PA",
    "Nevada, MO",
    "Jersey City, NJ",
    "Elko, NV",
    "Midlothian, TX",
    "Windsor, CA",
    "Wylie, TX",
    "Easton, MD",
    "Georgetown, DE",
    "Baltimore, MD",
    "Clackamas, OR",
    "Hayward, CA",
    "Rio Nido, CA",
    "Glendale, TX",
    "Peoria, AZ",
    "Scottsdale, TX",
    "La Verne, CA",
    "Salt Lake City, TX",
    "Sebastopol, CA",
    "Alameda, CA",
    "Memphis, TX",
    "Cedar Hill, TX",
    "New York City, NY",
    "Guerneville, CA",
    "Redmond, WA",
    "Occidental, CA",
    "Sherwood, OR",
    "Arlington County, VA",
    "Forestville, CA",
    "Carrollton, TX",
    "Omaha, NE",
    "Allen, TX",
    "Chicago, IL",
    "Greensboro, GA",
    "Saratoga, CA",
    "Dallas, TX",
    "Agoura Hills, CA",
    "West Linn, OR",
    "Bodega Bay, CA",
    "Petaluma, CA",
    "Bellevue, WA",
    "Rest of Hawaii, TX",
    "Canton, MN",
    "Fremont, CA",
    "Vancouver, BC",
    "Gunter, TX",
    "Elsberry, MO",
    "Kent, WA",
    "Evansville, IN",
    "Lanesboro, MN",
    "Las Vegas, NV",
    "Sacramento, CA",
    "Redondo Beach, CA",
    "Houston, TX",
    "Smyrna, DE",
    "Frisco, TX",
    "Irving, TX",
    "Lancaster, TX",
    "Lancaster, California, CA",
    "Rochester, MN",
    "Inland Empire, CA",
    "Long Beach, CA",
    "Huntington Park, CA",
    "Glendale, CA",
    "Lakeway, TX",
    "Oregon City, OR",
    "Emeryville, CA",
    "Sonoma, CA",
    "Washougal, WA",
    "Cedar Park, TX",
    "Sunnyvale, CA",
    "Birmingham, AL",
    "Dundee, OR",
    "Ontario, ON",
    "Orange County, CA",
    "San Antonio, TX",
    "Peoria, IL",
    "Graceville, MN",
    "Cincinnati, OH",
    "Hermosa Beach, CA",
    "North Richland Hills/Richland , TX",
    "Richmond, VA",
    "Arlington, VA",
    "Milbank, SD",
    "Euless, TX",
    "Sebree, KY",
    "Carlin, NV",
    "Burbank, CA",
    "Ontario, OR",
    "Denton, MD",
    "San Anselmo, CA",
    "Harmony, MN",
    "Seaford, DE",
    "St Michaels, MD",
    "Adams, MN",
    "Des Moines, IA",
    "Tigard, OR",
    "Dover, DE",
    "Grapevine, TX",
    "Los Gatos, CA",
    "Hinesville, GA",
    "Chandler, AZ",
    "Hillsboro, TX",
    "Manhattan Beach, CA",
    "Crawfordville, GA",
    "Lincolnton, GA",
    "Grasonville, MD",
    "Ontario, TX",
    "Boston, MA",
    "Diamond Bar, CA",
    "Bedford, TX",
    "Pflugerville, TX",
    "San Jose, CA",
    "Lake Dallas, TX",
    "Austin, MN",
    "Spring Creek, NV",
    "Atlanta, GA",
    "Peoria, TX",
    "Federalsburg, MD",
    "Nashville, TN",
    "Newark, NJ",
    "Kenwood, CA",
    "Los Angeles, TX",
    "Calistoga, CA",
    "Hardin, IL",
    "Mountain View, CA",
    "Sisseton, SD",
    "Mankato, CA",
    "Oklahoma City, OK",
    "Denver, CO",
    "Buffalo, NY",
    "Whitney, TX",
    "Tempe, AZ",
    "Mesa, AZ",
    "Chattanooga, TN",
    "Colleyville, TX",
    "Mc Cormick, SC",
    "Wilsonville, OR",
    "Summit, SD",
    "Owensboro, KY",
    "Whittier, CA",
    "Paterson, NJ",
    "Mankato, MN",
    "Worcester, MA",
    "Scottsdale, AZ",
    "Claxton, GA",
    "Fort Scott, KS",
    "San Jose, TX",
    "Lamar, MO",
    "Cleveland, OH",
    "Tehachapi, CA",
    "Duncanville/DeSoto, TX",
    "Miami, FL",
    "Tilghman, MD",
    "Fort Myers, FL",
    "Preston, MN",
    "Blue Earth, MN",
    "Boron, CA",
    "Anna, TX",
    "Washington DC, DC",
    "Round Rock, TX",
    "Cincinnati, KY",
    "Los Angeles, CA",
    "Belmont, CA",
    "Camden-Wyoming, DE",
    "Minnesota Lake, MN",
    "Frederica, DE",
    "Santa Clarita, TX",
    "Tampa Bay, FL",
    "Laurel, DE",
    "Surprise, AZ",
    "Lakewood, CA",
    "Kansas City, Kansas, KS",
    "Reidsville, GA",
    "Paradise, MI",
    "Milwaukee, WI",
    "New Orleans, LA",
    "Barry, IL",
    "Southlake, TX",
    "Oakland, CA",
    "Enterprise, OR",
    "Newberry, MI",
    "McKinney, TX",
    "Pittsfield, IL",
    "Jenner, CA",
    "Bee Cave, TX",
    "Danville, CA",
    "Castro Valley, CA",
    "Cresco, IA",
    "Austin, TX",
    "Phoenix, AZ",
    "Palo Alto, CA",
    "Orlando, FL",
    "Kansas City, Missouri, MO",
    "Fort Worth, TX",
    "Knoxville, TN",
    "Fort Myers, TX",
    "Providence, RI",
    "Alhambra, CA",
    "Palmdale, CA",
    "Vancouver, WA",
    "Redwood City, CA",
    "Spring Valley, MN",
    "Charlotte, NC",
    "Santa Clarita, CA",
    "Seattle, WA",
    "Salt Lake City, IL",
    "Garland, TX",
    "Pasadena, CA",
    "Warrenton, GA",
    "Glendale, AZ",
    "Washington, GA",
    "Pleasanton, CA",
    "Santa Clarita, IL",
    "Campbell, CA",
    "Rohnert Park, CA",
    "Statesboro, GA",
    "Charlotte, TX",
    "Alexandria, VA",
    "Jacksonville, FL",
    "Cleburne, TX",
    "Fife, WA",
    "Milford, DE",
    "Portland, OR",
    "Memphis, MS",
    "Memphis, TN",
    "Elysian, MN",
    "Odessa, MN",
    "Vashon, WA",
    "Stockton, CA",
    "Pembroke, GA",
    "Rowlett, TX",
    "Anchorage, AK",
    "Indianapolis, IN",
    "Colorado Springs, CO",
    "Clarksville, MO",
    "Tukwila, WA",
    "Mansfield, TX",
    "Santa Maria, CA",
    "Pomona, CA",
    "Healdsburg, CA",
    "Salt Lake City, WI",
    "Metter, GA",
    "Tacoma, WA",
    "San Diego, CA",
    "California City, CA",
    "Gilbert, AZ",
    "Petersburg, AK",
    "Rockwall, TX",
    "Greenwood, DE",
    "Cambridge, MD",
    "Nashville, TX",
    "Albany, CA",
    "Detroit, MI",
    "Boise, ID",
    "Geyserville, CA",
    "Grand Prairie, TX",
    "Passaic, NJ",
    "Sweet Home, OR",
    "Rochester, TX",
    "Richardson, TX",
    "Alvarado, TX",
    "Washington DC, MD",
    "Murphy, TX",
    "Phoenix, TX",
    "Harrington, DE",
    "Menlo Park, CA",
    "Lafayette, OR",
    "Carlton, OR",
    "Salt Lake City, UT",
    "Rochester, IN",
    "Aurora, OR",
    "Glennville, GA",
    "Valley Ford, CA",
    "Arlington, TX",
}

# These are the valid cities from the scraped restaurants.
"""
TODO:
1. Filter restaurants by valid cities
2. Make sure that the filtered restaurants still have at least a 100 cuisines 
"""
valid_cities = {
    "St. Louis, MO",
    "Oklahoma City, OK",
    "Windsor, CA",
    "Plano, TX",
    "Pleasanton, CA",
    "Houston, TX",
    "Bodega Bay, CA",
    "Fife, WA",
    "Laurel, DE",
    "San Anselmo, CA",
    "Tualatin, OR",
    "La Verne, CA",
    "Smyrna, DE",
    "Seattle, WA",
    "Anna, TX",
    "Alameda, CA",
    "Miami, FL",
    "Boise, ID",
    "Phoenix, AZ",
    "Pflugerville, TX",
    "Hayward, CA",
    "Surprise, AZ",
    "Alhambra, CA",
    "Madison, WI",
    "Santa Maria, CA",
    "Chattanooga, TN",
    "Colleyville, TX",
    "Los Gatos, CA",
    "Peoria, AZ",
    "Harrington, DE",
    "Las Vegas, NV",
    "Baltimore, MD",
    "Detroit, MI",
    "Omaha, NE",
    "Felton, DE",
    "New York City, NY",
    "Vashon, WA",
    "Carlton, OR",
    "Cotati, CA",
    "Santa Rosa, CA",
    "Southlake, TX",
    "Nashville, TN",
    "Penngrove, CA",
    "Columbus, OH",
    "Mountain View, CA",
    "San Diego, CA",
    "Glendale, CA",
    "Greenwood, DE",
    "Lakeway, TX",
    "San Francisco, CA",
    "Sherwood, OR",
    "Novato, CA",
    "Austin, TX",
    "Murphy, TX",
    "Kent, WA",
    "Mesa, AZ",
    "Bee Cave, TX",
    "Cerritos, CA",
    "Arlington, VA",
    "Petaluma, CA",
    "Irving, TX",
    "Manhattan Beach, CA",
    "Cedar Park, TX",
    "Chandler, AZ",
    "Pomona, CA",
    "New Orleans, LA",
    "Grapevine, TX",
    "Alvarado, TX",
    "Torrance, CA",
    "Lancaster, TX",
    "Milwaukee, WI",
    "Danville, CA",
    "McKinney, TX",
    "Boston, MA",
    "Louisville, KY",
    "Healdsburg, CA",
    "Fremont, CA",
    "Pittsburgh, PA",
    "Garland, TX",
    "Hermosa Beach, CA",
    "Salt Lake City, UT",
    "Sacramento, CA",
    "Ontario, OR",
    "Portland, OR",
    "Washington DC, DC",
    "Denton, TX",
    "Grand Prairie, TX",
    "Knoxville, TN",
    "Sebastopol, CA",
    "Sonoma, CA",
    "Burbank, CA",
    "Fort Worth, TX",
    "Campbell, CA",
    "Belmont, CA",
    "Huntington Park, CA",
    "Whittier, CA",
    "Jacksonville, FL",
    "Lynwood, CA",
    "Enterprise, OR",
    "Allen, TX",
    "Birmingham, AL",
    "Chicago, IL",
    "Denver, CO",
    "Dublin, CA",
    "Redmond, WA",
    "Woodland Park, NJ",
    "Rohnert Park, CA",
    "Philadelphia, PA",
    "Midlothian, TX",
    "Hurst, TX",
    "Clackamas, OR",
    "Bellevue, WA",
    "Vancouver, BC",
    "Stockton, CA",
    "Scottsdale, AZ",
    "Claremont, CA",
    "Jersey City, NJ",
    "San Jose, CA",
    "Glendale, AZ",
    "Mansfield, TX",
    "Lakewood, CA",
    "Canby, OR",
    "Richardson, TX",
    "Anchorage, AK",
    "Eugene, OR",
    "Redwood City, CA",
    "Newark, NJ",
    "Frisco, TX",
    "Emeryville, CA",
    "Albuquerque, NM",
    "Tigard, OR",
    "Round Rock, TX",
    "Palo Alto, CA",
    "Pembroke, GA",
    "Oakland, CA",
    "West Linn, OR",
    "Washougal, WA",
    "Sunnyvale, CA",
    "Passaic, NJ",
    "Rochester, IN",
    "Lake Dallas, TX",
    "Rockwall, TX",
    "Saratoga, CA",
    "Redondo Beach, CA",
    "Wylie, TX",
    "Indianapolis, IN",
    "Wilsonville, OR",
    "Atlanta, GA",
    "Providence, RI",
    "Cleveland, OH",
    "Aurora, OR",
    "Long Beach, CA",
    "Euless, TX",
    "Orlando, FL",
    "Rochester, NY",
    "Charlotte, NC",
    "Santa Clara, CA",
    "Covina, CA",
    "Dallas, TX",
    "Carrollton, TX",
    "Kenwood, CA",
    "Menlo Park, CA",
    "Graton, CA",
    "Vancouver, WA",
    "Buffalo, NY",
    "Memphis, TN",
    "Tukwila, WA",
    "Des Moines, IA",
    "Lakewood, WA",
    "Monte Rio, CA",
    "Los Angeles, CA",
    "Camas, WA",
    "Tacoma, WA",
    "Alexandria, VA",
    "Pasadena, CA",
    "Guerneville, CA",
    "Castro Valley, CA",
    "Santa Clarita, CA",
    "Bedford, TX",
    "Cincinnati, OH",
    "Richmond, VA",
    "Arlington, TX",
    "San Antonio, TX",
    "Tempe, AZ",
    "Palmdale, CA",
    "Worcester, MA",
    "Oregon City, OR",
    "San Leandro, CA",
    "Albany, CA",
    "Sumner, WA",
    "Georgetown, TX",
    "Cedar Hill, TX",
    "Cleburne, TX",
    "Colorado Springs, CO",
    "Milford, DE",
    "Gilbert, AZ",
    "Lake Oswego, OR",
    "Paterson, NJ",
    "Occidental, CA",
    "Diamond Bar, CA",
    "Calistoga, CA",
    "Rowlett, TX",
    "Agoura Hills, CA",
    "Rancho Palos Verdes, CA",
}


def filter_restaurants_by_valid_cities():
    f = open("final_all_restaurants.json", "r")
    data = json.load(f, encoding="utf8")

    print("original num restaurants: ", len(data))

    valid_restaurants = []

    for restaurant in data:
        city_name = restaurant["location"]["city"]
        state_abbrev = restaurant["location"]["state_abbrev"]
        city_and_state = city_name + ", " + state_abbrev
        if city_and_state in valid_cities:
            valid_restaurants.append(restaurant)

    print("new num restaurants: ", len(valid_restaurants))

    f = open("final_all_restaurants_with_valid_cities.json", "w")
    json.dump(valid_restaurants, f)


def get_valid_cities():
    invalid_cities = set()
    base_url = "https://api.teleport.org/api/cities/?search="
    for city in new_cities:
        search_city_url = base_url + city
        r = requests.get(search_city_url).json()
        if len(r["_embedded"]["city:search-results"]) == 0:
            print("NO CITY-", city)
            invalid_cities.add(city)
        else:
            body = r["_embedded"]["city:search-results"][0]
            # get general city data
            city_data_general_link = body["_links"]["city:item"]["href"]
            city_data_general = requests.get(city_data_general_link).json()
            if "city:urban_area" not in city_data_general["_links"].keys():
                invalid_cities.add(city)
                print("NO URBAN- ", city)
    diff = new_cities - invalid_cities
    print(diff)
    print(len(diff))
    return diff


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
    f = open("temp_cuisines.json", "r")
    data = json.load(f, encoding="utf8")
    count = 0
    city_state = set()
    list_restaurants = []
    url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=formatted_address&key=AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8&input="

    restaurant_list = []
    count = 0

    for restaurant in data:
        print(restaurant["name"])
        restaurant_address = restaurant["location"]["address"]
        restaurant_city = restaurant["location"]["city"]
        print(restaurant_city)
        if restaurant_city not in restaurant_address:
            restaurant_address += " " + restaurant_city
        req_url = url + restaurant_address

        print("restaurant_address: ", restaurant_address)

        print("req_url", req_url)

        res = ping_request(req_url)
        print(res)
        if len(res["candidates"]) == 0:
            print("THIS HAS TO BE HARDCODED", restaurant_address)
            continue
        formatted_address = res["candidates"][0]["formatted_address"]
        parts = formatted_address.split(", ")
        state_abbrev = parts[-2].split(" ")[0]
        restaurant["location"]["address"] = formatted_address
        restaurant["location"]["state_abbrev"] = state_abbrev
        city_state.add(restaurant_city + ", " + state_abbrev)
        restaurant_list.append(restaurant)
        if count % 20 == 0:
            f = open("all_restaurants_better_address" + str(count) + ".json", "w")
            json.dump(restaurant_list, f)
        count += 1
        print("count", count)
    f = open("temp_cuisines_better_1_address.json", "w")
    json.dump(restaurant_list, f)
    print(city_state)


def get_diff_on_restaurants():
    f = open("all_restaurants.json", "r")
    old = json.load(f, encoding="utf8")
    f2 = open("all_restaurants_improved.json", "r")
    improved = json.load(f2, encoding="utf8")
    old_restaurants = set()
    improved_restaurants = set()

    for restaurant in old:
        restaurant_name = restaurant["name"]
        restaurant_phone = restaurant["phone_numbers"]
        old_restaurants.add(restaurant_name + ": " + restaurant_phone)
    for restaurant in improved:
        restaurant_name = restaurant["name"]
        restaurant_phone = restaurant["phone_numbers"]
        improved_restaurants.add(restaurant_name + ": " + restaurant_phone)
    print("Old- ", len(old_restaurants))
    print("Improved- ", len(improved_restaurants))
    diff = old_restaurants - improved_restaurants
    print("Diff - ", len(diff))
    print(diff)
    missing_restaurants = []
    # import pdb
    # pdb.set_trace()
    # temp = []
    for restaurant in diff:
        name = restaurant.split(": ")[0]
        phone = restaurant.split(": ")[1]
        for restaurant in old:
            if restaurant["name"] == name and restaurant["phone_numbers"] == phone:
                missing_restaurants.append(restaurant)
                # bef_rest = len(missing_restaurants)
                # missing_restaurants.add(name + phone)
                # aft_rest = len(missing_restaurants)
                # if(bef_rest == aft_rest):
                #     temp.append(name)
    # print("missing- ", missing_restaurants)
    print("Len of missing- ", len(missing_restaurants))
    f = open("missing_restaurants.json", "w")
    json.dump(missing_restaurants, f)

    # print("Len of temp- ", len(temp))
    # print(temp)


"""Merging the missing restaurants with the improved address restaurants"""
# f = open("all_restaurants_improved.json", "r")
# old = json.load(f, encoding="utf8")
# f2 = open("missing_restaurants_better_address.json", "r")
# improved = json.load(f2, encoding="utf8")
# final = old + improved
# f3 = open("all_improved_restaurants.json", "w")
# json.dump(final, f3)
"""
{'Danville, California', 'Palo Alto, California', 'Alameda, California', 'Saratoga, California', 'Corona, South Dakota', 'Los Gatos, California', 'Fremont, California', 'Albany, California', 'Denton, Texas', 'New York City, New York', 'Mountain View, California', 'Alvarado, Texas', 'Campbell, California', 'Castro Valley, California', 'Houston, Texas', 'Florida Keys, Florida', 'Nashville, Tennessee', 'Reidsville, Georgia', 'Statesboro, Georgia', 'Mc Cormick, South Carolina', 'Menlo Park, California', 'Oakland, California', 'Pittsburgh, Pennsylvania', 'Cincinnati, Kentucky', 'Hillsboro, Texas', 'Cleburne, Texas', 'Tampa Bay, Florida', 'Dublin, California', 'Palmdale, California', 'Oklahoma City, Oklahoma', 'Sweet Home, Oregon', 'San Jose, California', 'Hinesville, Georgia', 'Redwood City, California', 'Providence, Rhode Island', 'Sunnyvale, California', 'Milbank, South Dakota', 'Jacksonville, Florida', 'San Francisco, California', 'Eugene, Oregon', 'Whitney, Texas', 'Hoboken, New Jersey', 'Hayward, California', 'Santa Clara, California', 'Pleasanton, California', 'Belmont, California', 'Cincinnati, Ohio', 'Colorado Springs, Colorado', 'Orlando, Florida', 'San Leandro, California', 'Greensboro, Georgia', 'Fort Myers, Florida', 'Cleveland, Ohio'}

"""


def remove_duplicate_restaurants():
    f = open("all_improved_restaurants.json", "r")
    improved = json.load(f, encoding="utf8")
    new_restaurants = []
    improved_restaurants = set()
    for restaurant in improved:
        restaurant_name = restaurant["name"]
        restaurant_phone = restaurant["phone_numbers"]
        improved_restaurants.add(restaurant_name + ": " + restaurant_phone)

    for unique_rest in improved_restaurants:
        name = unique_rest.split(": ")[0]
        phone = unique_rest.split(": ")[1]
        for restaurant in improved:
            if restaurant["name"] == name and restaurant["phone_numbers"] == phone:
                new_restaurants.append(restaurant)
                break

    f = open("Final_all_improved_restaurants.json", "w")
    json.dump(new_restaurants, f)


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


def check_if_we_have_enough_cuisines_dammit():
    f = open("final_all_restaurants.json")
    restaurants = json.load(f)

    for restaurant in restaurants:
        city = (
            restaurant["location"]["city"]
            + ", "
            + restaurant["location"]["state_abbrev"]
        )
        if city in valid_cities:
            for cuisine in restaurant["cuisines"].split(", "):
                if cuisine in all_cuisines_names:
                    all_cuisines_names.pop(cuisine)

    print("remaining cuisines: ", all_cuisines_names)


def check_cities():
    f = open("final_all_restaurants.json")
    restaurants = json.load(f)

    newer_restaurants = []
    unique_citites = set()
    new_set = set()
    for restaurant in restaurants:
        if len(restaurant["location"]["state_abbrev"]) > 2:
            fixed_abbrev = restaurant["location"]["address"].split(", ")[-2]
            restaurant["location"]["state_abbrev"] = fixed_abbrev.split(" ")[0]
        unique_citites.add(
            restaurant["location"]["city"]
            + ", "
            + restaurant["location"]["state_abbrev"]
        )
        newer_restaurants.append(restaurant)

    f = open("final_all_restaurants_fixed_state_abbrev.json", "w")
    json.dump(newer_restaurants, f)


def check_address_ampersands():
    f = open("oldRestaurantFiles/all_restaurants.json", "r")
    old = json.load(f, encoding="utf8")

    count = 1
    for restaurant in old:
        address = restaurant["location"]["address"]
        if "&" in address:
            print(address)
            print("count: ", count)
            count += 1


def get_cities_from_restaurants():
    f = open("final_all_restaurants.json", "r")
    restaurants = json.load(f, encoding="utf8")

    cities = set()
    for restaurant in restaurants:
        city = (
            restaurant["location"]["city"]
            + ", "
            + restaurant["location"]["state_abbrev"]
        )
        cities.add(city)

    print(cities)
    print(len(cities))


""" handle restaurants that don't have a zipcode"""

# get_cities_from_restaurants()
# get_zomato_cities_in_restaurant_file()
# get_diff_on_restaurants()
# get_valid_cities()
check_if_we_have_enough_cuisines_dammit()
