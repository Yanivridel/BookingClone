import pytest
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime
# Fixture for setting up the WebDriver
@pytest.fixture(scope="module")
def driver():
    # Set up the Chrome WebDriver with options
    options = webdriver.ChromeOptions()
    options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.maximize_window()
    driver.get("http://localhost:5173")
    # Yield the driver to be used in tests
    yield driver
    
    # Clean up and close the driver after tests are done
    driver.quit()
#Home page Result Page
# Home page display test
def test_home_page(driver):
    home_page = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "(//div[@class='p-1 pt-[346px] max-w-[1100px] mx-auto'])[1]"))
    )
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    assert home_page.is_displayed(), "Home page is not displayed."
def test_language_button(driver):
    language = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "(//img[@alt='state flag avatar for languages change'])[1]"))
    )
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    language.click()
    
    time.sleep(1)
    
    
   
def test_hebrew_button(driver):
    hebrew_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//body/div[@role='dialog']/div[2]/button[1]/span[1]/img[1]"))
    )
    hebrew_button.click()
    
    time.sleep(1)
def test_language_button_new(driver):
    language_new = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "(//img[@alt='state flag avatar for languages change'])[1]"))
    )
    language_new.click()
    time.sleep(1)
    
def test_english_button(driver):
    english_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "(//img[contains(@alt,'state flag avatar for languages change')])[11]"))
    )
    english_button.click()
    
#----------------------------------------
def test_countries_scroll(driver):
    countries_locator = (By.XPATH, "//body/div/div/div/div/div/div/div/div[4]/div[1]/div[1]/img[1]")
    
    countries = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(countries_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", countries)
    
    time.sleep(1)
    
def test_hotels_scroll(driver):
    hotels_locator = (By.XPATH, "//h2[normalize-space()='Stay at our top unique properties']")
    
    hotels = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(hotels_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", hotels)
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    time.sleep(1)
    
def test_search_scroll(driver):
    search_locator = (By.XPATH, "(//div[@class='border text-card-foreground shadow border-search flex flex-col md rounded-[8px] p-1 bg-search gap-1 search:flex-row font-medium justify-items-stretch'])[1]")
    
    search = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(search_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", search)
    
    time.sleep(1)
    
    
# Search component display test
def test_search(driver):
    try:
        search = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "(//div[@class='border text-card-foreground shadow border-search flex flex-col md rounded-[8px] p-1 bg-search gap-1 search:flex-row font-medium justify-items-stretch'])[1]"))
        )
        driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
        assert search.is_displayed(), "Search component is not displayed."
    except Exception as e:
        print("Error:", e)
        
        
# "Where are you going?" button click test
def test_where_you_going_btn(driver):
    try:
        where_you_going_btn = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Where are you going?']"))
        )
        where_you_going_btn.click()
        where_you_going_btn.send_keys("Paris")
    except Exception as e:
        print("Error:", e)
# Date order test
def test_date_order(driver):
    date_order = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "(//div[@class='py-1 px-2'])[1]"))
    )
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    date_order.click()
# Calendar test
def test_calender(driver):
    calender = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Calendar']"))
    )
    calender.click()
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
# Adult button test
def test_adult_button(driver):
    adult_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@class='flex-grow py-1 px-2 focus:outline-none placeholder:text-black placeholder:font-medium flex flex gap-2']"))
    )
    adult_button.click()
# Adult plus button test
def test_adult_plus_button(driver):
    adult_plus_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, '(//button[@class="text-lg fill-blue-600"])[1]'))
    )
    adult_plus_button.click()
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
# Done button test
# def test_done_button(driver):
#     done_button = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.XPATH, "//button[normalize-space()='Done']"))
#     )
    
#     # Manually scroll the page by 60px
#     driver.execute_script("window.scrollBy(0, 6000);")
    
#     # Wait for the element to be clickable after scrolling
#     WebDriverWait(driver, 10).until(
#         EC.element_to_be_clickable(done_button)
#     )
    
#     # Click the "Done" button
#     done_button.click()
        
def test_click_search_button(driver):
    search_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Search']"))
    )
    search_button.click()
    
    time.sleep(5)
    
#Search Result Page
    
def test_list_button(driver):
    grid_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//body//div//div//div//div//div//div//div//div//div//label//div//div[contains(text(),'List')]"))
    )
    grid_button.click()
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    time.sleep(5)
def test_grid_button(driver):
    grid_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "(//div[contains(text(),'Grid')])[1]"))
    )
    grid_button.click()
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    time.sleep(5)
    
def test_filter_scroll(driver):
    filter_locator = (By.XPATH, "//body/div/div/div/div/div/div/div/div/div[4]")
    
    filter = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(filter_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", filter)
    
    time.sleep(5)
    
def test_up_page_scroll(driver):
    up_page_locator = (By.XPATH, "(//div[@class='border p-4 flex justify-center'])[1]")
    
    up_page = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(up_page_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", up_page)
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    time.sleep(5)
    
def test_hotel_filter_button(driver):
    hotel_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "(//button[@id='hotel'])[1]"))
    )
    hotel_button.click()
    
    time.sleep(5)
    
def test_hotel_button(driver):
    hotel_element_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[normalize-space()='Rephael House Boutique Hotel']"))
    )
    hotel_element_button.click()
    
    time.sleep(2)
def test_description_element_scroll(driver):
    description_element_locator = (By.XPATH, "(//div[contains(@class,'flex gap-3 flex-wrap')])[1]")
    
    description_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(description_element_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", description_element)
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    time.sleep(2)
    
    
    
def test_table_element_scroll(driver):
    table_element_locator = (By.XPATH, "(//div[contains(@class,'w-full flex gap-2 overflow-scroll py-2 _scrollContainer_z6rqg_1')])[1]")
    
    table_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(table_element_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", table_element)
    
    time.sleep(2)
    
    
def test_still_looking_scroll(driver):
    still_looking_element_locator = (By.XPATH, "(//p[normalize-space()='Travelers are asking'])[1]")
    
    still_looking_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(still_looking_element_locator)
    )
    
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", still_looking_element)
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    time.sleep(2)
    
def test_still_looking_button(driver):
    still_looking_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "(//button[normalize-space()='Ask a question'])[1]"))
    )
    still_looking_button.click()
    
    time.sleep(2)
    
def test_still_looking_text_area(driver):
    still_looking_text_area = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//form[@class='border']//textarea"))
    )
    still_looking_text_area.click()
    still_looking_text_area.send_keys("Hello World!")
    
    time.sleep(2)
    
def test_still_looking_text_area_quit(driver):
    still_looking_text_area_quit = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "(//*[name()='svg'][@class='lucide lucide-x h-4 w-4'])[1]"))
    )
    still_looking_text_area_quit.click()
    
    time.sleep(2)
    
    
def test_internet_element_scroll(driver):
    internet_element_locator = (By.XPATH, "(//div)[773]")
    
    internet_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(internet_element_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", internet_element)
    driver.save_screenshot(f"screenshots/screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
    time.sleep(2)
    
def test_faq_element_scroll(driver):
    faq_element_locator = (By.XPATH, "(//div[@id='The fine print'])[1]")
    
    faq_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(faq_element_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", faq_element)
    
    time.sleep(5)
    
    
def test_check_button(driver):
    check_element_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "(//a[@class='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#006ce4] text-primary-foreground shadow hover:bg-[#0057b8] h-9 px-4 py-2 text-sm'][normalize-space()='See availability'])[4]"))
    )
    check_element_button.click()
    
    time.sleep(5)
def test_up_hotel_page_scroll(driver):
    up_hotel_page_locator = (By.XPATH, "(//div[@class='flex justify-between items-center p-2 '])[1]")
    
    up_hotel_page = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(up_hotel_page_locator)
    )
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", up_hotel_page)
    
    time.sleep(5)