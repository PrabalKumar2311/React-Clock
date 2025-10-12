import React, { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Preload images in memory
  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  useEffect(() => {
    // Clock updates every second
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Fetch images once
    fetchImages();

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const currentIndex = time.getMinutes() % images.length;
    setCurrentImageIndex(currentIndex);

    // Preload the next image
    const nextIndex = (currentIndex + 1) % images.length;
    preloadImage(images[nextIndex].download_url);
  }, [time, images]);

  useEffect(() => {
    if (images.length === 0) return;

    // Apply the current image instantly to body
    document.body.style.backgroundImage = `url(${images[currentImageIndex].download_url})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.margin = "0";
    document.body.style.height = "100vh";

  }, [currentImageIndex, images]);

  async function fetchImages() {
    try {
      const API = "https://picsum.photos/v2/list?page=2&limit=100";
      const res = await fetch(API);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  function formatTime() {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const meridien = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${padZero(minutes)} ${meridien}`;

    function padZero(number) {
      return number < 10 ? `0${number}` : number;
    }
  }

  return (
    <div className="clock-container">
      <div className="clock">{formatTime()}</div>
    </div>
  );
}

export default Clock;
