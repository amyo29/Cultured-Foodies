from flask import Flask
from flask_marshmallow import Marshmallow
from marshmallow import fields
from flask_sqlalchemy import SQLAlchemy

app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build",
)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql+psycopg2://foodies:XxiV76kTiB0p2CiNtnz8"
    "@cultured-foodies-database.csbdff6vqmka.us-east-2.rds.amazonaws.com:"
    "5432/foodiesdatabase"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.debug = True

db = SQLAlchemy(app)
ma = Marshmallow(app)

# SCHEMAS


class DishSchema(ma.Schema):
    name = fields.Str(required=False)
    image_url = fields.Str(required=False)


class CuisineSchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=False)
    country = fields.Str(required=False)
    dishes = fields.List(fields.Nested(DishSchema))
    description = fields.Str(required=False)
    countryID = fields.Str(required=False)
    restaurant_ids = fields.Str(required=False)
    city_ids = fields.Str(required=False)
    restaurants = fields.Str(required=False)
    cities = fields.Str(required=False)


class CitySchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=False)
    full_name = fields.Str(required=False)
    population = fields.Int(required=False)
    latitude = fields.Int(required=False)
    longitude = fields.Int(required=False)
    state = fields.Str(required=False)
    timezone = fields.Str(required=False)
    imagesmobile = fields.Str(required=False)
    imagesweb = fields.Str(required=False)
    housing = fields.Float(required=False)
    cost_of_living = fields.Float(required=False)
    startups = fields.Float(required=False)
    venture_capital = fields.Float(required=False)
    travel_connectivity = fields.Float(required=False)
    commute = fields.Float(required=False)
    business_freedom = fields.Float(required=False)
    safety = fields.Float(required=False)
    healthcare = fields.Float(required=False)
    education = fields.Float(required=False)
    environmental_quality = fields.Float(required=False)
    economy = fields.Float(required=False)
    taxation = fields.Float(required=False)
    internet_access = fields.Float(required=False)
    leisure_culture = fields.Float(required=False)
    tolerance = fields.Float(required=False)
    outdoors = fields.Float(required=False)
    summary = fields.Str(required=False)
    cuisine_ids = fields.Str(required=False)
    restaurant_ids = fields.Str(required=False)
    cuisines = fields.Str(required=False)
    restaurants = fields.Str(required=False)


class RestaurantSchema(ma.Schema):
    id = fields.Int(required=True)
    aggregate_rating = fields.Str(required=False)
    average_cost_for_two = fields.Int(required=False)
    cuisines = fields.Str(required=False)
    highlights = fields.Str(required=False)
    menu_url = fields.Str(required=False)
    name = fields.Str(required=False)
    phone_numbers = fields.Str(required=False)
    price_range = fields.Int(required=False)
    restaurant_image = fields.Str(required=False)
    timings = fields.Str(required=False)
    url = fields.Str(required=False)
    address = fields.Str(required=False)
    city = fields.Str(required=False)
    latitude = fields.Str(required=False)
    longitude = fields.Str(required=False)
    state_abbrev = fields.Str(required=False)
    zipcode = fields.Str(required=False)
    cuisine_ids = fields.Str(required=False)
    city_id = fields.Int(required=False)


class CountrySchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=False)
    alpha2code = fields.Str(required=False)
    alpha3code = fields.Str(required=False)
    capital = fields.Str(required=False)
    region = fields.Str(required=False)
    subregion = fields.Str(required=False)
    population = fields.Int(required=False)
    latitude = fields.Int(required=False)
    longitude = fields.Int(required=False)
    demonym = fields.Str(required=False)
    area = fields.Int(required=False)
    gini = fields.Int(required=False)
    timezones = fields.Str(required=False)
    borders = fields.Str(required=False)
    native_name = fields.Str(required=False)
    numeric_code = fields.Int(required=False)
    currencies = fields.Str(required=False)
    languages = fields.Str(required=False)
    translations = fields.Dict(required=False)
    flag = fields.Str(required=False)


# Initialize Schemas for each model

cuisine_schema = CuisineSchema()
cuisines_schema = CuisineSchema(many=True)

city_schema = CitySchema()
cities_schema = CitySchema(many=True)

restaurant_schema = RestaurantSchema()
restaurants_schema = RestaurantSchema(many=True)

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)
