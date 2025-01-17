import { Card } from "./ui/card";
import { IProperty } from "@/types/propertyTypes";
import { Avatar, AvatarImage } from "./ui/avatar";
import Dubai from "../assets/images/dubaiLogo.png";
import Kids from "../assets/images/kids.jpeg";
import { IReview } from "@/types/reviewTypes";

interface propertyReviewsProps {
  propertyData?: IProperty;
  propertyReviews: IReview[];
}

function ReviewsCard({ propertyReviews }: propertyReviewsProps) {
  return (
    <div className="flex">
      {propertyReviews?.slice(0, 1).map((item) => (
        <Card key={item._id} className=" h-[210px] p-5">
          <div className="h-[50%] grid gap-3">
            <div className="flex  gap-2 items-center">
              <div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={Kids} />
                </Avatar>
              </div>
              <div>
                <div>
                  <p className="font-bold">Lee</p>
                </div>
                <div className="flex items-center gap-1">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={Dubai} />
                  </Avatar>
                  <p className="text-xs text-gray-500">{item?.language}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col gap-3">
              <p className="text-sm">{item.reviewText}</p>
              <p className="text-sm text-blue-500 hover:underline cursor-pointer">
                Read more
              </p>
            </div>
          </div>
          <div className="h-[50%]"></div>
        </Card>
      ))}
    </div>
  );
}

export default ReviewsCard;
