import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(text: string, readingSpeed?: number) {
  const wordsPerMinute = readingSpeed || 200; // Default reading speed is 200 words per minute
  const words = text.split(' ').length;
  const readingTimeInMinutes = words / wordsPerMinute;
  const readingTimeInSeconds = readingTimeInMinutes * 60;
  return Math.ceil(readingTimeInSeconds);
}
