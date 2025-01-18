import BookingAwayCardAccount from '@/components/BookingAwayCardAccount'
import CardWithLocationHome from '@/components/CardWithLocationHome'
import CompleteProfile from '@/components/CompleteProfile'
import CreditAccount from '@/components/CreditAccount'
import GeniusRewardAccount from '@/components/GeniusRewardAccount'
import MainCardAccount from '@/components/MainCardAccount'
import { Coins, Payment, Person, Persons, Unlock,Lock, Volume, Email, Bag, Heart, Command, Question, Safety, Hands, ViBorder, Note, HousePlus } from '@/components/ui/Icons'
import { title } from 'process'
import React from 'react'

function MyAccountPage() {

  const arr = [ 
    {
      title: "Payment information",
      list: [
        {
          icon : Coins,
          title: "Rewards & Wallet",
          link: "",
        },
        {
          icon : Payment,
          title: "Payment Methods",
          link: "",
        }
      ]
    },
    {
      title: "Manage account",
      list: [
        {
          icon : Person ,
          title: "Personal details",
          link: "",
        },
        {
          icon : Lock ,
          title: "Security settings",
          link: "",
        },
        {
          icon : Persons,
          title: "Other travellers",
          link: "",
        }
      ]
    },
    {
      title: "Preferences",
      list: [
        {
          icon : Volume  ,
          title: "Customisation preferences",
          link: "",
        },
        {
          icon : Email  ,
          title: "Email preferences",
          link: "",
        }
      ]
    },
    {
      title: "Travel activity",
      list: [
        {
          icon : Bag ,
          title: "Trips and bookings",
          link: "",
        },
        {
          icon : Heart  ,
          title: "Saved lists",
          link: "",
        },
        {
          icon : Command ,
          title: "My reviews",
          link: "",
        }
      ]
    },
    {
      title: "Help and support",
      list: [
        {
          icon : Question  ,
          title: "Contact Customer service",
          link: "",
        },
        {
          icon : Safety   ,
          title: "Safety resource centre",
          link: "",
        },
        {
          icon : Hands  ,
          title: "My reviews",
          link: "Dispute resolution",
        }
      ]
    },
    {
      title: "Legal and privacy",
      list: [
        {
          icon : ViBorder  ,
          title: "Privacy and data management",
          link: "",
        },
        {
          icon : Note   ,
          title: "Content guidelines",
          link: "",
        }
      ]
    },
    {
      title: "Manage your property",
      list: [
        {
          icon : HousePlus  ,
          title: "List your property",
          link: "",
        },
        
      ]
    },
    
  ]
  return (
    <div className='max-w-[1100px] mx-auto flex flex-col gap-3'>
      <div className="absolute top-0 w-full -z-10 h-[700px]  bg-[#013b94]"></div>
      <div className='flex flex-col flex-wrap gap-2 md:grid md:grid-cols-[70%_30%] gap-2'>
        <GeniusRewardAccount />
        <div className='flex flex-col justify-between'>
        <BookingAwayCardAccount />
        <CreditAccount />
        </div>
      </div>
      <CompleteProfile />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
        {arr.map(item =>  <MainCardAccount key={item.title} item = {item}/>)}
        
      </div>
    </div>
  )
}

export default MyAccountPage
