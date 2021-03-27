import unittest
import selenium
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

class Selenium_Tests(unittest.TestCase):
    def setup(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        self.driver = webdriver.Chrome(
            "../chromedriver", options=chrome_options
        )


    def test_homepage_and_nav(self):
        self.driver.get("https://www.culturedfoodies.me")
        self.driver.implicitly_wait(30)
        assert self.driver.title == "Cultured Foodies"

        header = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/body/header/div"
        )[0].text
        assert header == "Welcome fellow Foodie!"

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[1]"
        )[0].click()
        assert "https://www.culturedfoodies.me/about" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[2]"
        )[0].click()
        assert "https://www.culturedfoodies.me/cuisines" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[3]"
        )[0].click()
        assert "https://www.culturedfoodies.me/cities" in self.driver.current_url

        self.driver.get("https://www.culturedfoodies.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/div/a[4]"
        )[0].click()
        assert "https://www.culturedfoodies.me/restaurants" in self.driver.current_url





if __name__ == '__main__':
	unittest.main()


