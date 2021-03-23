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
    "Florida Keys, FL",
    "Buffalo, NY",
    "Eugene, OR",
    "Aurora, OR",
    "Elberton, GA",
    "Carlton, OR",
    "Anchorage, AK",
    "Irving, TX",
    "Grasonville, MD",
    "Colorado Springs, CO",
    "Scottsdale, AZ",
    "Glennville, GA",
    "Palmdale, CA",
    "Washington DC, MD",
    "Albert Lea, MN",
    "Ontario, OR",
    "Duncanville/DeSoto, TX",
    "Penngrove, CA",
    "Birmingham, AL",
    "Hurst, TX",
    "Harmony, MN",
    "Phoenix, AZ",
    "Pembroke, GA",
    "Alvarado, TX",
    "Hayward, CA",
    "Tempe, TX",
    "Peoria, IL",
    "Carlin, NV",
    "Tilghman, MD",
    "Dublin, CA",
    "Seaford, DE",
    "Baltimore, MD",
    "Mesa, TX",
    "Georgetown, TX",
    "Kent, WA",
    "Redmond, WA",
    "Rest of Hawaii, HI",
    "Cedar Park, TX",
    "Odessa, MN",
    "Burbank, CA",
    "Paradise, MI",
    "Claxton, GA",
    "Los Angeles, TX",
    "Occidental, CA",
    "Las Vegas, NV",
    "Bedford, TX",
    "San Antonio, TX",
    "Rio Nido, CA",
    "La Verne, CA",
    "Rochester, NY",
    "Salt Lake City, UT",
    "Fort Worth, TX",
    "Lake Dallas, TX",
    "Grand Prairie, TX",
    "Vashon, WA",
    "Henderson, KY",
    "Corona, SD",
    "Rochester, IN",
    "Elysian, MN",
    "Duncan Mills, CA",
    "Sebree, KY",
    "Spring Creek, NV",
    "Diamond Bar, CA",
    "Ontario, TX",
    "Indianapolis, IN",
    "Federalsburg, MD",
    "Sumner, WA",
    "San Jose, TX",
    "Campbell, CA",
    "Mesa, AZ",
    "Round Rock, TX",
    "Arlington, TX",
    "Tualatin, OR",
    "Hillsboro, TX",
    "Cleburne, TX",
    "Crawfordville, GA",
    "Mc Cormick, SC",
    "Santa Maria, CA",
    "New York City, NY",
    "Scottsdale, TX",
    "Anna, TX",
    "Healdsburg, CA",
    "Newark, NJ",
    "Sisseton, SD",
    "Milbank, SD",
    "Houston, TX",
    "Albuquerque, NM",
    "Monte Rio, CA",
    "Jersey City, NJ",
    "Glendale, CA",
    "Washington, GA",
    "Kansas City, Kansas, KS",
    "Whitney, TX",
    "Calistoga, CA",
    "Nashville, TN",
    "Adams, MN",
    "Boise, ID",
    "San Francisco, CA",
    "Knoxville, TN",
    "Miami, FL",
    "Camas, WA",
    "North Richland Hills/Richland , TX",
    "Fort Scott, KS",
    "Sacramento, CA",
    "Allen, TX",
    "Plano, TX",
    "Felton, DE",
    "Bellevue, WA",
    "Canton, MN",
    "Bee Cave, TX",
    "Reidsville, GA",
    "Inland Empire, CA",
    "Alexandria, VA",
    "Lynwood, CA",
    "Colleyville, TX",
    "Euless, TX",
    "Elsberry, MO",
    "Metter, GA",
    "Dallas, TX",
    "Columbus, OH",
    "Santa Clarita, CA",
    "Gilbert, TX",
    "Warrenton, GA",
    "Claremont, CA",
    "Tukwila, WA",
    "Wilsonville, OR",
    "Cresco, IA",
    "Dundee, OR",
    "Southlake, TX",
    "Owensboro, KY",
    "San Leandro, CA",
    "Tigard, OR",
    "Seattle, WA",
    "Cleveland, OH",
    "Jenner, CA",
    "San Jose, CA",
    "Milwaukee, WI",
    "Richmond, VA",
    "Rest of Hawaii, TX",
    "Canby, OR",
    "Portland, OR",
    "Austin, MN",
    "Redwood City, CA",
    "Detroit, MI",
    "Milford, DE",
    "Manhattan Beach, CA",
    "Chattanooga, TN",
    "Ortonville, MN",
    "Los Gatos, CA",
    "Pleasanton, CA",
    "Valley Ford, CA",
    "Chandler, AZ",
    "Mankato, MN",
    "Austin, TX",
    "Arlington, VA",
    "Grapevine, TX",
    "Anchorage, TX",
    "Cincinnati, OH",
    "Clarksville, MO",
    "Lakewood, CA",
    "Arlington County, VA",
    "Fort Myers, TX",
    "Preston, MN",
    "Newberry, MI",
    "Atlanta, GA",
    "Oklahoma City, OK",
    "Worcester, MA",
    "Cerritos, CA",
    "Rochester, TX",
    "Hardin, IL",
    "Oakland, CA",
    "Cambridge, MD",
    "Smyrna, DE",
    "Providence, RI",
    "Los Angeles, CA",
    "New Orleans, LA",
    "Rohnert Park, CA",
    "Gilbert, AZ",
    "Vancouver, WA",
    "St. Louis, MO",
    "Petaluma, CA",
    "Sonoma, CA",
    "Huntington Park, CA",
    "Evansville, IN",
    "Saratoga, CA",
    "Cincinnati, KY",
    "Oregon City, OR",
    "Alhambra, CA",
    "Fort Myers, FL",
    "Sebastopol, CA",
    "Kansas City, KS",
    "Sherwood, OR",
    "Ontario, ON",
    "Santa Clara, CA",
    "Blue Earth, MN",
    "Castro Valley, CA",
    "Windsor, CA",
    "Lanesboro, MN",
    "Memphis, TN",
    "San Anselmo, CA",
    "Rowlett, TX",
    "Tehachapi, CA",
    "Forestville, CA",
    "Greenwood, DE",
    "Statesboro, GA",
    "Fife, WA",
    "Omaha, NE",
    "Whittier, CA",
    "Salt Lake City, WI",
    "Cedar Hill, TX",
    "McKinney, TX",
    "Palmdale, TX",
    "Gunter, TX",
    "Mansfield, TX",
    "Salt Lake City, IL",
    "Passaic, NJ",
    "Boston, MA",
    "Midlothian, TX",
    "Salt Lake City, TX",
    "Sunnyvale, CA",
    "Nevada, MO",
    "Pittsfield, IL",
    "Woodland Park, NJ",
    "Spring Valley, MN",
    "Joseph, OR",
    "Long Beach, CA",
    "Jacksonville, FL",
    "Lake Oswego, OR",
    "Tomales, CA",
    "Hinesville, GA",
    "Novato, CA",
    "Menlo Park, CA",
    "Elko, NV",
    "Denver, CO",
    "Rancho Palos Verdes, CA",
    "Easton, MD",
    "Guerneville, CA",
    "Mountain View, CA",
    "Lincolnton, GA",
    "Palo Alto, CA",
    "Cotati, CA",
    "Murphy, TX",
    "Geyserville, CA",
    "Pflugerville, TX",
    "Santa Clarita, TX",
    "Wallowa, OR",
    "Memphis, MS",
    "Lancaster, TX",
    "West Linn, OR",
    "Graceville, MN",
    "Frisco, TX",
    "Pittsburgh, PA",
    "Rochester, MN",
    "Hermosa Beach, CA",
    "Peoria, TX",
    "Tempe, AZ",
    "Lancaster, California, CA",
    "Rockwall, TX",
    "Torrance, CA",
    "Laurel, DE",
    "Louisville, KY",
    "Washington DC, DC",
    "Frederica, DE",
    "Barry, IL",
    "San Diego, CA",
    "Louisiana, MO",
    "Mankato, CA",
    "Washougal, WA",
    "Bodega Bay, CA",
    "Lakeway, TX",
    "Charlotte, NC",
    "Memphis, TX",
    "Redondo Beach, CA",
    "Richardson, TX",
    "Fremont, CA",
    "Surprise, AZ",
    "Tacoma, WA",
    "Pasadena, CA",
    "Dover, DE",
    "Albany, CA",
    "Madison, WI",
    "Glendale, TX",
    "Minnesota Lake, MN",
    "Harrington, DE",
    "Alameda, CA",
    "Enterprise, OR",
    "Parma, ID",
    "Vancouver, BC",
    "Orange County, CA",
    "Chicago, IL",
    "Paterson, NJ",
    "Hannibal, MO",
    "Carrollton, TX",
    "Charlotte, TX",
    "Orlando, FL",
    "Camden-Wyoming, DE",
    "Belmont, CA",
    "Sweet Home, OR",
    "Clackamas, OR",
    "Danville, CA",
    "Santa Rosa, CA",
    "Kenwood, CA",
    "Tampa, FL",
    "Georgetown, DE",
    "Stockton, CA",
    "Summit, SD",
    "Graton, CA",
    "Garland, TX",
    "Des Moines, IA",
    "Wylie, TX",
    "Agoura Hills, CA",
    "Lewisville/Flower Mound, TX",
    "Santa Clarita, IL",
    "Philadelphia, PA",
    "Glendale, AZ",
    "Greensboro, GA",
    "Boron, CA",
    "Denton, TX",
    "Peoria, AZ",
    "Emeryville, CA",
    "Nashville, TX",
    "Waseca, MN",
    "Lafayette, OR",
    "Denton, MD",
    "Covina, CA",
    "Lakewood, WA",
    "Phoenix, TX",
    "Lamar, MO",
    "St Michaels, MD",
    "Pomona, CA",
    "California City, CA",
    "Petersburg, AK",
    "Kansas City, Missouri, MO",
}

# These are the valid cities from the scraped restaurants.
"""
TODO:
1. Filter restaurants by valid cities
2. Make sure that the filtered restaurants still have at least a 100 cuisines 
"""
valid_cities = {
    "Cincinnati, OH",
    "Alhambra, CA",
    "Penngrove, CA",
    "Washington DC, DC",
    "Washougal, WA",
    "Wilsonville, OR",
    "Seattle, WA",
    "Alvarado, TX",
    "Santa Clara, CA",
    "Carlton, OR",
    "Jacksonville, FL",
    "Indianapolis, IN",
    "Mesa, AZ",
    "Dublin, CA",
    "Phoenix, AZ",
    "Tualatin, OR",
    "Long Beach, CA",
    "Palmdale, CA",
    "Graton, CA",
    "Oklahoma City, OK",
    "Richardson, TX",
    "McKinney, TX",
    "Rowlett, TX",
    "Omaha, NE",
    "New York City, NY",
    "Tukwila, WA",
    "Castro Valley, CA",
    "Mountain View, CA",
    "Agoura Hills, CA",
    "Sacramento, CA",
    "Tampa, FL",
    "Kent, WA",
    "Lynwood, CA",
    "Pflugerville, TX",
    "Whittier, CA",
    "Allen, TX",
    "Chattanooga, TN",
    "Providence, RI",
    "Cedar Hill, TX",
    "Nashville, TN",
    "Hayward, CA",
    "Boston, MA",
    "Memphis, TN",
    "Los Gatos, CA",
    "Baltimore, MD",
    "Hermosa Beach, CA",
    "Redmond, WA",
    "Milford, DE",
    "Georgetown, TX",
    "Philadelphia, PA",
    "Mansfield, TX",
    "Manhattan Beach, CA",
    "Paterson, NJ",
    "Sonoma, CA",
    "Portland, OR",
    "Arlington, VA",
    "Rancho Palos Verdes, CA",
    "Pasadena, CA",
    "Pembroke, GA",
    "Kansas City, KS",
    "Danville, CA",
    "Occidental, CA",
    "Calistoga, CA",
    "Santa Rosa, CA",
    "Sumner, WA",
    "Redondo Beach, CA",
    "Diamond Bar, CA",
    "Midlothian, TX",
    "Alexandria, VA",
    "Jersey City, NJ",
    "Las Vegas, NV",
    "Lake Dallas, TX",
    "Austin, TX",
    "Worcester, MA",
    "Greenwood, DE",
    "Canby, OR",
    "New Orleans, LA",
    "Salt Lake City, UT",
    "Hurst, TX",
    "Fremont, CA",
    "Scottsdale, AZ",
    "Vashon, WA",
    "Menlo Park, CA",
    "Round Rock, TX",
    "Saratoga, CA",
    "Irving, TX",
    "San Anselmo, CA",
    "Novato, CA",
    "Anna, TX",
    "Albany, CA",
    "Enterprise, OR",
    "Carrollton, TX",
    "Laurel, DE",
    "Torrance, CA",
    "Frisco, TX",
    "Anchorage, AK",
    "Bellevue, WA",
    "Oakland, CA",
    "Monte Rio, CA",
    "Harrington, DE",
    "Orlando, FL",
    "Claremont, CA",
    "Dallas, TX",
    "Peoria, AZ",
    "Cleburne, TX",
    "Los Angeles, CA",
    "Tempe, AZ",
    "Bedford, TX",
    "Gilbert, AZ",
    "St. Louis, MO",
    "Stockton, CA",
    "Chandler, AZ",
    "Newark, NJ",
    "Pleasanton, CA",
    "Grand Prairie, TX",
    "Des Moines, IA",
    "Atlanta, GA",
    "Murphy, TX",
    "Belmont, CA",
    "Windsor, CA",
    "Ontario, OR",
    "Petaluma, CA",
    "Lakewood, CA",
    "Guerneville, CA",
    "San Jose, CA",
    "Felton, DE",
    "Birmingham, AL",
    "Cleveland, OH",
    "Milwaukee, WI",
    "Fife, WA",
    "Plano, TX",
    "San Diego, CA",
    "Tigard, OR",
    "Detroit, MI",
    "Glendale, CA",
    "Lake Oswego, OR",
    "Emeryville, CA",
    "Eugene, OR",
    "West Linn, OR",
    "Southlake, TX",
    "Rohnert Park, CA",
    "Glendale, AZ",
    "Smyrna, DE",
    "Oregon City, OR",
    "Camas, WA",
    "Fort Worth, TX",
    "Tacoma, WA",
    "Buffalo, NY",
    "Euless, TX",
    "Redwood City, CA",
    "Vancouver, WA",
    "Rochester, NY",
    "Pittsburgh, PA",
    "Colorado Springs, CO",
    "Denver, CO",
    "Aurora, OR",
    "La Verne, CA",
    "Bodega Bay, CA",
    "Rockwall, TX",
    "Sebastopol, CA",
    "Miami, FL",
    "Wylie, TX",
    "Pomona, CA",
    "Arlington, TX",
    "Boise, ID",
    "San Leandro, CA",
    "Knoxville, TN",
    "Campbell, CA",
    "Surprise, AZ",
    "Garland, TX",
    "Denton, TX",
    "Lakewood, WA",
    "Santa Clarita, CA",
    "Lancaster, TX",
    "Alameda, CA",
    "Richmond, VA",
    "Chicago, IL",
    "Columbus, OH",
    "Colleyville, TX",
    "Cotati, CA",
    "Passaic, NJ",
    "Rochester, IN",
    "Kenwood, CA",
    "Albuquerque, NM",
    "Sherwood, OR",
    "Palo Alto, CA",
    "Houston, TX",
    "Charlotte, NC",
    "San Antonio, TX",
    "Bee Cave, TX",
    "Sunnyvale, CA",
    "San Francisco, CA",
    "Vancouver, BC",
    "Cerritos, CA",
    "Louisville, KY",
    "Woodland Park, NJ",
    "Lakeway, TX",
    "Grapevine, TX",
    "Madison, WI",
    "Huntington Park, CA",
    "Burbank, CA",
    "Clackamas, OR",
    "Santa Maria, CA",
    "Covina, CA",
    "Cedar Park, TX",
    "Healdsburg, CA",
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
    f = open("final_all_valid_restaurants.json")
    restaurants = json.load(f)

    print("valid num restaurants: ", len(restaurants))

    for restaurant in restaurants:
        city = (
            restaurant["location"]["city"]
            + ", "
            + restaurant["location"]["state_abbrev"]
        )
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


def get_valid_restaurants_from_valid_cities():
    f = open("final_all_restaurants.json", "r")
    restaurants = json.load(f, encoding="utf8")

    valid_restaurants = []
    for restaurant in restaurants:
        city = (
            restaurant["location"]["city"]
            + ", "
            + restaurant["location"]["state_abbrev"]
        )
        if city in valid_cities:
            valid_restaurants.append(restaurant)

    f = open("final_valid_restaurants.json", "w")
    json.dump(valid_restaurants, f)


# get_zomato_cities_in_restaurant_file()
# get_diff_on_restaurants()
# get_cities_from_restaurants()
# get_valid_cities()
check_if_we_have_enough_cuisines_dammit()
# get_valid_restaurants_from_valid_cities()
