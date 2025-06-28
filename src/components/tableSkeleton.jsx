import React from "react";
import {
  Box,
  TableCell,
  TableRow,
  Skeleton,
  Avatar,
} from "@mui/material";

const TableSkeleton = ({
  rows = 10,
  columns = 5,
  showProfile = false,
  showActions = false,
}) => {
  return [...Array(rows)].map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {[...Array(showActions ? columns - 1 : columns)].map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Box display="flex" alignItems="center" gap={1}>
            {colIndex === 0 && showProfile && (
              <Skeleton variant="rectangular">
                <Avatar />
              </Skeleton>
            )}
            <Skeleton variant="text" width={100} height={20} />
          </Box>
        </TableCell>
      ))}
      {showActions && (
        <TableCell>
          <Skeleton
            variant="rectangular"
            width={40}
            height={20}
            sx={{ borderRadius: 10 }}
          />
        </TableCell>
      )}
    </TableRow>
  ));
};

export default TableSkeleton;
