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
    "Adams, MN",
    "Agoura Hills, CA",
    "Alameda, CA",
    "Albany, CA",
    "Albert Lea, MN",
    "Albuquerque, NM",
    "Alexandria, VA",
    "Alhambra, CA",
    "Allen, TX",
    "Alvarado, TX",
    "Anchorage, AK",
    "Anchorage, TX",
    "Anna, TX",
    "Arlington County, TX",
    "Arlington County, VA",
    "Arlington, TX",
    "Arlington, VA",
    "Atlanta, GA",
    "Aurora, OR",
    "Austin, MN",
    "Austin, TX",
    "Baltimore, MD",
    "Barry, IL",
    "Bedford, TX",
    "Bee Cave, TX",
    "Bellevue, WA",
    "Belmont, CA",
    "Birmingham, AL",
    "Blue Earth, MN",
    "Bodega Bay, CA",
    "Boise, ID",
    "Boron, CA",
    "Boston, MA",
    "Buffalo, NY",
    "Burbank, CA",
    "California City, CA",
    "Calistoga, CA",
    "Camas, WA",
    "Cambridge, MD",
    "Camden-Wyoming, DE",
    "Campbell, CA",
    "Canby, OR",
    "Canton, MN",
    "Carlin, NV",
    "Carlton, OR",
    "Carrollton, TX",
    "Castro Valley, CA",
    "Cedar Hill, TX",
    "Cedar Park, TX",
    "Cerritos, CA",
    "Chandler, AZ",
    "Charlotte, NC",
    "Charlotte, TX",
    "Chattanooga, TN",
    "Chicago, IL",
    "Cincinnati, KY",
    "Cincinnati, OH",
    "Clackamas, OR",
    "Claremont, CA",
    "Clarksville, MO",
    "Claxton, GA",
    "Cleburne, TX",
    "Cleveland, OH",
    "Colleyville, TX",
    "Colorado Springs, CO",
    "Columbus, OH",
    "Corona, SD",
    "Cotati, CA",
    "Covina, CA",
    "Crawfordville, GA",
    "Cresco, IA",
    "Dallas, TX",
    "Danville, CA",
    "Denton, MD",
    "Denton, TX",
    "Denver, CO",
    "Des Moines, IA",
    "Detroit, MI",
    "Diamond Bar, CA",
    "Dover, DE",
    "Dublin, CA",
    "Duncan Mills, CA",
    "Duncanville/DeSoto, TX",
    "Dundee, OR",
    "Easton, MD",
    "Elberton, GA",
    "Elko, NV",
    "Elsberry, MO",
    "Elysian, MN",
    "Emeryville, CA",
    "Enterprise, OR",
    "Eugene, OR",
    "Euless, TX",
    "Evansville, IN",
    "Evansville, TX",
    "Federalsburg, MD",
    "Felton, DE",
    "Fife, WA",
    "Florida Keys, FL",
    "Forestville, CA",
    "Fort Myers, FL",
    "Fort Myers, TX",
    "Fort Scott, KS",
    "Fort Worth, TX",
    "Frederica, DE",
    "Fremont, CA",
    "Frisco, TX",
    "Garland, TX",
    "Georgetown, DE",
    "Georgetown, TX",
    "Geyserville, CA",
    "Gilbert, AZ",
    "Gilbert, TX",
    "Glendale, AZ",
    "Glendale, CA",
    "Glendale, TX",
    "Glennville, GA",
    "Graceville, MN",
    "Grand Prairie, TX",
    "Grapevine, TX",
    "Grasonville, MD",
    "Graton, CA",
    "Greensboro, GA",
    "Greenwood, DE",
    "Guerneville, CA",
    "Gunter, TX",
    "Hannibal, MO",
    "Hardin, IL",
    "Harmony, MN",
    "Harrington, DE",
    "Hayward, CA",
    "Healdsburg, CA",
    "Henderson, KY",
    "Hermosa Beach, CA",
    "Hillsboro, TX",
    "Hinesville, GA",
    "Houston, TX",
    "Huntington Park, CA",
    "Hurst, TX",
    "Indianapolis, IN",
    "Inland Empire, CA",
    "Irving, TX",
    "Jacksonville, FL",
    "Jenner, CA",
    "Jersey City, NJ",
    "Joseph, OR",
    "Kansas City, Kansas, KS",
    "Kansas City, Missouri, MO",
    "Kent, WA",
    "Kenwood, CA",
    "Knoxville, TN",
    "La Verne, CA",
    "Lafayette, OR",
    "Lake Dallas, TX",
    "Lake Oswego, OR",
    "Lakeway, TX",
    "Lakewood, CA",
    "Lakewood, WA",
    "Lamar, MO",
    "Lancaster, California, CA",
    "Lancaster, TX",
    "Lanesboro, MN",
    "Las Vegas, NV",
    "Laurel, DE",
    "Lewisville/Flower Mound, TX",
    "Lincolnton, GA",
    "Long Beach, CA",
    "Long Beach, TX",
    "Los Angeles, CA",
    "Los Angeles, TX",
    "Los Gatos, CA",
    "Louisiana, MO",
    "Louisville, KY",
    "Lynwood, CA",
    "Madison, WI",
    "Manhattan Beach, CA",
    "Mankato, CA",
    "Mankato, MN",
    "Mansfield, TX",
    "Mc Cormick, SC",
    "McKinney, TX",
    "Memphis, MS",
    "Memphis, TN",
    "Memphis, TX",
    "Menlo Park, CA",
    "Mesa, AZ",
    "Mesa, TX",
    "Metter, GA",
    "Miami, FL",
    "Midlothian, TX",
    "Milbank, SD",
    "Milford, DE",
    "Milwaukee, WI",
    "Minnesota Lake, MN",
    "Monte Rio, CA",
    "Mountain View, CA",
    "Murphy, TX",
    "Nashville, TN",
    "Nashville, TX",
    "Nevada, MO",
    "New Orleans, LA",
    "New York City, NY",
    "New York City, TX",
    "Newark, NJ",
    "Newberry, MI",
    "North Richland Hills/Richland , TX",
    "Novato, CA",
    "Oakland, CA",
    "Occidental, CA",
    "Odessa, MN",
    "Oklahoma City, OK",
    "Omaha, NE",
    "Ontario, ON",
    "Ontario, OR",
    "Ontario, TX",
    "Orange County, CA",
    "Oregon City, OR",
    "Orlando, FL",
    "Ortonville, MN",
    "Owensboro, KY",
    "Palmdale, CA",
    "Palmdale, TX",
    "Palo Alto, CA",
    "Paradise, MI",
    "Parma, ID",
    "Pasadena, CA",
    "Passaic, NJ",
    "Paterson, NJ",
    "Pembroke, GA",
    "Penngrove, CA",
    "Peoria, AZ",
    "Peoria, IL",
    "Peoria, TX",
    "Petaluma, CA",
    "Petersburg, AK",
    "Pflugerville, TX",
    "Philadelphia, PA",
    "Phoenix, AZ",
    "Phoenix, TX",
    "Pittsburgh, PA",
    "Pittsfield, IL",
    "Plano, TX",
    "Pleasanton, CA",
    "Pomona, CA",
    "Portland, OR",
    "Preston, MN",
    "Providence, RI",
    "Rancho Palos Verdes, CA",
    "Redmond, WA",
    "Redondo Beach, CA",
    "Redwood City, CA",
    "Reidsville, GA",
    "Rest of Hawaii, HI",
    "Rest of Hawaii, TX",
    "Richardson, TX",
    "Richmond, VA",
    "Rio Nido, CA",
    "Rochester, IN",
    "Rochester, MN",
    "Rochester, NY",
    "Rochester, TX",
    "Rockwall, TX",
    "Rohnert Park, CA",
    "Round Rock, TX",
    "Rowlett, TX",
    "Sacramento, CA",
    "Salt Lake City, IL",
    "Salt Lake City, TX",
    "Salt Lake City, UT",
    "Salt Lake City, WI",
    "San Anselmo, CA",
    "San Antonio, TX",
    "San Diego, CA",
    "San Francisco, CA",
    "San Jose, CA",
    "San Jose, TX",
    "San Leandro, CA",
    "Santa Clara, CA",
    "Santa Clarita, CA",
    "Santa Clarita, IL",
    "Santa Clarita, TX",
    "Santa Maria, CA",
    "Santa Rosa, CA",
    "Saratoga, CA",
    "Scottsdale, AZ",
    "Scottsdale, TX",
    "Seaford, DE",
    "Seattle, WA",
    "Sebastopol, CA",
    "Sebree, KY",
    "Sherwood, OR",
    "Sisseton, SD",
    "Smyrna, DE",
    "Sonoma, CA",
    "Southlake, TX",
    "Spring Creek, NV",
    "Spring Valley, MN",
    "St Michaels, MD",
    "St. Louis, MO",
    "Statesboro, GA",
    "Stockton, CA",
    "Summit, SD",
    "Sumner, WA",
    "Sunnyvale, CA",
    "Surprise, AZ",
    "Sweet Home, OR",
    "Tacoma, WA",
    "Tampa Bay, FL",
    "Tehachapi, CA",
    "Tempe, AZ",
    "Tempe, TX",
    "Tigard, OR",
    "Tilghman, MD",
    "Tomales, CA",
    "Torrance, CA",
    "Tualatin, OR",
    "Tukwila, WA",
    "Valley Ford, CA",
    "Vancouver, BC",
    "Vancouver, WA",
    "Vashon, WA",
    "Wallowa, OR",
    "Warrenton, GA",
    "Waseca, MN",
    "Washington DC, DC",
    "Washington DC, MD",
    "Washington, GA",
    "Washougal, WA",
    "West Linn, OR",
    "Whitney, TX",
    "Whittier, CA",
    "Wilsonville, OR",
    "Windsor, CA",
    "Woodland Park, NJ",
    "Worcester, MA",
    "Wylie, TX",
}
#These are the valid cities from the scraped restaurants.
"""
TODO:
1. Filter restaurants by valid cities
2. Make sure that the filtered restaurants still have at least a 100 cuisines 
"""
valid_cities = {
    "Fremont, CA",
    "McKinney, TX",
    "New Orleans, LA",
    "Anchorage, AK",
    "Knoxville, TN",
    "Indianapolis, IN",
    "Detroit, MI",
    "Tualatin, OR",
    "Rochester, IN",
    "Sonoma, CA",
    "Arlington, VA",
    "Plano, TX",
    "Pittsburgh, PA",
    "Burbank, CA",
    "Kenwood, CA",
    "Passaic, NJ",
    "Salt Lake City, UT",
    "Allen, TX",
    "Tacoma, WA",
    "Sumner, WA",
    "Phoenix, AZ",
    "Hurst, TX",
    "Oregon City, OR",
    "Long Beach, CA",
    "Providence, RI",
    "Glendale, CA",
    "Graton, CA",
    "Lynwood, CA",
    "Houston, TX",
    "Lake Dallas, TX",
    "La Verne, CA",
    "Hayward, CA",
    "Madison, WI",
    "Danville, CA",
    "Lakewood, CA",
    "Chandler, AZ",
    "Pomona, CA",
    "Lake Oswego, OR",
    "Las Vegas, NV",
    "Bellevue, WA",
    "Smyrna, DE",
    "Arlington, TX",
    "Kent, WA",
    "Portland, OR",
    "Birmingham, AL",
    "Santa Clarita, CA",
    "Cleveland, OH",
    "Scottsdale, AZ",
    "Rowlett, TX",
    "Atlanta, GA",
    "Covina, CA",
    "Los Angeles, CA",
    "Dallas, TX",
    "Bee Cave, TX",
    "Dublin, CA",
    "Oklahoma City, OK",
    "Felton, DE",
    "Euless, TX",
    "Bedford, TX",
    "Los Gatos, CA",
    "San Anselmo, CA",
    "Richmond, VA",
    "Memphis, TN",
    "Calistoga, CA",
    "Boston, MA",
    "Sunnyvale, CA",
    "Mountain View, CA",
    "Laurel, DE",
    "Boise, ID",
    "Frisco, TX",
    "Sherwood, OR",
    "Worcester, MA",
    "Penngrove, CA",
    "Carlton, OR",
    "Milwaukee, WI",
    "Guerneville, CA",
    "Philadelphia, PA",
    "Enterprise, OR",
    "Woodland Park, NJ",
    "Southlake, TX",
    "Wylie, TX",
    "Denton, TX",
    "Santa Maria, CA",
    "San Diego, CA",
    "Newark, NJ",
    "Chattanooga, TN",
    "Columbus, OH",
    "Ontario, OR",
    "Chicago, IL",
    "Diamond Bar, CA",
    "Grapevine, TX",
    "Rohnert Park, CA",
    "San Francisco, CA",
    "San Antonio, TX",
    "Redwood City, CA",
    "Vancouver, WA",
    "Agoura Hills, CA",
    "Belmont, CA",
    "Petaluma, CA",
    "Miami, FL",
    "Garland, TX",
    "Pflugerville, TX",
    "Castro Valley, CA",
    "Hermosa Beach, CA",
    "Pembroke, GA",
    "Rochester, NY",
    "Alexandria, VA",
    "Colorado Springs, CO",
    "Cotati, CA",
    "Lakeway, TX",
    "Albuquerque, NM",
    "Palmdale, CA",
    "Carrollton, TX",
    "Fort Worth, TX",
    "Omaha, NE",
    "Glendale, AZ",
    "Torrance, CA",
    "Pleasanton, CA",
    "Murphy, TX",
    "Peoria, AZ",
    "Emeryville, CA",
    "Cedar Park, TX",
    "Santa Clara, CA",
    "Georgetown, TX",
    "Richardson, TX",
    "Occidental, CA",
    "Monte Rio, CA",
    "Windsor, CA",
    "Charlotte, NC",
    "Des Moines, IA",
    "Camas, WA",
    "Sacramento, CA",
    "Lakewood, WA",
    "Healdsburg, CA",
    "Jersey City, NJ",
    "Redmond, WA",
    "Novato, CA",
    "Stockton, CA",
    "Jacksonville, FL",
    "Alhambra, CA",
    "Round Rock, TX",
    "West Linn, OR",
    "San Leandro, CA",
    "Redondo Beach, CA",
    "Orlando, FL",
    "Lancaster, TX",
    "Cleburne, TX",
    "Huntington Park, CA",
    "Alvarado, TX",
    "Bodega Bay, CA",
    "Vancouver, BC",
    "Cerritos, CA",
    "Washougal, WA",
    "St. Louis, MO",
    "Gilbert, AZ",
    "Canby, OR",
    "Manhattan Beach, CA",
    "Anna, TX",
    "Tempe, AZ",
    "Vashon, WA",
    "Pasadena, CA",
    "Campbell, CA",
    "Nashville, TN",
    "Aurora, OR",
    "Santa Rosa, CA",
    "San Jose, CA",
    "Austin, TX",
    "Saratoga, CA",
    "Albany, CA",
    "Buffalo, NY",
    "Cedar Hill, TX",
    "Menlo Park, CA",
    "Paterson, NJ",
    "Eugene, OR",
    "Mansfield, TX",
    "Irving, TX",
    "Louisville, KY",
    "Tukwila, WA",
    "Mesa, AZ",
    "Sebastopol, CA",
    "Alameda, CA",
    "Rancho Palos Verdes, CA",
    "Baltimore, MD",
    "Cincinnati, OH",
    "Claremont, CA",
    "Clackamas, OR",
    "Colleyville, TX",
    "Denver, CO",
    "Tigard, OR",
    "Fife, WA",
    "Rockwall, TX",
    "Whittier, CA",
    "Oakland, CA",
    "Midlothian, TX",
    "Palo Alto, CA",
    "Surprise, AZ",
    "Milford, DE",
    "Grand Prairie, TX",
    "Seattle, WA",
    "Washington DC, DC",
    "Greenwood, DE",
    "Harrington, DE",
    "New York City, NY",
    "Wilsonville, OR",
}

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
    f = open("missing_restaurants.json", "r")
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
        # if restaurant_city not in restaurant_address:
        #     restaurant_address += " " + restaurant_city
        req_url = url + restaurant_address

        res = ping_request(req_url)
        print(res)
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
    f = open("missing_restaurants_better_address.json", "w")
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
    f = open("Final_all_improved_restaurants.json")
    restaurants = json.load(f)

    for restaurant in restaurants:
        # city_id = restaurant["location"]["city_id"]
        # country_id = restaurant["location"]["country_id"]
        # if country_id == 216:
        for cuisine in restaurant["cuisines"].split(", "):
            if cuisine in all_cuisines_names:
                all_cuisines_names.pop(cuisine)

    print("remaining cuisines: ", all_cuisines_names)


def check_cities():
    f = open("final_all_restaurants.json")
    restaurants = json.load(f)
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


""" handle restaurants that don't have a zipcode"""

# get_zomato_cities_in_restaurant_file()
# get_diff_on_restaurants()
get_valid_cities()