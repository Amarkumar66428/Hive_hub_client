import React, { useMemo, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { appRouters } from "../../router/router.config";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  // Preprocess router config once
  const { menuItems, subMenuMap } = useMemo(() => {
    const menuItems = [];
    const subMenuMap = {};

    for (const item of appRouters) {
      if (item.showInMenu && !item.showInSubMenu) {
        const titleKey = item.title?.split(".")[1] || "";
        menuItems.push({ ...item, titleKey });
      } else if (item.showInSubMenu && item.subMenuTitle) {
        const parentKey = item.subMenuTitle.split(".")[1];
        if (!subMenuMap[parentKey]) subMenuMap[parentKey] = [];
        const titleKey = item.title?.split(".")[1] || "";
        subMenuMap[parentKey].push({ ...item, titleKey });
      }
    }

    return { menuItems, subMenuMap };
  }, []);

  const handleListItemClick = (item) => {
    const hasSubMenu = item.subMenu;
    if (hasSubMenu) {
      handleToggle(item.titleKey);
    } else {
      navigate(item.path);
    }
  };

  const handleToggle = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="sidebar">
      <List
        subheader={
          <ListSubheader
            component="h1"
            id="nested-list-subheader"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: "transparent",
              fontSize: "2rem",
              textAlign: "center",
              marginTop: "2rem",
              padding: "0 2rem",
            }}
          >
            HivvHub
          </ListSubheader>
        }
      >
        {menuItems.map((item) => {
          const hasSubMenu = item.subMenu;
          const isOpen = openMenus[item.titleKey] || false;

          if (item.role?.length > 0 && !item.role.includes(user.role))
            return null;

          return (
            <div key={item.titleKey}>
              <ListItemButton
                onClick={() => handleListItemClick(item)}
                sx={{
                  backgroundColor:
                    window.location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {item.icon && (
                  <ListItemIcon
                    sx={(theme) => ({
                      color:
                        window.location.pathname === item.path
                          ? "#fff"
                          : theme.palette.grey[700],
                    })}
                  >
                    {item.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={item.titleKey}
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color:
                      window.location.pathname === item.path
                        ? "#fff"
                        : theme.palette.grey[700],
                  })}
                />
                {hasSubMenu &&
                  (isOpen ? (
                    <ExpandLess
                      sx={(theme) => ({ color: theme.palette.grey[700] })}
                    />
                  ) : (
                    <ExpandMore
                      sx={(theme) => ({ color: theme.palette.grey[700] })}
                    />
                  ))}
              </ListItemButton>

              {hasSubMenu && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {(subMenuMap[item.titleKey] || []).map((subItem) => {
                      if (
                        subItem.role?.length > 0 &&
                        !subItem.role.includes(user.role)
                      )
                        return null;
                      return (
                        <ListItemButton
                          key={subItem.titleKey}
                          sx={{ pl: 4 }}
                          onClick={() => handleListItemClick(subItem)}
                        >
                          {subItem.icon && (
                            <ListItemIcon
                              sx={(theme) => ({
                                color: theme.palette.grey[700],
                              })}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                          )}
                          <ListItemText
                            primary={subItem.titleKey}
                            sx={(theme) => ({
                              textTransform: "capitalize",
                              color: theme.palette.grey[700],
                            })}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </aside>
  );
};

export default SideBar;
