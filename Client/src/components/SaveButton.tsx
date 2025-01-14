import React, { useEffect, useState } from "react";
import IconHeartRed, { IconHeart, Spinner } from "./ui/Icons";
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

interface SavedButtonProps {
  id: string;
}
interface MutationVariables {
  action: string;
  listName?: string;
}
interface MutationContext {
  rollback: () => void;
}

function SaveButton({ id }: SavedButtonProps ) {
  const currentUser = useSelector((state: RootState) => state.currentUser) as unknown as IUser;
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(currentUser.savedLists.some(list => list.properties.includes(id)));
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const allLists = currentUser.savedLists;
  const [selectedList, setSelectedList] = useState(() => {
    const defaultList = allLists.find((list) => list.properties.includes(id));
    return defaultList ? defaultList.name : ""; 
  });  
  const [lastList, setLastList] = useState(selectedList);

  console.log(allLists)

  console.log(currentUser);

  function clickButton() {
    if (value) {
      setParagraphs([...paragraphs, value]);

      setValue("");

    }
  }

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const mutationFn = async ({ action, listName }: MutationVariables): Promise<IUser> => {
    return modifyUserArrays(
      action,
      { 
        savedList: { 
          name: listName,
          propertyId: id 
        } 
      } as any
    );
  };
  
  const useSavedListMutation = () => {
    return useMutation<IUser, Error, MutationVariables, MutationContext>({
      mutationFn,
      onMutate: (params) => {
        if(params.action === "add") 
          setIsLiked(true);
        else
          setIsLiked(false);
        setOpen(true)
        
        setLastList(selectedList);

        return {
          rollback: () => setIsLiked(prev => !prev),
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

  const handleLikeClick = () => {
    if(isLiked) {
      mutate({ action: "delete" });
    }
    else {
      mutate({ action: "add" });
    }

  };

  const handleChangeList = (value: string) => {
    mutate({ action: "add", listName: value});
    setSelectedList(value);
  }

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip>
            <PopoverContent dir="rtl" className="rounded-lg" sideOffset={45}>
              {isLiked && !isPending && (
                <div>
                  {/* <p>נשמר ב: הטיול הבא שלי</p> */}
                  <p>Saved to: {selectedList}</p>
                  <hr />
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex justify-between flex-row-reverse w-full px-4 py-3">
                        <p className="text-blue-400">Change</p>
                        <p>⮟</p>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>

                    <RadioGroup className="flex flex-col gap-3" value={selectedList}
                    onValueChange={handleChangeList}
                    >
                      { allLists.map(list =>
                      <div className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={list.name} 
                          id={list.name} key={list.name} />
                        <Label htmlFor={list.name}>{list.name}</Label>
                      </div>
                    )}
                    </RadioGroup>



                      {paragraphs.map((paragraph, index) => (
                        <p key={index}>
                          <input type="radio" id="myRadio" className="my-2	" />
                          {paragraph}
                        </p>
                      ))}
                      <label>
                        <div className="flex gap-1">
                          <input type="radio" id="myRadio" className="my-2	" />
                          <p>הטיול הבא שלי</p>
                        </div>
                        <div>
                          <input type="radio" disabled className="" />
                          <input
                            onChange={change}
                            type="text"
                            value={value}
                            className="border black p-1"
                            placeholder="יצירת רשימה"
                          />
                          <button onClick={clickButton} className="p-2 border">
                            click
                          </button>
                        </div>
                      </label>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
              {!isLiked && !isPending && (
                <div>
                  {/* <p> הוסר מ: הטיול הבא שלי</p> */}
                  <p>Removed from: {lastList}</p>
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
                <IconHeartRed className="w-5 h-5 fill-red-500" />
              ) : (
                <IconHeart className="w-5 h-5" />
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
