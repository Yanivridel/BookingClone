import pytest
import requests
import pymongo
import allure
from pymongo import MongoClient

BASE_URL = "http://localhost:3000/"

# SUCCESS GET REVIEWS BY PROPERTY ID
@allure.title("Test Get All Reviews for Property - Success")
@pytest.mark.parametrize("property_id", [
    "677ebec78be19680bdc0aa7f",
    "67876637313a94ca77e39b87",
])
def test_get_all_reviews_success(property_id):
    response = requests.get(f"{BASE_URL}api/review/{property_id}")
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert 'data' in res_json
    assert isinstance(res_json['data'], list)  # Should return a list of reviews

    for review in res_json['data']:
        assert 'userId' in review
        assert 'fName' in review['userId']

# FAIL GET REVIEWS BY PROPERTY ID
@allure.title("Test Get All Reviews for Property - Fail")
@pytest.mark.parametrize("property_id", [
    "invalid_id",  # Invalid format
    "12345",  # Too short to be a valid ObjectId
])
def test_get_all_reviews_fail(property_id):
    response = requests.get(f"{BASE_URL}api/review/{property_id}")
    res_json = response.json()

    assert response.status_code in [400, 404, 500]
    assert res_json['status'] == 'error'
    assert 'message' in res_json