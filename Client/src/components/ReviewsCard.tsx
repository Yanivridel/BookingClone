import { Card } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { IReview } from "@/types/reviewTypes";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface propertyReviewsProps {
  review: IReview;
  className?: string;
  size: number;
}

function ReviewsCard({ review, className, size }: propertyReviewsProps) {
  if (!review?.userId || typeof review.userId === "string") {
    return null;
  }

  return (
    <Card
      key={review._id}
      className={cn(
        `flex ${size === 1 ? "py-1 px-4" : "p-5"}`,
        className
      )}
    >
      <div className="h-full grid gap-3">
        <div className="flex gap-2 items-center">
          <div>
            <Avatar className={size === 1 ? "w-6 h-6" : "w-8 h-8"}>
              <AvatarImage
                src={
                  typeof review.userId !== "string" &&
                  review?.userId?.user_image
                    ? review?.userId?.user_image
                    : "https://www.pngitem.com/pimgs/m/575-5759580_anonymous-avatar-image-png-transparent-png.png"
                }
              />

              <AvatarFallback>
                <img
                  src="https://www.pngitem.com/pimgs/m/575-5759580_anonymous-avatar-image-png-transparent-png.png"
                  alt="Default Avatar"
                  className="w-full h-full object-cover"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div>
              <b className={size === 1 ? "text-sm" : "text-lg"}>
                {review.userId.fName || "Anonymous"}
              </b>
            </div>
            <div className="flex items-center gap-1">
              <Avatar className={size === 1 ? "w-3 h-3" : "w-5 h-5"}>
                <AvatarImage
                  src={
                    "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Il.png"
                  }
                />
              </Avatar>
              <p className="text-xs text-gray-500">{review.language}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between  flex-1 flex-col gap-3">
          <p className={size === 1 ? "text-xs" : "text-sm"}>
            {size === 1 && review.reviewText && review.reviewText.length > 60
              ? review.reviewText.slice(0, 60) + " ..."
              : review.reviewText}
          </p>
          <p className="text-sm text-blue-500 hover:underline cursor-pointer">
            Read more
          </p>
        </div>
      </div>
      <div className="h-[50%]"></div>
    </Card>
  );
}

export default ReviewsCard;
