
import requests
import json
import csv
import io
import pandas as pd
import pdb
import time


def getAllCountries():
    req_str = "https://restcountries.eu/rest/v2/all"
    r = requests.get(req_str).json()
    

    with open('data/countryData.json', 'w') as f:
        json.dump(r, f)

    with open('data/countryData.json', encoding='utf-8-sig') as f_input:
        df = pd.read_json(f_input)

    df.to_csv('data/countryData.csv', encoding='utf-8', index=False)
   


    




def getDishesForCountry(c):
    req_str = "https://api.edamam.com/search?app_id=e38ce84a&app_key=baa9b349152a753bf582c68b6517833c"
    req_str += "&q=" + c
    r = requests.get(req_str).json()
    return r

def jsonToCsv(file):
    
    result = pd.read_json(file+".json")  
    result.to_csv(file+".csv",  encoding='utf-8-sig')


def getAllDishes():
    allDishes = {}
    with open('data/countryData.json') as f:
        countries = json.load(f)

    index = 0
    for countryData in countries:
        if index % 5 == 0:
            time.sleep(62)
        index+=1
        currCountry = countryData['demonym']
        print(currCountry)
        result = getDishesForCountry(currCountry)
        allDishes[countryData["name"]] = result
    
    with open('data/dishesData.json', 'w') as f:
        json.dump(allDishes, f)

def getNewsForDish(dish, demonym):
    url = "https://newscatcher.p.rapidapi.com/v1/sources"
    url += "search?q="+demonym+" "+dish+"&media=True"

    querystring = {"lang":"en"}

    headers = {
        'x-rapidapi-key': "be16635aebmsh6d9b96d41cdf3b3p193f64jsn22c8b9bb1c05",
        'x-rapidapi-host': "newscatcher.p.rapidapi.com"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)
    return response

def getAllNews():
    allNews = {}
    with open('data/dishesData.json') as f:
        countries = json.load(f)

    index = 0
    for countryData in countries:
        if index % 5 == 0:
            time.sleep(62)
        index+=1
        currCountry = countryData['demonym']
        print(currCountry)
        result = getDishesForCountry(currCountry)
        allDishes[countryData["name"]] = result
    
    with open('data/dishesData.json', 'w') as f:
        json.dump(allDishes, f)



#getAllCountries()
getAllDishes()
