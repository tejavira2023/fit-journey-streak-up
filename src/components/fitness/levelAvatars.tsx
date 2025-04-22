
import healthyImg from "/lovable-uploads/photo-1581092795360-fd1ca04f0952";
import obeseImg from "/lovable-uploads/photo-1493962853295-0fd70327578a";
import meditationImg from "/lovable-uploads/photo-1582562124811-c09040d0a901";

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
