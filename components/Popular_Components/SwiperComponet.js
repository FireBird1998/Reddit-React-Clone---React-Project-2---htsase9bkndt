'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/navigation';

import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Skeleton,
    IconButton,
    ArrowBackIos,
    ArrowForwardIos,
} from '@mui/material';
import axios from '@/utility/axiosConfig';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
const SwiperComponent = () => {
    const { data, isLoading, isError, error } = useQuery(
        'popular',
        async () => {
            const { data } = await axios.get('reddit/post?limit=5');
            return data;
        },
    );

    if (isLoading) {
        return (
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }}
            >
                <SwiperSlide>
                    <Skeleton variant="rectangular" width={250} height={200} />
                </SwiperSlide>
            </Swiper>
        );
    }

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            centeredSlides={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            }}
        >
            {data.data.map((item, index) => (
                <SwiperSlide key={item.id}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CardEl item={item} index={index} />
                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const CardEl = ({ item, index }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/r/post/${item._id}`);
    };

    return (
        <Card sx={{ maxWidth: 250, maxHeight: 200, position: 'relative' }}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    sx={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        '&:hover': { opacity: 0.5 },
                    }}
                    component="img"
                    height="190"
                    image={
                        item.images[0]
                            ? item.images[0]
                            : `https://source.unsplash.com/random?sig=${index}`
                    }
                    alt={item.title}
                />
                <CardContent
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        width: '100%',
                        textAlign: 'left',
                    }}
                >
                    <Typography variant="p" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.author.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SwiperComponent;
