from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

# Base = declarative_base()
db = SQLAlchemy()

# City Model
class City(db.Model):

DATABASE_URI = 'postgres+psycopg2://foodies:XxiV76kTiB0p2CiNtnz8@cultured-foodies-database.csbdff6vqmka.us-east-2.rds.amazonaws.com:5432/foodiesdatabase'
engine = create_engine(DATABASE_URI)

db.metadata.create_all(engine)