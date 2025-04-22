
// Instead of direct imports, we'll use string paths that work with the public folder
// This approach allows more flexibility with image paths

// Define image URLs for different avatar types
const healthyImg = "/placeholder.svg";  // Default placeholder image
const obeseImg = "/placeholder.svg";    // Default placeholder image 
const meditationImg = "/placeholder.svg"; // Default placeholder image

// For expansion later: add more avatars for other programs
export const getAvatarImg = (category: string, level: number) => {
  if (category.toLowerCase().includes("weight")) {
    // Lose weight
    if (level === 1) return obeseImg; // Obese at start
    if (level === 2) return obeseImg; // Slightly less obese (re-use for now)
    if (level === 3) return healthyImg; // Fit/slim at high level
  }
  if (category.toLowerCase().includes("yoga")) {
    // Placeholder: use meditation for yoga & meditation
    return meditationImg;
  }
  // Default fallback
  return healthyImg;
};
