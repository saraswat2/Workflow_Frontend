import api from './api';

export const getEngagementSummary = (postId) =>
  api.get(`/posts/${postId}/engagement`).then((r) => r.data);

export const toggleLike = (postId) =>
  api.post(`/posts/${postId}/like`).then((r) => r.data);

export const toggleBookmark = (postId) =>
  api.post(`/posts/${postId}/bookmark`).then((r) => r.data);

export const recordView = (postId) =>
  api.post(`/posts/${postId}/view`).then((r) => r.data);

export const recordShare = (postId) =>
  api.post(`/posts/${postId}/share`).then((r) => r.data);

export const reactToPost = (postId, reactionType) =>
  api.post(`/posts/${postId}/reaction`, { reactionType }).then((r) => r.data);

export const removeReaction = (postId) =>
  api.delete(`/posts/${postId}/reaction`).then((r) => r.data);

export const getBookmarkedPosts = (page = 0, size = 10) =>
  api.get(`/posts/bookmarks?page=${page}&size=${size}`).then((r) => r.data);
