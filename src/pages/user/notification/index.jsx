import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
  useTheme,
  Container,
} from "@mui/material";

const notifications = [
  {
    id: 1,
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    timestamp: "2 minutes ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    title: "New Follower",
    message: "John Doe started following you.",
    timestamp: "1 hour ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    title: "Subscription Expiring",
    message: "Your subscription is about to expire in 3 days.",
    timestamp: "3 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
  },
];

const NotificationCenter = () => {
  const theme = useTheme();
  const [selectedNotification, setSelectedNotification] = useState(
    notifications[0]
  );

  return (
    <Container maxWidth="s" sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ py: 2, m: 0 }}>
          Notifications
        </Typography>

        <Grid container spacing={2} sx={{ flex: 1 }}>
          {/* Left Pane */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              variant="elevation"
              sx={{ height: "90%", display: "flex", flexDirection: "column" }}
            >
              <List sx={{ overflowY: "auto", flex: 1 }}>
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      button
                      selected={notification.id === selectedNotification.id}
                      onClick={() => setSelectedNotification(notification)}
                      alignItems="flex-start"
                      sx={{
                        px: 2,
                        py: 2,
                        bgcolor:
                          notification.id === selectedNotification.id
                            ? theme.palette.action.selected
                            : "inherit",
                        "&:hover": {
                          bgcolor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={notification.avatar}
                          alt={notification.title}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography fontWeight={600} variant="subtitle1">
                            {notification.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {notification.message}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index !== notifications.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Pane */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              variant="elevation"
              sx={{
                height: "90%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={selectedNotification.avatar}
                    alt={selectedNotification.title}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      {selectedNotification.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedNotification.timestamp}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body1" color="text.primary">
                  {selectedNotification.message}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NotificationCenter;
