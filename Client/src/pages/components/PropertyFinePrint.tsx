interface PropertyFinePrintProps {
  fine_print: string | undefined;
}

function PropertyFinePrint({ fine_print }: PropertyFinePrintProps) {
  return (
    <div className="text-sm border-[1px] border-softGrayBorder p-4 rounded-[8px]">
      {fine_print ? (
        <div>{fine_print}</div>
      ) : (
        <div>
          <p>
            {" "}
            Please note that the hotel is located in a limited parking zone.
            Guests plan to arrive by car they are kindly requested to contact
            the hotel for more information.
          </p>
          <br />
          <p>
            Upon check-in a photo id and a credit card is required. All special
            requests are subject to availability. Special requests cannot be
            guaranteed and may incur additional charges.
          </p>
          <br />
          <p>
            When booking for four rooms or more, special reservation conditions
            may apply.
          </p>
          <br />
          <p>
            Guests are required to show a photo ID and credit card upon
            check-in. Please note that all Special Requests are subject to
            availability and additional charges may apply.
          </p>
          <br />
          <p>
            Please inform Aparthotel Stare Miasto of your expected arrival time
            in advance. You can use the Special Requests box when booking, or
            contact the property directly using the contact details in your
            confirmation.
          </p>
          <br />
          <p>
            This property does not accommodate bachelor(ette) or similar
            parties.
          </p>
          <br />
          <p>Quiet hours are between 22:00:00 and 07:00:00.</p>
          <br />
          <p>
            In response to the coronavirus (COVID-19), additional safety and
            sanitation measures are in effect at this property.
          </p>
          <br />
          <p>
            Food and beverage services at this property may be limited or
            unavailable due to the coronavirus (COVID-19).
          </p>
          <br />
          <p>
            It's not possible to stay at this property for coronavirus
            (COVID-19) quarantine purposes.
          </p>
          <br />
          <p>
            When staying at the property with children, note that the property
            is legally obliged to apply standards for the protection of minors
            to determine the identity of the minors and their relationship with
            the adult they’re staying with.
          </p>
        </div>
      )}
    </div>
  );
}

export default PropertyFinePrint;
