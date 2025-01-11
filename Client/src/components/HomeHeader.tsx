import { Button } from "./ui/button";

function HomeHeader() {
  return (
    <div className="relative -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 w-full z-10 px-1 pt-[66px] max-w-[1100px]">
          <h1 className="text-[32px] search:text-5xl text-white font-black tracking-wider pb-3">
            Travel has never
          </h1>
          <h1 className="text-[32px] text-5xl text-white font-black tracking-wider pb-3">
            felt this cozy
          </h1>
          <h2 className="text-xl search:text-2xl text-white font-light tracking-widest pb-8">
            Book an entire place all to yourself
          </h2>
          <Button className="h-12 py-4 px-4 text-base">
            Discover vacation rentals
          </Button>
      </div>
      <img
        className="absolute top-0 left-0 w-full search:h-[375px] h-[535px] object-cover "
        srcSet="https://q-xx.bstatic.com/xdata/images/xphoto/720x217/428203771.jpeg?k=abace62fa6ff7d143bc66e567ce3b821ee9a6046659f552fa9d4eb1ed03e9f7b&amp;o= 720w, https://r-xx.bstatic.com/xdata/images/xphoto/1440x434/428203771.jpeg?k=abace62fa6ff7d143bc66e567ce3b821ee9a6046659f552fa9d4eb1ed03e9f7b&amp;o= 1440w, https://r-xx.bstatic.com/xdata/images/xphoto/2880x868/428203771.jpeg?k=abace62fa6ff7d143bc66e567ce3b821ee9a6046659f552fa9d4eb1ed03e9f7b&amp;o= 2880w"
        alt="It’s just before nightfall. In the foreground is the large wooden deck of a house set into the side of a hill lined with pine trees. On the deck is some outdoor furniture and a hot tub, warmly lit by a string of bulbs, as well as a low burning fire pit nearby. In the background are the snowy peaks of a mountain range."
        data-testid="herobanner-image"
      />
    </div>
  );
}

export default HomeHeader;
