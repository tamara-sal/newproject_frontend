import React, { useState } from "react";

const fashionImages = [
  
  "https://as1.ftcdn.net/v2/jpg/13/02/29/58/1000_F_1302295827_yXZkt6jhUuOQu45eoUyibMu8joYn98bw.jpg",
  "https://as1.ftcdn.net/v2/jpg/14/46/34/30/1000_F_1446343034_Bp6gfVQXgpFiYzmJu9ucnCBF7fEm3TIP.webp",
  "https://as1.ftcdn.net/v2/jpg/12/76/86/48/1000_F_1276864898_bJefaPJTf2HUFvXBjcBLmsz39d6beSxR.jpg",
  "https://as2.ftcdn.net/v2/jpg/12/72/30/73/1000_F_1272307344_n8Lbud2rzbAw25KYMIGBE8V6f85J1PjS.jpg",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = fashionImages.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "30px auto",
        position: "relative",
        textAlign: "center",
      }}
    >
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.3)",
          border: "none",
          color: "white",
          fontSize: 24,
          cursor: "pointer",
          padding: "10px 15px",
          borderRadius: "0 5px 5px 0",
          userSelect: "none",
          zIndex: 1,
        }}
      >
        &#10094;
      </button>

      <img
        src={fashionImages[currentIndex]}
        alt={`Fashion slide ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: 450,
          objectFit: "cover",
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          userSelect: "none",
        }}
        draggable={false}
      />

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.3)",
          border: "none",
          color: "white",
          fontSize: 24,
          cursor: "pointer",
          padding: "10px 15px",
          borderRadius: "5px 0 0 5px",
          userSelect: "none",
          zIndex: 1,
        }}
      >
        &#10095;
      </button>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          gap: 8,
          userSelect: "none",
        }}
      >
        {fashionImages.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: idx === currentIndex ? "#333" : "#ccc",
              cursor: "pointer",
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
