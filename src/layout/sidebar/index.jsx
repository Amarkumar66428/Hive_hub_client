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
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});
  const { menuItems, subMenuMap } = useMemo(() => {
    const menuItems = [];
    const subMenuMap = {};

    for (const item of appRouters) {
      if (item.showInMenu && !item.showInSubMenu) {
        menuItems.push({ ...item, titleKey: item.title });
      } else if (item.showInSubMenu && item.subMenuTitle) {
        const parentKey = item.subMenuTitle;

        if (!subMenuMap[parentKey]) subMenuMap[parentKey] = [];

        subMenuMap[parentKey].push({ ...item, titleKey: item.title });
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
              padding: "0 3rem",
            }}
          >
            HivvHub
          </ListSubheader>
        }
      >
        {menuItems.map((parentItem) => {
          const hasSubMenu = parentItem.subMenu;
          const isOpen = openMenus[parentItem.titleKey] || false;

          if (
            parentItem.role?.length > 0 &&
            !parentItem.role.includes(user.role)
          )
            return null;

          return (
            <div key={parentItem.titleKey}>
              <ListItemButton
                onClick={() => handleListItemClick(parentItem)}
                sx={{
                  backgroundColor:
                    window.location.pathname === parentItem.path
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {parentItem.icon && (
                  <ListItemIcon
                    sx={(theme) => ({
                      color:
                        window.location.pathname === parentItem.path
                          ? "#fff"
                          : theme.palette.grey[700],
                    })}
                  >
                    {parentItem.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={parentItem.titleKey}
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color:
                      window.location.pathname === parentItem.path
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
                    {(subMenuMap[parentItem.titleKey] || []).map((subItem) => {
                      if (
                        subItem.role?.length > 0 &&
                        !subItem.role.includes(user.role)
                      )
                        return null;
                      return (
                        <ListItemButton
                          key={subItem.titleKey}
                          sx={{
                            pl: 4,
                            backgroundColor:
                              window.location.pathname === subItem.path
                                ? "rgba(255, 255, 255, 0.1)"
                                : "transparent",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                          }}
                          onClick={() => handleListItemClick(subItem)}
                        >
                          {subItem.icon && (
                            <ListItemIcon
                              sx={(theme) => ({
                                color:
                                  window.location.pathname === subItem.path
                                    ? "#fff"
                                    : theme.palette.grey[700],
                              })}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                          )}
                          <ListItemText
                            primary={subItem.titleKey}
                            sx={(theme) => ({
                              textTransform: "capitalize",
                              color:
                                window.location.pathname === subItem.path
                                  ? "#fff"
                                  : theme.palette.grey[700],
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
