import json
import requests

def get_restaurant_image():
    f = open('final_restaurants.json')
    restaurants_data = json.load(f)
    base_url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8&inputtype=textquery&fields=photos&input='
    base_url_image = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8&maxwidth=4000&photoreference='

    num_restaurants = len(restaurants_data)

    for count in range(0, num_restaurants - 1):
        restaurant = restaurants_data[count]
        if not 'restaurant_image' in restaurant:
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
        
    with open("final_restaurants.json", "w") as file:
        json.dump(restaurants_data, file)

get_restaurant_image()