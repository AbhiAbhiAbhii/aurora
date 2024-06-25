import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 // Calculate stroke-dashoffset based on timeLeft
//  const radius = 15; // radius of the circle
//  const circumference = 2 * Math.PI * radius;
//  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;

// const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds


// <div className="flex items-center justify-center">
//           <svg className="w-8 h-8" viewBox="0 0 40 40">
//             <circle
//               className="text-gray-300"
//               strokeWidth="4"
//               stroke="currentColor"
//               fill="transparent"
//               r="15"
//               cx="20"
//               cy="20"
//             />
//             <circle
//               className="text-black"
//               strokeWidth="4"
//               strokeDasharray={circumference}
//               strokeDashoffset={strokeDashoffset}
//               strokeLinecap="round"
//               stroke="currentColor"
//               fill="transparent"
//               r="15"
//               cx="20"
//               cy="20"
//               style={{ transition: 'stroke-dashoffset 1s linear' }}
//             />
//           </svg>
//         </div>