from unittest import main, TestCase
import requests


class Tests(TestCase):
    def test_num_cuisines(self):
        result = requests.get("https://www.culturedfoodies.me/api/cuisines")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["cuisines"]) == 101

    def test_all_cuisines(self):
        result = requests.get("https://www.culturedfoodies.me/api/cuisines")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["cuisines"]) > 0
        assert jsonRes["cuisines"][0] == {
            "cities": "Baltimore, Fremont, Madison, Santa Clarita, Sunnyvale",
            "city_ids": "14, 61, 98, 160, 171",
            "country": "Afghanistan",
            "countryID": "1",
            "description": "The Cuisine from Afghanistan is largely based upon the nation's chief crops, such as wheat, maize, barley and rice. Accompanying these staples are native fruits and vegetables as well as dairy products such as milk, yogurt and whey. Kabuli Palaw is the national dish of Afghanistan. The nation's culinary specialties reflect its ethnic and geographic diversity. Afghanistan is known for its high quality pomegranates, grapes and sweet football-shaped melons.\nChaWal = Rice\nDhaniya = Coriander\nHaldi = Tumeric\nLaal Mirch = Red chilli\nLehsan Adrak = Ginger garlic\nMoong Daal (Chilky Vali) = Green gram split peas\nNamak = Salt\nPalak = Spinch\nPani = Water\nPyaaz = Onion\nQeema = Mince\nZeera = Cumin",
            "dishes": [
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/afghan_kofta_4023.jpg",
                    "name": "Afghan Kofta",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/aushak_2925.jpg",
                    "name": "Aushak",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/bichak_2926.jpg",
                    "name": "Bichak",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/bolani_5676.jpg",
                    "name": "Bolani",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/brides_fingers_2920.jpg",
                    "name": "Brides Fingers",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/challow_2104.jpg",
                    "name": "Challow",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/chapli_kebab_2448.jpg",
                    "name": "Chapli Kebab",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/doogh_2456.jpg",
                    "name": "Doogh",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/firni_4448.jpg",
                    "name": "Firni",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/gosh_feel_2454.jpg",
                    "name": "Gosh Feel",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/kabuli_palaw_2105.jpg",
                    "name": "Kabuli Palaw",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/kadu_bouranee_2923.jpg",
                    "name": "Kadu Bouranee",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/kahwa_2424.jpg",
                    "name": "Kahwa",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/keshk_2077.jpg",
                    "name": "Keshk",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/khameerbob_4022.jpg",
                    "name": "Khameerbob",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/khoujoor_2930.jpg",
                    "name": "Khoujoor",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/kitchiree_quroot_2350.jpg",
                    "name": "Kitchiree Quroot",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/korma_shalgam_2349.jpg",
                    "name": "Korma Shalgam",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/kulcha_khatai_2921.jpg",
                    "name": "Kulcha Khatai",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/murabba_2928.jpg",
                    "name": "Murabba",
                },
            ],
            "id": 1,
            "name": "Afghan",
            "restaurant_ids": "682, 1623, 2264, 2455, 2868, 3192, 3324",
            "restaurants": "Persia Restaurant, Salang Pass, Paul's Pel'meni, De Afghanan, The Helmand Restaurant, Kabul Afghanistan Restaurant, Kabul  Afghan Cuisine",
        }

    def test_one_cuisine(self):
        result = requests.get(
            "https://www.culturedfoodies.me/api/cuisines/id=7")
        assert result.status_code == 200
        jsonRes = result.json()
        assert jsonRes == {
            "cities": "Boston, New York City, Seattle",
            "city_ids": "22, 113, 165",
            "country": "Australia",
            "countryID": "14",
            "description": "Australian cuisine refers to the cuisine of Australia and its indigenous and colonial societies. Indigenous Australians have occupied Australia for some 40,000 to 60,000 years, during which they developed a unique hunter-gatherer diet, known as \"bush tucker\", drawn from regional Australian flora and fauna—such as the kangaroo. Australia was, from 1788 to 1900, a collection of British colonies in which culinary tastes were strongly influenced by British and Irish migrants - and agricultural products such as beef cattle, sheep and wheat became staples in the Australian diet. Post-war Australia's multicultural immigration program lead to a diversification of the cuisine of Australia, particularly under the influence of Mediterranean and East Asian Australians.\nhttps://en.wikipedia.org/wiki/Australian_cuisineAUSTRALIANS LAY CLAIM to wonderful food creations, some more ingenious than others, yet our attachment to our Aussie food 'classics' suggests that it is the simpler things that take our fancy. Whether at a family Christmas feast at the height of a scorching Australian summer or barracking at a local footy match in the depths of winter, Australians …",
            "dishes": [
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/anzac_biscuit_4652.jpg",
                    "name": "Anzac Biscuit",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/avocado_toast_6319.jpg",
                    "name": "Avocado Toast",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/bush_bread_4662.jpg",
                    "name": "Bush Bread",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/cheesymite_scroll_4665.jpg",
                    "name": "Cheesymite Scroll",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/chiko_roll_5024.jpg",
                    "name": "Chiko Roll",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/chocolate_crackles_4659.jpeg",
                    "name": "Chocolate Crackles",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/damper_4660.jpg",
                    "name": "Damper",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/fairy_bread_4655.jpg",
                    "name": "Fairy Bread",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/fresh_zucchini_salad_with_spicy_chicken_grilled_4995.jpg",
                    "name": "Fresh Zucchini Salad With Spicy Chicken Grilled",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/lamb_leg_roast_5022.jpg",
                    "name": "Lamb Leg Roast",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/lamingtons_4654.jpg",
                    "name": "Lamingtons",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/meat_pie_4186.jpg",
                    "name": "Meat Pie",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/neenish_tart_4651.jpeg",
                    "name": "Neenish Tart",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/pea_and_ham_soup_5020.jpeg",
                    "name": "Pea And Ham Soup",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/salt_and_pepper_calamari_5021.jpeg",
                    "name": "Salt And Pepper Calamari",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/sao_biscuit_5023.jpg",
                    "name": "Sao Biscuit",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/sausage_roll_1_4860.jpeg",
                    "name": "Sausage Roll",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/sausage_sizzle_4664.jpg",
                    "name": "Sausage Sizzle",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/syrah-wine_7136.jpg",
                    "name": "Syrah Wine",
                },
                {
                    "image_url": "https://wfg22p.s3.amazonaws.com/media/dishes/tiger_toast_5582.jpg",
                    "name": "Tiger Toast",
                },
            ],
            "id": 7,
            "name": "Australian",
            "restaurant_ids": "1710, 1891, 2703, 4579, 4766, 4796, 5149",
            "restaurants": "The Thirsty Koala, Public, Kangaroo and Kiwi, Tuck Shop, Five Leaves, Cuppacoffee, KO Pies",
        }

    def test_not_found_cuisine(self):
        result = requests.get(
            "https://www.culturedfoodies.me/api/cuisines/id=111")
        assert result.status_code == 404
        jsonRes = result.json()
        assert jsonRes == {"error": "111 not found"}

    def test_num_restaurants(self):
        result = requests.get("https://www.culturedfoodies.me/api/restaurants")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["restaurants"]) == 5369

    # asserts expected first object in all years response
    def test_all_restaurants(self):
        result = requests.get("https://www.culturedfoodies.me/api/restaurants")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["restaurants"]) > 0
        assert jsonRes["restaurants"][0] == {
            "address": "9249 W Union Hills Dr, Peoria, AZ 85382, USA",
            "aggregate_rating": "2.6",
            "average_cost_for_two": 10,
            "city": "Peoria",
            "city_id": 129,
            "cuisine_ids": "47, -1, -1",
            "cuisines": "Italian, Pizza, Sandwich",
            "highlights": "Delivery, Dinner, Takeaway Available, Lunch, Outdoor Seating, Gluten Free Options, Kid Friendly",
            "id": 1,
            "latitude": "33.6515100000",
            "longitude": "-112.2572600000",
            "menu_url": "https://www.zomato.com/peoria-az/streets-of-new-york-1-peoria/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
            "name": "Streets of New York",
            "phone_numbers": "(623) 875-6600",
            "price_range": 1,
            "restaurant_image": "https://lh3.googleusercontent.com/p/AF1QipPNs02sOBccaIpI5DZdDRuUEGWv3t5rAyFSlAgW=s1600-w2048",
            "state_abbrev": "AZ",
            "timings": "10:30 AM to 9 PM (Mon-Thu), 10:30 AM to 10 PM (Fri-Sat), 11 AM to 9 PM (Sun)",
            "url": "https://www.zomato.com/peoria-az/streets-of-new-york-1-peoria?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
            "zipcode": "85382",
        }

    def test_one_restaurant(self):
        result = requests.get(
            "https://www.culturedfoodies.me/api/restaurants/id=111")
        assert result.status_code == 200
        jsonRes = result.json()
        assert jsonRes == {
            "address": "2355 Chestnut St, San Francisco, CA 94123, USA",
            "aggregate_rating": "4.2",
            "average_cost_for_two": 75,
            "city": "San Francisco",
            "city_id": 156,
            "cuisine_ids": "47, -1",
            "cuisines": "Italian, Pizza",
            "highlights": "Dinner, Credit Card, Lunch, Takeaway Available, Lunch Menu, Wine, Wifi, Gluten Free Options, Outdoor Seating, Dog Friendly, Vegetarian Friendly, Brunch",
            "id": 111,
            "latitude": "37.8000444444",
            "longitude": "-122.4421611111",
            "menu_url": "https://www.zomato.com/san-francisco/a16-marina-presidio/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
            "name": "A16",
            "phone_numbers": "(415) 771-2216",
            "price_range": 3,
            "restaurant_image": "https://lh3.googleusercontent.com/p/AF1QipMl5AALZMeoY-JyshZjP14aq6pHQJUZr-ZcbBMg=s1600-w4000",
            "state_abbrev": "CA",
            "timings": "5:30 PM to 10 PM (Mon-Tue),11:30 AM to 2 PM, 5:30 PM to 10 PM (Wed-Thu),11:30 AM to 2 PM (Fri),11:30 AM to 2 PM, 5 PM to 11 PM (Sat),11:30 AM to 2 PM, 5 PM to 10 PM (Sun)",
            "url": "https://www.zomato.com/san-francisco/a16-marina-presidio?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
            "zipcode": "94123",
        }

    def test_not_found_restaurant(self):
        result = requests.get(
            "https://www.culturedfoodies.me/api/restaurants/id=5555")
        assert result.status_code == 404
        jsonRes = result.json()
        assert jsonRes == {"error": "5555 not found"}

    def test_num_cities(self):
        result = requests.get("https://www.culturedfoodies.me/api/cities")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["cities"]) == 189

    def test_all_cities(self):
        result = requests.get("https://www.culturedfoodies.me/api/cities")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["cities"]) > 0
        assert jsonRes["cities"][0] == {
            "business_freedom": 8.671,
            "commute": 4.687250000000001,
            "cost_of_living": 2.618,
            "cuisine_ids": "34",
            "cuisines": "German",
            "economy": 6.5145,
            "education": 8.6245,
            "environmental_quality": 6.4815000000000005,
            "full_name": "Alameda, California, United States",
            "healthcare": 8.748,
            "housing": 1,
            "id": 1,
            "imagesmobile": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/san-francisco-bay-area-7f6d130d20.jpg",
            "imagesweb": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/san-francisco-bay-area_web-f17b1f60e6.jpg",
            "internet_access": 5.605500000000001,
            "latitude": 37,
            "leisure_culture": 9.407,
            "longitude": -122,
            "name": "Alameda",
            "outdoors": 7.014,
            "population": 78630,
            "restaurant_ids": "3373",
            "restaurants": "Speisekammer",
            "safety": 5.7155000000000005,
            "startups": 10,
            "state": "California",
            "summary": "<p>San Francisco Bay Area, California, is among the leading cities with a <b>higher number of accelerators or available funding</b>.\n\n    \n        According to our city rankings, this is a good place to live with high ratings in <b>startups</b>, <b>business freedom</b> and <b>healthcare</b>.\n    \n\n    \n</p>\n\n\n    <p>San Francisco Bay Area is one of the top ten city matches for 6.9% of Teleport users.</p>",
            "taxation": 4.488,
            "timezone": "America/Los_Angeles",
            "tolerance": 8.012500000000001,
            "travel_connectivity": 3.6545000000000005,
            "venture_capital": 10
        }

    def test_one_city(self):
        result = requests.get(
            "https://www.culturedfoodies.me/api/cities/id=111")
        assert result.status_code == 200
        jsonRes = result.json()
        assert jsonRes == {
            "business_freedom": 8.671,
            "commute": 4.501,
            "cost_of_living": 5.742000000000001,
            "cuisine_ids": "47, 3, 81, 32, 54, 89, 14, 90, 34",
            "cuisines": "Italian, American, Southern, French, Mexican, Tex-Mex, British, Thai, German",
            "economy": 6.5145,
            "education": 4.733,
            "environmental_quality": 7.056499999999999,
            "full_name": "Nashville, Tennessee, United States",
            "healthcare": 8.370333333333333,
            "housing": 4.4545,
            "id": 111,
            "imagesmobile": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/nashville-79d8242c30.jpg",
            "imagesweb": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/nashville_web-928afede11.jpg",
            "internet_access": 6.6370000000000005,
            "latitude": 36,
            "leisure_culture": 7.0200000000000005,
            "longitude": -86,
            "name": "Nashville",
            "outdoors": 1.2734999999999999,
            "population": 530852,
            "restaurant_ids": "80, 199, 220, 250, 319, 371, 603, 697, 757, 763, 780, 1003, 1029, 1088, 1644, 1732, 1765, 1807, 2254, 2365, 2473, 2497, 2512, 2545, 2602, 2613, 2616, 2635, 2645, 2680, 2786, 2834, 2854, 2890, 2954, 2990, 3185, 3352, 3478, 3498, 3499, 3607, 3787, 4099, 4198, 4211, 4347, 4377, 4408, 4412, 4633, 4642, 4645, 4675, 4688, 4831, 4844, 4905, 5042, 5044, 5055, 5127, 5160, 5185, 5340",
            "restaurants": "Moto Cucina + Enoteca, Puckett's Grocery & Restaurant, Amerigo Italian Restaurant, The Old Spaghetti Factory, The Southern Steak & Oyster, Joey's House of Pizza, Amerigo Italian Restaurant, Sole Mio, Porta Via Italian Kitchen, Campione's Taste of Chicago, Red Bicycle Coffee & Crêpes, San Antonio Taco Company, Sky Blue Cafe, City House, DeSano Pizza Bakery, McNamara's Irish Pub & Restaurant, Thai Phooket, Mama Mia's, Hattie B's Hot Chicken, M.L. Rose Craft Beer & Burgers, Miel Restaurant, Loveless Cafe, NY Pie, PM, Angelo's Picnic Pizza, Marché Artisan Foods, The Wild Cow, Prince's Hot Chicken Shack, Taco Mamacita, Coco's Italian Market, Puckett's Grocery & Restaurant, Jacks Bar-B-Que, Carrabba's Italian Grill, Rolf and Daughters, Pancake Pantry, Rosepepper Cantina, Antonio's of Nashville, Marina's on the Square, Caffé Nonna, The Smiling Elephant, Arnold's Country Kitchen, Carrabba's Italian Grill, Tin Angel Restaurant, Valentino's Ristorante, Burger Up, Gondola House Pizzeria, Husk, Demos' Steak and Spaghetti House, Demos Steak & Spaghetti House, Monell's Restaurant, Mas Tacos Por Favor, Molinari's, Sauce, Zolo's Italian Restaurant, MAFIAoZA'S (Nashville), Cafe Coco, Whiskey Kitchen, Manny's House of Pizza, Buca di Beppo Italian Restaurant, Adele's, Mirko Pasta, Maggiano's Little Italy, Bella Napoli Pizzeria, Edley's Bar-B-Que, Fido",
            "safety": 5.078,
            "startups": 6.0600000000000005,
            "state": "Tennessee",
            "summary": "<p>Nashville, Tennessee, is among the top cities with a <b>free business environment</b>.\n\n    \n        According to our city rankings, this is a good place to live with high ratings in <b>healthcare</b>, <b>environmental quality</b> and <b>internet access</b>.\n    \n\n    \n</p>\n\n\n    <p>Nashville is one of the top ten city matches for 0.3% of Teleport users.</p>",
            "taxation": 4.772,
            "timezone": "America/Chicago",
            "tolerance": 6.807500000000001,
            "travel_connectivity": 1.9080000000000004,
            "venture_capital": 3.569
        }

    def test_not_found_city(self):
        result = requests.get(
            "https://www.culturedfoodies.me/api/cities/id=-1")
        assert result.status_code == 404
        jsonRes = result.json()
        assert jsonRes == {"error": "-1 not found"}


if __name__ == "__main__":
    main()
