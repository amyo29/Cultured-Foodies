import json




def makeCuisineData():
  data = {"name": "Global Cuisines", "children":[]}
  f = open("./cuisinesSunburst.json", "r")
  cuisines = json.load(f)
  current_regions = set()
  current_sub = set()
  current_countries = set()
  current_cuisines = set()
  import pdb
  # pdb.set_trace()
  for cuisine in cuisines:

    region = cuisine["region"]
    subr = cuisine["subregion"]
    country = cuisine["country"]
    name = cuisine["cuisine"]

    if region not in current_regions:
      data["children"].append({"name": region, "children": [{"name": subr, "children":[] } ] })
      current_regions.add(region)
      current_sub.add(subr)

    regionObj = [x for x in data["children"] if x["name"] == region][0]
    if subr not in current_sub:
      regionObj["children"].append({"name": subr , "children": []})
      current_sub.add(subr)
    
    #add the country and and cuisines
    # pdb.set_trace()
    subrObj = [ x for x in regionObj["children"] if x["name"] == subr][0]
    if country not in current_countries:
      subrObj["children"].append({"name": country, "children": []})
      current_countries.add(country)

    countryObj = [x for x in subrObj["children"] if x["name"] == country][0]
    if name not in current_cuisines:
      countryObj["children"].append({"name": name,"minSize": 5, "size": 5})
  f = open("cuisines-attempt.json", "w")
  json.dump(data, f)
makeCuisineData()


      
