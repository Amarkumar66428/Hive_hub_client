import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  List,
  ListItemText,
  ListItem,
  Divider,
  Container,
  Tooltip,
  Skeleton,
  Grid,
} from "@mui/material";
import storeService from "../../../services/storeService";
import { RadioButtonCheckedOutlined } from "@mui/icons-material";
import webPage from "../../../assets/storePage/image4.png";
import { formatDate } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

const storeEditHistory = [
  {
    field: "Store Name",
    date: "6 June, 2023",
    timeAgo: "Updated 2 days ago",
  },
  {
    field: "Store Address",
    date: "4 June, 2023",
    timeAgo: "Updated 4 days ago",
  },
  {
    field: "Contact Number",
    date: "1 June, 2023",
    timeAgo: "Updated 7 days ago",
  },
];

const ManageStores = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await storeService.getMyStore();
        if (!response?.store)
          return navigate("/user/manage-store/create-store");

        setStore(response?.store || null);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      {loading ? (
        <StorePageSkeleton />
      ) : (
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
        >
          <Grid container spacing={2}>
            {/* Left Panel with Store Preview */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      gap: 2,
                      flexDirection: "column",
                      maxWidth: "30%",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "16em",
                        objectFit: "cover",
                        borderRadius: 1,
                        boxShadow: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        window.open(
                          `${window.location.origin}/hive/${store?.subdomain}`,
                          "_blank"
                        );
                      }}
                    >
                      <img src={webPage} alt="Store Preview" />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() =>
                          navigate("/user/manage-store/1/edit")
                        }
                      >
                        Edit Store
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    {/* Store Name */}
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {store?.name || "Store Name"}
                    </Typography>

                    {/* Store URL with status icon */}
                    <Box
                      component="a"
                      href={`${window.location.origin}/hive/${store?.subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      <Tooltip title={store?.isApproved ? "Live" : "Pending"}>
                        <RadioButtonCheckedOutlined
                          fontSize="small"
                          sx={{
                            color: store?.isApproved
                              ? "success.main"
                              : "warning.main",
                            mr: 1,
                          }}
                        />
                      </Tooltip>
                      <Typography variant="body2" fontWeight={500} noWrap>
                        {store?.subdomain
                          ? `${window.location.origin}/hive/${store.subdomain}`
                          : "Store URL not set"}
                      </Typography>
                    </Box>

                    {/* Divider */}
                    <Divider sx={{ my: 1 }} />

                    {/* Store Status */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" color="text.secondary">
                        Status:
                      </Typography>
                      <Chip
                        label={
                          store?.isApproved ? "Approved" : "Pending Approval"
                        }
                        color={store?.isApproved ? "success" : "warning"}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          textTransform: "capitalize",
                          px: 1,
                        }}
                      />
                    </Box>

                    {/* Created At */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" color="text.secondary">
                        Created on:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatDate(store?.createdAt)}
                      </Typography>
                    </Box>

                    {/* Deployed At */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" color="text.secondary">
                        Deployed on:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatDate(store?.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Panel with Store Analytics */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  title={
                    <Typography variant="h4" fontWeight={600}>
                      Store Analytics
                    </Typography>
                  }
                />
                <CardContent sx={{ mt: 1, flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Get a deeper understanding of your project with detailed
                    analytics including page views, unique visitors, and top
                    pages.{" "}
                    <Typography
                      component="span"
                      sx={{
                        color: "primary.main",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontWeight: 500,
                        "&:hover": { textDecoration: "none" },
                      }}
                    >
                      Learn more
                    </Typography>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary">
                    Upgrade to Enable
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          {/* Store Edit History */}
          <Grid item size={{ xs: 12 }} sx={{ flexGrow: 1 }}>
            <Card sx={{ height: "100%" }}>
              <CardHeader
                title={
                  <Typography variant="h5" fontWeight={600}>
                    Store Edit History
                  </Typography>
                }
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ pt: 1 }}>
                <List disablePadding>
                  {storeEditHistory.map((item, index) => (
                    <Box key={index}>
                      <ListItem
                        secondaryAction={
                          <Box display="flex" alignItems="center" gap={2}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              minWidth="100px"
                              textAlign="right"
                            >
                              {item.date}
                            </Typography>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={item.field}
                          secondary={item.timeAgo}
                        />
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default ManageStores;

const StorePageSkeleton = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={140}
                  sx={{ borderRadius: 1 }}
                />
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Skeleton variant="text" width="50%" height={28} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Divider sx={{ my: 1 }} />
                  <Skeleton variant="rounded" width={120} height={28} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Skeleton variant="text" width="40%" height={28} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="70%" height={20} />
              <Box mt={2}>
                <Skeleton variant="rounded" width={150} height={36} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Store Edit History
            </Typography>
            <List>
              {[1, 2, 3].map((item) => (
                <ListItem key={item} divider>
                  <ListItemText
                    primary={<Skeleton variant="text" width="30%" />}
                    secondary={<Skeleton variant="text" width="20%" />}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
