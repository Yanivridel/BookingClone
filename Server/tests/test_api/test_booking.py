import requests
import pytest
import allure
from datetime import datetime, timedelta

BASE_URL = "http://localhost:3000/"

# Helper function to generate check-in and check-out dates
def get_date_range(days_offset=1, duration=2):
    check_in = (datetime.now() + timedelta(days=days_offset)).strftime('%Y-%m-%d')
    check_out = (datetime.now() + timedelta(days=days_offset + duration)).strftime('%Y-%m-%d')
    return check_in, check_out

# Valid room data
VALID_ROOMS = [
    {"roomId": "677cd3b34bf1376ff5a3838e", "count": 2},
]

# Take & UnTake Rooms - Success
@pytest.mark.parametrize("rooms, expected_status", [
    (VALID_ROOMS, 200),
])
@allure.title("Test Take & UnTake Rooms - Success")
def test_take_untake_rooms_success(rooms, expected_status):
    check_in, check_out = get_date_range()

    # Step 1: Take rooms
    response = requests.patch(f"{BASE_URL}api/booking/take-rooms", json={
        "checkIn": check_in,
        "checkOut": check_out,
        "rooms": rooms,
        "action": "take"
    })
    assert response.status_code == expected_status
    assert response.text == "Success"

    # Step 2: UnTake rooms to clean up
    response = requests.patch(f"{BASE_URL}api/booking/take-rooms", json={
        "checkIn": check_in,
        "checkOut": check_out,
        "rooms": rooms,
        "action": "untake"
    })
    assert response.status_code == expected_status
    assert response.text == "Success"

# Take More Rooms Than Available - Fail
@pytest.mark.parametrize("rooms, expected_status", [
    ([{"roomId": "65fabc1234567890abcd1234", "count": 9999}], 500),
])
@allure.title("Test Take More Rooms Than Available - Fail")
def test_take_too_many_rooms_fail(rooms, expected_status):
    check_in, check_out = get_date_range()

    response = requests.patch(f"{BASE_URL}api/booking/take-rooms", json={
        "checkIn": check_in,
        "checkOut": check_out,
        "rooms": rooms,
        "action": "take"
    })
    assert response.status_code == expected_status

# Invalid Room ID - Fail
@pytest.mark.parametrize("rooms, expected_status", [
    # ❌ ERROR: Invalid Room ID
    ([{"roomId": "invalid_id", "count": 2}], 500),
])
@allure.title("Test Invalid Room ID - Fail")
def test_invalid_room_id_fail(rooms, expected_status):
    check_in, check_out = get_date_range()

    response = requests.patch(f"{BASE_URL}api/booking/take-rooms", json={
        "checkIn": check_in,
        "checkOut": check_out,
        "rooms": rooms,
        "action": "take"
    })
    assert response.status_code == expected_status

# Invalid Date Range - Fail
@pytest.mark.parametrize("check_in, check_out, expected_status", [
    (get_date_range(days_offset=5, duration=-1)[0], get_date_range(days_offset=3, duration=-1)[1], 500),
])
@allure.title("Test Invalid Date Range - Fail")
def test_invalid_date_range_fail(check_in, check_out, expected_status):
    response = requests.patch(f"{BASE_URL}api/booking/take-rooms", json={
        "checkIn": check_in,
        "checkOut": check_out,
        "rooms": VALID_ROOMS,
        "action": "take"
    })
    assert response.status_code == expected_status

# Missing Parameters - Fail
@pytest.mark.parametrize("data, expected_status", [
    ({"checkIn": "2024-05-01", "rooms": VALID_ROOMS, "action": "take"}, 400),
])
@allure.title("Test Missing Parameters - Fail")
def test_missing_parameters_fail(data, expected_status):
    response = requests.patch(f"{BASE_URL}api/booking/take-rooms", json=data)
    assert response.status_code == expected_status

# Invalid Action Type - Fail
@pytest.mark.parametrize("action, expected_status", [
    ("reserve", 400),
    ("taking", 400),
    ("taken", 400),
    ("reserving", 400),
    ("reserver", 400),
])
@allure.title("Test Invalid Action Type - Fail")
def test_invalid_action_fail(action, expected_status):
    check_in, check_out = get_date_range()

    response = requests.patch(f"{BASE_URL}api/booking/take-rooms", json={
        "checkIn": check_in,
        "checkOut": check_out,
        "rooms": VALID_ROOMS,
        "action": action
    })
    assert response.status_code == expected_status
