import requests
import json

def get_all_agencies():
    url = "https://www.aboveearth.me/api/agencies"

    agencies_list = []
    r = requests.get(url).json()
    offset = 0

    for i in range(11):
        url += "?offset=" + str(offset)
        r = requests.get(url).json()["agencies"]
        agencies_list += r
        url = "https://www.aboveearth.me/api/agencies"
        offset += 10

    f = open("agencies_dump.json", "w")
    json.dump(agencies_list, f)

def format_agency_data_for_visualization():
    