import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import { Add } from "@mui/icons-material";
const sidebarLinks1 = [
  {
    title: "Home",
    url: "/",
    icon: HomeOutlinedIcon,
  },
  {
    title: "Popular",
    url: "/r/popular",
    icon: OutboundOutlinedIcon,
  },
];

const sidebarLinks2 = [
  {
    title: "",
  },
];
const otherLinks = [
  {
    title: "Create Post",
    url: "/submit",
    icon: Add,
  },
];

const postingGuidelines = [
  {
    id: "fc1",
    title: "Remember the human",
  },
  {
    id: "fc2",
    title: "Behave like you would in real life",
  },
  {
    id: "fc3",
    title: "Look for the original source of content",
  },
  {
    id: "cc4",
    title: "Search for duplicates before posting",
  },
  {
    id: "cc5",
    title: "Read the community’s rules",
  },
];

export { sidebarLinks1, sidebarLinks2, otherLinks, postingGuidelines };
