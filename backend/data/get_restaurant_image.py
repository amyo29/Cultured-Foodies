import json
import requests

def get_restaurant_image():
    f = open('all_restaurants.json')
    restaurants_data = json.load(f)
    base_url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8&inputtype=textquery&fields=photos&input='
    base_url_image = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8&maxwidth=4000&photoreference='

    num_restaurants = len(restaurants_data)

    for count in range(0, num_restaurants):
        restaurant = restaurants_data[count]
        if not 'restaurant_image' in restaurant or restaurant['restaurant_image'] == 'no url':
            name_and_adddress = restaurant['name'] + ' ' + restaurant['location']['address']
            print('counter: ', count)
            print(name_and_adddress)
            url = base_url + name_and_adddress
            r = None
            while r is None:
                try:
                    # get 
                    r = requests.get(url).json()
                except:
                    pass

            if len(r['candidates']) == 0:
                print("NO CANDIDATE")
                restaurant['restaurant_image'] = 'no url'
            for candidate in r['candidates']:
                if 'photos' in candidate:
                    for photo in candidate['photos']:
                        photo_reference = photo['photo_reference']
                        photo_url = base_url_image + photo_reference
                        restaurant_r = None
                        while restaurant_r is None:
                            try:
                                # get 
                                restaurant_r = requests.get(photo_url).url
                            except:
                                pass
                        restaurant['restaurant_image'] = restaurant_r
                else:
                    restaurant['restaurant_image'] = 'no url'
                    print('UH OH :((')
        count += 1
        
    with open("all_restaurants.json", "w") as file:
        json.dump(restaurants_data, file)

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

def remove_restaurants_with_no_image():
    f = open('all_restaurants.json')
    restaurants_data = json.load(f)

    restaurants_with_images = []

    for restaurant in restaurants_data:
        if restaurant['restaurant_image'] != 'no url':
            restaurants_with_images.append(restaurant)

    f = open('all_restaurants_with_images.json', 'w')
    json.dump(restaurants_with_images, f)

def check_if_we_have_enough_cuisines_dammit():
    f = open("all_restaurants.json")
    restaurants = json.load(f)

    print('num restaurants now: ', len(restaurants))

    for restaurant in restaurants:
        for cuisine in restaurant["cuisines"].split(", "):
            if cuisine in all_cuisines:
                all_cuisines.pop(cuisine)

    print("remaining cuisines: ", all_cuisines)

# remove_restaurants_with_no_image()
check_if_we_have_enough_cuisines_dammit()