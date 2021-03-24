from io import StringIO
from unittest import main, TestCase
import sys, os
import requests


class Tests(TestCase):

    
    def test_num_cuisines(self):
        result = requests.get("https://culturedfoodies.me/api/cuisines")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["cuisines"]) == 101

    def test_all_cuisines(self):
        result = requests.get("https://culturedfoodies.me/api/cuisines")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["cuisines"]) > 0
        assert jsonRes["cuisines"][0] == {
            "country": "Afghanistan", 
      "description": "The Cuisine from Afghanistan is largely based upon the nation's chief crops, such as wheat, maize, barley and rice. Accompanying these staples are native fruits and vegetables as well as dairy products such as milk, yogurt and whey. Kabuli Palaw is the national dish of Afghanistan. The nation's culinary specialties reflect its ethnic and geographic diversity. Afghanistan is known for its high quality pomegranates, grapes and sweet football-shaped melons.\nChaWal = Rice\nDhaniya = Coriander\nHaldi = Tumeric\nLaal Mirch = Red chilli\nLehsan Adrak = Ginger garlic\nMoong Daal (Chilky Vali) = Green gram split peas\nNamak = Salt\nPalak = Spinch\nPani = Water\nPyaaz = Onion\nQeema = Mince\nZeera = Cumin", 
      "id": 1, 
      "name": "Afghan"
        }

    def test_one_cuisine(self):
        result = requests.get("https://culturedfoodies.me/api/cuisines/id=7")
        assert result.status_code == 200
        jsonRes = result.json()
        assert jsonRes == {
            "country": "Australia", 
      "description": "Australian cuisine refers to the cuisine of Australia and its indigenous and colonial societies. Indigenous Australians have occupied Australia for some 40,000 to 60,000 years, during which they developed a unique hunter-gatherer diet, known as \"bush tucker\", drawn from regional Australian flora and fauna\u2014such as the kangaroo. Australia was, from 1788 to 1900, a collection of British colonies in which culinary tastes were strongly influenced by British and Irish migrants - and agricultural products such as beef cattle, sheep and wheat became staples in the Australian diet. Post-war Australia's multicultural immigration program lead to a diversification of the cuisine of Australia, particularly under the influence of Mediterranean and East Asian Australians.\nhttps://en.wikipedia.org/wiki/Australian_cuisineAUSTRALIANS LAY CLAIM to wonderful food creations, some more ingenious than others, yet our attachment to our Aussie food 'classics' suggests that it is the simpler things that take our fancy. Whether at a family Christmas feast at the height of a scorching Australian summer or barracking at a local footy match in the depths of winter, Australians \u2026", 
      "id": 7, 
      "name": "Australian"
        }

    def test_not_found_cuisine(self):
        result = requests.get("https://culturedfoodies.me/api/cuisines/id=111")
        assert result.status_code == 404
        jsonRes = result.json()
        assert jsonRes == {"error": "111 not found"}

    

    def test_num_restaurants(self):
        result = requests.get("https://culturedfoodies.me/api/restaurants")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["restaurants"]) == 5395

    # asserts expected first object in all years response
    def test_all_restaurants(self):
        
        result = requests.get("https://culturedfoodies.me/api/restaurants")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["restaurants"]) > 0
        assert jsonRes["restaurants"][0] == {
                 "address": "9249 W Union Hills Dr, Peoria, AZ 85382, USA", 
      "aggregate_rating": "2.6", 
      "average_cost_for_two": 10, 
      "city": "Peoria", 
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
      "zipcode": "85382"
        }

    def test_one_restaurant(self):
        result = requests.get("https://culturedfoodies.me/api/restaurants/id=111")
        assert result.status_code == 200
        jsonRes = result.json()
         assert jsonRes == {
            "address": "2355 Chestnut St, San Francisco, CA 94123, USA", 
      "aggregate_rating": "4.2", 
      "average_cost_for_two": 75, 
      "city": "San Francisco", 
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
      "zipcode": "94123"
        }

  def test_not_found_restaurant(self):
        result = requests.get("https://culturedfoodies.me/api/restaurants/id=5555")
        assert result.status_code == 404
        jsonRes = result.json()
        assert jsonRes == {"error": "5555 not found"}


if __name__ == "__main__":  # pragma: no cover
    main()
