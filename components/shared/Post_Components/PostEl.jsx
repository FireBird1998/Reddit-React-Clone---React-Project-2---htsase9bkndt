
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';

import PostHelper from './PostHelper';


const PostEl = ({ post }) => {
  

  

  return (
    <Card sx={{
        my: 2,
    }}>
      <CardHeader
        avatar={<Avatar src={post.author?.profileImage} />}
        title={post.author.name}
        subheader={post.channel?.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.title} 
          <br />
          <br />
          {post.content}
        </Typography>
      </CardContent>
      <PostHelper post={post} />
    </Card>
  );
};

export default PostEl;
