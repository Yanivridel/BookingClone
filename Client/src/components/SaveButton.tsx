import React, { useState } from 'react';
import IconHeartRed, { IconHeart } from './ui/Icons'



function SaveButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLike((prevIsLike) => !prevIsLike);
    }, 1000); 
  }

  return (
    <div 
      className="bg-white rounded-full h-[36px] w-[36px] flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer" 
      onClick={handleClick}
    >
      {isLoading ? (
        <div>Loading</div> // ניתן להחליף לאייקון טעינה
      ) : (
        <div>
          {!isLike && <IconHeart className='w-5 h-5' />}
          {isLike && <IconHeartRed className='w-5 h-5 fill-red-500' />}
        </div>
      )}
    </div>
  );
}

export default SaveButton;
