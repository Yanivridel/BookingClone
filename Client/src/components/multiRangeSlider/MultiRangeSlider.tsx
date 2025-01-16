import React, { useCallback, useEffect, useState, useRef } from "react";
import "./multiRangeSlider.css";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert value to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max])

  // Update range styling
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  return (
    <div className="container">
      {/* Left (Min) Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        onMouseUp={() => onChange({ min: minVal, max: maxVal })}
        className="thumb thumb--left !z-[30]"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={minVal}
      />

      {/* Right (Max) Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        onMouseUp={() => onChange({ min: minVal, max: maxVal })}
        className="thumb thumb--right !z-[30]"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={maxVal}
      />

      {/* Slider UI */}
      <div className="slider mt-[0.1px] ">
        <div className="slider__track" />
        <div ref={range} className="slider__range text-9xl" />
        <p className="absolute -top-[90px] -left-2">₪{minVal || 0} - ₪{maxVal || 0}</p>
      </div>
    </div>
  );
};

export default MultiRangeSlider;