import React from "react";
import { Jumbotron } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

let data = {
  "recipe": {
      "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_9349215ac47577c6768559b508f416e1",
      "label": "Chicken Kabuli Pulao (Afghanistan) Recipe",
      "image": "https://www.edamam.com/web-img/b83/b839ad3fbac4b8db9fd9b431a5cded2f.jpg",
      "source": "recipeofhealth.com",
      "url": "http://recipeofhealth.com/recipe/chicken-kabuli-pulao-afghanistan-159960rb",
      "shareAs": "http://www.edamam.com/recipe/chicken-kabuli-pulao-afghanistan-recipe-9349215ac47577c6768559b508f416e1/afghanistan",
      "yield": 12.0,
      "dietLabels": [],
      "healthLabels": [
          "Sugar-Conscious",
          "Peanut-Free",
          "Alcohol-Free"
      ],
      "cautions": [
          "Sulfites",
          "FODMAP"
      ],
      "ingredientLines": [
          "2 lbs chicken, cut up",
          "1 large onion, sliced",
          "sea salt , to taste",
          "1 1/2 pints hot water",
          "1/4 lb white basmati rice",
          "1 medium onion, thinly sliced",
          "3 tbsp butter",
          "1/2 tbsp ground cardamom",
          "1/2 tbsp ground cumin",
          "fresh ground black pepper , to taste",
          "healthy pinch saffron, soaked in 1 tbsp broth",
          "1 large carrot , cut into match sticks",
          "1/4 cup dark raisin",
          "1/8 cup chopped pistachios (optional, toasted in a dry frying pan )",
          "1/4 cup blanched slivered almond (optional, toasted in a dry frying pan )"
      ],
      "ingredients": [
          {
              "text": "2 lbs chicken, cut up",
              "weight": 907.18474,
              "image": "https://www.edamam.com/food-img/d33/d338229d774a743f7858f6764e095878.jpg"
          },
          {
              "text": "1 large onion, sliced",
              "weight": 150.0,
              "image": "https://www.edamam.com/food-img/205/205e6bf2399b85d34741892ef91cc603.jpg"
          },
          {
              "text": "sea salt , to taste",
              "weight": 13.19259775200034,
              "image": "https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg"
          },
          {
              "text": "1 1/2 pints hot water",
              "weight": 709.7647095,
              "image": "https://www.edamam.com/food-img/5dd/5dd9d1361847b2ca53c4b19a8f92627e.jpg"
          },
          {
              "text": "1/4 lb white basmati rice",
              "weight": 113.3980925,
              "image": "https://www.edamam.com/food-img/e35/e35ea1529983a3db51a32a1afa7b3837.jpg"
          },
          {
              "text": "1 medium onion, thinly sliced",
              "weight": 110.0,
              "image": "https://www.edamam.com/food-img/205/205e6bf2399b85d34741892ef91cc603.jpg"
          },
          {
              "text": "3 tbsp butter",
              "weight": 42.599999999999994,
              "image": null
          },
          {
              "text": "1/2 tbsp ground cardamom",
              "weight": 2.9,
              "image": "https://www.edamam.com/food-img/39d/39d4bfdf9dad662e89ae7bcb933c0def.jpg"
          },
          {
              "text": "1/2 tbsp ground cumin",
              "weight": 3.0,
              "image": "https://www.edamam.com/food-img/07e/07e2a4eb77ce46591033846504817d35.jpg"
          },
          {
              "text": "fresh ground black pepper , to taste",
              "weight": 6.59629887600017,
              "image": "https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg"
          },
          {
              "text": "healthy pinch saffron, soaked in 1 tbsp broth",
              "weight": 0.043750000056215814,
              "image": "https://www.edamam.com/food-img/b7c/b7c71604d7d5e7f54ac461079e6fe175.jpg"
          },
          {
              "text": "1 large carrot , cut into match sticks",
              "weight": 72.0,
              "image": "https://www.edamam.com/food-img/121/121e33fce0bb9546ed7d060b6c114e29.jpg"
          },
          {
              "text": "1/4 cup dark raisin",
              "weight": 36.25,
              "image": "https://www.edamam.com/food-img/159/159e247350db62e1f87b0636a53687f5.jpg"
          },
          {
              "text": "1/8 cup chopped pistachios (optional, toasted in a dry frying pan )",
              "weight": 15.375,
              "image": "https://www.edamam.com/food-img/1ed/1eda10468a9c3df61f8208fe156e832d.jpg"
          },
          {
              "text": "1/4 cup blanched slivered almond (optional, toasted in a dry frying pan )",
              "weight": 36.25,
              "image": "https://www.edamam.com/food-img/a2b/a2b45160204372c7fc68667dd5bf29a3.jpg"
          }
      ],
      "calories": 3248.9435638039345,
      "totalWeight": 2216.654958973095,
      "totalTime": 21.0,
      "totalNutrients": {
          "ENERC_KCAL": {
              "label": "Energy",
              "quantity": 3248.9435638039345,
              "unit": "kcal"
          },
          "FAT": {
              "label": "Fat",
              "quantity": 199.62007047286096,
              "unit": "g"
          },
          "FASAT": {
              "label": "Saturated",
              "quantity": 63.78889371585482,
              "unit": "g"
          },
          "FATRN": {
              "label": "Trans",
              "quantity": 2.2832846977999997,
              "unit": "g"
          },
          "FAMS": {
              "label": "Monounsaturated",
              "quantity": 82.12986818274389,
              "unit": "g"
          },
          "FAPU": {
              "label": "Polyunsaturated",
              "quantity": 37.71506760100864,
              "unit": "g"
          },
          "CHOCDF": {
              "label": "Carbs",
              "quantity": 169.12898495998888,
              "unit": "g"
          },
          "FIBTG": {
              "label": "Fiber",
              "quantity": 17.221370068130238,
              "unit": "g"
          },
          "SUGAR": {
              "label": "Sugars",
              "quantity": 39.02062902380641,
              "unit": "g"
          },
          "PROCNT": {
              "label": "Protein",
              "quantity": 194.2369292134729,
              "unit": "g"
          },
          "CHOLE": {
              "label": "Cholesterol",
              "quantity": 771.9785550000001,
              "unit": "mg"
          },
          "NA": {
              "label": "Sodium",
              "quantity": 5128.526597830452,
              "unit": "mg"
          },
          "CA": {
              "label": "Calcium",
              "quantity": 437.45481344903243,
              "unit": "mg"
          },
          "MG": {
              "label": "Magnesium",
              "quantity": 408.85896297907914,
              "unit": "mg"
          },
          "K": {
              "label": "Potassium",
              "quantity": 3308.618166485774,
              "unit": "mg"
          },
          "FE": {
              "label": "Iron",
              "quantity": 19.374392132336084,
              "unit": "mg"
          },
          "ZN": {
              "label": "Zinc",
              "quantity": 15.789795972922057,
              "unit": "mg"
          },
          "P": {
              "label": "Phosphorus",
              "quantity": 1891.7702763992222,
              "unit": "mg"
          },
          "VITA_RAE": {
              "label": "Vitamin A",
              "quantity": 1271.471306596535,
              "unit": "µg"
          },
          "VITC": {
              "label": "Vitamin C",
              "quantity": 40.57305584004543,
              "unit": "mg"
          },
          "THIA": {
              "label": "Thiamin (B1)",
              "quantity": 1.639915172086145,
              "unit": "mg"
          },
          "RIBF": {
              "label": "Riboflavin (B2)",
              "quantity": 1.6253589038019505,
              "unit": "mg"
          },
          "NIA": {
              "label": "Niacin (B3)",
              "quantity": 69.47019665115351,
              "unit": "mg"
          },
          "VITB6A": {
              "label": "Vitamin B6",
              "quantity": 4.179252066429729,
              "unit": "mg"
          },
          "FOLDFE": {
              "label": "Folate equivalent (total)",
              "quantity": 586.5180106839722,
              "unit": "µg"
          },
          "FOLFD": {
              "label": "Folate (food)",
              "quantity": 156.73924010897233,
              "unit": "µg"
          },
          "FOLAC": {
              "label": "Folic acid",
              "quantity": 252.87774627500002,
              "unit": "µg"
          },
          "VITB12": {
              "label": "Vitamin B12",
              "quantity": 2.8846926940000004,
              "unit": "µg"
          },
          "VITD": {
              "label": "Vitamin D",
              "quantity": 2.45336948,
              "unit": "µg"
          },
          "TOCPHA": {
              "label": "Vitamin E",
              "quantity": 13.5368136300604,
              "unit": "mg"
          },
          "VITK1": {
              "label": "Vitamin K",
              "quantity": 39.47606045251227,
              "unit": "µg"
          },
          "WATER": {
              "label": "Water",
              "quantity": 1632.9412753911504,
              "unit": "g"
          }
      },
      "totalDaily": {
          "ENERC_KCAL": {
              "label": "Energy",
              "quantity": 162.44717819019672,
              "unit": "%"
          },
          "FAT": {
              "label": "Fat",
              "quantity": 307.10780072747843,
              "unit": "%"
          },
          "FASAT": {
              "label": "Saturated",
              "quantity": 318.9444685792741,
              "unit": "%"
          },
          "CHOCDF": {
              "label": "Carbs",
              "quantity": 56.3763283199963,
              "unit": "%"
          },
          "FIBTG": {
              "label": "Fiber",
              "quantity": 68.88548027252095,
              "unit": "%"
          },
          "PROCNT": {
              "label": "Protein",
              "quantity": 388.4738584269458,
              "unit": "%"
          },
          "CHOLE": {
              "label": "Cholesterol",
              "quantity": 257.32618500000007,
              "unit": "%"
          },
          "NA": {
              "label": "Sodium",
              "quantity": 213.68860824293552,
              "unit": "%"
          },
          "CA": {
              "label": "Calcium",
              "quantity": 43.74548134490325,
              "unit": "%"
          },
          "MG": {
              "label": "Magnesium",
              "quantity": 97.347372137876,
              "unit": "%"
          },
          "K": {
              "label": "Potassium",
              "quantity": 70.39613120182497,
              "unit": "%"
          },
          "FE": {
              "label": "Iron",
              "quantity": 107.63551184631157,
              "unit": "%"
          },
          "ZN": {
              "label": "Zinc",
              "quantity": 143.54359975383687,
              "unit": "%"
          },
          "P": {
              "label": "Phosphorus",
              "quantity": 270.2528966284603,
              "unit": "%"
          },
          "VITA_RAE": {
              "label": "Vitamin A",
              "quantity": 141.2745896218372,
              "unit": "%"
          },
          "VITC": {
              "label": "Vitamin C",
              "quantity": 45.08117315560603,
              "unit": "%"
          },
          "THIA": {
              "label": "Thiamin (B1)",
              "quantity": 136.6595976738454,
              "unit": "%"
          },
          "RIBF": {
              "label": "Riboflavin (B2)",
              "quantity": 125.02760798476541,
              "unit": "%"
          },
          "NIA": {
              "label": "Niacin (B3)",
              "quantity": 434.18872906970944,
              "unit": "%"
          },
          "VITB6A": {
              "label": "Vitamin B6",
              "quantity": 321.48092818690225,
              "unit": "%"
          },
          "FOLDFE": {
              "label": "Folate equivalent (total)",
              "quantity": 146.62950267099305,
              "unit": "%"
          },
          "VITB12": {
              "label": "Vitamin B12",
              "quantity": 120.19552891666669,
              "unit": "%"
          },
          "VITD": {
              "label": "Vitamin D",
              "quantity": 16.355796533333333,
              "unit": "%"
          },
          "TOCPHA": {
              "label": "Vitamin E",
              "quantity": 90.24542420040267,
              "unit": "%"
          },
          "VITK1": {
              "label": "Vitamin K",
              "quantity": 32.896717043760226,
              "unit": "%"
          }
      },
      "digest": [
          {
              "label": "Fat",
              "tag": "FAT",
              "schemaOrgTag": "fatContent",
              "total": 199.62007047286096,
              "hasRDI": true,
              "daily": 307.10780072747843,
              "unit": "g",
              "sub": [
                  {
                      "label": "Saturated",
                      "tag": "FASAT",
                      "schemaOrgTag": "saturatedFatContent",
                      "total": 63.78889371585482,
                      "hasRDI": true,
                      "daily": 318.9444685792741,
                      "unit": "g"
                  },
                  {
                      "label": "Trans",
                      "tag": "FATRN",
                      "schemaOrgTag": "transFatContent",
                      "total": 2.2832846977999997,
                      "hasRDI": false,
                      "daily": 0.0,
                      "unit": "g"
                  },
                  {
                      "label": "Monounsaturated",
                      "tag": "FAMS",
                      "schemaOrgTag": null,
                      "total": 82.12986818274389,
                      "hasRDI": false,
                      "daily": 0.0,
                      "unit": "g"
                  },
                  {
                      "label": "Polyunsaturated",
                      "tag": "FAPU",
                      "schemaOrgTag": null,
                      "total": 37.71506760100864,
                      "hasRDI": false,
                      "daily": 0.0,
                      "unit": "g"
                  }
              ]
          },
          {
              "label": "Carbs",
              "tag": "CHOCDF",
              "schemaOrgTag": "carbohydrateContent",
              "total": 169.12898495998888,
              "hasRDI": true,
              "daily": 56.3763283199963,
              "unit": "g",
              "sub": [
                  {
                      "label": "Carbs (net)",
                      "tag": "CHOCDF.net",
                      "schemaOrgTag": null,
                      "total": 151.90761489185866,
                      "hasRDI": false,
                      "daily": 0.0,
                      "unit": "g"
                  },
                  {
                      "label": "Fiber",
                      "tag": "FIBTG",
                      "schemaOrgTag": "fiberContent",
                      "total": 17.221370068130238,
                      "hasRDI": true,
                      "daily": 68.88548027252095,
                      "unit": "g"
                  },
                  {
                      "label": "Sugars",
                      "tag": "SUGAR",
                      "schemaOrgTag": "sugarContent",
                      "total": 39.02062902380641,
                      "hasRDI": false,
                      "daily": 0.0,
                      "unit": "g"
                  },
                  {
                      "label": "Sugars, added",
                      "tag": "SUGAR.added",
                      "schemaOrgTag": null,
                      "total": 0.0,
                      "hasRDI": false,
                      "daily": 0.0,
                      "unit": "g"
                  }
              ]
          },
          {
              "label": "Protein",
              "tag": "PROCNT",
              "schemaOrgTag": "proteinContent",
              "total": 194.2369292134729,
              "hasRDI": true,
              "daily": 388.4738584269458,
              "unit": "g"
          },
          {
              "label": "Cholesterol",
              "tag": "CHOLE",
              "schemaOrgTag": "cholesterolContent",
              "total": 771.9785550000001,
              "hasRDI": true,
              "daily": 257.32618500000007,
              "unit": "mg"
          },
          {
              "label": "Sodium",
              "tag": "NA",
              "schemaOrgTag": "sodiumContent",
              "total": 5128.526597830452,
              "hasRDI": true,
              "daily": 213.68860824293552,
              "unit": "mg"
          },
          {
              "label": "Calcium",
              "tag": "CA",
              "schemaOrgTag": null,
              "total": 437.45481344903243,
              "hasRDI": true,
              "daily": 43.74548134490325,
              "unit": "mg"
          },
          {
              "label": "Magnesium",
              "tag": "MG",
              "schemaOrgTag": null,
              "total": 408.85896297907914,
              "hasRDI": true,
              "daily": 97.347372137876,
              "unit": "mg"
          },
          {
              "label": "Potassium",
              "tag": "K",
              "schemaOrgTag": null,
              "total": 3308.618166485774,
              "hasRDI": true,
              "daily": 70.39613120182497,
              "unit": "mg"
          },
          {
              "label": "Iron",
              "tag": "FE",
              "schemaOrgTag": null,
              "total": 19.374392132336084,
              "hasRDI": true,
              "daily": 107.63551184631157,
              "unit": "mg"
          },
          {
              "label": "Zinc",
              "tag": "ZN",
              "schemaOrgTag": null,
              "total": 15.789795972922057,
              "hasRDI": true,
              "daily": 143.54359975383687,
              "unit": "mg"
          },
          {
              "label": "Phosphorus",
              "tag": "P",
              "schemaOrgTag": null,
              "total": 1891.7702763992222,
              "hasRDI": true,
              "daily": 270.2528966284603,
              "unit": "mg"
          },
          {
              "label": "Vitamin A",
              "tag": "VITA_RAE",
              "schemaOrgTag": null,
              "total": 1271.471306596535,
              "hasRDI": true,
              "daily": 141.2745896218372,
              "unit": "µg"
          },
          {
              "label": "Vitamin C",
              "tag": "VITC",
              "schemaOrgTag": null,
              "total": 40.57305584004543,
              "hasRDI": true,
              "daily": 45.08117315560603,
              "unit": "mg"
          },
          {
              "label": "Thiamin (B1)",
              "tag": "THIA",
              "schemaOrgTag": null,
              "total": 1.639915172086145,
              "hasRDI": true,
              "daily": 136.6595976738454,
              "unit": "mg"
          },
          {
              "label": "Riboflavin (B2)",
              "tag": "RIBF",
              "schemaOrgTag": null,
              "total": 1.6253589038019505,
              "hasRDI": true,
              "daily": 125.02760798476541,
              "unit": "mg"
          },
          {
              "label": "Niacin (B3)",
              "tag": "NIA",
              "schemaOrgTag": null,
              "total": 69.47019665115351,
              "hasRDI": true,
              "daily": 434.18872906970944,
              "unit": "mg"
          },
          {
              "label": "Vitamin B6",
              "tag": "VITB6A",
              "schemaOrgTag": null,
              "total": 4.179252066429729,
              "hasRDI": true,
              "daily": 321.48092818690225,
              "unit": "mg"
          },
          {
              "label": "Folate equivalent (total)",
              "tag": "FOLDFE",
              "schemaOrgTag": null,
              "total": 586.5180106839722,
              "hasRDI": true,
              "daily": 146.62950267099305,
              "unit": "µg"
          },
          {
              "label": "Folate (food)",
              "tag": "FOLFD",
              "schemaOrgTag": null,
              "total": 156.73924010897233,
              "hasRDI": false,
              "daily": 0.0,
              "unit": "µg"
          },
          {
              "label": "Folic acid",
              "tag": "FOLAC",
              "schemaOrgTag": null,
              "total": 252.87774627500002,
              "hasRDI": false,
              "daily": 0.0,
              "unit": "µg"
          },
          {
              "label": "Vitamin B12",
              "tag": "VITB12",
              "schemaOrgTag": null,
              "total": 2.8846926940000004,
              "hasRDI": true,
              "daily": 120.19552891666669,
              "unit": "µg"
          },
          {
              "label": "Vitamin D",
              "tag": "VITD",
              "schemaOrgTag": null,
              "total": 2.45336948,
              "hasRDI": true,
              "daily": 16.355796533333333,
              "unit": "µg"
          },
          {
              "label": "Vitamin E",
              "tag": "TOCPHA",
              "schemaOrgTag": null,
              "total": 13.5368136300604,
              "hasRDI": true,
              "daily": 90.24542420040267,
              "unit": "mg"
          },
          {
              "label": "Vitamin K",
              "tag": "VITK1",
              "schemaOrgTag": null,
              "total": 39.47606045251227,
              "hasRDI": true,
              "daily": 32.896717043760226,
              "unit": "µg"
          },
          {
              "label": "Sugar alcohols",
              "tag": "Sugar.alcohol",
              "schemaOrgTag": null,
              "total": 0.0,
              "hasRDI": false,
              "daily": 0.0,
              "unit": "g"
          },
          {
              "label": "Water",
              "tag": "WATER",
              "schemaOrgTag": null,
              "total": 1632.9412753911504,
              "hasRDI": false,
              "daily": 0.0,
              "unit": "g"
          }
      ]
  },
  "bookmarked": false,
  "bought": false
}

function Dish() {
  const { id } = useParams<{ id: string }>();
  return (
    <Container fluid> 
        <Row>
            <Col>
                <h1>{data["recipe"]["label"]}</h1>
            </Col>
        </Row>
        <Row>
            <Col xs={6} md={4}>
                <Image src={data["recipe"]["image"]} fluid />
            </Col>
        </Row>
        <Row>
            <Col>
                {data["recipe"]["source"]}
            </Col>
        </Row>
        
        <Row>
            <Col>
                <h5>Dietary</h5>
            </Col>
            <Col>
                <h5>Health</h5>
            </Col>
        </Row>
        <Row>
            <Col>
                {data["recipe"]["dietLabels"]}
            </Col>
            <Col>
                {data["recipe"]["healthLabels"][0]}
                {data["recipe"]["healthLabels"][1]}
                {data["recipe"]["healthLabels"][2]}
            </Col>
        </Row>
        
        <Row>
            <Col>
                <h5>Restrictions</h5>
            </Col>
            <Col>
                <h5>Calories</h5>
            </Col>
        </Row>
        <Row>
            <Col>
                {data["recipe"]["cautions"]}
            </Col>
            <Col>
                {data["recipe"]["calories"]}
            </Col>
        </Row>
            <h5>Ingredients</h5>
        <Row>

        </Row>
            {data["recipe"]["ingredientLines"].map((ingredient: any) => {
                return <li>{ingredient}</li>
            })}
        <Row>
            
        </Row>
    </Container>
  );
}

export default Dish;
