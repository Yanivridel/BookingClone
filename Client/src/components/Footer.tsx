import { useTranslation } from "react-i18next";
import Languages from "./Languages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function Footer() {
  const footerNav = [
    {
      category: "Support",
      subs: [
        "Coronavirus (COVID-19) FAQs",
        "Manage your trips",
        "Contact Customer Service",
        "Safety Resource Center",
      ],
    },
    {
      category: "Discover",
      subs: [
        "Genius loyalty program",
        "Seasonal and holiday deals",
        "Travel articles",
        "Booking.com for Business",
        "Traveller Review Awards",
        "Car rental",
        "Flight finder",
        "Restaurant reservations",
        "Booking.com for Travel Agents",
      ],
    },
    {
      category: "Terms and Settings",
      subs: [
        "Privacy & cookies",
        "Terms & conditions",
        "Partner dispute",
        "Modern Slavery Statement",
        "Human Rights Statement",
      ],
    },
    {
      category: "Partners",
      subs: [
        "Extranet login",
        "Partner help",
        "List your property",
        "Become an affiliate",
      ],
    },
    {
      category: "About",
      subs: [
        "About Booking.com",
        "How We Work",
        "Sustainability",
        "Press center",
        "Careers",
        "Investor relations",
        "Corporate contact",
      ],
    },
  ];

  const Breadcrumb = [
    "Countries",
    "Regions",
    "Cities",
    "Districts",
    "Airports",
    "Hotels",
    "Places of interest",
    "Vacation Homes",
    "Apartments",
    "Resorts",
    "Villas",
    "Hostels",
    "B&Bs",
    "Guest Houses",
    "Unique places to stay",
    "All destinations",
    "All flight destinations",
    "All car rental locations",
    "All vacation destinations",
    "Guides",
    "Discover",
    "Reviews",
    "Discover monthly stays",
  ];

  const { i18n } = useTranslation();

  return (
    <div className="mt-10">
      <div className="flex flex-wrap text-xs">
        {Breadcrumb.map((item, i) => (
          <div className="py-2 ps-1">
            <span className="pe-1"> {item}</span>
            {i !== Breadcrumb.length - 1 && <span>•</span>}
          </div>
        ))}
      </div>

      <div className="bg-[#f5f5f5] mt-4">
        {/* small screen */}
        <Accordion type="multiple" className="w-full p-5 foo:hidden ">
          {footerNav.map((item) => (
            <AccordionItem key={item.category} value={item.category}>
              <AccordionTrigger className="hover:no-underline text-sm ">
                {item.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid">
                  {item.subs.map((sub) => (
                    <div
                      key={sub}
                      className="underline-offset-4 hover:underline hover:cursor-pointer py-1"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          <div className="  w-6 cursor-pointer mx-auto  my-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className=" p-3 hover:bg-softGrayBorder rounded-lg">
                    <Languages></Languages>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side={i18n.language === "he" ? "left" : "right"}
                  className="bg-black text-white"
                >
                  Select your language
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Accordion>

        {/* big screen */}
        <div className="hidden foo:block ">
          <div className=" w-full p-5    foo:flex foo:flex-wrap foo:gap-4">
            {footerNav.map((item) => (
              <div className="basis-[170px] " key={item.category}>
                <div className="hover:no-underline text-sm font-bold">
                  {item.category}
                </div>
                <div>
                  <div className="grid text-sm">
                    {item.subs.map((sub) => (
                      <div
                        key={sub}
                        className="underline-offset-4 hover:underline hover:cursor-pointer py-1"
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" w-6 cursor-pointer mx-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className=" p-3 hover:bg-softGrayBorder rounded-lg">
                    <Languages></Languages>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side={i18n.language === "he" ? "left" : "right"}
                  className="bg-black text-white"
                >
                  Select your language
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <hr className="w-[90%] mx-auto my-3 border-softGrayBorder" />
        <div className="text-xs flex flex-col items-center px-">
          <p className="text-center">
            Booking.com is part of Booking Holdings Inc., the world leader in
            online travel and related services.
          </p>
          <p> Copyright © 1996–2025 Booking.com™. All rights reserved. </p>
        </div>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
          doloribus, excepturi dolorum numquam iste expedita unde doloremque
          atque consequatur? Consectetur enim eos magnam rerum possimus
          molestias dolores, soluta quia. Temporibus? Libero vero quibusdam
          necessitatibus aspernatur eius, possimus, nihil quis provident dolores
          eligendi id! Quaerat, laboriosam voluptatibus at explicabo unde iusto
          qui nobis aperiam modi harum itaque eum. Recusandae, nemo libero!
          Delectus odit maxime quaerat fuga. Itaque, vel ut. Deleniti distinctio
          ut doloribus delectus ipsa eos provident tenetur dolores ullam nihil
          explicabo, suscipit cumque nisi? Repellat natus perferendis cum rerum
          reprehenderit! Rem nostrum nam natus sit quo doloribus quis dolores
          eaque commodi ratione distinctio reprehenderit, eveniet nesciunt
          perspiciatis a reiciendis. Obcaecati alias enim optio rem et
          repudiandae itaque dicta, reiciendis illo? Ut reprehenderit nemo
          ducimus modi reiciendis, maiores, ratione iste facilis culpa
          dignissimos hic laudantium! Dolore, accusamus autem quo deleniti
          facilis eveniet quasi eum alias rem non assumenda! Maxime, dolorem
          modi? Iure sequi officiis itaque recusandae fugit, nostrum porro
          labore tenetur corrupti in beatae, veritatis ex at illo non fugiat
          voluptates similique ipsum voluptatem repellendus eius maiores.
          Cumque, repellendus. Quae, quo. Ex reiciendis enim esse sequi
          similique, nesciunt vitae ab ut. Voluptatem ipsam quas a modi ut
          adipisci quasi. Dignissimos unde blanditiis neque porro voluptates
          veniam similique molestiae beatae possimus quas! Voluptas
          necessitatibus consequatur placeat illum accusamus veritatis, commodi
          incidunt explicabo pariatur voluptatibus. Nostrum ipsam vero dicta,
          itaque officia, ipsum cum similique exercitationem illum iste autem at
          assumenda, recusandae et quis. Sed sint nihil assumenda, quo
          necessitatibus tempore optio? Accusamus sint iure tenetur quis, hic
          est doloremque tempora sed libero ipsam dicta nam corrupti et, nisi
          enim veniam magnam nobis earum! Accusantium totam aut eius, quos ab
          similique dicta saepe numquam aliquam fugiat, nisi veritatis,
          asperiores nesciunt! Laudantium ex modi voluptatibus sit. Quod libero
          laudantium accusantium enim aliquid debitis ab nesciunt.
        </div>
      </div>
    </div>
  );
}

export default Footer;
