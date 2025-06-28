import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Modal, Result } from "antd";
import { clearServerError } from "../../reducer/serverSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { clearUserData } from "../../reducer/authSlice";

const ServerError = () => {
  const serverError = useSelector((state) => state.serverError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const logout = () => {
    localStorage.clear();
    Cookies.remove("access_token");
    dispatch(clearUserData());
    navigate("/auth/signin");
  };

  const renderButtons = () => {
    const commonButtonProps = {
      fullWidth: isMobile,
      sx: { minWidth: 120 },
    };

    if ([500, 502].includes(serverError?.code || 500)) {
      return (
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              dispatch(clearServerError());
              window.location.reload();
            }}
            {...commonButtonProps}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(clearServerError())}
            {...commonButtonProps}
          >
            Contact Support
          </Button>
        </Stack>
      );
    }

    return (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          {...commonButtonProps}
        >
          Login
        </Button>
      </Stack>
    );
  };

  return (
    <Modal
      open={serverError?.isError || false}
      footer={null}
      closable={false}
      centered
      style={{
        padding: 24,
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <Result
        status={serverError?.code || "500"}
        title={serverError?.code || "500"}
        subTitle={serverError?.message || "Internal Server Error"}
        extra={renderButtons()}
      />
    </Modal>
  );
};

export default ServerError;
