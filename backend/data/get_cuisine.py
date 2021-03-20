import json
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

cuisine_country_dict = {"Thai": "Thailand",
                        "Bangladeshi": "Bangladesh",
                        "Tex-Mex": "United States of America",
                        "Cuban": "Cuba",
                        "German": "Germany",
                        "Paraguayan": "Paraguay",
                        "Taiwanese": "Taiwan",
                        "Nicaraguan": "Nicaragua",
                        "Trinidad And Tobago": "Trinidad And Tobago",
                        "Greek": "Greece",
                        "Scandinavian": "Norway",
                        "Southwestern": "United States of America",
                        "Moroccan": "Morocco",
                        "Creole": "United States of America",
                        "Albanian": "Albania",
                        "British": "United Kingdom of Great Britain and Northern Ireland",
                        "Australian": "Australia",
                        "Iranian": "Iran",
                        "Welsh": "United Kingdom of Great Britain and Northern Ireland",
                        "Israeli": "Israel",
                        "Mongolian": "Mongolia",
                        "Amish": "United States of America",
                        "Canadian": "Canada",
                        "American": "United States of America",
                        "Singaporean": "Singapore",
                        "Ukrainian": "Ukraine",
                        "Spanish": "Spain",
                        "Irish": "Ireland",
                        "Vietnamese": "Vietnam",
                        "New American": "United States of America",
                        "Armenian": "Armenia",
                        "Colombian": "Colombia",
                        "Moldovan": "Moldova",
                        "New Mexican": "United States of Ammerica",
                        "Syrian": "Syria",
                        "Pakistani": "Pakistan",
                        "Hungarian": "Hungary",
                        "Guyanese": "Guyana",
                        "Bolivian": "Bolivia",
                        "California": "United States of America",
                        "Turkish": "Turkey",
                        "Yemeni": "Yemen",
                        "Tibetan": "China",
                        "Chinese": "China",
                        "Jewish": "Israel",
                        "Korean": "Korea",
                        "Nepalese": "Nepal",
                        "Cambodian": "Cammbodia",
                        "Sri Lankan": "Sri Lanka",
                        "Southern": "United States of America",
                        "Caribbean": "Belize",
                        "Mexican": "Mexico",
                        "Peruvian": "Peru",
                        "Afghan": "Afghanistan",
                        "Dominican": "Dominican Republic",
                        "Austrian": "Austria",
                        "New Zealand": "New Zealand",
                        "Danish": "Denmark",
                        "Icelandic": "Iceland",
                        "Punjabi": "India",
                        "Filipino": "Philippines",
                        "Chilean": "Chile",
                        "Cajun": "United States of America",
                        "Balearic": "Spain",
                        "Portuguese": "Portugal",
                        "Somali": "Somalia",
                        "Ecuadorian": "Ecuador",
                        "Burmese": "Myanmar",
                        "Soul Food": "United States of America",
                        "Ethiopian": "Ethiopia",
                        "Saudi Arabian": "Saudi Arabia",
                        "Hong Kong": "China",
                        "Sichuan": "China",
                        "Tunisian": "Tunisia",
                        "Nigerian": "Nigeria",
                        "Jamaican": "Jamaica",
                        "Brazilian": "Brazil",
                        "French": "France",
                        "Salvadorean": "El Salvador",
                        "Venezuelan": "Venezuela",
                        "Uruguayan": "Uruguay",
                        "Indonesian": "Indonesia",
                        "Cantonese": "China",
                        "South African": "South Africa",
                        "Uzbek": "Uzbekistan",
                        "Puerto Rican": "Puerto Rico",
                        "Swedish": "Sweden",
                        "Haitian": "Haiti",
                        "Polish": "Poland",
                        "Scottish": "Scotland",
                        "Italian": "Italy",
                        "Russian": "Russia",
                        "Georgian": "Georgia",
                        "Japanese": "Japan",
                        "Indian": "India",
                        "Argentine": "Argentina",
                        "Swiss": "Sweden",
                        "Hawaiian": "United States of America",
                        "Lebanese": "Lebanon",
                        "Malaysian": "Malaysia",
                        "Belgian": "Belgium"
                        }




def get_world_food_per_cuisine(cuisine):
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    driver.get("https://worldfood.guide/cuisinedishes/" + cuisine.lower() + "/" + str(1) + "/")
    elements = driver.find_elements_by_class_name("title3.color2")
    result = []
    for item in elements:
        result.append(item.text)

    return result

def get_description(cuisine):
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    driver.get("https://worldfood.guide/cuisine/" + cuisine.lower() + "/")
    elements = driver.find_elements_by_class_name("description")
    print(elements.text)
    return elements.text

def get_world_food_dishes():
    result = []
    not_found = []
    for cuisine in cuisine_country_dict.keys():
        print(cuisine)
        cuisine_dict = {}
        cuisine_dict["name"] = cuisine
        cuisine_dict["country"] = cuisine_country_dict[cuisine]
        all_dishes = get_world_food_per_cuisine(cuisine)
        if all_dishes == []:
            not_found.append(cuisine)
        cuisine_dict["dishes"] = all_dishes
        cuisine_dict["description"] = get_description(cuisine)
        result.append(cuisine_dict)

    f = open("all_cuisines.json", 'w')
    json.dump(result, f)
    print(not_found)

get_world_food_dishes() 

         