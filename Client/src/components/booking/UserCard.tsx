import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";

function UserCard() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;

  return (
    <div className="m-3 border-[1px] border-softGrayBorder flex xs:items-center gap-3 p-4 rounded-[8px] flex-col xs:flex-row">
      <Avatar className=" border-2 border-[#f8b830] pointer-events-none h-[44px] w-[44px]">
        <AvatarImage
          src={currentUser.user_image ? currentUser.user_image : undefined}
          alt="user"
          loading="lazy"
        />
      </Avatar>
      <div className="text-sm">
        <div className="font-bold">You are signed in</div>
        <div className="text-[13px] text-[#595959]">{currentUser.email}</div>
      </div>
    </div>
  );
}

export default UserCard;
