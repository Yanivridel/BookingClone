import pytest
import requests
import pymongo
import allure
from pymongo import MongoClient

BASE_URL = "http://localhost:3000/"

# SUCCESS GET AUTOCOMPLETE
@allure.title("Test Get Autocomplete Locations")
@pytest.mark.parametrize("search_text", [
    "Tel Aviv",
    "Jerusalem",
    "Haifa",
    "Rishon LeZion",
    "Petah Tikva",
    "Eilat",
    "Ashdod",
    "Beersheba",
    "Netanya",
    "Holon",
    "Bnei Brak",
    "Ramat Gan",
    "is",
    "Isra",
    "Israe",
    "Israel",
    "Rishon",
    "Ash",
    "Beer",
    "Netan",
])
def test_get_autocomplete_locations(search_text):
    response = requests.get(
        f"{BASE_URL}api/property/location-search-autocomplete/{search_text}",
    )
    
    res_json = response.json()
    
    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert 'data' in res_json
    assert isinstance(res_json['data'], list)

# SUCCESS GET PROPERTY BY ID
@pytest.mark.parametrize("property_id", [
    "677ebec78be19680bdc0aa7f",
    "67876637313a94ca77e39b87",
])
@allure.title("Test Get Property By ID - Success")
def test_get_property_by_id_success(property_id):
    response = requests.get(f"{BASE_URL}api/property/{property_id}")
    res_json = response.json()
    
    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert 'data' in res_json
    assert res_json['data']['_id'] == property_id

# FAIL GET PROPERTY BY ID
@pytest.mark.parametrize("property_id", [
    "000000000000000000000000",  # Non-existent ObjectId
    "invalid_id",  # Invalid format
    "12345",  # Too short to be a valid ObjectId
    "67876637313a94ca77e39b15", # valid ObjectId but doesn't exists
])
@allure.title("Test Get Property By ID - Fail")
def test_get_property_by_id_fail(property_id):
    response = requests.get(f"{BASE_URL}api/property/{property_id}")
    res_json = response.json()
    
    assert response.status_code in {404, 500}
    assert res_json['status'] == 'error'
    assert 'message' in res_json

# SUCCESS GET PROPERTY CARD BY ID
@pytest.mark.parametrize("property_id", [
    "677ebec78be19680bdc0aa7f",
    "67876637313a94ca77e39b87",
])
@allure.title("Test Get Property Card By ID - Success")
def test_get_property_card_by_id_success(property_id):
    response = requests.get(f"{BASE_URL}api/property/card/{property_id}")
    res_json = response.json()
    
    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert 'data' in res_json
    assert res_json['data']['_id'] == property_id

# FAIL GET PROPERTY CARD BY ID
@pytest.mark.parametrize("property_id", [
    "000000000000000000000000",  # Non-existent ObjectId
    "invalid_id",  # Invalid format
    "12345",  # Too short to be a valid ObjectId
    "67876637313a94ca77e39b15", # valid ObjectId but doesn't exists
])
@allure.title("Test Get Property Card By ID - Fail")
def test_get_property_card_by_id_fail(property_id):
    response = requests.get(f"{BASE_URL}api/property/card/{property_id}")
    res_json = response.json()
    
    assert response.status_code in {404, 500}
    assert res_json['status'] == 'error'
    assert 'message' in res_json
