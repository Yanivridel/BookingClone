import PersonalDetails from '@/components/PersonalDetails'
import SecuritySettings from '@/components/SecuritySettings'
import SettingsNavigate from '@/components/SettingsNavigate'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import OtherTravellers from './OtherTravellers'
import CustomisationPreferences from '@/components/CustomisationPreferences'
import PaymentMethods from '@/components/PaymentMethods'
import PrivecyAndManagment from '@/components/PrivecyAndManagment'

function MySettings() {
    const{ category } = useParams()

    const [page, setPage] = useState(category || "Personal details")

  return (
    <div className='flex gap-16 max-w-[1100px] mx-auto p-5'>
        <div>
            <SettingsNavigate setPage = {setPage} category = {category} />
        </div>
        <div>
            {page === "Personal details" &&<PersonalDetails />}
            {page === "Security settings" &&<SecuritySettings />}
            {page === "Other travellers" &&<OtherTravellers />}
            {page === "Customisation preferences" &&<CustomisationPreferences />} 
            {page === "Payment Methods" &&<PaymentMethods/>}
            {page === "Privacy and data management" &&<PrivecyAndManagment />}
        </div>

    </div>
  )
}

export default MySettings
