export const getDriveMedia = (url, type) => {
  if (!url) return { url: "", type: "image" };

  if (!url.includes("drive.google.com")) {
    return { url, type };
  }

  const match = url.match(/[-\w]{25,}/);

  if (!match) return { url, type };

  const fileId = match[0];

  // For video → use preview iframe URL
  if (type === "video") {
    return {
      url: `https://drive.google.com/file/d/${fileId}/preview`,
      type: "video",
    };
  }

  // For image → direct view URL
  return {
    url: `https://lh3.googleusercontent.com/d/${fileId}`,
    type: "image",
  };
};
