
// Instead of direct imports, we'll use string paths that work with the public folder
// This approach allows more flexibility with image paths

// Define image URLs for different avatar types
const healthyImg = "/obese-avatar.svg";  // Overweight person at the end of weight gain journey
const obeseImg = "/healthy-avatar.svg";  // Slim person at the start of weight gain journey
const meditationImg = "/meditation-avatar.svg"; // Person in meditation pose

// For expansion later: add more avatars for other programs
export const getAvatarImg = (category: string, level: number) => {
  if (category.toLowerCase().includes("weight")) {
    // Gain weight
    if (level === 1) return healthyImg; // Slim at start
    if (level === 2) return obeseImg; // Slightly more muscular (re-use for now)
    if (level === 3) return obeseImg; // More muscular/developed
  }
  if (category.toLowerCase().includes("yoga")) {
    // Placeholder: use meditation for yoga & meditation
    return meditationImg;
  }
  // Default fallback
  return healthyImg;
};
