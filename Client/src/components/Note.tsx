import React from 'react'
import { Card, CardContent } from './ui/card'

function Note() {
  return (
    <div>
        <Card className='p-2'>
            <CardContent className='text-sm flex flex-col gap-3'>
                <p>Please note that the hotel is located in a limited parking zone. Guests plan to arrive by car they are kindly requested to contact the hotel for more information.</p>
                <p>Upon check-in a photo id and a credit card is required. All special requests are subject to availability. Special requests cannot be guaranteed and may incur additional charges.</p>
                <p>When booking for four rooms or more, special reservation conditions may apply.</p>
                <p>Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply.</p>
                <p>Please inform Aparthotel Stare Miasto in advance of your expected arrival time. You can use the Special Requests box when booking, or contact the property directly with the contact details provided in your confirmation.</p>
                <p>This property will not accommodate hen, stag or similar parties.</p>
                <p>Quiet hours are between 22:00:00 and 07:00:00.</p>
                <p>In response to Coronavirus (COVID-19), additional safety and sanitation measures are in effect at this property.</p>
                <p>Food & beverage services at this property may be limited or unavailable due to Coronavirus (COVID-19)</p>
                <p>It is not possible to stay at this property for Coronavirus (COVID-19) quarantine purposes.</p>
                <p>When staying at the property with children, please note that the property is legally obliged to apply standards for the protection of minors, to determine the identity of the minors and their relationship with the adult with whom they are staying.</p>
            </CardContent>
        </Card>
      
    </div>
  )
}

export default Note
