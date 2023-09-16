"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import pause from "@/public/assets/pause.svg";
import dice from "@/public/assets/dice.svg";
import axios from "axios";

export default function Home() {
  type AdviceData = {
    id: number | null;
    text: string;
  };

  const [advice, setAdvice] = useState({ id: null, text: "" });
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  const fetchData = async () => {
    setLoading(true); // Set loading to true before the delay
    setTimeout(async () => {
      const apiUrl = "https://api.adviceslip.com/advice";
      try {
        const response = await axios.get(apiUrl);
        const data = response.data.slip;
        console.log(data);
        setAdvice(data);
      } catch (error) {
        console.error("Error fetching advice:", error);
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    }, 2000); // 2-second delay
  };

  useEffect(() => {
    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const handleDiceClick = () => {
    // Call fetchData when the dice is clicked
    fetchData();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* body */}
      <div className="bg-[#313A48] w-[540px] h-[332px] p-8 rounded-lg flex flex-col items-center justify-center">
        {/* Show loading indicator while fetching data */}
        {loading ? (
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            style={{ fill: "#313A48" }}
          >
            <path
              id="circlePath"
              d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0"
            />
            <text
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
              fill="#000000"
              dy="0.35em"
            >
              <textPath href="#circlePath">
                😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒
              </textPath>
            </text>
          </svg>
        ) : (
          // Render advice when data is available
          <>
            <p className="text-[#53FFAA] font-bold Manrope text-xs">
              ADVICE #{advice.id}
            </p>
            <p className="text-center text-2xl text-[#CEE3E9] font-bold my-6">
              “{advice.advice}”
            </p>
            <div className="flex justify-between my-4">
              <hr className="w-48 h-[2px] mt-1.5 border-0 bg-[#4F5D74]" />
              <Image src={pause} alt="pause" className="mx-6" />
              <hr className="w-48 h-[2px] mt-1.5 border-0 bg-[#4F5D74]" />
            </div>
          </>
        )}
      </div>
      {/* dice */}
      <div
        className="-mt-[34px] h-16 w-16 bg-[#53FFAA] flex justify-center items-center rounded-full cursor-pointer hover-effect"
        onClick={handleDiceClick}
      >
        <Image src={dice} alt="dice" />
      </div>
    </main>
  );
}
