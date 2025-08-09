import { useState, useRef, useEffect } from "react";
import classname from "classnames";

function Rating({
  score,
  setScore,
}: {
  score: number;
  setScore: (score: number) => void;
}) {
  const ratingTotal = [1, 2, 3, 4, 5];
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const starRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (focusIndex !== null) {
      starRefs.current[focusIndex - 1]?.focus();
    }
  }, [focusIndex]);

  const handleRatingClick = (rating: number) => {
    setScore(rating);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    rating: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setScore(rating);
    } else if (e.key === "ArrowRight" && rating < 5) {
      setFocusIndex(rating + 1);
    } else if (e.key === "ArrowLeft" && rating > 1) {
      setFocusIndex(rating - 1);
    }
  };

  return (
    <div className="flex gap-0.5" role="radiogroup" aria-label="Star rating">
      {ratingTotal.map((rating, index) => (
        <span
          key={rating}
          role="radio"
          aria-checked={score === rating}
          tabIndex={0}
          ref={(el) => {
            starRefs.current[index] = el;
          }}
          className={classname(
            (hoverScore ?? score) >= rating
              ? "text-amber-300"
              : "text-gray-400",
            "hover:text-amber-100 hover:cursor-pointer",
            "transition-all duration-200 ease-in-out transform",
            hoverScore === rating ? "scale-125" : "scale-100",
            "focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
          )}
          onClick={() => handleRatingClick(rating)}
          onMouseEnter={() => setHoverScore(rating)}
          onMouseLeave={() => setHoverScore(null)}
          onFocus={() => setFocusIndex(rating)}
          onBlur={() => setFocusIndex(null)}
          onKeyDown={(e) => handleKeyDown(e, rating)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;
