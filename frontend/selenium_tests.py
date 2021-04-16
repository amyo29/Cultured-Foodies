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

        summary = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div/div/div[1]/div[1]"
        )[0].text
        assert "Cultured Foodies" in summary

    def test_navbar(self):
        self.driver.get("https://www.culturedfoodies.me")

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("/html/body/div/div/div[1]/nav/button")[
            0
        ].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[1]"
        )[0].click()
        assert "https://www.culturedfoodies.me/about" in self.driver.current_url

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("/html/body/div/div/div[1]/nav/a/b")[
            0
        ].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[2]"
        )[0].click()
        assert "https://www.culturedfoodies.me/cuisines" in self.driver.current_url

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("/html/body/div/div/div[1]/nav/a/b")[
            0
        ].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[3]"
        )[0].click()
        assert "https://www.culturedfoodies.me/cities" in self.driver.current_url

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath("/html/body/div/div/div[1]/nav/a/b")[
            0
        ].click()

        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[4]"
        )[0].click()
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
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[1]/div[1]/div[2]/div/div/a"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cuisines/2" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[1]/div[4]/div[1]/div/div/a"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cuisines/10" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)

        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[2]/nav/ul/li[6]/button"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()

        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[1]/div[4]/div[3]/div/div/a"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cuisines/60" in self.driver.current_url

    def test_cities_page(self):
        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cities"

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/body/div[2]/div[2]/div[1]/div[5]/div[2]/a"
        )[0]
        element.click()
        assert "https://www.culturedfoodies.me/cities/11" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div/div[2]/div[1]/div[3]/div[1]/a"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cities/4" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div/div[2]/div[2]/nav/ul/li[6]/button"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()

        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div/div[2]/div[1]/div[5]/div[3]/a"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/cities/60" in self.driver.current_url

    def test_restaurants_page(self):
        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Restaurants"

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div[3]/table/tbody/tr[7]/td[1]"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/restaurants/7" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div[3]/table/tbody/tr[1]/td[1]"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert "https://www.culturedfoodies.me/restaurants/1" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/table/tfoot/tr/td/div/div/div/div[3]/button[2]/span[1]/svg/path"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()

        element = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div[3]/table/tbody/tr[7]/td[1]"
        )[0]
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        assert (
            "https://www.culturedfoodies.me/restaurants/17" in self.driver.current_url
        )

    def test_cuisine_instance_page(self):
        self.driver.get("https://www.culturedfoodies.me/cuisines/51")
        self.driver.implicitly_wait(30)

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/div/div[2]/div/h1"
        )[0].text
        assert textVal == "Korean Cuisine"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/div/div[2]/div/div[2]/div/div[2]/div/a/h3"
        )[0].text
        assert textVal == "Dishes from Korea (Republic of)"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/div/div[2]/div/div[2]/div/div[5]/div[2]/div/div/h3"
        )[0].text
        assert textVal == "Restaurants with Korean cuisine"

    def test_city_instance_page(self):
        self.driver.get("https://www.culturedfoodies.me/cities/133")
        self.driver.implicitly_wait(30)

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/div/h1"
        )[0].text
        assert textVal == "Phoenix"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/div/div[4]/h2"
        )[0].text
        assert textVal == "Map Location"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/div/div[3]/div/h3"
        )[0].text
        assert textVal == "Cuisines of Phoenix"

    def test_restaurant_instance_page(self):
        self.driver.get("https://www.culturedfoodies.me/restaurants/3263")
        self.driver.implicitly_wait(30)

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/body/div/div/div/div/div/h5"
        )[0].text
        assert textVal == "Indian Street Cafe"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/body/div/div/div/div/div/p[5]"
        )[0].text
        assert textVal == "Average Rating: 3.1"

        textVal = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/body/div/div/div/div/div/p[2]"
        )[0].text
        assert textVal == "Address: 927 E Arques Ave #141, Sunnyvale, CA 94085, USA"

    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
