import React, { useState, useRef, useEffect } from "react";
import { Info, Github, Linkedin } from "lucide-react";

function InfoButton({ imageUrl }) {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Info Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 p-2 rounded-full
        text-white backdrop-blur-xs
        hover:scale-110 transition"
      >
        <Info size={18} />
      </button>

      {/* Info Panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-20 right-5 z-50
          text-white backdrop-blur-xs
          px-4 py-3 rounded-xl text-sm "
        >
          {/* Made by */}
          <p className="font-medium text-base">Made by Prabal Hayden</p>

          {/* Social icons */}
          <div className="flex justify-center gap-3 mt-2">
            <a
              href="https://github.com/PrabalKumar2311"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/prabal-kumar-70110b201/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/30 my-3" />

          {/* Image link */}
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-xs"
          >
            Preview background image
          </a>

          {/* <a
            href="https://picsum.photos/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-xs block text-center mt-2"
          >
            Images from Picsum Photos
          </a> */}
        </div>
      )}
    </>
  );
}

export default InfoButton;
