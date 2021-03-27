import flask
import json
from flask import jsonify, render_template
from models import db, City, Cuisine, Restaurant, Country
from schemas import (
    app,
    cuisines_schema,
    cuisine_schema,
    cities_schema,
    city_schema,
    restaurants_schema,
    restaurant_schema,
    countries_schema,
    country_schema,
)

# ENDPOINTS

# NOTE: This route is needed for the default EB health check route
@app.route("/")
def home():
    return "ok"


# # routing for frontend
# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# def get_index(path):
#     return render_template("index.html")


# Fetch all cuisines
@app.route("/api/cuisines", methods=["GET"])
def get_cuisines():
    all_cuisines = Cuisine.query.all()
    result = cuisines_schema.dump(all_cuisines)
    return jsonify({"cuisines": result})


# Fetch a cuisine entry by id
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


# Fetch all cities
@app.route("/api/cities", methods=["GET"])
def get_cities():
    all_cities = City.query.all()
    result = cities_schema.dump(all_cities)
    return jsonify({"cities": result})


# Fetch a city entry by id
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


# Fetch all restaurants
@app.route("/api/restaurants", methods=["GET"])
def get_restaurants():
    all_restaurants = Restaurant.query.all()
    result = restaurants_schema.dump(all_restaurants)
    return jsonify({"restaurants": result})


# Fetch a restaurant entry by id
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


# Fetch all countries
@app.route("/api/countries", methods=["GET"])
def get_countries():
    all_countries = Country.query.all()
    result = countries_schema.dump(all_countries)
    return jsonify({"countries": result})


# Fetch a country entry by id
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
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)