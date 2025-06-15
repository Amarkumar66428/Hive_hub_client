import { styled } from "@mui/material";
import { Input } from "antd";
const { TextArea } = Input;

export const TextAreaE1 = styled(TextArea)(({ theme }) => ({
  "&:focus, &:hover, &:focus-within, &:focus-visible": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`, // subtle glow
    outline: "none",
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));
