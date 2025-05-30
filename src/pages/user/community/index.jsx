import React from "react";
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
} from "@mui/material";

// Sample community posts
const communityPosts = [
  {
    id: 1,
    title: "How I Scaled My Handmade Business to 6 Figures",
    author: "Priya Kapoor",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    title: "Tips for Building a Powerful Brand Identity",
    author: "Aman Verma",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    title: "Top Marketing Tools to Grow Your eCommerce Store",
    author: "Sara Mehta",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Community = () => {
  return (
    <Container maxWidth="s">
      <Box sx={{ py: 8, px: 2, width: "100%" }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto", mb: 6 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Join Our Thriving Community
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Learn from real store owners, share your journey, and get inspired
            by stories of success in the eCommerce world.
          </Typography>
        </Box>

        {/* Community Posts Grid */}
        <Grid container spacing={4}>
          {communityPosts.map((post) => (
            <Grid item xs={8} sm={1} md={2} key={post.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="10"
                  image={post.image}
                  alt={post.title}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {post.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Avatar
                      src={post.avatar}
                      alt={post.author}
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {post.author}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call-to-Action */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Ready to grow together?
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Join the Community
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Community;
