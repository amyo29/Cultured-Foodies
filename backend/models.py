# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy import Column, Integer, String, Date
# from sqlalchemy import create_engine
# from flask_sqlalchemy import SQLAlchemy

# # Base = declarative_base()
# db = SQLAlchemy()

# # City Model
# class City(db.Model):

# DATABASE_URI = 'postgres+psycopg2://foodies:XxiV76kTiB0p2CiNtnz8@cultured-foodies-database.csbdff6vqmka.us-east-2.rds.amazonaws.com:5432/foodiesdatabase'
# engine = create_engine(DATABASE_URI)

# db.metadata.create_all(engine)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON

db = SQLAlchemy()


class Cuisine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    country = db.Column(db.String())
    dishes = db.Column(JSON)
    description = db.Column(db.String())
    countryID = db.Column(db.String())


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    full_name = db.Column(db.String())
    population = db.Column(db.Integer)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    state = db.Column(db.String())
    timezone = db.Column(db.String())
    imagesmobile = db.Column(db.String())
    imagesweb = db.Column(db.String())
    housing = db.Column(db.Float)
    cost_of_living = db.Column(db.Float)
    startups = db.Column(db.Float)
    venture_capital = db.Column(db.Float)
    travel_connectivity = db.Column(db.Float)
    commute = db.Column(db.Float)
    business_freedom = db.Column(db.Float)
    safety = db.Column(db.Float)
    healthcare = db.Column(db.Float)
    education = db.Column(db.Float)
    environmental_quality = db.Column(db.Float)
    economy = db.Column(db.Float)
    taxation = db.Column(db.Float)
    internet_access = db.Column(db.Float)
    leisure_culture = db.Column(db.Float)
    tolerance = db.Column(db.Float)
    outdoors = db.Column(db.Float)


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    aggregate_rating = db.Column(db.String())
    average_cost_for_two = db.Column(db.Integer)
    cuisines = db.Column(db.String())
    highlights = db.Column(db.String())
    menu_url = db.Column(db.String())
    name = db.Column(db.String())
    phone_numbers = db.Column(db.String())
    price_range = db.Column(db.Integer)
    restaurant_image = db.Column(db.String())
    timings = db.Column(db.String())
    url = db.Column(db.String())
    address = db.Column(db.String())
    city = db.Column(db.String())
    latitude = db.Column(db.String())
    longitude = db.Column(db.String())
    state_abbrev = db.Column(db.String())
    zipcode = db.Column(db.String())


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    alpha2code = db.Column(db.String())
    alpha3code = db.Column(db.String())
    capital = db.Column(db.String())
    region = db.Column(db.String())
    subregion = db.Column(db.String())
    population = db.Column(db.Integer)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    demonym = db.Column(db.String())
    area = db.Column(db.Integer)
    gini = db.Column(db.Integer)
    timezones = db.Column(db.String())
    borders = db.Column(db.String())
    native_name = db.Column(db.String())
    numeric_code = db.Column(db.Integer)
    currencies = db.Column(db.String())
    languages = db.Column(db.String())
    translations = db.Column(JSON)
    flag = db.Column(db.String())
