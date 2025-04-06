import PersonalDetails from '@/components/PersonalDetails'
import SecuritySettings from '@/components/SecuritySettings'
import SettingsNavigate from '@/components/SettingsNavigate'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OtherTravellers from './OtherTravellers'
import CustomisationPreferences from '@/components/CustomisationPreferences'
import PaymentMethods from '@/components/PaymentMethods'
import PrivecyAndManagment from '@/components/PrivecyAndManagment'
import { scrollToTopInstant } from '@/utils/functions'

const possibleCategories = [
  'Personal details', 'Security settings', 'Other travellers', 'Customisation preferences', 
  'Payment methods', 'Privacy and data management'
] 

function MySettings() {
    const{ category } = useParams()
    const [page, setPage] = useState(() => {
      return category && possibleCategories.includes(category) ? category : "Personal details";
    })

    useEffect(() => {
      document.title = 'Booking.com | האתר הרשמי | הגדרות';
      scrollToTopInstant();
    }, []);

  return (
    <div className={`flex gap-16 max-w-[1100px] mx-auto p-5 flex-col md:flex-row`}>
        <div>
            <SettingsNavigate setPage = {setPage} category = {page} />
        </div>
        <div className='w-full'>
            {page === "Personal details" &&<PersonalDetails />}
            {page === "Security settings" &&<SecuritySettings />}
            {page === "Other travellers" &&<OtherTravellers />}
            {page === "Customisation preferences" &&<CustomisationPreferences />} 
            {page === "Payment methods" &&<PaymentMethods/>}
            {page === "Privacy and data management" &&<PrivecyAndManagment />}
        </div>

    </div>
  )
}

export default MySettings
