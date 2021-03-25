from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON
import json

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql+psycopg2://foodies:XxiV76kTiB0p2CiNtnz8"
    "@cultured-foodies-database.csbdff6vqmka.us-east-2.rds.amazonaws.com:"
    "5432/foodiesdatabase"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

db = SQLAlchemy(app)


# class Country(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String())
#     alpha2code = db.Column(db.String())
#     alpha3code = db.Column(db.String())
#     capital = db.Column(db.String())
#     region = db.Column(db.String())
#     subregion = db.Column(db.String())
#     population = db.Column(db.Integer)
#     latitude = db.Column(db.Integer)
#     longitude = db.Column(db.Integer)
#     demonym = db.Column(db.String())
#     area = db.Column(db.Integer)
#     gini = db.Column(db.Integer)
#     timezones = db.Column(db.String())
#     borders = db.Column(db.String())
#     native_name = db.Column(db.String())
#     numeric_code = db.Column(db.Integer)
#     currencies = db.Column(db.String())
#     languages = db.Column(db.String())
#     translations = db.Column(JSON)
#     flag = db.Column(db.String())


# def insert_data():
#     f = open("countryData.json", "r")
#     data = json.load(f, encoding="utf8")

#     for country in data:
#         country_db = Country(
#             name=country["name"],
#             alpha2code=country["alpha2Code"],
#             alpha3code=country["alpha3Code"],
#             capital=country["capital"],
#             region=country["region"],
#             subregion=country["subregion"],
#             population=country["population"],
#             latitude=country["latlng"][0],
#             longitude=country["latlng"][1],
#             demonym=country["demonym"],
#             area=country["area"],
#             gini=country["gini"],
#             timezones=country["timezones"],
#             borders=country["borders"],
#             native_name=country["nativeName"],
#             numeric_code=country["numericCode"],
#             currencies=country["currencies"],
#             languages=country["languages"],
#             translations=country["translations"],
#             flag=country["flag"],
#         )
#         db.session.add(country_db)
#         db.session.commit()


class Cuisine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    country = db.Column(db.String())
    dishes = db.Column(JSON)
    description = db.Column(db.String())
    countryID = db.Column(db.String())
    restaurant_ids = db.Column(db.String())
    city_ids = db.Column(db.String())


def insert_data():
    f = open("all_cuisines.json", "r")
    data = json.load(f, encoding="utf8")

    for cuisine in data:
        country_db = Cuisine(
            name=cuisine["name"],
            country=cuisine["country"],
            dishes=cuisine["dishes"],
            description=cuisine["description"],
            countryID=cuisine["countryID"],
            restaurant_ids=cuisine["restaurant_ids"],
            city_ids=cuisine["city_ids"],
        )
        db.session.add(country_db)
        db.session.commit()


# db.create_all()
# insert_data()