export const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const lower = url.toLowerCase();
  const cleanUrl = lower.split('?')[0];
  return (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.endsWith('.m4v') ||
    cleanUrl.endsWith('.ogv') ||
    lower.includes('.mp4?') ||
    lower.includes('/video/') ||
    lower.includes('youtube.com') ||
    lower.includes('youtu.be')
  );
};
