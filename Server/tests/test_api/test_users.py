import pytest
import requests
import pymongo
import allure
from pymongo import MongoClient

BASE_URL = "http://localhost:3000/"
client = MongoClient("mongodb+srv://booking-clone:wAXkf1pjMWI2KogM@bookingcluster.d3jvc.mongodb.net/booking?retryWrites=true&w=majority&appName=BookingClone")
db = client.booking
user_token = None
user_not_found_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FjNjI2NDFiODJlMTk4ODgyOGIwZDIiLCJpYXQiOjE3MzkzNTgyMzksImV4cCI6MTczOTk2MzAzOX0.uj5V-nuXHviUllSPsYRUHPWeFShFGGFJ44uMfV6O5k8"
invalid_input = "invalidInput"


# SUCCESS LOGIN
@allure.title('Test Success Email Code & Login')
def test_send_email_code():
    mock_collection = db.verifications

    response = requests.post(
        f'{BASE_URL}api/users/send-code',
        json={"email": "test@example.com"}
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'code sent successfully'

    saved_code_entry = mock_collection.find_one({"email": "test@example.com"})
    saved_code = saved_code_entry["verificationCode"]

    assert saved_code

    login_response = requests.post(
        f'{BASE_URL}api/users/signin',
        json={
            "email": "test@example.com",
            "code": saved_code
        }
    )
    login_res_json = login_response.json()

    assert login_response.status_code in {200, 201}
    assert login_res_json['status'] == 'success'
    assert 'token' in login_res_json

    global user_token
    user_token = login_res_json["token"]

# FAIL LOGIN
@allure.title('Test Fail Send Email Code & Login')
def test_send_email_code_fail():
    # Simulate sending email without an email parameter
    response = requests.post(
        f'{BASE_URL}api/users/send-code',
        json={}  # Missing the email parameter
    )
    res_json = response.json()

    assert response.status_code == 400
    assert res_json['status'] == 'error'
    assert res_json['message'] == 'Missing required parameters'

    # Simulate invalid code during login
    login_response = requests.post(
        f'{BASE_URL}api/users/signin',
        json={
            "email": "test@example.com",
            "code": invalid_input
        }
    )
    login_res_json = login_response.json()

    assert login_response.status_code == 400
    assert login_res_json['status'] == 'error'
    assert login_res_json['message'] == 'Invalid or expired code'

    # Try with a non-existing email
    non_existing_email = "nonexistent@example.com"
    login_response = requests.post(
        f'{BASE_URL}api/users/signin',
        json={
            "email": non_existing_email,
            "code": invalid_input
        }
    )
    login_res_json = login_response.json()

    assert login_response.status_code == 400
    assert login_res_json['status'] == 'error'
    assert login_res_json['message'] == 'Invalid or expired code'

# SUCCESS LOGOUT
@allure.title('Test Success Logout')
def test_logout_success():
    response = requests.post(
        f'{BASE_URL}api/users/logout',
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Logged out successfully'

# SUCCESS GET SELF
@allure.title('Test Get Self Endpoint with Valid Token')
def test_get_self_valid_token():
    print("user_token", user_token)
    response = requests.get(
        f'{BASE_URL}api/users/get-self',
        cookies={"token": user_token}
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert 'data' in res_json
    assert 'email' in res_json['data']

# FAIL GET SELF - missing token
@allure.title('Test Get Self Endpoint Missing Token')
def test_get_self_missing_token():
    # Send a request without the token in cookies
    response = requests.get(
        f'{BASE_URL}api/users/get-self'
    )
    res_json = response.json()

    # Assertions for missing token
    assert response.status_code == 400
    assert res_json['status'] == 'error'
    assert res_json['message'] == 'Missing required authorization token'

# FAIL GET SELF - Invalid token
@allure.title('Test Get Self Endpoint Invalid Token')
def test_get_self_invalid_token():
    response = requests.get(
        f'{BASE_URL}api/users/get-self',
        cookies={"token": invalid_input}  # Invalid token
    )
    res_json = response.json()

    assert response.status_code == 500
    assert res_json['status'] == 'error'
    assert res_json['message'] == 'An unexpected error occurred'

# SUCCESS EDIT USER
# @allure.title('Test Edit Profile Success')
@pytest.mark.parametrize("update_data", [
    {"fName": "John"},
    {"lName": "Doe"},
    {"username": "john_doe123"},
    {"password": "newpassword123"},
    {"phoneNumber": "1234567890"},
    {"birthday": "2011-01-28T00:00:00Z"},
    {"gender": "male"},
    {"user_image": "https://example.com/user.jpg"},
    {"location": {"country": "USA", "region": "California", "city": "Los Angeles", "addressLine": "123 Street"}},
    {"passport": {"fName": "John", "lName": "Doe", "country": "USA", "number": "A12345678", "expires": "2030-01-01"}},
    {"creditCard": {"name": "John Doe", "number": 1234567812345678, "expires": "2025-01-01"}},
    {"coinType": "USD"},
    {"language": "English"},
    {"notifications": {"dealsAndOffers": {"dealDiscovery": True, "rewards": False, "searchAssistance": True}}},
    {"geniusLevel": 3},
    {"location": {"country": "Canada", "region": "Ontario", "city": "Toronto", "addressLine": "456 Maple Ave"}},
    {"phoneNumber": "9876543210"},
    {"fName": "Jane", "lName": "Smith", "username": "jane_smith123"},
    {"password": "newsecurepassword456" },
    {"user_image": "https://example.com/jane.jpg", "birthday": "1990-05-20T00:00:00Z"},
    {"location": {"country": "Canada", "region": "Ontario", "city": "Toronto", "addressLine": "456 Maple Ave"}},
    {"passport": {"fName": "Jane", "lName": "Smith", "country": "Canada", "number": "B98765432", "expires": "2035-01-01"}},
    {"coinType": "CAD"},
    {"language": "French"},
    {"notifications": {"geniusLoyaltyProgram": {"geniusEmails": True, "geniusMembershipProgress": False}}},
    {"geniusLevel": 2, "language": "French"},
    {"phoneNumber": "5551234567", "user_image": "https://example.com/smith.jpg", "location": {"country": "UK", "region": "England", "city": "London", "addressLine": "789 London Rd"}},
    {"gender": "female"},
    {"location": {"country": "Australia", "region": "New South Wales", "city": "Sydney", "addressLine": "101 Sydney St"}},
    {"creditCard": {"name": "Jane Smith", "number": 9876543212345678, "expires": "2026-12-01"}},
    {"notifications": {"attractionsAndTravelDeals": {"dealsAndAttraction": True, "flights": False}}},
    {"location": {"country": "Germany", "region": "Bavaria", "city": "Munich", "addressLine": "12 Neuschwanstein Rd"}},
    {"phoneNumber": "2223334444", "birthday": "1985-08-15T00:00:00Z"},
    {"username": "jack_smith55", "gender": "other"},
    {"passport": {"fName": "Jack", "lName": "Smith", "country": "UK", "number": "C11223344", "expires": "2024-11-30"}},
    {"creditCard": {"name": "Jack Smith", "number": 1122334455667788, "expires": "2027-05-15"}},
    {"coinType": "EUR"},
    {"language": "Spanish"},
    {"notifications": {"bookingProductsAndServices": {"bookingForBusiness": True, "feedbackAndSurveys": False}}},
    {"location": {"country": "Italy", "region": "Lazio", "city": "Rome", "addressLine": "101 Via Roma"}},
    {"user_image": "https://example.com/jack.jpg", "birthday": "1995-12-01T00:00:00Z", "phoneNumber": "3334445555"},
    {"fName": "Emily", "lName": "Johnson", "username": "emily_johnson", "gender": "female"},
    {"fName": "Michael", "lName": "Brown", "username": "mike_brown123", "password": "password123"},
    {"phoneNumber": "4445556666", "birthday": "1992-06-10T00:00:00Z"},
    {"user_image": "https://example.com/michael.jpg", "location": {"country": "France", "region": "Île-de-France", "city": "Paris", "addressLine": "10 Champs-Élysées"}},
    {"passport": {"fName": "Michael", "lName": "Brown", "country": "USA", "number": "D23456789", "expires": "2035-06-15"}},
    {"creditCard": {"name": "Michael Brown", "number": 6677889900112233, "expires": "2028-02-28"}},
    {"coinType": "GBP"},
    {"language": "German"},
    {"notifications": {"emailNotification": {"soonOrders": True, "reviewOrders": False, "offerConfirmOrders": True}}},
    {"geniusLevel": 1},
    {"location": {"country": "Netherlands", "region": "North Holland", "city": "Amsterdam", "addressLine": "52 Dam Square"}},
    {"user_image": "https://example.com/emily.jpg"},
    {"notifications": {"bookingProductsAndServices": {"productsAndNewsNotifications": True}}},
    {"location": {"country": "USA", "region": "New York", "city": "New York", "addressLine": "100 Park Ave"}},
    {"passport": {"fName": "Emily", "lName": "Johnson", "country": "USA", "number": "E98765432", "expires": "2030-07-04"}},
    {"creditCard": {"name": "Emily Johnson", "number": 1122334455667788, "expires": "2029-09-12"}},
    {"coinType": "AUD"},
    {"language": "Italian"},
    {"notifications": {"geniusLoyaltyProgram": {"geniusEmails": False, "geniusMembershipProgress": True}}},
    {"geniusLevel": 3, "location": {"country": "Spain", "region": "Catalonia", "city": "Barcelona", "addressLine": "1 Rambla Catalunya"}},
    {"phoneNumber": "5556667777", "birthday": "1993-07-15T00:00:00Z"},
    {"fName": "Sophia", "lName": "Miller", "username": "sophia_miller", "gender": "female", "password": "strongpassword789"},
    {"notifications": {"transportation": {"publicTransport": True, "taxis": False, "rentalCars": True}}},
    {"location": {"country": "Portugal", "region": "Lisbon", "city": "Lisbon", "addressLine": "50 Av. da Liberdade"}},
    {"user_image": "https://example.com/sophia.jpg", "birthday": "1999-05-22T00:00:00Z"},
    {"passport": {"fName": "Sophia", "lName": "Miller", "country": "Portugal", "number": "F11223344", "expires": "2032-08-20"}},
    {"creditCard": {"name": "Sophia Miller", "number": 4455667788990011, "expires": "2031-10-13"}},
    {"coinType": "CHF"},
    {"language": "Dutch"},
    {"notifications": {"attractionsAndTravelDeals": {"dealsAndAttraction": True, "flights": True}}},
    {"fName": "Oliver", "lName": "Davis", "username": "oliver_davis1"},
    {"gender": "other"},
    {"phoneNumber": "9990001111", "birthday": "1997-04-04T00:00:00Z"},
    {"password": "securepassword654"},
    {"location": {"country": "Belgium", "region": "Brussels", "city": "Brussels", "addressLine": "15 Rue Royale"}},
    {"user_image": "https://example.com/oliver.jpg", "language": "English"},
    {"passport": {"fName": "Oliver", "lName": "Davis", "country": "Belgium", "number": "G66778899", "expires": "2031-09-11"}},
    {"coinType": "SEK"},
    {"language": "Swedish"},
    {"notifications": {"bookingProductsAndServices": {"feedbackAndSurveys": True}}},
    {"geniusLevel": 2, "language": "Russian"},
    {"location": {"country": "Ireland", "region": "Dublin", "city": "Dublin", "addressLine": "34 Grafton Street"}},
    {"phoneNumber": "6667778888", "birthday": "1988-11-22T00:00:00Z"},
    {"fName": "James", "lName": "Taylor", "username": "james_taylor123"},
    {"gender": "male"},
    {"user_image": "https://example.com/james.jpg", "location": {"country": "UK", "region": "England", "city": "London", "addressLine": "123 Oxford St"}},
    {"passport": {"fName": "James", "lName": "Taylor", "country": "UK", "number": "H33445566", "expires": "2033-12-25"}},
    {"creditCard": {"name": "James Taylor", "number": 5566778899001122, "expires": "2028-03-17"}},
    {"coinType": "NOK"},
    {"language": "Norwegian"},
    {"notifications": {"dealDiscovery": {"flightDeals": True, "carRentalDeals": False}}},
    {"geniusLevel": 2},
    {"phoneNumber": "1231231231", "birthday": "1980-02-20T00:00:00Z"},
    {"user_image": "https://example.com/rosie.jpg", "location": {"country": "New Zealand", "region": "Auckland", "city": "Auckland", "addressLine": "5 Queen St"}},
    {"password": "password444"},
    {"coinType": "BRL"},
    {"language": "Portuguese"},
])
def test_edit_profile(update_data):
    """
    This test ensures that the `editProfile` function works for each possible data field in the user profile.
    """
    response = requests.patch(
        f'{BASE_URL}api/users/edit-profile',
        cookies={"token": user_token},
        json=update_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'User updated successfully'
    assert 'data' in res_json

# SUCCESS GET USER SEARCHES
@allure.title('Test Success Get User Searches')
def test_get_searches():
    response = requests.get(
        f'{BASE_URL}api/users/search',
        cookies={"token": user_token} 
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully found user searches'
    assert 'data' in res_json

# FAIL GET USER SEARCHES - user not found
@allure.title('Test Fail Get User Searches - User Not Found')
def test_get_searches_fail_user_not_found():
    response = requests.get(
        f'{BASE_URL}api/users/search',
        cookies={"token": user_not_found_token} 
    )
    res_json = response.json()

    assert response.status_code == 404
    assert res_json['status'] == 'error'
    assert res_json['message'] == 'User not found'

# FAIL GET USER SEARCHES - Auth Denied
@allure.title('Test Fail Get User Searches - Auth Denied')
def test_get_searches_fail_server_error():
    # Simulate server error (e.g., database connection issue)
    response = requests.get(
        f'{BASE_URL}api/users/search',
        cookies={"token": invalid_input} 
    )
    res_json = response.json()

    assert response.status_code == 401
    assert res_json['status'] == 'error'
    assert res_json['message'] == 'Invalid token'

# SUCCESS ADD SEARCH
@allure.title('Test Add Search')
def test_add_search():
    # Simulate adding a search
    search_data = {
        "action": "add",
        "search": {
            "location": {
            "country": "France",
            "region": "Île-de-France",
            "city": "Paris"
            },
            "date": {
                "startDate":  "2024-09-05",
                "endDate": "2024-09-10"
            },
            "options": {
                "adults": 1,
                "childrenAges": [1,2],
                "isAnimalAllowed": True,
                "rooms": 2
            }
        }
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},  # Use a valid token
        json=search_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully added to user array'

# ADD INTERESTED PROPERTY
@allure.title('Test Add Interested Property')
def test_add_interested_property():
    interested_data = {
        "action": "add",
        "interested": "678109aa824440db4b93a708"
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},
        json=interested_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully added to user array'

# DELETE INTERESTED PROPERTY
@allure.title('Test Delete Interested Property')
def test_delete_interested_property():
    interested_data = {
        "action": "delete",
        "interested": "678109aa824440db4b93a708"
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},
        json=interested_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully removed from user array'

# ADD SAVED LIST
@allure.title('Test Add Saved List')
def test_add_saved_list():
    saved_list_data = {
        "action": "add",
        "savedList": {
            "name": "Vacation Plans",
            "propertyId": "678109aa824440db4b93a708"
        }
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},
        json=saved_list_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully added to user array'

# ADD PROPERTY TO SAVED LIST
@allure.title('Test Add Property to Saved List')
def test_add_saved_list():
    saved_list_data = {
        "action": "add",
        "savedList": {
            "name": "Vacation Plans",
            "propertyId": "677ebec78be19680bdc0aa7a"
        }
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},
        json=saved_list_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully added to user array'

# DELETE PROPERTY FROM SAVED LIST
@allure.title('Test Delete Saved List')
def test_delete_saved_list():
    saved_list_data = {
        "action": "delete",
        "savedList": {
            "name": "Vacation Plans",
            "propertyId": "678109aa824440db4b93a708"
        }
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},
        json=saved_list_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully removed from user array'

# DELETE COMPLETE SAVED LIST
@allure.title('Test Delete Complete Saved List')
def test_add_saved_list():
    saved_list_data = {
        "action": "delete",
        "savedList": {
            "name": "Vacation Plans",
        }
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},
        json=saved_list_data
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'Successfully removed from user array'

# INVALID ACTION TYPE
@allure.title('Test Invalid Action Type')
def test_invalid_action_type():
    invalid_action_data = {
        "action": "update",
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},
        json=invalid_action_data
    )
    res_json = response.json()

    assert response.status_code == 400
    assert res_json['status'] == 'error'
    assert res_json['message'] == 'Invalid action type'

# MISSING REQUIRED FIELDS
@allure.title('Test Missing Required Fields')
def test_missing_required_fields():
    missing_fields_data = {
        "action": "add",  # No search, interested, or savedList
    }

    response = requests.patch(
        f'{BASE_URL}api/users/modify-arrays',
        cookies={"token": user_token},  # Use a valid token
        json=missing_fields_data
    )
    res_json = response.json()

    assert response.status_code == 400
    assert res_json['status'] == 'error'
    assert res_json['message'] == 'Missing required fields'

# SUCCESS DELETE ACCOUNT
# @allure.title('Test Delete Account')
def test_delete_account():
    response = requests.delete(
        f'{BASE_URL}api/users/delete-account',
        cookies={"token": user_token},
    )
    res_json = response.json()

    assert response.status_code == 200
    assert res_json['status'] == 'success'
    assert res_json['message'] == 'User account deleted successfully'







