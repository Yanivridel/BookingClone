"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPaymentMethods = exports.EFeatures = exports.EPropertyHighlight = exports.EFacility = exports.ELanguage = exports.ECoinType = exports.EAccommodationType = exports.ECountry = void 0;
var ECountry;
(function (ECountry) {
    ECountry["Afghanistan"] = "Afghanistan";
    ECountry["Albania"] = "Albania";
    ECountry["Algeria"] = "Algeria";
    ECountry["Andorra"] = "Andorra";
    ECountry["Angola"] = "Angola";
    ECountry["AntiguaAndBarbuda"] = "Antigua and Barbuda";
    ECountry["Argentina"] = "Argentina";
    ECountry["Armenia"] = "Armenia";
    ECountry["Australia"] = "Australia";
    ECountry["Austria"] = "Austria";
    ECountry["Azerbaijan"] = "Azerbaijan";
    ECountry["Bahamas"] = "Bahamas";
    ECountry["Bahrain"] = "Bahrain";
    ECountry["Bangladesh"] = "Bangladesh";
    ECountry["Barbados"] = "Barbados";
    ECountry["Belarus"] = "Belarus";
    ECountry["Belgium"] = "Belgium";
    ECountry["Belize"] = "Belize";
    ECountry["Benin"] = "Benin";
    ECountry["Bhutan"] = "Bhutan";
    ECountry["Bolivia"] = "Bolivia";
    ECountry["BosniaAndHerzegovina"] = "Bosnia and Herzegovina";
    ECountry["Botswana"] = "Botswana";
    ECountry["Brazil"] = "Brazil";
    ECountry["Brunei"] = "Brunei";
    ECountry["Bulgaria"] = "Bulgaria";
    ECountry["BurkinaFaso"] = "Burkina Faso";
    ECountry["Burundi"] = "Burundi";
    ECountry["Cambodia"] = "Cambodia";
    ECountry["Cameroon"] = "Cameroon";
    ECountry["Canada"] = "Canada";
    ECountry["CapeVerde"] = "Cape Verde";
    ECountry["CentralAfricanRepublic"] = "Central African Republic";
    ECountry["Chad"] = "Chad";
    ECountry["Chile"] = "Chile";
    ECountry["China"] = "China";
    ECountry["Colombia"] = "Colombia";
    ECountry["Comoros"] = "Comoros";
    ECountry["Congo"] = "Congo";
    ECountry["CostaRica"] = "Costa Rica";
    ECountry["Croatia"] = "Croatia";
    ECountry["Cuba"] = "Cuba";
    ECountry["Cyprus"] = "Cyprus";
    ECountry["CzechRepublic"] = "Czech Republic";
    ECountry["Denmark"] = "Denmark";
    ECountry["Djibouti"] = "Djibouti";
    ECountry["Dominica"] = "Dominica";
    ECountry["DominicanRepublic"] = "Dominican Republic";
    ECountry["Ecuador"] = "Ecuador";
    ECountry["Egypt"] = "Egypt";
    ECountry["ElSalvador"] = "El Salvador";
    ECountry["EquatorialGuinea"] = "Equatorial Guinea";
    ECountry["Eritrea"] = "Eritrea";
    ECountry["Estonia"] = "Estonia";
    ECountry["Eswatini"] = "Eswatini";
    ECountry["Ethiopia"] = "Ethiopia";
    ECountry["Fiji"] = "Fiji";
    ECountry["Finland"] = "Finland";
    ECountry["France"] = "France";
    ECountry["Gabon"] = "Gabon";
    ECountry["Gambia"] = "Gambia";
    ECountry["Georgia"] = "Georgia";
    ECountry["Germany"] = "Germany";
    ECountry["Ghana"] = "Ghana";
    ECountry["Greece"] = "Greece";
    ECountry["Grenada"] = "Grenada";
    ECountry["Guatemala"] = "Guatemala";
    ECountry["Guinea"] = "Guinea";
    ECountry["GuineaBissau"] = "Guinea-Bissau";
    ECountry["Guyana"] = "Guyana";
    ECountry["Haiti"] = "Haiti";
    ECountry["Honduras"] = "Honduras";
    ECountry["Hungary"] = "Hungary";
    ECountry["Iceland"] = "Iceland";
    ECountry["India"] = "India";
    ECountry["Indonesia"] = "Indonesia";
    ECountry["Iran"] = "Iran";
    ECountry["Iraq"] = "Iraq";
    ECountry["Ireland"] = "Ireland";
    ECountry["Israel"] = "Israel";
    ECountry["Italy"] = "Italy";
    ECountry["IvoryCoast"] = "Ivory Coast";
    ECountry["Jamaica"] = "Jamaica";
    ECountry["Japan"] = "Japan";
    ECountry["Jordan"] = "Jordan";
    ECountry["Kazakhstan"] = "Kazakhstan";
    ECountry["Kenya"] = "Kenya";
    ECountry["Kiribati"] = "Kiribati";
    ECountry["KoreaNorth"] = "North Korea";
    ECountry["KoreaSouth"] = "South Korea";
    ECountry["Kuwait"] = "Kuwait";
    ECountry["Kyrgyzstan"] = "Kyrgyzstan";
    ECountry["Laos"] = "Laos";
    ECountry["Latvia"] = "Latvia";
    ECountry["Lebanon"] = "Lebanon";
    ECountry["Lesotho"] = "Lesotho";
    ECountry["Liberia"] = "Liberia";
    ECountry["Libya"] = "Libya";
    ECountry["Liechtenstein"] = "Liechtenstein";
    ECountry["Lithuania"] = "Lithuania";
    ECountry["Luxembourg"] = "Luxembourg";
    ECountry["Madagascar"] = "Madagascar";
    ECountry["Malawi"] = "Malawi";
    ECountry["Malaysia"] = "Malaysia";
    ECountry["Maldives"] = "Maldives";
    ECountry["Mali"] = "Mali";
    ECountry["Malta"] = "Malta";
    ECountry["MarshallIslands"] = "Marshall Islands";
    ECountry["Mauritania"] = "Mauritania";
    ECountry["Mauritius"] = "Mauritius";
    ECountry["Mexico"] = "Mexico";
    ECountry["Micronesia"] = "Micronesia";
    ECountry["Moldova"] = "Moldova";
    ECountry["Monaco"] = "Monaco";
    ECountry["Mongolia"] = "Mongolia";
    ECountry["Montenegro"] = "Montenegro";
    ECountry["Morocco"] = "Morocco";
    ECountry["Mozambique"] = "Mozambique";
    ECountry["Myanmar"] = "Myanmar";
    ECountry["Namibia"] = "Namibia";
    ECountry["Nauru"] = "Nauru";
    ECountry["Nepal"] = "Nepal";
    ECountry["Netherlands"] = "Netherlands";
    ECountry["NewZealand"] = "New Zealand";
    ECountry["Nicaragua"] = "Nicaragua";
    ECountry["Niger"] = "Niger";
    ECountry["Nigeria"] = "Nigeria";
    ECountry["NorthMacedonia"] = "North Macedonia";
    ECountry["Norway"] = "Norway";
    ECountry["Oman"] = "Oman";
    ECountry["Pakistan"] = "Pakistan";
    ECountry["Palau"] = "Palau";
    ECountry["Palestine"] = "Palestine";
    ECountry["Panama"] = "Panama";
    ECountry["PapuaNewGuinea"] = "Papua New Guinea";
    ECountry["Paraguay"] = "Paraguay";
    ECountry["Peru"] = "Peru";
    ECountry["Philippines"] = "Philippines";
    ECountry["Poland"] = "Poland";
    ECountry["Portugal"] = "Portugal";
    ECountry["Qatar"] = "Qatar";
    ECountry["Romania"] = "Romania";
    ECountry["Russia"] = "Russia";
    ECountry["Rwanda"] = "Rwanda";
    ECountry["SaintKittsAndNevis"] = "Saint Kitts and Nevis";
    ECountry["SaintLucia"] = "Saint Lucia";
    ECountry["SaintVincentAndTheGrenadines"] = "Saint Vincent and the Grenadines";
    ECountry["Samoa"] = "Samoa";
    ECountry["SanMarino"] = "San Marino";
    ECountry["SaoTomeAndPrincipe"] = "Sao Tome and Principe";
    ECountry["SaudiArabia"] = "Saudi Arabia";
    ECountry["Senegal"] = "Senegal";
    ECountry["Serbia"] = "Serbia";
    ECountry["Seychelles"] = "Seychelles";
    ECountry["SierraLeone"] = "Sierra Leone";
    ECountry["Singapore"] = "Singapore";
    ECountry["Slovakia"] = "Slovakia";
    ECountry["Slovenia"] = "Slovenia";
    ECountry["SolomonIslands"] = "Solomon Islands";
    ECountry["Somalia"] = "Somalia";
    ECountry["SouthAfrica"] = "South Africa";
    ECountry["SouthSudan"] = "South Sudan";
    ECountry["Spain"] = "Spain";
    ECountry["SriLanka"] = "Sri Lanka";
    ECountry["Sudan"] = "Sudan";
    ECountry["Suriname"] = "Suriname";
    ECountry["Sweden"] = "Sweden";
    ECountry["Switzerland"] = "Switzerland";
    ECountry["Syria"] = "Syria";
    ECountry["Taiwan"] = "Taiwan";
    ECountry["Tajikistan"] = "Tajikistan";
    ECountry["Tanzania"] = "Tanzania";
    ECountry["Thailand"] = "Thailand";
    ECountry["TimorLeste"] = "Timor-Leste";
    ECountry["Togo"] = "Togo";
    ECountry["Tonga"] = "Tonga";
    ECountry["TrinidadAndTobago"] = "Trinidad and Tobago";
    ECountry["Tunisia"] = "Tunisia";
    ECountry["Turkey"] = "Turkey";
    ECountry["Turkmenistan"] = "Turkmenistan";
    ECountry["Tuvalu"] = "Tuvalu";
    ECountry["Uganda"] = "Uganda";
    ECountry["Ukraine"] = "Ukraine";
    ECountry["UnitedArabEmirates"] = "United Arab Emirates";
    ECountry["UnitedKingdom"] = "United Kingdom";
    ECountry["UnitedStates"] = "United States";
    ECountry["Uruguay"] = "Uruguay";
    ECountry["Uzbekistan"] = "Uzbekistan";
    ECountry["Vanuatu"] = "Vanuatu";
    ECountry["VaticanCity"] = "Vatican City";
    ECountry["Venezuela"] = "Venezuela";
    ECountry["Vietnam"] = "Vietnam";
    ECountry["Yemen"] = "Yemen";
    ECountry["Zambia"] = "Zambia";
    ECountry["Zimbabwe"] = "Zimbabwe";
})(ECountry || (exports.ECountry = ECountry = {}));
var EAccommodationType;
(function (EAccommodationType) {
    EAccommodationType["Hotel"] = "hotel";
    EAccommodationType["Apartment"] = "apartment";
    EAccommodationType["Resort"] = "resort";
    EAccommodationType["Villa"] = "villa";
    EAccommodationType["Cabin"] = "cabin";
    EAccommodationType["Cottage"] = "cottage";
    EAccommodationType["GlampingSite"] = "glamping site";
    EAccommodationType["ServicedApartment"] = "serviced apartment";
    EAccommodationType["VacationHome"] = "vacation home";
    EAccommodationType["GuestHouse"] = "guest house";
    EAccommodationType["Hostels"] = "hostels";
    EAccommodationType["Motel"] = "motel";
    EAccommodationType["BnB"] = "b&b";
    EAccommodationType["Ryokan"] = "ryokan";
    EAccommodationType["Riad"] = "riad";
    EAccommodationType["ResortVillage"] = "resort village";
    EAccommodationType["Homestay"] = "homestay";
    EAccommodationType["Campground"] = "campground";
    EAccommodationType["CountryHouse"] = "country house";
    EAccommodationType["FarmStay"] = "farm stay";
    EAccommodationType["Boat"] = "boat";
    EAccommodationType["LuxuryTent"] = "luxury tent";
    EAccommodationType["SelfCateringAccommodation"] = "self-catering accommodation";
    EAccommodationType["TinyHouse"] = "tiny house";
})(EAccommodationType || (exports.EAccommodationType = EAccommodationType = {}));
var ECoinType;
(function (ECoinType) {
    ECoinType["USD"] = "USD";
    ECoinType["EUR"] = "EUR";
    ECoinType["GBP"] = "GBP";
    ECoinType["JPY"] = "JPY";
    ECoinType["AUD"] = "AUD";
    ECoinType["CAD"] = "CAD";
    ECoinType["CHF"] = "CHF";
    ECoinType["CNY"] = "CNY";
    ECoinType["HKD"] = "HKD";
    ECoinType["NZD"] = "NZD";
    ECoinType["SEK"] = "SEK";
    ECoinType["KRW"] = "KRW";
    ECoinType["SGD"] = "SGD";
    ECoinType["NOK"] = "NOK";
    ECoinType["MXN"] = "MXN";
    ECoinType["INR"] = "INR";
    ECoinType["RUB"] = "RUB";
    ECoinType["ZAR"] = "ZAR";
    ECoinType["TRY"] = "TRY";
    ECoinType["BRL"] = "BRL";
    ECoinType["TWD"] = "TWD";
    ECoinType["DKK"] = "DKK";
    ECoinType["PLN"] = "PLN";
    ECoinType["THB"] = "THB";
    ECoinType["IDR"] = "IDR";
    ECoinType["HUF"] = "HUF";
    ECoinType["CZK"] = "CZK";
    ECoinType["ILS"] = "ILS";
    ECoinType["PHP"] = "PHP";
    ECoinType["AED"] = "AED";
    ECoinType["SAR"] = "SAR";
    ECoinType["MYR"] = "MYR";
    ECoinType["BGN"] = "BGN";
    ECoinType["RON"] = "RON";
    ECoinType["ARS"] = "ARS";
    ECoinType["CLP"] = "CLP";
    ECoinType["COP"] = "COP";
    ECoinType["VND"] = "VND";
    ECoinType["NGN"] = "NGN";
    ECoinType["PKR"] = "PKR";
    ECoinType["EGP"] = "EGP";
    ECoinType["QAR"] = "QAR";
    ECoinType["KWD"] = "KWD";
    ECoinType["BHD"] = "BHD";
    ECoinType["OMR"] = "OMR";
    ECoinType["JOD"] = "JOD";
    ECoinType["MAD"] = "MAD";
    ECoinType["LKR"] = "LKR";
    ECoinType["BDT"] = "BDT";
    ECoinType["UAH"] = "UAH";
    ECoinType["GHS"] = "GHS";
    ECoinType["KES"] = "KES";
    ECoinType["UGX"] = "UGX";
    ECoinType["TZS"] = "TZS";
    ECoinType["XAF"] = "XAF";
    ECoinType["XOF"] = "XOF";
    ECoinType["ZMW"] = "ZMW";
    ECoinType["ETB"] = "ETB";
    ECoinType["BOB"] = "BOB";
    ECoinType["PEN"] = "PEN";
    ECoinType["ISK"] = "ISK";
    ECoinType["JMD"] = "JMD";
    ECoinType["GYD"] = "GYD";
    ECoinType["BSD"] = "BSD";
    ECoinType["FJD"] = "FJD";
    ECoinType["XCD"] = "XCD";
    ECoinType["KYD"] = "KYD";
    ECoinType["ANG"] = "ANG";
    ECoinType["AWG"] = "AWG";
    ECoinType["MVR"] = "MVR";
})(ECoinType || (exports.ECoinType = ECoinType = {}));
var ELanguage;
(function (ELanguage) {
    ELanguage["EN"] = "English";
    ELanguage["ES"] = "Spanish";
    ELanguage["FR"] = "French";
    ELanguage["DE"] = "German";
    ELanguage["ZH"] = "Chinese";
    ELanguage["JA"] = "Japanese";
    ELanguage["AR"] = "Arabic";
    ELanguage["RU"] = "Russian";
    ELanguage["HI"] = "Hindi";
    ELanguage["PT"] = "Portuguese";
    ELanguage["IT"] = "Italian";
    ELanguage["KO"] = "Korean";
    ELanguage["TR"] = "Turkish";
    ELanguage["NL"] = "Dutch";
    ELanguage["PL"] = "Polish";
    ELanguage["VI"] = "Vietnamese";
    ELanguage["TH"] = "Thai";
    ELanguage["SV"] = "Swedish";
    ELanguage["FI"] = "Finnish";
    ELanguage["DA"] = "Danish";
    ELanguage["NO"] = "Norwegian";
    ELanguage["CS"] = "Czech";
    ELanguage["HU"] = "Hungarian";
    ELanguage["EL"] = "Greek";
    ELanguage["RO"] = "Romanian";
    ELanguage["BG"] = "Bulgarian";
    ELanguage["SK"] = "Slovak";
    ELanguage["UK"] = "Ukrainian";
    ELanguage["HE"] = "Hebrew";
    ELanguage["ID"] = "Indonesian";
    ELanguage["MS"] = "Malay";
    ELanguage["TL"] = "Tagalog";
    ELanguage["HR"] = "Croatian";
    ELanguage["SR"] = "Serbian";
    ELanguage["SL"] = "Slovenian";
    ELanguage["ET"] = "Estonian";
    ELanguage["LV"] = "Latvian";
    ELanguage["LT"] = "Lithuanian";
    ELanguage["MT"] = "Maltese";
    ELanguage["IS"] = "Icelandic";
    ELanguage["GA"] = "Irish";
    ELanguage["CY"] = "Welsh";
    ELanguage["AF"] = "Afrikaans";
    ELanguage["SW"] = "Swahili";
    ELanguage["AM"] = "Amharic";
    ELanguage["YI"] = "Yiddish";
    ELanguage["XH"] = "Xhosa";
    ELanguage["ZU"] = "Zulu";
    ELanguage["TW"] = "Twi";
    ELanguage["YO"] = "Yoruba";
    ELanguage["IG"] = "Igbo";
    ELanguage["HA"] = "Hausa";
    ELanguage["BE"] = "Belarusian";
    ELanguage["AZ"] = "Azerbaijani";
    ELanguage["KA"] = "Georgian";
    ELanguage["KK"] = "Kazakh";
    ELanguage["KY"] = "Kyrgyz";
    ELanguage["UZ"] = "Uzbek";
    ELanguage["TG"] = "Tajik";
    ELanguage["FA"] = "Persian";
    ELanguage["PS"] = "Pashto";
    ELanguage["UR"] = "Urdu";
    ELanguage["BN"] = "Bengali";
    ELanguage["TA"] = "Tamil";
    ELanguage["TE"] = "Telugu";
    ELanguage["KN"] = "Kannada";
    ELanguage["ML"] = "Malayalam";
    ELanguage["MR"] = "Marathi";
    ELanguage["GU"] = "Gujarati";
    ELanguage["PA"] = "Punjabi";
    ELanguage["SI"] = "Sinhala";
    ELanguage["MY"] = "Burmese";
    ELanguage["LO"] = "Lao";
    ELanguage["KM"] = "Khmer";
    ELanguage["MN"] = "Mongolian";
    ELanguage["NE"] = "Nepali";
    ELanguage["BO"] = "Tibetan";
    ELanguage["DZ"] = "Dzongkha";
    ELanguage["EU"] = "Basque";
    ELanguage["GL"] = "Galician";
    ELanguage["CA"] = "Catalan";
    ELanguage["EO"] = "Esperanto";
    ELanguage["LTZ"] = "Luxembourgish";
    ELanguage["WO"] = "Wolof";
    ELanguage["SH"] = "Serbo-Croatian";
})(ELanguage || (exports.ELanguage = ELanguage = {}));
var EFacility;
(function (EFacility) {
    EFacility["WIFI"] = "Free WiFi";
    EFacility["PARKING"] = "Parking";
    EFacility["AIRPORT_SHUTTLE"] = "Airport shuttle";
    EFacility["FAMILY_ROOMS"] = "Family rooms";
    EFacility["OUTDOOR_POOL"] = "Outdoor pool";
    EFacility["INDOOR_POOL"] = "Indoor pool";
    EFacility["SPA_AND_WELLNESS"] = "Spa and wellness center";
    EFacility["FITNESS_CENTER"] = "Fitness center";
    EFacility["RESTAURANT"] = "Restaurant";
    EFacility["BAR"] = "Bar";
    EFacility["PET_FRIENDLY"] = "Pet-friendly";
    EFacility["NON_SMOKING_ROOMS"] = "Non-smoking rooms";
    EFacility["BEACHFRONT"] = "Beachfront";
    EFacility["ROOM_SERVICE"] = "Room service";
    EFacility["BREAKFAST_INCLUDED"] = "Breakfast included";
    EFacility["PRIVATE_BEACH"] = "Private beach area";
    EFacility["FREE_CANCELLATION"] = "Free cancellation";
    EFacility["AIR_CONDITIONING"] = "Air conditioning";
    EFacility["HEATING"] = "Heating";
    EFacility["TERRACE"] = "Terrace";
    EFacility["GARDEN"] = "Garden";
    EFacility["HOT_TUB"] = "Hot tub/Jacuzzi";
    EFacility["SAUNA"] = "Sauna";
    EFacility["TENNIS_COURT"] = "Tennis court";
    EFacility["GOLF_COURSE"] = "Golf course";
    EFacility["WATER_SPORTS"] = "Water sports facilities";
    EFacility["SKIING"] = "Skiing";
    EFacility["SKI_STORAGE"] = "Ski storage";
    EFacility["SKI_EQUIPMENT_RENTAL"] = "Ski equipment rental";
    EFacility["CHILDRENS_PLAYGROUND"] = "Children's playground";
    EFacility["BUSINESS_CENTER"] = "Business center";
    EFacility["MEETING_ROOMS"] = "Meeting/banquet facilities";
    EFacility["LAUNDRY"] = "Laundry services";
    EFacility["DRY_CLEANING"] = "Dry cleaning";
    EFacility["KITCHEN"] = "Kitchen facilities";
    EFacility["BALCONY"] = "Balcony";
    EFacility["MINI_MARKET"] = "Mini market on site";
    EFacility["ACCESSIBLE"] = "Facilities for disabled guests";
    EFacility["ATM"] = "ATM on site";
    EFacility["CURRENCY_EXCHANGE"] = "Currency exchange";
    EFacility["BBQ"] = "BBQ facilities";
    EFacility["NIGHTCLUB"] = "Nightclub/DJ";
    EFacility["LIBRARY"] = "Library";
    EFacility["CYCLING"] = "Cycling";
    EFacility["HIKING"] = "Hiking";
    EFacility["CAR_RENTAL"] = "Car rental";
    EFacility["SHUTTLE_SERVICE"] = "Shuttle service";
    EFacility["VALET_PARKING"] = "Valet parking";
    EFacility["ELECTRIC_VEHICLE_CHARGING"] = "Electric vehicle charging station";
})(EFacility || (exports.EFacility = EFacility = {}));
var EPropertyHighlight;
(function (EPropertyHighlight) {
    EPropertyHighlight["LOCATION"] = "Location";
    EPropertyHighlight["WELLNESS"] = "Wellness";
    EPropertyHighlight["VIEW"] = "View";
    EPropertyHighlight["BREAKFAST"] = "Breakfast";
    EPropertyHighlight["DINING"] = "Dining";
    EPropertyHighlight["VALUE"] = "Value";
    EPropertyHighlight["WIFI"] = "WiFi";
    EPropertyHighlight["BEACH_ACCESS"] = "Beach access";
    EPropertyHighlight["FAMILY_FRIENDLY"] = "Family-friendly";
    EPropertyHighlight["PET_FRIENDLY"] = "Pet-friendly";
    EPropertyHighlight["LUXURY"] = "Luxury";
    EPropertyHighlight["SUSTAINABILITY"] = "Sustainability";
    EPropertyHighlight["UNIQUE_STAY"] = "Unique stay";
    EPropertyHighlight["TRANSPORT"] = "Transport options";
    EPropertyHighlight["FITNESS"] = "Fitness";
    EPropertyHighlight["POOL"] = "Pool";
    EPropertyHighlight["PARKING"] = "Parking";
    EPropertyHighlight["SPA"] = "Spa";
    EPropertyHighlight["BUSINESS"] = "Business facilities";
    EPropertyHighlight["HISTORICAL"] = "Historical building";
    EPropertyHighlight["MODERN"] = "Modern design";
    EPropertyHighlight["ROMANTIC"] = "Romantic";
    EPropertyHighlight["ADVENTURE"] = "Adventure activities";
    EPropertyHighlight["ALL_INCLUSIVE"] = "All-inclusive";
    EPropertyHighlight["SPORTS"] = "Sports facilities";
    EPropertyHighlight["ACCESSIBILITY"] = "Accessibility";
    EPropertyHighlight["KIDS_FRIENDLY"] = "Kids-friendly";
    EPropertyHighlight["QUIET_ENVIRONMENT"] = "Quiet environment";
})(EPropertyHighlight || (exports.EPropertyHighlight = EPropertyHighlight = {}));
var EFeatures;
(function (EFeatures) {
    EFeatures["ACCESSIBILITY"] = "Accessibility";
    EFeatures["OUTDOOR_SWIMMING_POOL"] = "Outdoor swimming pool";
    EFeatures["SPA"] = "Spa";
    EFeatures["LANGUAGES_SPOKEN"] = "Languages Spoken";
    EFeatures["FRONT_DESK_SERVICES"] = "Front Desk Services";
    EFeatures["ENTERTAINMENT_FAMILY_SERVICES"] = "Entertainment & Family Services";
    EFeatures["CLEANING_SERVICES"] = "Cleaning Services";
    EFeatures["BUSINESS_FACILITIES"] = "Business Facilities";
    EFeatures["SAFETY_SECURITY"] = "Safety & security";
    EFeatures["GENERAL"] = "General";
    EFeatures["BATHROOM"] = "Bathroom";
    EFeatures["BEDROOM"] = "Bedroom";
    EFeatures["OUTDOORS"] = "Outdoors";
    EFeatures["KITCHEN"] = "Kitchen";
    EFeatures["ROOM_AMENITIES"] = "Room Amenities";
    EFeatures["PETS"] = "Pets";
    EFeatures["ACTIVITIES"] = "Activities";
    EFeatures["LIVING_AREA"] = "Living Area";
    EFeatures["MEDIA_TECHNOLOGY"] = "Media & Technology";
    EFeatures["FOOD_DRINK"] = "Food & Drink";
    EFeatures["INTERNET"] = "Internet";
    EFeatures["PARKING"] = "Parking";
})(EFeatures || (exports.EFeatures = EFeatures = {}));
var EPaymentMethods;
(function (EPaymentMethods) {
    EPaymentMethods["CREDIT_CARD"] = "Credit Card";
    EPaymentMethods["DEBIT_CARD"] = "Debit Card";
    EPaymentMethods["PAYPAL"] = "PayPal";
    EPaymentMethods["BANK_TRANSFER"] = "Bank Transfer";
    EPaymentMethods["CASH"] = "Cash";
    EPaymentMethods["APPLE_PAY"] = "Apple Pay";
    EPaymentMethods["GOOGLE_PAY"] = "Google Pay";
    EPaymentMethods["CRYPTOCURRENCY"] = "Cryptocurrency";
    EPaymentMethods["OTHER"] = "Other";
})(EPaymentMethods || (exports.EPaymentMethods = EPaymentMethods = {}));
//# sourceMappingURL=structures.js.map