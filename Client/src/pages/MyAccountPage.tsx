import BookingAwayCardAccount from '@/components/BookingAwayCardAccount'
import CardWithLocationHome from '@/components/CardWithLocationHome'
import CompleteProfile from '@/components/CompleteProfile'
import CreditAccount from '@/components/CreditAccount'
import GeniusRewardAccount from '@/components/GeniusRewardAccount'
import MainCardAccount from '@/components/MainCardAccount'
import { Coins, Payment, Person, Persons, Unlock,Lock, Volume, Email, Bag, Heart, Command, Question, Safety, Hands, ViBorder, Note, HousePlus } from '@/components/ui/Icons'
import { title } from 'process'
import React from 'react'
import { useTranslation } from 'react-i18next'

function MyAccountPage() {

  const {t} = useTranslation()

  const arr = [ 
    {
      title: t("MyAccount.PaymentInformation"),
      list: [
        {
          icon : Coins,
          title: t("MyAccount.Rewards"),
          link: "",
        },
        {
          icon : Payment,
          title: t("MyAccount.Payment"),
          link: "",
        }
      ]
    },
    {
      title: t("MyAccount.ManageAccount"),
      list: [
        {
          icon : Person ,
          title: t("MyAccount.Personal"),
          link: "",
        },
        {
          icon : Lock ,
          title: t("MyAccount.Security"),
          link: "",
        },
        {
          icon : Persons,
          title: t("MyAccount.Travellers"),
          link: "",
        }
      ]
    },
    {
      title: t("MyAccount.Preferences"),
      list: [
        {
          icon : Volume  ,
          title: t("MyAccount.Customisation"),
          link: "",
        },
        {
          icon : Email  ,
          title: t("MyAccount.Email"),
          link: "",
        }
      ]
    },
    {
      title: t("MyAccount.TravelActivity"),
      list: [
        {
          icon : Bag ,
          title: t("MyAccount.Trips"),
          link: "",
        },
        {
          icon : Heart  ,
          title: t("MyAccount.Saved"),
          link: "",
        },
        {
          icon : Command ,
          title: t("MyAccount.reviews"),
          link: "",
        }
      ]
    },
    {
      title: t("MyAccount.HelpAndSupport"),
      list: [
        {
          icon : Question  ,
          title: t("MyAccount.Contact"),
          link: "",
        },
        {
          icon : Safety   ,
          title: t("MyAccount.Safety"),
          link: "",
        },
        {
          icon : Hands  ,
          title: t("MyAccount.MyReviews"),
          link: "Dispute resolution",
        }
      ]
    },
    {
      title: t("MyAccount.LegalAndPrivacy"),
      list: [
        {
          icon : ViBorder  ,
          title: t("MyAccount.Privacy"),
          link: "",
        },
        {
          icon : Note   ,
          title: t("MyAccount.Content"),
          link: "",
        }
      ]
    },
    {
      title: t("MyAccount.ManageYourProperty"),
      list: [
        {
          icon : HousePlus  ,
          title: t("MyAccount.Property"),
          link: "",
        },
        
      ]
    },
    
  ]
  return (<>
      <div className="absolute top-0 w-full -z-10 h-[700px]  bg-[#013b94]"></div>
      <div className='max-w-[1100px] mx-auto flex flex-col gap-3 '>
      <div className='flex flex-col flex-wrap gap-3 md:grid md:grid-cols-[70%_30%] gap-2'>
        <GeniusRewardAccount />
        <div className='flex flex-col justify-between gap-2'>
        <BookingAwayCardAccount />
        <CreditAccount />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
      <CompleteProfile />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
        {arr.map(item =>  <MainCardAccount key={item.title} item = {item}/>)}
        </div>
      </div>
    </div></>
  )
}

export default MyAccountPage
