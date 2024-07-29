'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface CarouselProps {
  items: { src: string; link: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleImageClick = () => {
    window.location.href = items[currentIndex].link;
  };

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <img
          src={items[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          sizes="100vw"
          className="h-[180px] w-full cursor-pointer object-cover md:h-[300px]"
          onClick={handleImageClick}
        />
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-transparent p-2 shadow-md hover:bg-slate-400 hover:opacity-30"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="px-10 py-80"
            size="xl"
          />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-transparent p-2 shadow-md hover:bg-slate-400 hover:opacity-30"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="px-10 py-80"
            size="xl"
          />
        </button>
      </div>

      {/* Dot */}
      <div className="mt-4 flex justify-center">
        {items.map((_, index) => (
          <div
            key={index}
            className={`mx-2 h-3 w-3 rounded-full ${index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
