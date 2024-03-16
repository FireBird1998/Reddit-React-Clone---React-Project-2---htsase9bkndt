'use client';
import {
    ArrowUpwardOutlined,
    ArrowDownwardOutlined,
    ArrowUpward,
    ArrowDownward,
    CommentOutlined,
} from '@mui/icons-material';
import { CardActions, IconButton, Badge } from '@mui/material';
import axios from '@/utility/axiosConfig';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { useEffect, useContext, useState } from 'react';

import React from 'react';

const PostHelper = ({ post }) => {
    const { isUserAuthenticated } = useContext(AuthContext);
    const [disLikeLike, setDisLikeLike] = useState(post.likeCount - post.dislikeCount);
    const Router = useRouter();
    const upVote = useMutation(
        () => {
            return axios.post(`/reddit/like/${post._id}`);
        },
        {
            onSuccess: (data) => {
                console.log('Post upvoted ' + data);
            },
            onError: (error) => {
                console.error('Error upvoting post:', error);
            },
        },
    );
    const downVote = useMutation(
        () => {
            return axios.delete(`/reddit/like/${post._id}`);
        },
        {
            onSuccess: (data) => {
                console.log('Post downvoted ' + data);
            },
            onError: (error) => {
                console.error('Error downvoting post:', error);
            },
        },
    );
    const { data, error, isError } = useQuery(
        ['likeCount', post._id],
        async () => {
            const { data } = await axios.get(`/reddit/post/${post._id}`);
            return data.data;
        },
        {
            onSuccess: (data) => {
                let ratio = data.likeCount - data.dislikeCount;
                setDisLikeLike(ratio);
            },
        },
    );

    if (isError) {
        console.error('Error fetching like count:', error);
    }

    return (
        <CardActions disableSpacing>
            <IconButton aria-label="upvote" onClick={() => upVote.mutate()}>
                <Badge badgeContent={post.likeCount} color="secondary">
                    <ArrowUpward />
                </Badge>
            </IconButton>
            {disLikeLike}
            <IconButton aria-label="downvote" onClick={() => downVote.mutate()}>
                <Badge badgeContent={post.dislikeCount} color="secondary">
                    <ArrowDownwardOutlined />
                </Badge>
            </IconButton>
            <IconButton aria-label="comment">
                <Badge badgeContent={post.commentCount} color="secondary">
                    <CommentOutlined />
                </Badge>
            </IconButton>
        </CardActions>
    );
};

export default PostHelper;

const upvoteDownvote = ({}) => {
    <IconButton aria-label="upvote" onClick={() => upVote.mutate()}>
        <Badge badgeContent={post.likeCount} color="secondary">
            <ArrowUpward />
        </Badge>
    </IconButton>;
    {
        disLikeLike;
    }
    <IconButton aria-label="downvote" onClick={() => downVote.mutate()}>
        <Badge badgeContent={post.dislikeCount} color="secondary">
            <ArrowDownwardOutlined />
        </Badge>
    </IconButton>;
};

// const getComments = useQuery(
//     ['comments', post._id],
//     async () => {
//         const { data } = await axios.get(`/reddit/post/${post._id}/comments`);
//         return data.data;
//     },
// );
// const postComment = useMutation(
//     () => {

//     }
// );
