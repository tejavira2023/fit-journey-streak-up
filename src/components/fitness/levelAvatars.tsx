
// Instead of direct imports, we'll use string paths that work with the public folder
// This approach allows more flexibility with image paths

// Define image URLs for different avatar types
const healthyImg = "/healthy-avatar.svg";  // Fit/slim person
const obeseImg = "/obese-avatar.svg";      // Overweight person 
const meditationImg = "/meditation-avatar.svg"; // Person in meditation pose

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
