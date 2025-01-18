import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import { TPartialUser } from "@/types/userTypes";
import { getPropertyById, searchPropertiesChunks } from "@/utils/api/propertyApi";
import { editProfile, getInterested, getSavedLists, getSearch, getSelf, modifyUserArrays, sendEmailCode, signinUser } from "@/utils/api/userApi";
import { useEffect } from "react";


const reviews = [
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677e8a78b43ababb0b8f4af9",
    "passenger_type": "couple",
    "language": "English",
    "rating": 9,
    "room_type": "suite",
    "nights_num": 4,
    "reviewText": "The suite was an oasis of tranquility. We loved the elegant decor and the luxurious amenities. It was the perfect setting for a romantic getaway.",
    "responseFromProperty": "We're delighted you enjoyed the romantic ambiance of the suite!"
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677ed84567bd013a53b3898d",
    "passenger_type": "family",
    "language": "English",
    "rating": 8,
    "room_type": "villa",
    "nights_num": 7,
    "reviewText": "The villa was spacious enough for our whole family to relax and enjoy our time together. The children loved exploring the garden, and we appreciated the well-equipped kitchen for preparing meals.",
    "responseFromProperty": "We're glad your family enjoyed the villa and the spacious living areas!"
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677e8a78b43ababb0b8f4af9",
    "passenger_type": "couple",
    "language": "English",
    "rating": 7,
    "room_type": "room",
    "nights_num": 2,
    "reviewText": "The room was comfortable, but we found the noise from the hallway a bit distracting, especially late at night.",
    "responseFromProperty": "We apologize for any noise disturbances that may have affected your stay."
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677ed84567bd013a53b3898d",
    "passenger_type": "family",
    "language": "English",
    "rating": 10,
    "room_type": "villa",
    "nights_num": 5,
    "reviewText": "This villa was an absolute dream! The breathtaking views and the impeccable service made our stay truly unforgettable. We felt like we were living in a fairy tale." 
    ,"responseFromProperty": "We're thrilled you had such an unforgettable experience!"
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677e8a78b43ababb0b8f4af9",
    "passenger_type": "couple",
    "language": "English",
    "rating": 9,
    "room_type": "suite",
    "nights_num": 4,
    "reviewText": "The spa treatments were incredibly relaxing. We especially enjoyed the couples massage and the serene ambiance of the spa.",
    "responseFromProperty": "We're glad you enjoyed the spa treatments!"
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677ed84567bd013a53b3898d",
    "passenger_type": "family",
    "language": "English",
    "rating": 8,
    "room_type": "villa",
    "nights_num": 3,
    "reviewText": "The villa was spacious and well-maintained. The children enjoyed playing in the garden, and we appreciated the thoughtful touches like complimentary toiletries and fresh flowers.",
    "responseFromProperty": "We're glad your family enjoyed their stay at the villa!"
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677e8a78b43ababb0b8f4af9",
    "passenger_type": "couple",
    "language": "English",
    "rating": 7,
    "room_type": "room",
    "nights_num": 2,
    "reviewText": "The room was comfortable, but the Wi-Fi connection was a bit intermittent, which made it difficult to stay connected.",
    "responseFromProperty": "We apologize for any issues with Wi-Fi connectivity."
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677ed84567bd013a53b3898d",
    "passenger_type": "family",
    "language": "English",
    "rating": 10,
    "room_type": "villa",
    "nights_num": 6,
    "reviewText": "The service was exceptional! The staff were incredibly friendly and helpful, going above and beyond to ensure we had a memorable stay.",
    "responseFromProperty": "We're thrilled you had a memorable stay and appreciate your kind words about our staff!"
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677e8a78b43ababb0b8f4af9",
    "passenger_type": "couple",
    "language": "English",
    "rating": 9,
    "room_type": "suite",
    "nights_num": 4,
    "reviewText": "The breakfast buffet was a delightful experience with a wide variety of delicious options.",
    "responseFromProperty": "We're glad you enjoyed the breakfast buffet!"
  },
  {
    "propertyId": "67876104f4b0ac0f7dcfb914",
    "userId": "677ed84567bd013a53b3898d",
    "passenger_type": "family",
    "language": "English",
    "rating": 8,
    "room_type": "villa",
    "nights_num": 3,
    "reviewText": "The villa was spacious and well-maintained, but we felt that the kitchen could have been better equipped for families with young children." 
    ,"responseFromProperty": "Thank you for your feedback. We will review and improve our kitchen amenities for families." 
  }
];





function UserSetting() {

  const handleClick = () => {
    //? User Api

    // getSelf()
    // .then(data => console.log(data))

    // sendEmailCode("yanivridel@gmail.com")
    // .then(data => console.log(data));

    // signinUser("yanivridel@gmail.com", "516EFC")
    // .then(data => console.log(data));

  //   editProfile({
  //     lName: "Chen",
  //     username: "john_doe",
  //     phoneNumber: "1234567890",
  //     location: {
  //         country: "Israel",
  //         city: "Tel Aviv",
  //         addressLine: "Ness Ziona 3"
  //     },
  //     notifications: {
  //         dealsAndOffers: { dealDiscovery: true }
  //     }
  // } as any)
  // .then(data => console.log(data));

    // modifyUserArrays({
    //   action: "add",
    //   // interested: "65a9f3e8a3b9d62f1e5a6bc4",
    //   // savedList: {
    //   //   name: "my-new-list1",
    //   //   propertyId: "677926b57b7c8ba659023876"
    //   // },
    //   // search: {
    //   //   location: {
    //   //     country: "Israel5",
    //   //     region: "Central",
    //   //     city: "Tel Aviv"
    //   //   },
    //   //   checkin: "2024-12-25",
    //   //   checkout: "2024-12-31",
    //   //   group_adults: 3,
    //   //   group_children: 1,
    //   //   is_animal: true
    //   // }
    // } as any)
    // .then(data => console.log(data));

    // getSearch()
    // .then(data => console.log(data));

    // getInterested()
    // .then(data => console.log(data));

    // getSavedLists()
    // .then(data => console.log(data));

    //? Properties Api
    // getPropertyById("677a97babbf50001ec44cc8c")
    // .then(data => console.log(data));

    // searchProperties({
    //   primary: {
    //     location: {
    //       country: "Israel",
    //       region: "Center District Israel",
    //       city: "Ness Ziona",
    //       // addressLine: "24 Rothschild Street"
    //     },
    //     date: {
    //       startDate: "2025-01-10",
    //       endDate: "2025-01-12",
    //       // length: 3,
    //       // fromDay: 0,
    //       // yearMonths: [
    //       //   {
    //       //     year: 2025,
    //       //     month: 0
    //       //   },
    //       //   {
    //       //     year: 2025,
    //       //     month: 1
    //       //   }
    //       // ],
    //       // isWeekend: true
    //     },
    //     options: {
    //       adults: 6,
    //       rooms: 2,
    //       childrenAges: [
    //         4
    //       ]
    //     }
    //   },
    //   secondary: {}
    // } as any)
    // .then(data => console.log(data));

  }

  const searchBody = {
    primary: {
      location: {
        country: "Israel",
        region: "Center District Israel",
        city: "Ness Ziona",
        // addressLine: "24 Rothschild Street"
      },
      date: {
        startDate: "2025-01-10",
        endDate: "2025-01-12",
        // length: 3,
        // fromDay: 0,
        // yearMonths: [
        //   {
        //     year: 2025,
        //     month: 0
        //   },
        //   {
        //     year: 2025,
        //     month: 1
        //   }
        // ],
        // isWeekend: true
      },
      options: {
        adults: 6,
        rooms: 2,
        childrenAges: [
          4
        ]
      }
    },
    secondary: {}
  } as ISearchPropertiesReq;

  async function fetchingSearch() {
    try {
      const { firstChunkPromise } = await searchPropertiesChunks(searchBody);
      console.log(firstChunkPromise);
      // Handle first chunk
      firstChunkPromise
        .then(results => {
          if (results) {
            console.log(results);
          }
        })
        // .finally(() => setIsLoadingFirst(false));

        async function fetchSecond() {
          while (true) {
            const { secondChunkPromise } = await searchPropertiesChunks(searchBody);
        
            const results = await secondChunkPromise;
            
            console.log("status2", !!results);
            
            if (results) {
              console.log("Second chunk:", results);
              break; // Exit loop when results are received
            }
        
            // Optional: Prevent tight looping
            // await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        fetchSecond();
      // Handle second chunk
      
        // .finally(() => setIsLoadingSecond(false));

    } catch (err) {
      console.log("ERROR:", err instanceof Error ? err.message : 'An error occurred while searching');
      
    }
  }
  
  // Function to post a single review
  const postReview = async (review: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/review/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzdlOGE3OGI0M2FiYWJiMGI4ZjRhZjkiLCJpYXQiOjE3MzY5NDE4ODYsImV4cCI6MTczNzU0NjY4Nn0.JKQbDj6k6O8PEfTwdDu2k7zoiFBtn06qxmP44RQUvmo", // Add token if needed
        },
        body: JSON.stringify(review),
      });
  
      const result = await response.json();
      if (!response.ok) {
        console.error("Failed to post review:", result.message);
      } else {
        console.log("Review posted successfully:", result.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  // Function to post all reviews
  const postAllReviews = async () => {
    for (const review of reviews) {
      await postReview(review);
    }
  };

  return (<>
  <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  <Button onClick={postAllReviews}>Click</Button>
  </>
  );
}

export default UserSetting;
