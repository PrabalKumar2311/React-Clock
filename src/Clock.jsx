import { useEffect, useState } from "react";
import InfoButton from "./InfoButton";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [images, setImages] = useState([]);

  const [currentBg, setCurrentBg] = useState("");
  const [nextBg, setNextBg] = useState("");
  const [fade, setFade] = useState(false);

  // ⏰ Clock updates every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🌐 Fetch images
  useEffect(() => {
    async function fetchImages() {
      const API = "https://picsum.photos/v2/list?page=2&limit=100";
      const res = await fetch(API);
      const data = await res.json();

      setImages(data);

      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentBg(data[randomIndex].download_url);
      }
    }

    fetchImages();
  }, []);

  // 🖼️ Change image every minute
  useEffect(() => {
    if (!images.length) return;

    if (time.getSeconds() === 0) {
      const minute = time.getMinutes();
      const newImage = images[minute % images.length].download_url;

      const img = new Image();
      img.src = newImage;

      img.onload = () => {
        setNextBg(newImage);
        setFade(true);

        setTimeout(() => {
          setCurrentBg(newImage);
          setNextBg("");
          setFade(false);
        }, 800);
      };
    }
  }, [time, images]);

  function formatTime() {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    const meridien = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const padZero = (n) => (n < 10 ? `0${n}` : n);

    return `${hours}:${padZero(minutes)}:${padZero(seconds)} ${meridien}`;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{
        fontFamily:
          "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
      }}
    >
      {/* Current Background */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{ backgroundImage: `url(${currentBg})` }}
      />

      {/* Next Background (fade layer) */}
      <div
        className={`fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${nextBg})` }}
      />

      {/* Clock */}
      <div className="backdrop-blur-xs px-8 py-3 rounded-3xl ">
        <h1 className="text-white text-6xl md:text-7xl font-medium text-center tracking-wide leading-none">
          {formatTime()}
        </h1>
      </div>
      <InfoButton imageUrl={currentBg} />
    </div>
  );
}

export default Clock;