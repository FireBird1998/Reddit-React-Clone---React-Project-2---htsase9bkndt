import { useContext } from "react";
import { AccountCircle } from "@mui/icons-material";
import { AuthContext } from "@/context/AuthContext";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";

const AvatarEl = () => {
  const { isUserAuthenticated, authState } = useContext(AuthContext);
  const matches = useMediaQuery("(max-width:600px)");

  return !isUserAuthenticated() ? (
    <AccountCircle sx={{ width: matches ? 20 : 30, height: matches ? 20 : 30 }} />
  ) : (
    <Avatar
      sx={{
        bgcolor: deepOrange[500],
        width: matches ? 20 : 30,
        height: matches ? 20 : 30,
      }}
    >
      {authState?.userInfo?.name?.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default AvatarEl;
