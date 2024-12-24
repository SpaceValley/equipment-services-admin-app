import React from 'react';
import { Modal } from '@mui/material';
import clsx from 'clsx';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-material-ui-carousel';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { pauseVideos, isVideo, carouselProps } from '../../../utils';

const ModalGallery = ({
  isOpened,
  closeModal,
  currentImageIndex = 0,
  setCurrentImageIndex,
  photos
}) => {

  const onCarouselChange = (now) => {
    if (photos.length) setCurrentImageIndex(now);
    pauseVideos();
  };

  return (
    <Modal
      open={isOpened}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={closeModal}
    >
      <div>
        <div className="closeGalleryIconWrap" onClick={closeModal}>
          <CloseIcon id="closeGalleryIcon" />
        </div>
        <Carousel
          className="modalCarousel"
          index={currentImageIndex}
          onChange={onCarouselChange}
          {...carouselProps(photos?.length)}
        >
          {photos?.map((e, idx) => (
            <div className={clsx('imageWrap', 'modalImageWrap')} key={e?.name || idx}>
              {isVideo(e) ? (
                <video controls className="video">
                  <source src={e?.url} type={e?.mimetype} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <TransformWrapper>
                  {({ resetTransform }) => {
                    if (idx !== currentImageIndex) resetTransform();
                    return (
                      <TransformComponent>
                        <img src={e?.url} alt={e?.name || idx} className="modalImage" />
                      </TransformComponent>
                    );
                  }}
                </TransformWrapper>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </Modal>
  );
};

export default ModalGallery;
