import React, { memo } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack, Typography } from "@mui/material";

interface ActionsItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface ActionsProps {
  items: ActionsItem[];
}

const Actions: React.FC<ActionsProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="Actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              }
              handleClose();
            }}
            sx={{
              py: 1,
              "&:hover": { color: "orange" },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {item.icon}
              <Typography variant="inherit">{item.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(Actions);
