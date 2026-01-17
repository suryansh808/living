import apiClient from "../utils/apiClient";
import API from "../API";

export const getHeroPost = () => {
  return apiClient.get(`${API}/hero-post`);
};

export const getCategories = () => {
  return apiClient.get(`${API}/categories`);
};

export const getLatestPosts = (page = 1) => {
  return apiClient.get(`${API}/latest?page=${page}&limit=9`);
};

export const getPostsByCategory = (slug) => {
  return apiClient.get(`${API}/by-category/${slug}`);
};

export const getBlogById = (id) => {
  return apiClient.get(`${API}/blog/${id}`);
};
