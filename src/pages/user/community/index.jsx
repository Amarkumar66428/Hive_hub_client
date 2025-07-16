import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  memo,
} from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Avatar,
  CardMedia,
  Card,
  CardContent,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Tooltip,
  CardActions,
  Collapse,
  Skeleton,
  Alert,
  Chip,
  Fade,
  Paper,
  Stack,
  styled,
  Checkbox,
} from "@mui/material";
import {
  Add,
  Article,
  Person,
  ExpandMore,
  ChatBubbleOutline,
  Send,
  Share,
  Refresh,
  FavoriteBorder,
  Favorite,
  Delete,
  MoreVert,
} from "@mui/icons-material";

import CreatePostModal from "./createPost";
import communityService from "../../../services/community";
import { useSnackbar } from "../../../features/snackBar";
import { TextAreaE1 } from "../../../components/inputs";
import { formatDate } from "../../../utils/helper";
import useAuth from "../../../hooks/useAuth";

// Constants
const POSTS_PER_PAGE = 10;
const INTERSECTION_THRESHOLD = 0.1;

// Main Community Component
const Community = () => {
  const currentUser = useAuth();
  const { showSnackbar } = useSnackbar();

  // State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(null);
  const [showAdminPosts, setShowAdminPosts] = useState(false);

  // Refs
  const observerRef = useRef();
  const lastPostElementRef = useRef();

  // Memoized values
  const open = Boolean(anchorEl);

  // Fetch posts function
  const fetchPosts = useCallback(
    async (pageNum = 1, isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError(null);
        }

        const params = `?page=${pageNum}&limit=${POSTS_PER_PAGE}&isAdminPost=${showAdminPosts}`;
        const response = await communityService.getAllCommunities(params);

        const newPosts = response?.posts || [];

        if (isLoadMore) {
          setPosts((prev) => [...prev, ...newPosts]);
        } else {
          setPosts(newPosts);
        }

        setHasMore(newPosts.length === POSTS_PER_PAGE);
        setPage(pageNum);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again.");
        showSnackbar("Failed to load posts", "error");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [showSnackbar, showAdminPosts]
  );

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loadingMore && !loading) {
        fetchPosts(page + 1, true);
      }
    },
    [hasMore, loadingMore, loading, page, fetchPosts]
  );

  // Setup intersection observer
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: INTERSECTION_THRESHOLD,
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Observe last post element
  useEffect(() => {
    if (lastPostElementRef.current && observerRef.current) {
      observerRef.current.observe(lastPostElementRef.current);
    }

    return () => {
      if (lastPostElementRef.current && observerRef.current) {
        observerRef.current.unobserve(lastPostElementRef.current);
      }
    };
  }, [posts]);

  // Initial fetch
  useEffect(() => {
    fetchPosts(1, false);
  }, [fetchPosts]);

  // Optimized handlers
  const handleLike = useCallback(
    async (postId) => {
      try {
        // Optimistic update
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: post.likes?.includes(currentUser._id)
                    ? post.likes.filter((id) => id !== currentUser._id)
                    : [...(post.likes || []), currentUser._id],
                }
              : post
          )
        );

        await communityService.likeOnPost(postId);
      } catch (err) {
        console.error("Error liking post:", err);
        // Revert optimistic update on error
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: post.likes?.includes(currentUser._id)
                    ? [...(post.likes || []), currentUser._id]
                    : post.likes?.filter((id) => id !== currentUser._id) || [],
                }
              : post
          )
        );
        showSnackbar("Failed to like post", "error");
      }
    },
    [currentUser._id, showSnackbar]
  );

  const handleComment = useCallback(
    async (postId, commentText) => {
      try {
        const comment = { content: commentText };
        const response = await communityService.commentOnPost(postId, comment);

        if (response) {
          setPosts((prev) =>
            prev.map((post) => {
              if (post._id !== postId) return post;

              const existingIds = new Set(
                post.comments?.map((c) => c._id) || []
              );
              const newComments = [...(post.comments || [])];

              response.post.comments?.forEach((c) => {
                if (!existingIds.has(c._id)) {
                  newComments.push(c);
                }
              });

              return { ...post, comments: newComments };
            })
          );

          showSnackbar("Comment added successfully", "success");
        }
      } catch (err) {
        console.error("Error adding comment:", err);
        showSnackbar("Failed to add comment", "error");
      }
    },
    [showSnackbar]
  );

  const handleCommentLike = useCallback(
    async (postId, commentId) => {
      try {
        // Optimistic update
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comments:
                    post.comments?.map((comment) =>
                      comment._id === commentId
                        ? {
                            ...comment,
                            likes: comment.likes?.includes(currentUser._id)
                              ? comment.likes.filter(
                                  (id) => id !== currentUser._id
                                )
                              : [...(comment.likes || []), currentUser._id],
                          }
                        : comment
                    ) || [],
                }
              : post
          )
        );

        await communityService.likeOnPostComment(postId, commentId);
      } catch (err) {
        console.error("Error liking comment:", err);
        showSnackbar("Failed to like comment", "error");
      }
    },
    [currentUser._id, showSnackbar]
  );

  const fetchMyPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await communityService.getMyPosts(currentUser._id);
      setPosts(response?.posts || []);
      setHasMore(false); // Assuming my posts don't have pagination
    } catch (error) {
      console.error("Error fetching my posts:", error);
      setError("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  }, [currentUser._id]);

  const handleMenuItemClick = useCallback(
    (action) => {
      setAnchorEl(null);

      switch (action) {
        case "create-post":
          setCreatePostModal(true);
          break;
        case "my-posts":
          fetchMyPosts();
          break;
        case "my-profile":
          // Navigate to profile
          break;
        default:
          break;
      }
    },
    [fetchMyPosts]
  );

  const handleRefresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchPosts(1, false);
  }, [fetchPosts]);

  // Error state
  if (error && posts.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              <Refresh sx={{ mr: 1 }} />
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          bgcolor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderColor: "divider",
          px: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary"
              gutterBottom
            >
              Join Our Thriving Community
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn from real store owners, share your journey, and get inspired
              by stories of success in the eCommerce world.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox
              checked={showAdminPosts}
              onChange={() => setShowAdminPosts(!showAdminPosts)}
            />
            <Typography variant="body2" color="text.secondary">
              Premium Posts
            </Typography>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Avatar
                src="https://randomuser.me/api/portraits/women/44.jpg"
                sx={{ width: 40, height: 40, mr: 1 }}
              />
              <ExpandMore />
            </Button>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 3,
              sx: { mt: 1, minWidth: 200 },
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick("create-post")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText>Create Post</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("my-posts")}>
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText>My Posts</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleMenuItemClick("my-profile")}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>My Community Profile</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Paper>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        {loading && posts.length === 0 ? (
          <Stack spacing={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </Stack>
        ) : posts.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "grey.50",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Be the first to share something with the community!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreatePostModal(true)}
            >
              Create Post
            </Button>
          </Paper>
        ) : (
          <Stack spacing={3}>
            {posts.map((post, index) => (
              <div
                key={post._id}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
              >
                <PostCard
                  post={post}
                  currentUser={currentUser}
                  setPosts={setPosts}
                  onLike={handleLike}
                  onComment={handleComment}
                  onCommentLike={handleCommentLike}
                  openCommentBox={openCommentBox}
                  setOpenCommentBox={setOpenCommentBox}
                />
              </div>
            ))}

            {/* Loading more indicator */}
            {loadingMore && (
              <Box display="flex" justifyContent="center" py={3}>
                <Stack alignItems="center" spacing={2}>
                  <CircularProgress size={32} />
                  <Typography variant="body2" color="text.secondary">
                    Loading more posts...
                  </Typography>
                </Stack>
              </Box>
            )}

            {/* End of posts indicator */}
            {!hasMore && posts.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  textAlign: "center",
                  py: 3,
                  bgcolor: "grey.50",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  🎉 You've reached the end! That's all the posts for now.
                </Typography>
              </Paper>
            )}
          </Stack>
        )}
      </Container>

      <CreatePostModal
        createPostModal={createPostModal}
        setCreatePostModal={setCreatePostModal}
        fetchPlans={() => fetchPosts(1, false)}
      />
    </>
  );
};

export default memo(Community);

const ProductCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

// Memoized Post Card Component
const PostCard = memo(
  ({
    post,
    currentUser,
    onLike,
    onComment,
    onCommentLike,
    openCommentBox,
    setOpenCommentBox,
    setPosts,
  }) => {
    const [commentInput, setCommentInput] = useState("");
    const [savingComment, setSavingComment] = useState(false);
    const { showSnackbar } = useSnackbar();
    const [deletingPost, setDeletingPost] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleCommentSubmit = useCallback(async () => {
      if (!commentInput.trim()) return;

      setSavingComment(true);
      try {
        await onComment(post._id, commentInput);
        setCommentInput("");
      } finally {
        setSavingComment(false);
      }
    }, [commentInput, onComment, post._id]);

    const isLiked = useMemo(
      () => post?.likes?.includes(currentUser._id),
      [post?.likes, currentUser._id]
    );

    const isCommentBoxOpen = openCommentBox === post._id;

    const handleDeletePost = async (postId) => {
      try {
        setDeletingPost(true);
        await communityService.deleteMyPost(postId);
        showSnackbar("Post deleted successfully", "success");
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
      } catch (error) {
        console.log(error);
        showSnackbar("Failed to delete post", "error");
      } finally {
        setDeletingPost(false);
      }
    };

    return (
      <Fade in timeout={300}>
        <ProductCard>
          {/* Post Header */}
          <CardContent sx={{ pb: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="start"
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar
                  src={post?.avatar}
                  alt={post?.authorName}
                  sx={{
                    width: 48,
                    height: 48,
                    border: 2,
                    borderColor: "divider",
                  }}
                />
                <Box flex={1}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="text.primary"
                  >
                    {post.authorId === currentUser._id
                      ? "You"
                      : post?.authorName || "Unknown"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(post?.createdAt)}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                {post.authorId === currentUser._id && (
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                )}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => handleDeletePost(post._id)}
                    disabled={deletingPost}
                  >
                    <ListItemIcon>
                      {deletingPost ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Delete />
                      )}
                    </ListItemIcon>
                    <ListItemText>
                      {deletingPost ? "Deleting..." : "Delete"}
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </Stack>
            </Stack>
            {/* Post Content */}
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              color="text.primary"
            >
              {post.title}
            </Typography>
            <ContentWithReadMore content={post?.content} tags={post?.tags} />
          </CardContent>

          {/* Post Media */}
          {post?.media?.length > 0 && (
            <CardMedia
              component="img"
              image={post.media[0]?.url}
              alt={post.title}
              sx={{
                height: { xs: 250, md: 350 },
                objectFit: "cover",
                bgcolor: "grey.100",
              }}
            />
          )}

          {/* Post Actions */}
          <CardActions sx={{ px: 2, py: 1.5, bgcolor: "grey.50" }}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Stack direction="row" spacing={3}>
                {/* Like Button */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Tooltip title={isLiked ? "Unlike" : "Like"}>
                    <IconButton
                      size="small"
                      onClick={() => onLike(post._id)}
                      sx={{
                        color: isLiked ? "error.main" : "text.secondary",
                        "&:hover": {
                          bgcolor: isLiked ? "error.50" : "grey.100",
                        },
                      }}
                    >
                      {isLiked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" color="text.secondary">
                    {post?.likes?.length || 0}
                  </Typography>
                </Stack>

                {/* Comment Button */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Tooltip title="Comment">
                    <IconButton
                      size="small"
                      onClick={() =>
                        setOpenCommentBox(isCommentBoxOpen ? null : post._id)
                      }
                      sx={{
                        color: isCommentBoxOpen
                          ? "primary.main"
                          : "text.secondary",
                        "&:hover": { bgcolor: "primary.50" },
                      }}
                    >
                      <ChatBubbleOutline />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" color="text.secondary">
                    {post?.comments?.length || 0}
                  </Typography>
                </Stack>
              </Stack>

              {/* Share Button */}
              <Tooltip title="Share">
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <Share />
                </IconButton>
              </Tooltip>
            </Stack>
          </CardActions>

          {/* Comments Section */}
          <Collapse in={isCommentBoxOpen} timeout="auto">
            <Paper
              elevation={0}
              sx={{
                bgcolor: "grey.50",
                borderTop: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              {/* Comment Input */}
              <Stack direction="row" spacing={2} mb={2}>
                <Avatar
                  src={currentUser?.avatar}
                  sx={{ width: 32, height: 32 }}
                />
                <Box flex={1}>
                  <TextAreaE1
                    placeholder="Write a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    style={{ width: "100%" }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCommentSubmit}
                  disabled={savingComment || !commentInput.trim()}
                  startIcon={
                    savingComment ? <CircularProgress size={16} /> : <Send />
                  }
                  sx={{ alignSelf: "flex-end" }}
                >
                  {savingComment ? "Posting..." : "Post"}
                </Button>
              </Stack>

              {/* Comments List */}
              <CommentsSection
                comments={post?.comments || []}
                currentUser={currentUser}
                onCommentLike={onCommentLike}
                postId={post._id}
                isPostAdmin={post?.authorId === currentUser?._id}
              />
            </Paper>
          </Collapse>
        </ProductCard>
      </Fade>
    );
  }
);

// Memoized Comments Section
const CommentsSection = memo(
  ({ comments, currentUser, onCommentLike, postId, isPostAdmin }) => {
    if (comments.length === 0) {
      return (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          py={2}
        >
          No comments yet. Be the first to comment!
        </Typography>
      );
    }

    return (
      <Stack spacing={2} maxHeight={300} overflow="auto">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            currentUser={currentUser}
            onLike={() => onCommentLike(postId, comment._id)}
            postId={postId}
            isPostAdmin={isPostAdmin}
          />
        ))}
      </Stack>
    );
  }
);

// Memoized Comment Item
const CommentItem = memo(
  ({ comment, currentUser, onLike, postId, isPostAdmin }) => {
    const { showSnackbar } = useSnackbar();
    const [deletingComment, setDeletingComment] = useState(false);
    const isLiked = comment.likes?.includes(currentUser._id);

    const handleDeleteComment = async (postId, commentId) => {
      try {
        setDeletingComment(true);
        await communityService.deleteMyComment(postId, commentId);
        showSnackbar("Comment deleted successfully", "success");
      } catch (error) {
        console.log(error);
        showSnackbar("Failed to delete comment", "error");
      } finally {
        setDeletingComment(false);
      }
    };

    return (
      <Paper
        elevation={0}
        sx={{ p: 1.5, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <Stack direction="row" spacing={1.5}>
          <Avatar src={comment.avatar} sx={{ width: 32, height: 32 }} />
          <Box flex={1}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              mb={0.5}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {comment.userId === currentUser._id
                    ? "You"
                    : comment.userName || "Unknown"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(comment.createdAt)}
                </Typography>
              </Stack>
              {isPostAdmin && (
                <IconButton
                  onClick={() => handleDeleteComment(postId, comment._id)}
                  disabled={deletingComment}
                >
                  {deletingComment ? (
                    <CircularProgress size={18} />
                  ) : (
                    <Delete sx={{ fontSize: "18px" }} />
                  )}
                </IconButton>
              )}
            </Stack>
            <Typography variant="body2" color="text.primary" mb={1}>
              {comment.content.split(" ").map((word, index) => {
                if (word.startsWith("#") || word.startsWith("@")) {
                  return (
                    <span key={index}>
                      <strong
                        style={{
                          backgroundColor: "#bd70d840",
                          borderRadius: "5px",
                          padding: "0 2px",
                        }}
                      >
                        {word}
                      </strong>{" "}
                    </span>
                  );
                }
                return <span key={index}>{word} </span>;
              })}
            </Typography>
            <Button
              size="small"
              startIcon={isLiked ? <Favorite /> : <FavoriteBorder />}
              onClick={onLike}
              sx={{
                minWidth: "auto",
                px: 1,
                color: isLiked ? "error.main" : "text.secondary",
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              {comment.likes?.length || 0}
            </Button>
          </Box>
        </Stack>
      </Paper>
    );
  }
);

// Memoized Content Component
const ContentWithReadMore = memo(({ content, tags, maxChars = 150 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!content) return null;

  const isLong = content.length > maxChars;
  const displayedText = expanded ? content : content.slice(0, maxChars);

  return (
    <Box>
      <Typography variant="body1" color="text.secondary" mb={1}>
        {displayedText}
        {isLong && (
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{
              minWidth: "auto",
              p: 0,
              ml: 1,
              textTransform: "none",
              fontSize: "inherit",
            }}
          >
            {expanded ? "Show Less" : "...Read More"}
          </Button>
        )}
      </Typography>

      {(expanded || !isLong) && tags?.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
          {tags.map((tag, idx) => (
            <Chip
              key={idx}
              label={`#${tag}`}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.75rem",
                height: 24,
                "& .MuiChip-label": { px: 1 },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
});

// Optimized Skeleton Component
const PostSkeleton = memo(() => (
  <Card sx={{ overflow: "hidden" }}>
    <CardContent>
      <Stack direction="row" spacing={2} mb={2}>
        <Skeleton variant="circular" width={48} height={48} />
        <Box>
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      </Stack>
      <Skeleton variant="text" width="90%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />
      <Stack direction="row" spacing={1} mb={2}>
        {[60, 80, 45].map((width, index) => (
          <Skeleton key={index} variant="rounded" width={width} height={24} />
        ))}
      </Stack>
    </CardContent>
    <Skeleton variant="rectangular" height={300} />
    <CardActions>
      <Stack direction="row" spacing={3} py={1}>
        <Skeleton variant="rounded" width={60} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </Stack>
    </CardActions>
  </Card>
));
