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

    


if __name__ == "__main__":  # pragma: no cover
    main()
