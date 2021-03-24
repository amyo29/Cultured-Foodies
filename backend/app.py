# import json
# from flask import Flask, request
# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)
# # NOTE: This route is needed for the default EB health check route
# @app.route('/')
# def home():
#     return "ok"

# if __name__ == '__main__':
#     app.run(port=8080)

from models import City, Cuisine, Restaurant, Country
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
import flask
import json
import flask_marshmallow as marshmallow
from models import *

# Create flask app
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

ma = Marshmallow(app)

# SCHEMAS


class CuisineSchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=False)
    country = fields.Str(required=False)
    # cuisine_dishes =
    description = fields.Str(required=False)
    # cuisine_countryIDs =


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
    startsup = fields.Float(required=False)
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
    tolerence = fields.Float(required=False)
    outdoors = fields.Float(required=False)


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


class CountrySchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=False)
    alpha2code = fields.Str(required=False)
    alpha3code = fields.Str(required=False)
    capital = fields.Str(required=False)
    region = fields.Str(required=False)
    subregion = fields.Str(required=False)
    population = fields.Int(required=False)
    latlng0 = fields.Int(required=False)
    latlng1 = fields.Int(required=False)
    demonym = fields.Str(required=False)
    area = fields.Int(required=False)
    gini = fields.Int(required=False)
    timezones = fields.Str(required=False)
    borders = fields.Str(required=False)
    nativename = fields.Str(required=False)
    numericcode = fields.Int(required=False)
    currencies = fields.Str(required=False)
    languages = fields.Str(required=False)
    # translations
    flag = fields.Str(required=False)


cuisine_schema = CuisineSchema()
cuisines_schema = CuisineSchema(many=True)

city_schema = CitySchema()
cities_schema = CitySchema(many=True)

restaurant_schema = RestaurantSchema()
restaurants_schema = RestaurantSchema(many=True)

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)


# ENDPOINTS

# NOTE: This route is needed for the default EB health check route
@app.route("/")
def home():
    return "ok"


# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# def get_index(path):
#     return render_template("index.html")


# Retrieve all cuisines
@app.route("/api/cuisines", methods=["GET"])
def get_cuisines():
    all_cuisines = Cuisine.query.all()
    result = cuisines_schema.dump(all_cuisines)
    return jsonify({"cuisines": result})


# Retrieve single cuisine entry by id
@app.route("/api/cuisines/id=<id>", methods=["GET"])
def get_cuisine_id(id):
    cuisine = Cuisine.query.get(id)
    if cuisine is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return cuisine_schema.jsonify(cuisine)


# Retrieve all cities
@app.route("/api/cities", methods=["GET"])
def get_cities():
    all_cities = City.query.all()
    result = cities_schema.dump(all_cities)
    return jsonify({"cities": result})


# Retrieve single city entry by id
@app.route("/api/cities/id=<id>", methods=["GET"])
def get_city_id(id):
    city = City.query.get(id)
    if city is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return city_schema.jsonify(city)


# Retrieve all restaurants
@app.route("/api/restaurants", methods=["GET"])
def get_restaurants():
    all_restaurants = Restaurant.query.all()
    result = restaurants_schema.dump(all_restaurants)
    return jsonify({"restaurants": result})


# Retrieve single restaurant entry by id
@app.route("/api/restaurants/id=<id>", methods=["GET"])
def get_restaurant_id(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return restaurant_schema.jsonify(restaurant)


# Retrieve all countries
@app.route("/api/countries", methods=["GET"])
def get_countries():
    all_countries = Country.query.all()
    result = countries_schema.dump(all_countries)
    return jsonify({"countries": result})


# Retrieve single restaurant entry by id
@app.route("/api/countries/id=<id>", methods=["GET"])
def get_country_id(id):
    country = Country.query.get(id)
    if country is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return country_schema.jsonify(country)


if __name__ == "__main__":
    db.init_app(app)
    app.run(port=8080)

# if __name__ == "__main__":
#     db.init_app(app)
#     app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)