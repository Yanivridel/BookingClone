

export function SampleNextArrow({
    onClick,
    currentSlide,
    slideCount,
    slidesToShow,
  }: any) {
    const isDisabled = currentSlide >= slideCount - slidesToShow;
  
    return (
      <div onClick={onClick}>
        <svg
          className={`absolute top-1/3 -right-6 z-50 ring-1 ring-gray-100 bg-white rounded-full h-[36px] 
        w-[36px] hover:bg-gray-200 transition-all p-2 cursor-pointer 
        ${isDisabled ? "hidden" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="50px"
          data-rtl-flip="true"
        >
          <path d="M8.913 19.236a.9.9 0 0 0 .642-.266l6.057-6.057a1.3 1.3 0 0 0 .388-.945c.008-.35-.123-.69-.364-.945L9.58 4.966a.91.91 0 0 0-1.284 0 .896.896 0 0 0 0 1.284l5.694 5.718-5.718 5.718a.896.896 0 0 0 0 1.284.88.88 0 0 0 .642.266"></path>
        </svg>
      </div>
    );
}
export function SamplePrevArrow({ onClick, currentSlide }: any) {
    const isDisabled = currentSlide === 0;
  
    return (
      <div onClick={onClick}>
        <svg
          className={`absolute top-1/3 -left-5 z-50 ring-1 ring-gray-100 bg-white rounded-full h-[36px] 
        w-[36px] hover:bg-gray-200 transition-all p-2 cursor-pointer 
        ${isDisabled ? "hidden" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="50px"
          data-rtl-flip="true"
        >
          <path d="M15.087 19.236a.9.9 0 0 1-.642-.266l-6.057-6.057A1.3 1.3 0 0 1 8 11.968c-.008-.35.123-.69.364-.945l6.057-6.057a.91.91 0 0 1 1.284 0 .895.895 0 0 1 0 1.284l-5.694 5.718 5.718 5.718a.896.896 0 0 1 0 1.284.88.88 0 0 1-.642.266"></path>
        </svg>
      </div>
    );
}