import apiClient from "../utils/apiClient";
import API from "../API";

// CATEGORY APIs
export const fetchCategories = () =>
  apiClient.get(`${API}/categories/fetchcategory`);

export const createCategory = (name) =>
  apiClient.post(`${API}/categories/createcategory`, { name });

export const updateCategory = (id, name) =>
  apiClient.put(`${API}/categories/editcategory/${id}`, { name });


export const deleteCategory = (id) =>
  apiClient.delete(`${API}/categories/deletecategory/${id}`);

// POST APIs
export const fetchPostsByCategory = (categoryId) =>
  apiClient.get(`${API}/posts/fetchbycategory/${categoryId}`);

export const createPost = (payload) =>
  apiClient.post(`${API}/posts/createpost`, payload);

export const updatePost = (id, data) =>
  apiClient.put(`${API}/posts/updatepost/${id}`, data);


export const deletePost = (id) =>
  apiClient.delete(`${API}/posts/deletepost/${id}`);

export const getAdminStats = () =>
  apiClient.get(`${API}/stats`);
