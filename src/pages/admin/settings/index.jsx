import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../../reducer/authSlice";
import { Logout } from "@mui/icons-material";
import ConfirmDialog from "../../../components/confirmDialog";
import Cookies from "js-cookie";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useAuth();

  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  const logout = () => {
    localStorage.clear();
    Cookies.remove("access_token");
    dispatch(clearUserData());
    navigate("/auth/signin");
  };

  return (
    <Box
      sx={{ p: 2 }}
      component="main"
      role="main"
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      flexGrow={1}
    >
      <Card elevation={3}>
        <CardContent
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexDirection: "column",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            textAlign="center"
            border="1px solid #ccc"
            borderRadius={2}
            p={2}
            gap={1}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              Name : {userData?.name || "Admin"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email : {userData?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role : {userData?.role || "Admin"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenLogoutDialog(true)}
            startIcon={<Logout />}
            sx={{ alignSelf: "flex-start" }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={openLogoutDialog}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Yes"
        onConfirm={logout}
        onCancel={() => setOpenLogoutDialog(false)}
      />
    </Box>
  );
};

export default ProfileSettings;
