import React from 'react'
import { Card } from './ui/card'
import { IProperty } from '@/types/propertyTypes'
import { Bottle, CheckIn, CheckOut, Cigar, Groups, Information, Payment, Person, Persons, Pet, } from './ui/Icons';

// Images
import { Button } from './ui/button';
import Visa from '../assets/images/Visa Payment Card.png'
import Mastercard from '../assets/images/MasterCard.png'
import AmericanExpress from '../assets/images/American Express Card.png'
import Discover from '../assets/images/Discover Financial Service.png'
import Maestro from '../assets/images/Mastercard Maestro.png'
import PayPal from '../assets/images/PayPal New 2023.png'

interface propertyDataProps{
    propertyData? : IProperty
}

function HouseRules({propertyData} : propertyDataProps) {
    const acceptedPayments = propertyData?.houseRules.accepted_payments || []
    
    const getPaymentImage = (paymentMethod: string) => {
        if (paymentMethod === 'Visa') {
          return Visa
        } else if (paymentMethod === 'MasterCard') {
          return Mastercard
        } else if (paymentMethod === 'PayPal') {
          return PayPal
        } else if (paymentMethod === 'Discover') {
            return Discover
        } else if (paymentMethod === 'Maestro') {
            return Maestro
        } else if (paymentMethod === 'Maestro') {
            return Maestro
        }  else {
            return null
        }
      }
    
  return (
    <div className='p-3 border rounded-lg'> 
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2'>
                    <div><CheckIn className='w-4 h-4'/></div>
                    <div>Check In</div>
                </div>
                <div className=' w-[70%] flex text-xs'>
                    <p className=' w-[50%]'>{propertyData?.houseRules.checkin.start}</p>
                </div>
            </div>
        </div>
        <div className='p-3'>
        <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><CheckOut className='w-4 h-4'/></div>
                    <div>Check Out</div>
                </div>
                <div className=' w-[70%] flex text-xs'>
                    <p className=' w-[50%]'>{propertyData?.houseRules.checkout.start}</p>
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2'>
                    <div><Information className='w-4 h-4'/></div>
                    <div>Cancellation/ prepayment</div>
                </div>
                <div className=' w-[70%] flex  text-xs'>
                    <p className=' w-[50%]'>{propertyData?.houseRules.cancellation_prepayment} <span className='text-sx text-blue-500 hover:underline cursor-pointer'>enter the dates of your stay </span></p>
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] flex items-center font-bold text-base gap-2'>
                    <div><Persons className='w-4 h-4'/></div>
                    <div>Children and beds</div>
                </div>
                <div className=' w-[70%] flex  text-xs'>
                    <div className=' w-[50%] flex flex-col gap-2'>
                        <div>
                            <h1 className='font-bold text-base'>Child policies</h1>
                            <p>{propertyData?.houseRules.children_beds?.child_policy}</p>
                        </div>
                        <div>
                            <h1 className='font-bold text-base'>Cot and extra bed policies</h1>
                            <p>{propertyData?.houseRules.children_beds?.bed_policy?.map(Item => (
                                <div key={Item} className='border'>
                                    <p className='border-b-2'>Age: {Item.age.start} {Item.age.end !== Item.age.start && `- ${Item.age.end}`}</p>
                                    <div className='flex gap-5'>
                                        <p>{Item.type}</p>
                                        <p className='text-green-600'>{Item.price_num}</p>
                                    </div>
                                </div>
                            ))}</p>
                        </div>
      
                    </div>
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><Person className='w-4 h-4'/></div>
                    <div>No age restriction</div>
                </div>
                <div className=' w-[70%] flex items-center text-xs'>
                    <p className=' w-[50%]'>{propertyData?.houseRules.age_restriction}</p>
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><Groups className='w-4 h-4'/></div>
                    <div>Groups</div>
                </div>
                <div className=' w-[70%] flex items-center text-xs'>
                    <p className=' w-[50%]'>{propertyData?.houseRules.groups}</p>
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><Bottle className='w-4 h-4'/></div>
                    <div>Parties</div>
                </div>
                <div className=' w-[70%] flex items-center text-xs'>
                    {propertyData?.houseRules.parties ? <p className=' w-[50%]'>Parties/events are not allowed</p> : <p className=' w-[50%]'>Parties allowed</p>}
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><Pet className='w-4 h-4'/></div>
                    <div>Pets</div>
                </div>
                <div className=' w-[70%] flex items-center text-xs'>
                    {propertyData?.houseRules.pets ? <p className=' w-[50%]'>allowed</p> : <p className=' w-[50%]'>Not allowed</p>}
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><Cigar className='w-4 h-4'/></div>
                    <div>Smoking</div>
                </div>
                <div className=' w-[70%] flex items-center text-xs'>
                    <p className=' w-[50%]'>Smoking is not allowd.</p>
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><Payment className='w-4 h-4'/></div>
                    <div>Card accepted at this property</div>
                </div>
                <div className=' w-[70%] flex items-center text-xs'>
                    <p className=' w-[50%]'>{propertyData?.houseRules.accepted_payments}</p>
                </div>
            </div>
        </div>
        <div className='p-3'>
            <div className='flex border-b-2 items-start py-3'>
                <div className='w-[30%] font-bold text-base flex items-center gap-2 '>
                    <div><CheckIn className='w-4 h-4'/></div>
                    <div>Check In</div>
                </div>
                <div className=' w-[70%] flex items-center text-xs'>
                    <p className=' w-[50%]'>{propertyData?.houseRules.checkin.start}</p>
                </div>
            </div>
        </div>

        
      
    </div>
  )
}

export default HouseRules




// export enum EPaymentMethods {
//     CREDIT_CARD = 'Credit Card',
//     DEBIT_CARD = 'Debit Card',
//     MasterCard = "MasterCard",
//     PAYPAL = 'PayPal',
//     BANK_TRANSFER = 'Bank Transfer',
//     CASH = 'Cash',
//     APPLE_PAY = 'Apple Pay',
//     GOOGLE_PAY = 'Google Pay',
//     CRYPTOCURRENCY = 'Cryptocurrency',
//     Visa = 'Visa',
//     OTHER = 'Other'
// }