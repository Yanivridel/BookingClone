import PersonalDetails from '@/components/PersonalDetails'
import SecuritySettings from '@/components/SecuritySettings'
import SettingsNavigate from '@/components/SettingsNavigate'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OtherTravellers from './OtherTravellers'
import CustomisationPreferences from '@/components/CustomisationPreferences'
import PaymentMethods from '@/components/PaymentMethods'
import PrivecyAndManagment from '@/components/PrivecyAndManagment'

const SettingsMobileWidth = 900 

function MySettings() {
    const{ category } = useParams()
    const [isMobile, setIsMobile] = useState<boolean>(
      window.innerWidth < SettingsMobileWidth
    );
    const [page, setPage] = useState(category || "Personal details")

    useEffect(() => {
        const checkMobile = () => {
          setIsMobile((prevIsMobile) => {
            if (window.innerWidth < SettingsMobileWidth && !prevIsMobile) return true;
            else if (window.innerWidth >= SettingsMobileWidth && prevIsMobile)
              return false;
            return prevIsMobile;
          });
        };
    
    
        window.addEventListener("resize", checkMobile);
    
        return () => {
          window.removeEventListener("resize", checkMobile);
        };
      }, []);

  return (
    <div className='flex gap-16 max-w-[1100px] mx-auto p-5'>
        { !isMobile && <div>
            <SettingsNavigate setPage = {setPage} category = {category} />
        </div> }
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
