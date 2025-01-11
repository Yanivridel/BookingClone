import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import { TPartialUser } from "@/types/userTypes";
import { getPropertyById, searchPropertiesChunks } from "@/utils/api/propertyApi";
import { editProfile, getInterested, getSavedLists, getSearch, getSelf, modifyUserArrays, sendEmailCode, signinUser } from "@/utils/api/userApi";
import { useEffect } from "react";


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
      const { firstChunkPromise, secondChunkPromise } = await searchPropertiesChunks(searchBody);
      console.log(firstChunkPromise, secondChunkPromise);
      // Handle first chunk
      firstChunkPromise
        .then(results => {
          if (results) {
            console.log(results);
          }
        })
        // .finally(() => setIsLoadingFirst(false));

      // Handle second chunk
      secondChunkPromise
        .then(results => {
          if (results) {
            console.log(results);
          }
        })
        // .finally(() => setIsLoadingSecond(false));

    } catch (err) {
      console.log("ERROR:", err instanceof Error ? err.message : 'An error occurred while searching');
      
    }
  }
  return (<>
  <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  <Button onClick={fetchingSearch}>Click</Button>
  </>
  );
}

export default UserSetting;
