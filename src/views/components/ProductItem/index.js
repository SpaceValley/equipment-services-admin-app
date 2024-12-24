import React, { useMemo, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setSelectedItem } from '../../../store/app/actions';
import ModalGallery from '../ModalGallery';
import Button from '../Button';
import clsx from 'clsx';
import { carouselProps, isVideo, pauseVideos } from '../../../utils';
import './index.sass';

const ProductItem = (item) => {
  const { selectedItem } = useSelector(({ appReducer }) => appReducer);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isProductDetailsRoute = useMemo(() => location.pathname.includes(`/products/`), [location]);

  const [isGalleryModalVisible, setGalleryModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onReadMoreClick = () => {
    dispatch(
      setSelectedItem({
        ...selectedItem,
        product: item
      })
    );
    navigate(`../subcategories/${selectedItem?.subcategoryId}/products/${item?._id}`);
  };

  const onCarouselChange = (now) => {
    if (!isGalleryModalVisible) setCurrentImageIndex(now);
    pauseVideos();
  };

  return (
    <Grid
      sx={{
        mb: { xs: 3, xl: 5 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: isProductDetailsRoute ? 'column' : 'row', lg: 'row' }
      }}
    >
      <Grid>
        {item?.photos?.length ? (
          <Carousel
            className={clsx('carousel', isProductDetailsRoute && 'carouselScaled')}
            onChange={onCarouselChange}
            index={currentImageIndex}
            {...carouselProps(item?.photos?.length)}
          >
            {item?.photos?.map((e, idx) => (
              <div
                className={clsx('imageWrap', isProductDetailsRoute && 'imageWrapScaled')}
                key={e?.name || idx}
              >
                {isVideo(e) ? (
                  <video controls className="video">
                    <source src={e?.url} type={e?.mimetype} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={e?.url}
                    className="image"
                    alt={e?.name || idx}
                    onClick={() => setGalleryModalVisible(true)}
                  />
                )}
              </div>
            ))}
          </Carousel>
        ) : (
          <div className={clsx('noImageWrap', isProductDetailsRoute && 'noImageWrapScaled')}>
            <ImageNotSupportedOutlinedIcon sx={{ fontSize: 100 }} />
          </div>
        )}
      </Grid>
      <Grid
        sx={{
          ml: isProductDetailsRoute ? { xs: 0, lg: 3, xl: 4 } : { sm: 2, lg: 3, xl: 4 },
          mt: isProductDetailsRoute ? { xs: 2, lg: 0 } : { xs: 2, sm: 0 }
        }}
        id={clsx('productDetailsWrap', isProductDetailsRoute && 'productDetailsRouteWrap')}
        onClick={onReadMoreClick}
      >
        <Grid>
          <Typography
            sx={{ mb: { xs: 1, xl: 2 }, typography: { xs: 'h5', xl: 'h4' } }}
            className={!isProductDetailsRoute ? 'productNameHidden' : ''}
          >
            {item?.name?.[i18n.language]}
          </Typography>
          {isProductDetailsRoute && (
            <>
              <Typography sx={{ color: 'grey.500', typography: { xs: 'body2', xl: 'subtitle2' } }}>
                {t('product_code_number')}
              </Typography>
              <Typography sx={{ mb: 2, typography: { xs: 'subtitle2', xl: 'subtitle1' } }}>
                {item?.codeNumber}
              </Typography>
            </>
          )}
          <Typography sx={{ color: 'grey.500', typography: { xs: 'body2', xl: 'subtitle2' } }}>
            {t('product_description')}
          </Typography>
          <Typography
            sx={{ typography: { xs: 'subtitle2', xl: 'subtitle1' } }}
            className={!isProductDetailsRoute ? 'productDescriptionHidden' : 'productDescription'}
          >
            {item?.description?.[i18n.language]}
          </Typography>
        </Grid>
        {!isProductDetailsRoute && (
          <Button
            sx={{ mb: 0, fontSize: { xs: '0.7rem', xl: '0.875rem' }, ml: '-0.5rem' }}
            onClick={onReadMoreClick}
          >
            {t('read_more')}
          </Button>
        )}
      </Grid>
      <ModalGallery
        isOpened={isGalleryModalVisible}
        closeModal={() => setGalleryModalVisible(false)}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        photos={item?.photos}
      />
    </Grid>
  );
};

export default ProductItem;
