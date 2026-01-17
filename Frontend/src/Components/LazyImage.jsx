import { useState } from "react";

export const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 shimmer rounded"></div>
      )}

      <img
        src={src}
        alt={alt}
         referrerPolicy="no-referrer"
        loading="lazy"
        className={`${className} transition-all ease-linear duration-300 img ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
