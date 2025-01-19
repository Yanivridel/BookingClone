import React, { useEffect, useState } from "react";
import IconHeartRed, { CardXIcon, IconHeart, Spinner } from "./ui/Icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip"; // ייבוא רכיבי הטולטיפ
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { updateSavedList } from "@/store/slices/userSlices";
import { useMutation } from "@tanstack/react-query";
import { modifyUserArrays } from "@/utils/api/userApi";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";

interface SavedButtonProps {
  id: string;
  is_X?: boolean;
  listName?: string;
  iconFullClassNam?: string;
  iconEmptyClassName?: string;
}
interface MutationVariables {
  action: string;
  listName?: string;
}
interface MutationContext {
  rollback: () => void;
}

function SaveButton({
  id,
  is_X,
  listName,
  iconEmptyClassName,
  iconFullClassNam,
}: SavedButtonProps) {

  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(
    currentUser.savedLists.some((list) => list.properties.includes(id))
  );
  const [open, setOpen] = useState(false);
  const [newList, setNewList] = useState("");
  const allLists = currentUser.savedLists;
  const [selectedList, setSelectedList] = useState(() => {
    const defaultList = allLists.find((list) => list.properties.includes(id));
    return defaultList ? defaultList.name : "My Next Trip";
  });
  const [lastList, setLastList] = useState(selectedList);

  const mutationFn = async ({
    action,
    listName,
  }: MutationVariables): Promise<IUser> => {
    return modifyUserArrays(action, {
      savedList: {
        name: listName,
        propertyId: id,
      },
    } as any);
  };

  const useSavedListMutation = () => {
    return useMutation<IUser, Error, MutationVariables, MutationContext>({
      mutationFn,
      onMutate: (params) => {
        if (params.action === "add") setIsLiked(true);
        else setIsLiked(false);
        setOpen(true);

        setLastList(selectedList);

        return {
          rollback: () => setIsLiked((prev) => !prev),
        };
      },
      onError: (err, variables, context) => {
        if (context?.rollback) {
          context.rollback();
        }
      },
      onSuccess: (data) => {
        dispatch(updateSavedList(data.savedLists));
      },
    });
  };
  const { mutate, isPending } = useSavedListMutation();

  const handleLikeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isLiked) mutate({ action: "delete" });
    else mutate({ action: "add" });
  };

  const handleChangeList = (value: string) => {
    mutate({ action: "delete", listName: selectedList });
    mutate({ action: "add", listName: value });
    setSelectedList(value);
    setNewList("");
  };

  const handleDeleteFromList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    mutate({ action: "delete", listName: listName });
  };

  if(!currentUser._id) return null;

  if (is_X) {
    return (
      <div
        className="bg-white rounded-full h-[36px] w-[36px] flex items-center justify-center
      hover:bg-gray-100 transition-all cursor-pointer"
        onClick={handleDeleteFromList}
      >
        <CardXIcon className="w-5 h-5" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip>
            <PopoverContent
              dir="rtl"
              className="rounded-lg"
              sideOffset={45}
              onClick={(e) => e.stopPropagation()}
            >
              {isLiked && !isPending && (
                <div>
                  {/* <p>נשמר ב: הטיול הבא שלי</p> */}
                  <p className="ms-auto w-fit">
                    Saved to:
                    <Link
                      to={`/account/saved-lists/${selectedList}`}
                      className="me-2 text-blue-600"
                    >
                      {selectedList}
                    </Link>
                  </p>
                  <hr className="mt-1" />
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex justify-between flex-row-reverse w-full px-4 py-3">
                        <p className="text-blue-400">Change</p>
                        <p>⮟</p>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <RadioGroup
                        className="flex flex-col gap-3"
                        value={selectedList}
                        onValueChange={handleChangeList}
                      >
                        {allLists.map((list) => (
                          <div
                            key={list.name}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={list.name}
                              id={list.name}
                              key={list.name + "radio"}
                            />
                            <Label htmlFor={list.name}>{list.name}</Label>
                          </div>
                        ))}
                        <div>
                          <RadioGroupItem
                            disabled={newList === ""}
                            value={newList}
                            id={newList}
                            key={newList + "radio"}
                          />
                          <input
                            onChange={(e) => setNewList(e.target.value)}
                            type="text"
                            value={newList}
                            className="border black p-1 ml-1"
                            placeholder="Create a list"
                          />
                        </div>
                      </RadioGroup>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
              {!isLiked && !isPending && (
                <div>
                  {/* <p> הוסר מ: הטיול הבא שלי</p> */}
                  <p className="ms-auto w-fit">
                    Removed from:
                    <Link
                      to={`/account/saved-lists/${lastList}`}
                      className="me-2 text-blue-600"
                    >
                      {lastList}
                    </Link>
                  </p>
                </div>
              )}
            </PopoverContent>
            <PopoverTrigger></PopoverTrigger>
            <TooltipTrigger
              className="bg-white rounded-full h-[36px] w-[36px] flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
              onClick={handleLikeClick}
            >
              {isPending ? (
                <Spinner />
              ) : isLiked ? (
                <IconHeartRed
                  className={cn("w-5 h-5 fill-red-500", iconFullClassNam)}
                />
              ) : (
                <IconHeart className={cn("w-5 h-5", iconEmptyClassName)} />
              )}
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-sm text-white p-2 bg-black border border-black rounded-md"
            >
              <p>{isLiked ? "מקום האירוח שמור באחת מהרשימות שלכם" : "שמור"}</p>
            </TooltipContent>
          </Tooltip>
        </Popover>
      </TooltipProvider>
    </div>
  );
}

export default SaveButton;
