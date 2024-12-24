import React from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export const isVideo = (e) => e?.mimetype?.includes('video') || e?.type?.includes('video');

export const pauseVideos = () => {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    if (!video.paused) {
      video.pause();
    }
  });
};

export const carouselProps = (photosLength) => ({
  navButtonsAlwaysVisible: true,
  swipe: false,
  autoPlay: false,
  fullHeightHover: false,
  indicators: photosLength > 1,
  indicatorContainerProps: { className: 'carouselIndicatorsWrap' },
  activeIndicatorIconButtonProps: { className: 'carouselActiveIndicator' },
  indicatorIconButtonProps: { className: 'carouselIndicator' },
  navButtonsProps: {
    className: photosLength > 1 ? 'carouselNavButton' : 'hideCarouselNavButton'
  },
  navButtonsWrapperProps: { className: 'carouselNavButtonsWrapper' },
  NextIcon: photosLength > 1 ? <ArrowForwardIosRoundedIcon /> : null,
  PrevIcon: photosLength > 1 ? <ArrowBackIosRoundedIcon /> : null
});
