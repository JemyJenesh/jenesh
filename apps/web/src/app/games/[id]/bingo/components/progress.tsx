import { useEffect, useState } from "react";

export default function Progress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 20; // update every 20ms
    let start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage === 100) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-16 h-16 rotate-[-90deg]">
        <circle
          cx="32"
          cy="32"
          r={radius}
          className="stroke-zinc-200 dark:stroke-white/10"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          className="stroke-primary"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      <div className="absolute inset-0 h-full w-full flex justify-center items-center">
        <p className="text-2xl">?</p>
      </div>
    </div>
  );
}
