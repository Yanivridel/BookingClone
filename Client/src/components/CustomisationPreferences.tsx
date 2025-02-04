import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { coinTypes, languageData } from '@/utils/staticData'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { IUser } from '@/types/userTypes'
import { useDispatch } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import { editProfile } from '@/utils/api/userApi'
import { setUser } from '@/store/slices/userSlices'
import { Spinner } from './ui/Icons'

function CustomisationPreferences() {
  const [ currLanguage, setCurrLanguage] = useState({ label: "🇮🇱", language: "Hebrew" })
  const [ currCurrency, setCurrCurrency] = useState({ label: "🇮🇱", currency: "ILS" })
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  const userCoin = coinTypes.find(c => c.currency === currentUser.coinType);
  const userLanguage = languageData.find(c => c.language === currentUser.language);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if(userCoin)
        setCurrCurrency(userCoin)
      if(userLanguage)
        setCurrLanguage(userLanguage)
    }, [ currentUser ]);
  
  const handleSave = async (key: string) => {
      setIsLoading(true);
      const fieldsToUpdate: any = {};
      fieldsToUpdate[key] = key === "coinType" ? currCurrency.currency : currLanguage.language;

      try {
        const user = await editProfile(fieldsToUpdate);
        if (user) dispatch(setUser(user));
  
        toast({
          variant: "success",
          title: "Success",
          description: "Fields Updated Successfully"
        })
  
      } catch(err) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please Try Again Later..."
        })
        
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div>
      <div className="grid grid-cols-1 max-w-[1100px]">
      <div className="border-b-2 flex justify-between p-2">
        <div className=" flex flex-col gap-2">
          <h1 className="font-bold text-4xl">Customization preferences</h1>
          <p className="text-gray-500">
            Update your information and find out how it's used.
          </p>
        </div>
        </div>
        <Accordion type="single" collapsible className="w-full p-4">
        {/* Coin Type */}
        <AccordionItem value="item-1" className="p-4">
        <div className='flex justify-between'>
        <div>
          <p>Currency</p>
          <p className='text-sm'>
            {userCoin?.label + " " + userCoin?.currency}
          </p>
        </div>
        <div>
          <AccordionTrigger>
            <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Edit
              </Button>
          </AccordionTrigger>
        </div>
        </div>
          <AccordionContent className="flex flex-col gap-10">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Currency</p>
                <Select onValueChange={(val) => setCurrCurrency(coinTypes.find(c => c.label === val)!)}>
                  <SelectTrigger className="border rounded-lg p-2 ms-3 w-5/6">
                    <SelectValue placeholder={currCurrency.label + " " + currCurrency.currency}>{currCurrency.label + " " + currCurrency.currency}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {coinTypes.map((coin) => (
                      <SelectItem
                      className={`cursor-pointer ${currCurrency.label === coin.label ? "bg-blue-500 focus:bg-blue-500" : ""}`}
                      key={coin.currency+coin.label} value={coin.label}>
                        {coin.label + " "} 
                        {coin.currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" flex justify-between">
              <AccordionTrigger value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button disabled={isLoading} onClick={() => handleSave("coinType")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Language */}
        <AccordionItem value="item-2" className="p-4">
        <div className='flex justify-between'>
        <div>
          <p>Language</p>
          <div className='flex items-center gap-2'>
            <p className='text-sm'>
              {userLanguage?.label + " " + userLanguage?.language}
            </p>
          </div>
        </div>
        <div>
            <AccordionTrigger>
            <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Edit
              </Button>
            </AccordionTrigger>
        </div>
        </div>
          <AccordionContent className="flex flex-col gap-10">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Language</p>
                <Select onValueChange={(val) => setCurrLanguage(languageData.find(c => c.label === val)!)}>
                  <SelectTrigger className="border rounded-lg p-2 ms-3 w-5/6">
                    <SelectValue placeholder={currLanguage.label + " " + currLanguage.language}>{currLanguage.label + " " + currLanguage.language}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {languageData.map((lang) => (
                      <SelectItem
                      className={`cursor-pointer ${currLanguage.label === lang.label ? "bg-blue-500 focus:bg-blue-500" : ""}`}
                      key={lang.language+lang.label} value={lang.label}>
                        {lang.label + " "} 
                        {lang.language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" flex justify-between">
              <AccordionTrigger value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button disabled={isLoading} onClick={() => handleSave("language")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        </Accordion>
        </div>
    </div>
  )
}

export default CustomisationPreferences
