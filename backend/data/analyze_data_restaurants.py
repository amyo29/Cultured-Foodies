import json


def analyze_restaurants_dump():
    f = open("top_40_restaurants_all_cities_by_cuisinesids.json", "r")
    data1 = json.load(f, encoding="utf8")

    f = open("top_40_restaurants_all_cities.json", "r")
    data2 = json.load(f, encoding="utf8")

    f = open("top_20_restaurants_few_cities_by_some_cuisinesids.json", "r")
    data3 = json.load(f, encoding="utf8")

    f = open("top20rest_select_cities_special_cases_cuisines_query.json", "r")
    data4 = json.load(f, encoding="utf8")
    # new_data4 = []
    # for x in data4:
    #     new_data4 += data4[x]

    all_data = data1 + data2 + data3 + new_data4
    all_cuisines = []
    for c in all_data:
        cuisines = c["restaurant"]["cuisines"].split(", ")
        all_cuisines += cuisines
    all_cuisines + list(data4.keys())
    print(set(all_cuisines))
    print(len(set(all_cuisines)))


# analyze_restaurants_dump()
# f = open("top20rest_select_cities_special_cases_cuisines_query.json", "r")
# data4 = json.load(f, encoding="utf8")
# print(data4.keys())
all_cuisines = {
    # "",
    "Modern Australian",
    "Caribbean",
    # "BBQ",
    "Dominican",
    "Russian",
    # "Teriyaki",
    # "Po'Boys",
    "Amish",
    # "Steak",
    # "Pizza",
    # "Bar Food",
    "Lebanese",
    "Ethiopian",
    "Cajun",
    "Hawaiian",
    "Austrian",
    # "Bakery",
    # "Patisserie",
    "Israeli",
    "Creole",
    # "Eastern European",
    "New Zealand",
    # "Ice Cream",
    "Japanese",
    # "African",
    "Malaysian",
    "Cuban",
    "Tex-Mex",
    "Brazilian",
    "Pakistani",
    "Thai",
    # "Street Food",
    # "Finger Food",
    "Polish",
    # "Coffee and Tea",
    "Jewish",
    # "Deli",
    # "Coffee",
    "Southwestern",
    # "Vegetarian",
    # "Tea",
    "Danish",
    "Somali",
    # "Fusion",
    "Canadian",
    "Indonesian",
    "Puerto Rican",
    "Mexican",
    "Welsh",
    # "Kebab",
    "Venezuelan",
    "Hungarian",
    "Tunisian",
    # "Cafe Food",
    # "Fondue",
    "Mongolian",
    "Nicaraguan",
    "Peruvian",
    # "Fast Food",
    "Burmese",
    "Nigerian",
    # "Healthy Food",
    "Vietnamese",
    "Argentine",
    "Southern",
    "Arabian",
    "Chilean",
    # "Fried Chicken",
    "Italian",
    # "Frozen Yogurt",
    "Filipino",
    "Cantonese",
    "Irish",
    # "Dumplings",
    # "Cafe",
    # "Taco",
    # "Korean BBQ",
    "Taiwanese",
    "Cambodian",
    # "Dim Sum",
    "Sri Lankan",
    "New Mexican",
    "Uruguayan",
    "British",
    "Portuguese",
    # "Grill",
    "French",
    "Indian",
    "American",
    # "Crepes",
    # "Pub Food",
    # "Bubble Tea",
    "Iranian",
    "Singaporean",
    # "Tapas",
    "Nepalese",
    "Jamaican",
    "Scottish",
    "Ukrainian",
    "Australian",
    "Turkish",
    # "Ramen",
    "German",
    # "Desserts",
    "Ecuadorian",
    # "Breakfast",
    "Sichuan",
    # "Others",
    "Moroccan",
    "Georgian",
    # "Floribbean",
    "Korean",
    # "Diner",
    # "Pacific Northwest",
    # "Juices",
    "Afghan",
    "New American",
    # "Mediterranean",
    # "Donuts",
    "Greek",
    "Spanish",
    # "Latin American",
    "Tibetan",
    "Swiss",
    "South African",
    # "Beverages",
    # "South American",
    # "International",
    # "Seafood",
    "Swedish",
    # "Fish and Chips",
    # "Middle Eastern",
    # "Salad",
    # "European",
    # "Sandwich",
    "California",
    "Syrian",
    "Armenian",
    # "Bagels",
    # "Sushi",
    "Soul Food",
    "Colombian",
    "Scandinavian",
    # "Asian",
    "Salvadorean",
    "Chinese",
    # "Burger",
    "Belgian",
    "Bangladeshi",
    "Paraguayan",
    "Punjabi",
    "Moldovan",
    "Haitian",
    "Albanian",
    "Uzbek",
    "Hong Kong",
    "Bolivian",
    "Icelandic",
    "Balearic",
    "Trinidad And Tobago",
    "Guyanese",
    "Yemeni",
    "Saudi Arabian",
}

print(len(all_cuisines))


"""
TODO:
--replace top20rest cuisines keys
--merge all jsons
--remove restaurants that don't have the supported cuisine
"""


def clean_query_json():
    f = open("top20rest_select_cities_special_cases_cuisines_query_OLD.json", "r")
    data = json.load(f, encoding="utf8")
    new_restaurants = []
    import pdb

    pdb.set_trace()
    for cuisine in data:
        cuisine_restaurants = data[cuisine]
        if len(cuisine_restaurants) == 0:
            print(cuisine_restaurants)
        for restaurant in cuisine_restaurants:
            restaurant["restaurant"]["cuisines"] = cuisine
            new_restaurants.append(restaurant)
    try:
        f = open("top20rest_select_DUMP.json", "w")
        print(new_restaurants)
        json.dump(new_restaurants, f)
    except Exception as e:
        print(e)


def merge_files():
    f = open("top_40_restaurants_all_cities_by_cuisinesids.json", "r")
    data1 = json.load(f, encoding="utf8")
    print("1")
    f = open("top_40_restaurants_all_cities.json", "r")
    data2 = json.load(f, encoding="utf8")
    print("2")
    f = open("top_20_restaurants_few_cities_by_some_cuisinesids.json", "r")
    data3 = json.load(f, encoding="utf8")
    print("3")
    f = open("top20rest_select_cities_special_cases_query_NEW.json", "r")
    data4 = json.load(f, encoding="utf8")
    print("4")
    all_data = data1 + data2 + data3 + data4
    f = open("all_restaurants_dump.json", "w")
    json.dump(all_data, f)


#
merge_files()
# clean_query_json()