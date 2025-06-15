import api from "../utils/axios";

const getAllCommunities = async (params) => {
  const response = await api.get(`/community/getPosts${params}`);
  return response.data;
};

const likeOnPost = async (postId) => {
  const response = await api.put(`/community/togglePostLike/${postId}`);
  return response.data;
};

const commentOnPost = async (postId, comment) => {
  const response = await api.put(`/community/addComment/${postId}`, comment);
  return response.data;
};

const likeOnPostComment = async (postId, commentId) => {
  const response = await api.put(
    `/community/toggleCommentLike/${postId}/${commentId}`
  );
  return response.data;
};

const createPost = async (payload) => {
  const response = await api.post("/community/createPost", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getMyPosts = async (userId) => {
  const response = await api.get(`community/getPostById/${userId}`);
  return response.data;
};

const communityService = {
  getAllCommunities,
  createPost,
  likeOnPost,
  commentOnPost,
  likeOnPostComment,
  getMyPosts,
};

export default communityService;
