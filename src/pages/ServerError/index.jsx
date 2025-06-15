import { Button } from "@mui/material";
import { Modal, Result } from "antd";
import { clearServerError } from "../../reducer/serverSlice";
import { useDispatch, useSelector } from "react-redux";

const ServerError = () => {
  const dispatch = useDispatch();
  const serverError = useSelector((state) => state.serverError);

  return (
    <Modal open={serverError?.isError} footer={null} closable={false}>
      <Result
        status={serverError?.code}
        title={serverError?.code}
        subTitle={serverError?.message}
        extra={
          [500, 502].includes(serverError?.code) ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  dispatch(clearServerError());
                  window.location.reload();
                }}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(clearServerError());
                }}
              >
                Contact Support
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" href="/auth/signin">
              Login
            </Button>
          )
        }
      />
    </Modal>
  );
};

export default ServerError;
