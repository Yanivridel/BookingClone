import styles from "@/css/search.module.css";
import { cn } from "@/lib/utils";

interface MainCarousel {
  className?: string;
  children: React.ReactNode;
}

function MainCarousel({ children, className }: MainCarousel) {
  return (
    <div
      className={cn(
        "w-full flex gap-2 overflow-scroll py-2",
        styles.scrollContainer,
        className
      )}
    >
      {children}
    </div>
  );
}

export default MainCarousel;
