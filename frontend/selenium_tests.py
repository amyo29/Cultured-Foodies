import unittest
import selenium
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

class Selenium_Tests(unittest.TestCase):
    def setup(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        self.driver = webdriver.Chrome("../chromedriver", options=chrome_options)

    def test_homepage_and_nav(self):
        self.driver.get("https://www.culturedfoodies.me")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cultured Foodies"

        header = self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/body/header/div"
        )[0].text
        assert header == "Welcome fellow Foodie!"

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[1]/nav/div/div/a[1]"
        )[0].click()
        assert "https://www.culturedfoodies.me/about" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[1]/nav/div/div/a[2]"
        )[0].click()
        assert "https://www.culturedfoodies.me/cuisines" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[1]/nav/div/div/a[3]"
        )[0].click()
        assert "https://www.culturedfoodies.me/cities" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[1]/nav/div/div/a[4]"
        )[0].click()
        assert "https://www.culturedfoodies.me/restaurants" in self.driver.current_url

    def test_aboutpage(self):
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

    def test_cuisinespage(self):
        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cuisines"

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/div[1]/div[2]/div/div/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/cuisines/2" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/div[4]/div[1]/div/div/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/cuisines/10" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cuisines")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/nav/ul/li[6]/button"
        )[0].click()

        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/div[4]/div[3]/div/div/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/cuisines/61" in self.driver.current_url

    def test_citiespage(self):
        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cities"

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/div[4]/div[2]/div/div/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/cities/11" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/div[2]/div[1]/div/div/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/cities/4" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/cities")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/nav/ul/li[5]/button"
        )[0].click()

        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/div[4]/div[1]/div/div/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/cities/57" in self.driver.current_url

    def test_restaurantspage(self):
        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Restaurants"

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/table/tbody/tr[7]/td[2]/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/restaurants/7" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/table/tbody/tr[1]/td[2]/a"
        )[0].click()
        assert "https://www.culturedfoodies.me/restaurants/1" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me/restaurants")
        self.driver.implicitly_wait(30)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/nav/ul/li[6]/button"
        )[0].click()

        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div/div/table/tbody/tr[5]/td[2]/a"
        )[0].click()
        assert (
        "https://www.culturedfoodies.me/restaurants/64" in self.driver.current_url
        )

    def test_cityinstancepage(self):
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

    def test_cuisineinstancepage(self):
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

    def test_restaurantinstancepage(self):
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

