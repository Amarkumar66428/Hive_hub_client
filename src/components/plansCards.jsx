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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PlanCard = ({ plan, selectPlan, setSelectPlan }) => {
  console.log('plan: ', plan);
  return (
    <Paper
      onClick={() => setSelectPlan(plan)}
      elevation={6}
      sx={{
        cursor: "pointer",
        position: "relative",
        width: 280,
        height: 300,
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
      <Box sx={{ position: "absolute", top: 0, display: "flex" }}>
        <Box
          sx={{
            backgroundColor:
              plan?.tier == "Premium" || plan?.name == "Premium" ? "rgb(116, 82, 24)" : "primary.main",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            width: "160px",
            height: "40px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)", // center horizontally if needed
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1.2rem", textAlign: "center", color: "white" }}
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
