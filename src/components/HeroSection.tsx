"use client"; // Required if using React features like props or future interactivity

import React from "react";


// Main App component
export default function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <HeroSection
        title="Discover Your Style"
        src="https://i.pinimg.com/736x/a9/79/9d/a9799dd85f725475be43651f4f62d66e.jpg"
      />
    </div>
  );
}

// HeroSection component
function HeroSection({ title, src }: { title: string; src: string }) {
  return (
    <section
      id={title.replace(/\s+/g, "-").toLowerCase()}
      className="relative min-h-screen flex items-center pt-20 pb-10"
    >
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left Text Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg md:text-xl">
            Shop the latest trends for Men, Women, Kids & Sportswear. Quality
            products delivered right to your doorstep.
          </p>

          <div>
            <button
  className="
    group relative inline-flex items-center justify-center overflow-hidden
    rounded-full bg-slate-900 px-6 py-3 font-medium text-white shadow-lg
    transition-all duration-300 ease-in-out hover:ring-2 hover:ring-slate-400 cursor-pointer
  "
  onClick={() => {
    window.scrollBy({
      top: 1000, // amount to scroll down in pixels
      behavior: "smooth", // smooth scrolling
    });
  }}
>
  <span
    className="
      absolute h-0 w-0 rounded-full bg-white transition-all
      duration-300 ease-in-out group-hover:h-full group-hover:w-full
    "
  />
  <span className="relative flex items-center gap-2">
    <span className="relative transition-colors duration-300 ease-in-out group-hover:text-slate-900">
      Shop Now
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="
        relative h-6 w-6 -translate-x-4 fill-white opacity-0
        transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100
        group-hover:fill-slate-900
      "
    >
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
    </svg>
  </span>
</button>

          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={src}
            alt="Hero Banner"
            className="rounded-xl shadow-lg max-h-[500px] w-full object-cover"
          />
        </div>
      </div>

      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full top-[-50px] left-[-50px] opacity-30"></div>
        <div className="absolute w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full bottom-[-100px] right-[-100px] opacity-30"></div>
      </div>
    </section>
  );
}
