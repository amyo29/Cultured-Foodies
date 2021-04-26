import unittest
from flask_testing import TestCase
from models import City, Cuisine, Restaurant, Country
import json
import mockdbdata
from schemas import app, db
from app import *

# add all the mock data
class BaseTestCase(TestCase):
    """A base test case."""

    def create_app(self):
        app.config.from_object("config.TestConfig")
        return app

    def setUp(self):
        db.create_all()

        # ADD MOCK CUISINE DATA
        for cuisine in mockdbdata.cuisines:
            cuisine_entry = Cuisine(
                id=cuisine["id"],
                name=cuisine["name"],
                country=cuisine["country"],
                dishes=cuisine["dishes"],
                description=cuisine["description"],
                countryID=cuisine["countryID"],
                restaurant_ids=cuisine["restaurant_ids"],
                city_ids=cuisine["city_ids"],
                restaurants=cuisine["restaurants"],
                cities=cuisine["cities"],
            )
            db.session.add(cuisine_entry)

        # ADD MOCK COUNTRY DATA
        for country in mockdbdata.countries:
            country_entry = Country(
                id=country["id"],
                name=country["name"],
                alpha2code=country["alpha2code"],
                alpha3code=country["alpha3code"],
                capital=country["capital"],
                region=country["region"],
                subregion=country["subregion"],
                population=country["population"],
                latitude=country["latitude"],
                longitude=country["longitude"],
                demonym=country["demonym"],
                area=country["area"],
                gini=country["gini"],
                timezones=country["timezones"],
                borders=country["borders"],
                native_name=country["native_name"],
                numeric_code=country["numeric_code"],
                currencies=country["currencies"],
                languages=country["languages"],
                translations=country["translations"],
                flag=country["flag"],
            )
            db.session.add(country_entry)

        # ADD MOCK CITY DATA
        for city in mockdbdata.cities:
            city_entry = City(
                id=city["id"],
                name=city["name"],
                full_name=city["full_name"],
                population=city["population"],
                latitude=city["latitude"],
                longitude=city["longitude"],
                state=city["state"],
                timezone=city["timezone"],
                imagesmobile=city["imagesmobile"],
                imagesweb=city["imagesweb"],
                housing=city["housing"],
                cost_of_living=city["cost_of_living"],
                startups=city["startups"],
                venture_capital=city["venture_capital"],
                travel_connectivity=city["travel_connectivity"],
                commute=city["commute"],
                business_freedom=city["business_freedom"],
                safety=city["safety"],
                healthcare=city["healthcare"],
                education=city["education"],
                environmental_quality=city["environmental_quality"],
                economy=city["economy"],
                taxation=city["taxation"],
                internet_access=city["internet_access"],
                leisure_culture=city["leisure_culture"],
                tolerance=city["tolerance"],
                outdoors=city["outdoors"],
                summary=city["summary"],
                cuisine_ids=city["cuisine_ids"],
                restaurant_ids=city["restaurant_ids"],
                cuisines=city["cuisines"],
                restaurants=city["restaurants"],
            )
            db.session.add(city_entry)

        # ADD MOCK RESTAURANT DATA
        for restaurant in mockdbdata.restaurants:
            restaurant_entry = Restaurant(
                id=restaurant["id"],
                aggregate_rating=restaurant["aggregate_rating"],
                average_cost_for_two=restaurant["average_cost_for_two"],
                cuisines=restaurant["cuisines"],
                highlights=restaurant["highlights"],
                menu_url=restaurant["menu_url"],
                name=restaurant["name"],
                phone_numbers=restaurant["phone_numbers"],
                price_range=restaurant["price_range"],
                restaurant_image=restaurant["restaurant_image"],
                timings=restaurant["timings"],
                url=restaurant["url"],
                address=restaurant["address"],
                city=restaurant["city"],
                latitude=restaurant["latitude"],
                longitude=restaurant["longitude"],
                state_abbrev=restaurant["state_abbrev"],
                zipcode=restaurant["zipcode"],
                cuisine_ids=restaurant["cuisine_ids"],
                city_id=restaurant["city_id"],
            )
            db.session.add(restaurant_entry)

    def tearDown(self):
        db.session.remove()
        db.drop_all()


# testing of data
class FlaskTestCase(BaseTestCase):

    # Ensure that Flask was set up correctly
    def test_index(self):
        response = self.client.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)

    def test_cuisine_1(self):
        response = self.client.get(
            "/api/cuisines/id=1", content_type="application/json")
        self.assertEqual(response.status_code, 200)

        loaded_data = json.loads(response.get_data(as_text=True))
        expected_data = {
            "id": 1,
            "name": "Cuisine 1",
            "country": "Country 1",
            "dishes": [
                {
                    "name": "Dish 1",
                    "image_url": "Dish_1.jpg"
                },
            ],
            "description": "Cuisine 1 description",
            "countryID": "1",
            "restaurant_ids": "1",
            "city_ids": "1",
            "restaurants": "Restaurant 1",
            "cities": "City 1"
        }
        self.assertEqual(len(loaded_data), len(expected_data))
        for key in expected_data:
            self.assertEqual(loaded_data[key], expected_data[key])

    def test_invalid_cuisine(self):
        response = self.client.get(
            "/api/cuisines/id=4", content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_all_cuisines(self):
        response = self.client.get(
            "/api/cuisines", content_type="application/json")
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(len(data["cuisines"]), 3)

    def test_country_1(self):
        response = self.client.get(
            "/api/countries/id=1", content_type="application/json")
        self.assertEqual(response.status_code, 200)

        loaded_data = json.loads(response.get_data(as_text=True))
        expected_data = {
            "id": 1,
            "name": "Country 1",
            "alpha2code": "C1",
            "alpha3code": "CO1",
            "capital": "Capital 1",
            "region": "Region 1",
            "subregion": "Subregion 1",
            "population": 500,
            "latitude": 0.0,
            "longitude": 0.0,
            "demonym": "Country 1",
            "area": 100.0,
            "gini": 10.0,
            "timezones": "UTC+00:00",
            "borders": "CO2, CO3",
            "native_name": "Country 1",
            "numeric_code": 1,
            "currencies": "C01",
            "languages": "CO1",
            "translations": {
                "de": "CO1",
                "es": "CO1",
                "fr": "CO1",
                "ja": "CO1",
                "it": "CO1",
                "br": "CO1",
                "pt": "CO1",
                "nl": "CO1",
                "hr": "CO1",
                "fa": "CO1"
            },
            "flag": "CO1.svg"
        }
        self.assertEqual(len(loaded_data), len(expected_data))
        for key in expected_data:
            self.assertEqual(loaded_data[key], expected_data[key])

    def test_invalid_country(self):
        response = self.client.get(
            "/api/countries/id=4", content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_all_countries(self):
        response = self.client.get(
            "/api/countries", content_type="application/json")
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(len(data["countries"]), 3)

    def test_city_1(self):
        response = self.client.get(
            "/api/cities/id=1", content_type="application/json")
        self.assertEqual(response.status_code, 200)

        loaded_data = json.loads(response.get_data(as_text=True))
        expected_data = {
            "id": 1,
            "name": "City 1",
            "full_name": "City 1, State 1, Country 1",
            "population": 100,
            "latitude": 10,
            "longitude": -10,
            "state": "State 1",
            "timezone": "Country_1/City_1",
            "imagesmobile": "city_1_mobile.jpg",
            "imagesweb": "city_1_web.jpg",
            "housing": 8.0,
            "cost_of_living": 8.0,
            "startups": 8.0,
            "venture_capital": 8.0,
            "travel_connectivity": 8.0,
            "commute": 8.0,
            "business_freedom": 8.0,
            "safety": 8.0,
            "healthcare": 8.0,
            "education": 8.0,
            "environmental_quality": 8.0,
            "economy": 8.0,
            "taxation": 8.0,
            "internet_access": 8.0,
            "leisure_culture": 8.0,
            "tolerance": 8.0,
            "outdoors": 8.0,
            "summary": "City 1 description",
            "cuisine_ids": "1",
            "restaurant_ids": "1",
            "cuisines": "Cuisine 1",
            "restaurants": "Restaurant 1"
        }
        self.assertEqual(len(loaded_data), len(expected_data))
        for key in expected_data:
            # print(loaded_data["startups"])
            self.assertEqual(loaded_data[key], expected_data[key])

    def test_invalid_city(self):
        response = self.client.get(
            "/api/cities/id=4", content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_all_cities(self):
        response = self.client.get(
            "/api/cities", content_type="application/json")
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(len(data["cities"]), 3)

    def test_restaurant_1(self):
        response = self.client.get(
            "/api/restaurants/id=1", content_type="application/json")
        self.assertEqual(response.status_code, 200)

        loaded_data = json.loads(response.get_data(as_text=True))
        expected_data = {
            "id": 1,
            "aggregate_rating": "8.0",
            "average_cost_for_two": 10,
            "cuisines": "Cuisine 1",
            "highlights": "Highlight 1",
            "menu_url": "menu_1.jpg",
            "name": "Restaurant 1",
            "phone_numbers": "(111) 111-1111",
            "price_range": 1,
            "restaurant_image": "restaurant_1.jpg",
            "timings": "10:30 AM to 9 PM (Mon-Thu), 10:30 AM to 10 PM (Fri-Sat), 11 AM to 9 PM (Sun)",
            "url": "restaurant_1.com",
            "address": "Address 1",
            "city": "City 1",
            "latitude": "10.0",
            "longitude": "-10.0",
            "state_abbrev": "S1",
            "zipcode": "11111",
            "cuisine_ids": "1",
            "city_id": 1
        }
        self.assertEqual(len(loaded_data), len(expected_data))
        for key in expected_data:
            self.assertEqual(loaded_data[key], expected_data[key])

    def test_invalid_city(self):
        response = self.client.get(
            "/api/restaurants/id=4", content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_all_restaurants(self):
        response = self.client.get(
            "/api/restaurants", content_type="application/json")
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(len(data["restaurants"]), 3)


if __name__ == "__main__":
    unittest.main()
