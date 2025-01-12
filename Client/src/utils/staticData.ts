import { IconPlusMinus } from "@/components/ui/Icons";
export const searchCalendarButtonsData = [
  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMinusButtons.4",
  },
  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMinusButtons.3",
  },

  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMinusButtons.2",
  },
  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMinusButtons.1",
  },
  {
    text: "search.caledarPlusMinusButtons.0",
  },
];
export const monthsAndYears = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();
  const month = date.getMonth();
  let year = date.getFullYear();
  const monthsFromCurrentMonth = [];

  for (let i = 0; i < 12; i++) {
    const currentMonth = months[(month + i) % 12];

    if (month + i === 12) {
      year++;
    }

    monthsFromCurrentMonth.push({ monthName: currentMonth, year });
  }

  return monthsFromCurrentMonth;
};

export const TrendingImages = [
  {
    city: "Paris",
    image:
      "https://cf.bstatic.com/xdata/images/city/600x600/977242.jpg?k=72bfe23a6d7a496e0305b94bbb28ce197f3df2d6dd28986c3760a5f1c931664c&o=",
    flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAq1BMVEX///8AAAAAAAAAAAAAAAD////t7e3qjZboho/nfIfmdoGJibnlcH3kbHmCgrTiY3DiYG5ycqrfVGNra6feT13eTFzdRlXcRVXYQFBbW53WPEvaN0fRMUNQUJVNTZTXKTzOKULWJTjNKDlCQo3KIzTVHjHVHDDJHjHUFys6OojHGSzTEibTECTFEiQwMIMuLn4pKXsiInsfH3MYGHQXF20SEmoREXEKCmQICGsvokYkAAAABXRSTlMAESIzRJTdRHwAAACVSURBVBgZrcExTsNQEEXR+2bed4OCsgb2vyqqFFRpkBD4Z2w3IzlNJM6BfyPEM1P6YPfJ4cruy+JGd2dzkSGT8sMhKaswZNAkZQqzxEKTlCkMy6AJSgozPGgGm8BoeaMxZQqj90FzoXz/YSROQgQSZ4ERQZMUT4wmnSgKjIKTCAysNL9sEhPsxGFwkEKczVWIZyYvewBukRO4DA23HQAAAABJRU5ErkJggg==",
  },
  {
    city: "Rome",
    image:
      "https://cf.bstatic.com/xdata/images/city/600x600/981621.jpg?k=28592ab3120c4a8cc6110eafde84e421991074461f2e7b3323fcc00eb0916a56&o=",
    flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAxlBMVEX///8AAAAAAAAAAAAAAAD////t7e2UzrCOyquDxqN+w6B5wJx1v5nulJZtupNquZHtjY9ftIles4hXsIPsg4dVr4JQrn7sf4JMqnvreX1IqHfqdXlEpXPobXA2oms7n2zpam4zn2gzmWYqm2PnX2MulmEjmV3mXmEplF4fllrmWFwjj1gfjVXjU1fmUFXgTFDeSkrjQkfdQkfeQkLXOD7gNjzgMzjWNDngLzXULzTfKjDfJyzSKzHeIynRJizQIyjdHyTNHyRobP1rAAAABXRSTlMAESIzRJTdRHwAAACYSURBVBgZrcE7DsJQDEXBc22HT2paSva/HBbADhANoLyHQxqL0CAxA38jxDddOjRmVxYn3s6hdqO6MDsqMBmpsRhJdwgkowjS5ARmTjGQmgjMnWJLmkRgHhRb0iQCHzYUThqNgN1AMZIejcBwPkkE6lRGMhF4o3LS1Am8OSuO4azJCOBB8WQmAu2ZicWGhWRirTchvun87AVVDBm1+yb5GwAAAABJRU5ErkJggg==",
  },
  {
    city: "London",
    image:
      "https://cf.bstatic.com/xdata/images/city/600x600/977262.jpg?k=2b852648c76ccaff8be05333057712eda873343dfaa79cd23e55534a1a55aecc&o=",
    flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABd1BMVEX///8AAAAAAAAAAAAAAAD////4////+fj2+Pz/9fLx9fnv9vzt8PXt7u776evo7PXo6+//5eX65ebj5fDg4+f73N7b4e741NfU1+j2zND3x8rN0OT2xMjmws30vsP0uL2/wtzstb25vdjyrrPZs8PwqrDJs8mzttTvpayvrs7wnKO7qMPVn7DfnaSjqM2vosOgpcvrkJDvjJObnr/piJOamsPwhIqYmMDngYyPlMLne3vpeYO4hKHueIHQfpPZeouJibSGirrnc3yrgJvYdn+EiLjmcHDob3qae6TLbILkZnLkZWWGeqrjXWpyd615c6JycqXlVmJrc63hV1dtbabgUVFra5/lSVbfSkpgZaNjY51ZYKNbW5boOUTVPkvdPEzjO0ncPDxZWZpRWp7WOTnlMT/aMDDOMD9NTY1CQo7XICBCQoXWGRk6OoM6On/HFxgpNIEeKYIZJH8hIWwYGWsOGHUXF2UREWYREXAPD2wNDGgHBmUGBlziP6OmAAAABXRSTlMAESIzRJTdRHwAAAFFSURBVHjardHbNwJBAMfx3c1oWkUqFaWIlJBa93K/5BJZ0lpsbiVbW0LLZuwfb5ZTL+XBOb4v8zvzeZiHIf4zsm34Pghc90WcBDMZKGkrN7E7SxJUfERPh9dxMBqF2hkeDPUDiqB2hpk+EGBZFsZikGVT40HGAuYwSEuj817gPONgIgG50zEmpDcuSBgq3MX0ImOwCjCZhMLkigcMXXLfIIiib8ADrDCdhg6PpccnisITBiNsxPPNacSQ5+9a4vMaFEotFTQw041KpeY0Y6jJCEVAt99Nl8u0HfjdEYTkGgZZRhvAm91HGiCn4ehm71WWMbxXXCCeXX5RNVA/AiD0sJrTQOjqPT85fFN/QP1MdTpuD44xmLzZtat6XVG0xxWlrhTtYPMaw/bj1vMnQqpqq1ZtqoqXPGOaoghS19EmHfnrD/69L7m1WfG1LUaEAAAAAElFTkSuQmCC",
  },
  {
    city: "Barcelona",
    image:
      "https://cf.bstatic.com/xdata/images/city/600x600/981983.jpg?k=0ef727f86dcee3b03764b60c8c15203f4c885c0b185006c50144e8812f2b5c71&o=",
    flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA5FBMVEX///8AAAAAAAAAAAAAAAD//FP/9nD/+FP/9WP/9CP/9RP970T88Dn/8xj/8Sn/8R//8Bn/8BL57Dn46zT37CD26TH15Vr06Cr95xX95hD031vx5CH74CHu1ojW3F3p2ELu1kPl1lDV2F/h0S/oxl7qxEjmxF/3vWPwumHqt0jsrZnrtxjop7Tqqljuo2PuoBTwiY3jkTLugobljTPckhvbjUnPf7fjhi/bg0fud3zscnbackzsZ2zQWxrnSU/NUyjlR0yeWj7lQkjkP0WwUSarPzDhFRzUFx7gEhnSEhjfCBDPChK7G3JaAAAABXRSTlMAESIzRJTdRHwAAACwSURBVBgZrcFBToNQGIXR7/5cQYgto+7CTXTprkYHarSxgqHvvQ5qNQEmJp4D/0aINUXaZ1Y8WPmNpa1MxC1zY2DUBHNNoGinYC7fDEZRyLu7fHjnR4CpJ7Nr+6T2matTMxhZqKs+RosrCxNV6Tedu1wNx4qLHAQBfB2qfjPxKzBMGmu/bNPnMSUuSotxHUmvPNHZfMvG3Bczd9KjicJCCAOZFSZYJYVYKlmINYU/OwNdvzKjDTSengAAAABJRU5ErkJggg==",
  },
  {
    city: "Madrid",
    image:
      "https://cf.bstatic.com/xdata/images/city/600x600/981656.jpg?k=7ef64f3ab955d484f092fc638773f88d5c6844bdee27ea824eb4f25be314f758&o=",
    flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA5FBMVEX///8AAAAAAAAAAAAAAAD//FP/9nD/+FP/9WP/9CP/9RP970T88Dn/8xj/8Sn/8R//8Bn/8BL57Dn46zT37CD26TH15Vr06Cr95xX95hD031vx5CH74CHu1ojW3F3p2ELu1kPl1lDV2F/h0S/oxl7qxEjmxF/3vWPwumHqt0jsrZnrtxjop7Tqqljuo2PuoBTwiY3jkTLugobljTPckhvbjUnPf7fjhi/bg0fud3zscnbackzsZ2zQWxrnSU/NUyjlR0yeWj7lQkjkP0WwUSarPzDhFRzUFx7gEhnSEhjfCBDPChK7G3JaAAAABXRSTlMAESIzRJTdRHwAAACwSURBVBgZrcFBToNQGIXR7/5cQYgto+7CTXTprkYHarSxgqHvvQ5qNQEmJp4D/0aINUXaZ1Y8WPmNpa1MxC1zY2DUBHNNoGinYC7fDEZRyLu7fHjnR4CpJ7Nr+6T2matTMxhZqKs+RosrCxNV6Tedu1wNx4qLHAQBfB2qfjPxKzBMGmu/bNPnMSUuSotxHUmvPNHZfMvG3Bczd9KjicJCCAOZFSZYJYVYKlmINYU/OwNdvzKjDTSengAAAABJRU5ErkJggg==",
  },
];
export const MainStates = [
  {
    name: "Hebrew",
    initial: "IL",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Il@3x.png",
  },
  {
    name: "English (US)",
    initial: "US",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Us@3x.png",
  },
  {
    name: "English (UK)",
    initial: "GB",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Gb@3x.png",
  },

  {
    name: "Portuguese",
    initial: "PT",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Pt@3x.png",
  },
  {
    name: "Portuguese (Brazil)",
    initial: "BR",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Br@3x.png",
  },
  {
    name: "Hindi",
    initial: "HI",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/In@3x.png",
  },
];

export const states = [
  {
    name: "Hebrew",
    initial: "IL",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Il@3x.png",
  },
  {
    name: "English",
    initial: "GB",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Gb@3x.png",
  },
  {
    name: "English (US)",
    initial: "US",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Us@3x.png",
  },
  {
    name: "German",
    initial: "DE",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/De@3x.png",
  },
  {
    name: "Dutch",
    initial: "NL",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Nl@3x.png",
  },
  {
    name: "French",
    initial: "FR",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Fr@3x.png",
  },
  {
    name: "Spanish",
    initial: "ES",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Es@3x.png",
  },
  {
    name: "Spanish (Argentina)",
    initial: "AR",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Ar@3x.png",
  },
  {
    name: "Spanish (Mexico)",
    initial: "MX",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Mx@3x.png",
  },
  {
    name: "Catalan",
    initial: "CA",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Catalonia@3x.png",
  },
  {
    name: "Italian",
    initial: "IT",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/It@3x.png",
  },
  {
    name: "Portuguese",
    initial: "PT",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Pt@3x.png",
  },
  {
    name: "Portuguese (Brazil)",
    initial: "BR",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Br@3x.png",
  },
  {
    name: "Norwegian",
    initial: "NO",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/No@3x.png",
  },
  {
    name: "Finnish",
    initial: "FI",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Fi@3x.png",
  },
  {
    name: "Swedish",
    initial: "SE",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Se@3x.png",
  },
  {
    name: "Danish",
    initial: "DK",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Dk@3x.png",
  },
  {
    name: "Czech",
    initial: "CZ",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Cz@3x.png",
  },
  {
    name: "Greek",
    initial: "EL",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Gr@3x.png",
  },
  {
    name: "Russian",
    initial: "RU",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Ru@3x.png",
  },
  {
    name: "Turkish",
    initial: "TR",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Tr@3x.png",
  },
  {
    name: "Bulgarian",
    initial: "BG",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Bg@3x.png",
  },
  {
    name: "Arabic (Saudi Arabia)",
    initial: "AR",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Sa@3x.png",
  },
  {
    name: "Korean",
    initial: "KO",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Kr@3x.png",
  },
  {
    name: "Latvian",
    initial: "LV",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Lv@3x.png",
  },
  {
    name: "Ukrainian",
    initial: "UA",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Ua@3x.png",
  },
  {
    name: "Hindi (India)",
    initial: "HI",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/In@3x.png",
  },
  {
    name: "Indonesian",
    initial: "ID",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Id@3x.png",
  },
  {
    name: "Malay",
    initial: "MS",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/My@3x.png",
  },
  {
    name: "Thai",
    initial: "TH",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Th@3x.png",
  },
  {
    name: "Estonian",
    initial: "ET",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Ee@3x.png",
  },
  {
    name: "Croatian",
    initial: "HR",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Hr@3x.png",
  },
  {
    name: "Lithuanian",
    initial: "LT",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Lt@3x.png",
  },
  {
    name: "Slovak",
    initial: "SK",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Sk@3x.png",
  },
  {
    name: "Serbian",
    initial: "RS",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Rs@3x.png",
  },
  {
    name: "Slovenian",
    initial: "SI",
    src: "https://t-cf.bstatic.com/design-assets/assets/v3.138.1/images-flags/Si@3x.png",
  },
];
