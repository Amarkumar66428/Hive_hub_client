import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const WebsiteHeader = () => {
  const { subdomain } = useParams();
  const navigate = useNavigate();
  return (
    <header className="website-header">
      <Container maxWidth={false} sx={{ px: 2, py: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Button
            startIcon={<ArrowBack />}
            variant="text"
            onClick={() => navigate(`/hive/${subdomain}`)}
          >
            <Typography variant="h6">Continue Shopping</Typography>
          </Button>
          <Typography variant="h6">
            <Link to={`/hive/${subdomain}`}>Website Header</Link>
          </Typography>
        </Box>
      </Container>
    </header>
  );
};

export default WebsiteHeader;
