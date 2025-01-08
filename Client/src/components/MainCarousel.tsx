import styles from "@/css/search.module.css";
import { cn } from "@/lib/utils";

function MainCarousel({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div
        className={cn(
          "w-full flex gap-2 overflow-scroll py-4",
          styles.scrollContainer
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default MainCarousel;
