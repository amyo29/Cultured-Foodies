import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


class Selenium_Tests(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(
            "./node_modules/.bin/chromedriver", options=chrome_options
        )

    def test_homepage(self):
        self.driver.get("https://www.culturedfoodies.me")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cultured Foodies"

        summary = self.driver.find_elements_by_xpath("//div[@class = 'Title-summary']")[
            0
        ].text
        assert "Welcome fellow Foodie!" in summary

    def test_navbar(self):
        self.driver.get("https://www.culturedfoodies.me")

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "//button[@aria-label = 'Toggle navigation']"
        )[0].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("//a[@href = '/about']")[0].click()
        assert "https://www.culturedfoodies.me/about" in self.driver.current_url

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "//button[@aria-label = 'Toggle navigation']"
        )[0].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("//a[@href = '/cuisines']")[0].click()
        assert "https://www.culturedfoodies.me/cuisines" in self.driver.current_url

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "//button[@aria-label = 'Toggle navigation']"
        )[0].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("//a[@href = '/cities']")[0].click()
        assert "https://www.culturedfoodies.me/cities" in self.driver.current_url

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "//button[@aria-label = 'Toggle navigation']"
        )[0].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("//a[@href = '/restaurants']")[0].click()
        assert "https://www.culturedfoodies.me/restaurants" in self.driver.current_url

    def test_about_page(self):
        self.driver.get("https://www.culturedfoodies.me/about")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "About"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/h2"
        )[0].text
        assert textVal == "Meet the Team"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[3]/h2"
        )[0].text
        assert textVal == "Stats"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[6]/h2"
        )[0].text
        assert textVal == "Tools"

    def test_cuisines_page(self):
        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cuisines"

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath("//a[@href = '/cuisines/2']")[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cuisines/2" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath("//a[@href = '/cuisines/10']")[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cuisines/10" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "//button[@aria-label = 'Go to page 5']"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()

        element = self.driver.find_elements_by_xpath("//a[@href = '/cuisines/60']")[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cuisines/60" in self.driver.current_url

    def test_cities_page(self):
        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cities"

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath("//a[@href = '/cities/11']")[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cities/11" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath("//a[@href = '/cities/4']")[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cities/4" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "//button[@aria-label = 'Go to page 5']"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()

        element = self.driver.find_elements_by_xpath("//a[@href = '/cities/63']")[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cities/63" in self.driver.current_url

    def test_restaurants_page(self):
        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Restaurants"

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath("//a[@href = '/restaurants/7']")[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/restaurants/7" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath("//a[@href = '/restaurants/10']")[
            0
        ]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert (
            "https://www.culturedfoodies.me/restaurants/10" in self.driver.current_url
        )

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "//button[@aria-label = 'Go to page 5']"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()

        element = self.driver.find_elements_by_xpath("//a[@href = '/restaurants/64']")[
            0
        ]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert (
            "https://www.culturedfoodies.me/restaurants/64" in self.driver.current_url
        )

    def test_cuisine_instance_page(self):
        self.driver.get("https://www.culturedfoodies.me/cuisines/51")
        self.driver.implicitly_wait(30)

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/section[1]/h5[1]"
        )[0].text
        assert textVal == "Alpha 3 Code:"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/h5[4]"
        )[0].text
        assert textVal == "Translations"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/section[3]/h5[1]"
        )[0].text
        assert textVal == "Restaurants with this cuisines"

    def test_city_instance_page(self):
        self.driver.get("https://www.culturedfoodies.me/cities/133")
        self.driver.implicitly_wait(30)

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/section[1]/h2"
        )[0].text
        assert textVal == "About the City"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div/h4"
        )[0].text
        assert textVal == "Map Location"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/section[2]/h6[1]"
        )[0].text
        assert textVal == "Business Freedom"

    def test_restaurant_instance_page(self):
        self.driver.get("https://www.culturedfoodies.me/restaurants/3263")
        self.driver.implicitly_wait(30)

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/body/div/div/div/div"
        )[0].text
        assert textVal == "Indian Street Cafe"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/body/div/div/div/p[2]"
        )[0].text
        assert textVal == "Average Rating: 3.1"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/body/div/div/div/p[1]"
        )[0].text
        assert textVal == "Address: 927 E Arques Ave #141, Sunnyvale, CA 94085, USA"

    def finishTests(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
