export const getCache = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};

export const setCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Cache error:", err);
  }
};

export const clearCache = (key) => {
  localStorage.removeItem(key);
};

export const clearCategoryCache = () => {
  localStorage.removeItem("categories");
};