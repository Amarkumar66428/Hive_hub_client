import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Checkbox,
} from "@mui/material";
import { CheckCircleOutlined } from "@mui/icons-material";
import cardTop from "../assets/svg/cardTop.svg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PlanCard = ({ plan, selectPlan, setSelectPlan, size }) => {
  return (
    <Paper
      onClick={() => setSelectPlan(plan)}
      elevation={6}
      sx={{
        cursor: "pointer",
        position: "relative",
        width: size === "large" ? 380 : 280,
        height: size === "large" ? 400 : 300,
        borderRadius: 3,
        background:
          plan?.tier === "Premium"
            ? "linear-gradient(to top,rgb(116, 82, 24) 15%,rgb(114, 86, 29) 20%,rgb(104, 76, 25) 25%,rgb(85, 60, 23) 55%,rgb(0, 0, 0) 100%)"
            : "linear-gradient(to top, #801b7c 5%, #651562 15%, #4e104c 25%, #450e42 30%, #1a0519 70%)",
        color: "white",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Top banner for plan name */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={cardTop}
          alt="Card Top"
          sx={{
            width: "60%",
            height: "100%",
            objectFit: "contain",
            zIndex: 0,
          }}
        />

        {/* Overlay Text */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            width: "100%",
            textAlign: "center",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            title={plan.tier || plan.name || "10K"}
            component="div"
            sx={{
              fontSize: "1.2rem",
              color: "white",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "40%",
            }}
          >
            {plan.tier || plan.name || "10K"}
          </Typography>
        </Box>
      </Box>

      {/* Checkmark top right */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Checkbox
          checked={
            selectPlan?.id
              ? selectPlan?.id === plan?.id
              : selectPlan?._id === plan?._id
          }
          {...label}
          sx={{
            color: "white",
            "&.Mui-checked": { color: "#ccc" },
            "& .MuiSvgIcon-root": { fontSize: 40 },
          }}
        />
      </Box>

      {/* Price text */}
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          userSelect: "none",
          fontSize: "4rem",
          height: "40%",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
        }}
      >
        ${plan.price || "10,000"}
      </Typography>

      {/* Features list */}
      <List
        dense
        sx={{
          height: "60%",
          px: 0,
          "& .MuiListItem-root": {
            gap: 0.5,
          },
        }}
      >
        {plan.features.map((feature, idx) => (
          <ListItem
            key={idx}
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 0,
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleOutlined sx={{ color: "#2ee82e", fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText
              primary={feature}
              primaryTypographyProps={{ fontSize: 14 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PlanCard;
