import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Add } from '@mui/icons-material';
const sidebarLinks1 = [
  {
    title: 'Home',
    url: '/',
    icon: HomeOutlinedIcon,
  },
  {
    title: 'Popular',
    url: '/r/popular',
    icon: OutboundOutlinedIcon,
  },
];

const sidebarLinks2 = [
    {
        title: ''
    },
];
const otherLinks = [
    {
        title: 'Create Post',
        url: '/submit',
        icon: Add,
    },
];

const postingGuidelines = [
    {
        title: 'Remember the human',
    },
    {
        title: 'Behave like you would in real life',
    },
    {
        title: 'Look for the original source of content',
    },
    {
        title: 'Search for duplicates before posting',
    },
    {
        title: 'Read the community’s rules',
    },
];


export {
    sidebarLinks1,
    sidebarLinks2,
    otherLinks,
    postingGuidelines
};
