import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitialsLowerCase } from "@/utils/functions";

function UserCard() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;

  const initials = getInitialsLowerCase(
    `${currentUser.fName || ""} ${currentUser.lName || ""}`.trim()
  );

  return (
    <div className="mt-3 border-[1px] border-softGrayBorder flex xs:items-center gap-3 p-4 rounded-[8px] flex-col xs:flex-row">
      <Avatar className=" border-2 border-[#f8b830] pointer-events-none h-[44px] w-[44px]">
        <AvatarImage
          src={currentUser.user_image ? currentUser.user_image : undefined}
          alt="user"
          loading="lazy"
        />
        <AvatarFallback className="text-white w-full h-full flex items-center justify-center bg-slate-600">
          {initials || ""}
        </AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <div className="font-bold">You are signed in</div>
        <div className="text-[13px] text-[#595959]">{currentUser.email}</div>
      </div>
    </div>
  );
}

export default UserCard;
