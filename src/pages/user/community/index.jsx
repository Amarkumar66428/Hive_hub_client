import React, { useEffect, useState } from "react";
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
  useTheme,
} from "@mui/material";
import {
  Add,
  Article,
  Person,
  ExpandMore,
  ChatTwoTone,
  ChatBubbleOutline,
  Send,
} from "@mui/icons-material";

import CreatePostModal from "./createPost";
import communityService from "../../../services/community";
import { useSnackbar } from "../../../features/snackBar";
import { TextAreaE1 } from "../../../components/inputs";
import { formatDate } from "../../../utils/helper";
import useAuth from "../../../hooks/useAuth";

const Community = () => {
  const currentUser = useAuth();
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [savingPostComment, setSavingPostComment] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const params = `?page=${1}&limit=${10}`;
        const response = await communityService.getAllCommunities(params);
        setTableData(response?.posts || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLike = async (postId) => {
    try {
      setTableData((prevData) =>
        prevData.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(currentUser._id)
                  ? post.likes.filter((id) => id !== currentUser._id)
                  : [...post.likes, currentUser._id],
              }
            : post
        )
      );
      await communityService.likeOnPost(postId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (postId) => {
    try {
      if (!commentInput) return showSnackbar("Please enter a comment", "error");

      setSavingPostComment(true);
      const comment = {
        content: commentInput,
      };
      const response = await communityService.commentOnPost(postId, comment);
      if (response) {
        setTableData((prevData) =>
          prevData.map((post) => {
            if (post._id !== postId) return post;

            const currentIds = new Set();
            const merged = [];

            for (const c of post.comments) {
              currentIds.add(c._id);
              merged.push(c);
            }

            for (const c of response.post.comments) {
              if (!currentIds.has(c._id)) {
                currentIds.add(c._id);
                merged.push(c);
              }
            }

            return { ...post, comments: merged };
          })
        );
      }
      showSnackbar(
        response?.message || "Comment added successfully",
        "success"
      );
    } catch (err) {
      console.log(err);
    } finally {
      setSavingPostComment(false);
    }
  };

  const handleCommentLike = async (postId, commentId) => {
    try {
      setTableData((prevData) =>
        prevData.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === commentId
                    ? {
                        ...comment,
                        likes: comment.likes.includes(currentUser._id)
                          ? comment.likes.filter((id) => id !== currentUser._id)
                          : [...comment.likes, currentUser._id],
                      }
                    : comment
                ),
              }
            : post
        )
      );
      await communityService.likeOnPostComment(postId, commentId);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await communityService.getMyPosts(currentUser._id);
      setTableData(response?.posts || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuItemClick = (action) => {
    handleClose();

    // Add your navigation logic here
    switch (action) {
      case "create-post":
        setCreatePostModal(true);
        break;
      case "my-posts":
        fetchMyPosts();
        break;
      case "my-profile":
        // Navigate to community profile page
        // navigate('/community-profile');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={700} color="primary">
              Join Our Thriving Community
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn from real store owners, share your journey, and get inspired
              by stories of success in the eCommerce world.
            </Typography>
          </Box>
          <Button
            onClick={handleClick}
            aria-controls={open ? "avatar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 16,

              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Avatar
              src={"https://randomuser.me/api/portraits/women/44.jpg"}
              alt={"Alexandra"}
              sx={{
                width: 40,
                height: 40,
                cursor: "pointer",
              }}
            />
            <ExpandMore
              sx={{
                ml: 0.5,
                fontSize: 22,
                color: "text.secondary",
              }}
            />
          </Button>

          <Menu
            id="avatar-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "avatar-button",
            }}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1,
                minWidth: 200,
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1.5,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => handleMenuItemClick("create-post")}>
              <ListItemIcon>
                <Add fontSize="small" />
              </ListItemIcon>
              <ListItemText>Create Post</ListItemText>
            </MenuItem>

            <MenuItem onClick={() => handleMenuItemClick("my-posts")}>
              <ListItemIcon>
                <Article fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Posts</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={() => handleMenuItemClick("my-profile")}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Community Profile</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ width: "100%" }}>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress />
            </Box>
          ) : tableData?.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                No community posts found
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {tableData.map((post) => (
                <Grid size={{ xs: 12 }} key={post._id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: "0.3s",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      p: 2,

                      "&:hover": {
                        boxShadow: 6,
                      },
                    }}
                  >
                    {/* Header: Avatar and Author */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #ccc",
                        pb: 1,
                      }}
                    >
                      <Avatar
                        src={post.avatar}
                        alt={post.author}
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography
                        fontWeight={600}
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", ml: 1 }}
                      >
                        {post.author || "Unknown"}
                      </Typography>
                    </Box>

                    {/* Content */}
                    {post.media?.length ? (
                      <CardContent sx={{ p: 0, fontSize: 14 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {post.title}
                        </Typography>
                        <ContentWithReadMore
                          content={post.content}
                          tags={post.tags}
                        />
                      </CardContent>
                    ) : null}
                    {/* Image */}
                    {post.media?.length ? (
                      <CardMedia
                        component="img"
                        image={post?.media[0]?.url}
                        alt={post.title}
                        sx={{
                          height: 200,
                          width: "90%",
                          objectFit: "contain",
                          mx: "auto",
                        }}
                      />
                    ) : (
                      <CardContent sx={{ p: 0, fontSize: 14 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {post.title}
                        </Typography>
                        <ContentWithReadMore
                          content={post.content}
                          tags={post.tags}
                        />
                      </CardContent>
                    )}

                    {/* Actions: Like and Comment */}
                    <CardActions
                      sx={{
                        borderTop: "1px solid #ccc",
                        p: 0,
                        pt: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        display={"flex"}
                        gap={1}
                        justifyContent={"flex-start"}
                        width={"100%"}
                      >
                        <Box
                          className="community-like-dislike-container"
                          display={"flex"}
                          gap={1}
                        >
                          <Tooltip title="Like">
                            <div className="con-like">
                              <input
                                className="like"
                                type="checkbox"
                                title="like"
                                defaultChecked={post.likes.includes(
                                  currentUser._id
                                )}
                                onChange={() => handleLike(post._id)}
                              />
                              <div className="checkmark">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="outline"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="filled"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="100"
                                  width="100"
                                  className="celebrate"
                                >
                                  <polygon
                                    className="poly"
                                    points="10,10 20,20"
                                  ></polygon>
                                  <polygon
                                    className="poly"
                                    points="10,50 20,50"
                                  ></polygon>
                                  <polygon
                                    className="poly"
                                    points="20,80 30,70"
                                  ></polygon>
                                  <polygon
                                    className="poly"
                                    points="90,10 80,20"
                                  ></polygon>
                                  <polygon
                                    className="poly"
                                    points="90,50 80,50"
                                  ></polygon>
                                  <polygon
                                    className="poly"
                                    points="80,80 70,70"
                                  ></polygon>
                                </svg>
                              </div>
                            </div>
                          </Tooltip>
                          <Typography>{post.likes.length}</Typography>
                        </Box>
                        <Box display={"flex"} gap={1}>
                          <Tooltip title="Comment">
                            <IconButton
                              onClick={() =>
                                setOpenCommentBox((prev) =>
                                  prev === post._id ? null : post?._id
                                )
                              }
                              sx={{ p: 0 }}
                            >
                              <ChatBubbleOutline
                                sx={{
                                  fontSize: "1.1em",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Typography>{post.comments.length}</Typography>
                        </Box>
                      </Box>
                      <Collapse
                        in={openCommentBox === post._id}
                        sx={{ width: "100%" }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderTop: "1px solid #eee",
                            borderRadius: 1,
                            bgcolor: "#f4f6f8",
                            mt: 1,
                          }}
                        >
                          {/* Comment Input */}
                          <Box
                            display="flex"
                            gap={1}
                            justifyContent="space-between"
                            width="100%"
                            alignItems="center"
                            mb={2}
                          >
                            <Avatar
                              src={""}
                              sx={{ width: 30, height: 30 }}
                            />
                            <TextAreaE1
                              allowClear
                              placeholder="Write a comment..."
                              value={commentInput || ""}
                              onChange={(e) => setCommentInput(e.target.value)}
                              autoSize
                              style={{
                                ":focus": {
                                  outline: "none",
                                  borderColor: theme?.palette?.primary?.main,
                                },
                              }}
                            />
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleComment(post._id)}
                              disabled={savingPostComment}
                              startIcon={
                                savingPostComment ? (
                                  <CircularProgress size={20} />
                                ) : null
                              }
                              sx={{ alignSelf: "flex-end" }}
                            >
                              <Send />
                            </Button>
                          </Box>

                          {/* Existing Comments */}
                          {post.comments.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                              No comments yet.
                            </Typography>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="column"
                              gap={1}
                              maxHeight={200}
                              overflow={"auto"}
                            >
                              {post.comments.map((comment, i) => (
                                <Box
                                  key={i}
                                  display="flex"
                                  gap={1}
                                >
                                  <Avatar
                                    src={comment.avatar || ""}
                                    sx={{ width: 30, height: 30 }}
                                  />
                                  <Box
                                    sx={{
                                      p: 1,
                                      borderRadius: 1,
                                      bgcolor: "#fff",
                                      width: "100%",
                                    }}
                                  >
                                    <Box
                                      display={"flex"}
                                      flexDirection={"row"}
                                    >
                                      <Box display="flex" alignItems="center">
                                        <Typography
                                          variant="body2"
                                          fontWeight="bold"
                                        >
                                          {comment.userId === currentUser._id
                                            ? "You"
                                            : comment.userId}
                                        </Typography>
                                      </Box>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        ml={1}
                                      >
                                        {formatDate(comment.createdAt)}
                                      </Typography>
                                    </Box>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      mt={1}
                                    >
                                      {comment.content}
                                    </Typography>
                                    <Button
                                      variant="text"
                                      size="small"
                                      onClick={() =>
                                        handleCommentLike(post._id, comment._id)
                                      }
                                      sx={{ px: 0, py: 0 }}
                                    >
                                      Like {comment.likes.length}
                                    </Button>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Collapse>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
      <CreatePostModal
        createPostModal={createPostModal}
        setCreatePostModal={setCreatePostModal}
      />
    </>
  );
};

export default Community;

const ContentWithReadMore = ({ content, tags, maxChars = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!content) return null;

  const isLong = content.length > maxChars;
  const displayedText = expanded ? content : content.slice(0, maxChars);

  return (
    <Box>
      <Typography
        variant="body2"
        component="span"
        sx={{ color: "text.secondary" }}
      >
        {displayedText}
        {isLong && (
          <Typography
            component="span"
            onClick={() => setExpanded((prev) => !prev)}
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 500,
              ml: 1,
            }}
          >
            {expanded ? "Show Less" : "...Read More"}
          </Typography>
        )}
      </Typography>

      {(isLong ? expanded : true) && tags?.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          {tags.map((tag, idx) => (
            <Typography
              key={idx}
              variant="body2"
              component="span"
              sx={{ color: "secondary.main" }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};
