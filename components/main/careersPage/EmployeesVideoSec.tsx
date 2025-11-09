import { CareersType } from "@/types/careers";
import React, { useState, useEffect } from "react";

function EmployeesVideoSec() {
  const [hiddenOverlay, setHiddenOverlay] = useState<{
    [key: number]: boolean;
  }>({});
  const [careers, setCareers] = useState<CareersType | null>(null);

  const handleClick = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video") as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setHiddenOverlay((prev) => ({ ...prev, [i]: true }));
      } else {
        video.pause();
        setHiddenOverlay((prev) => ({ ...prev, [i]: false }));
      }
    }
  };

  // fetch data
  const fetchData = async () => {
    try {
      const res = await fetch("/careers.json");
      const json = await res.json();
      setCareers(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Our employees section */}
      <section className="px-4 md:px-16">
        <h1 className="text-2xl md:text-5xl font-semibold">
          Hear from our employees
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          {careers?.Employees.map((employee, i) => {
            return (
              <div
                key={i}
                className="relative w-full h-[300px] md:h-[70vh] mt-16"
                onClick={(e) => handleClick(i, e)}
              >
                <video
                  src={employee.video}
                  poster={employee.poster}
                  playsInline
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
                <div
                  className={`absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-lg transition-opacity duration-300
                            ${
                              hiddenOverlay[i]
                                ? "opacity-0 pointer-events-none"
                                : "opacity-100"
                            }
                            `}
                >
                  <h1 className="text-lg font-semibold">{employee.name}</h1>
                  <h2 className="text-sm">{employee.jopDescription}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default EmployeesVideoSec;
