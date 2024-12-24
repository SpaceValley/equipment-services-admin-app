import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PlusIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, deleteItem, editItem } from '../../../store/app';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { clearItems } from '../../../store/app/actions';
import ModalGallery from '../ModalGallery';
import { isVideo } from '../../../utils';
import './index.sass';

const categorySubcategoryValidationSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  nameEN: yup.string().min(3)
});

const productValidationSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  nameEN: yup.string().min(3),
  codeNumber: yup.string().matches(/[0-9]/, 'Не корректний номер').required(),
  description: yup.string().min(3),
  descriptionEN: yup.string().min(3)
});

const AddEditItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isProcessing } = useSelector(({ appReducer }) => appReducer);
  const [photos, setPhotos] = useState([]);
  const [photosToDelete, setPhotosToDelete] = useState([]);
  const [modalCurrentImageIndex, setModalCurrentImageIndex] = useState(null);
  const imagePickInput = useRef(null);

  const { type, item, _id, isEditing, subcategoryName, categoryName } = location?.state;
  const isProduct = useMemo(() => type === 'products', [type]);
  const isSubcategory = useMemo(() => type === 'subcategories', [type]);

  useLayoutEffect(() => document.activeElement.blur(), []);

  useEffect(() => {
    if (isEditing && isProduct) {
      setPhotos(item?.photos);
    }
  }, [isEditing, item, isProduct]);

  const onSubmit = () => handleEditCreate();

  const formik = useFormik({
    initialValues: {
      name: isEditing ? item?.name?.ua : '',
      nameEN: isEditing ? item?.name?.en : '',
      codeNumber: isEditing ? item?.codeNumber : '',
      description: isEditing ? item?.description?.ua : '',
      descriptionEN: isEditing ? item?.description?.en : ''
    },
    enableReinitialize: true,
    validationSchema: isProduct ? productValidationSchema : categorySubcategoryValidationSchema,
    onSubmit
  });

  const { touched, values, errors, setFieldTouched, setValues, handleSubmit } = formik;

  const setInputValue = useCallback(
    (key, value) => {
      setFieldTouched(key, false);
      setValues({
        ...values,
        [key]: value
      });
    },
    [formik]
  );

  const editItemData = {
    name: {
      ua: values?.name,
      en: values?.nameEN
    },
    ...(isProduct && {
      description: {
        ua: values?.description,
        en: values?.descriptionEN
      },
      photos,
      photosToDelete
    })
  };
  const createItemData = {
    name: {
      ua: values?.name,
      en: values?.nameEN
    },
    ...(isSubcategory && {
      categoryId: _id,
      categoryName: item?.name
    }),
    ...(isProduct && {
      categoryId: item?.categoryId,
      categoryName: item?.categoryName,
      subcategoryId: _id,
      subcategoryName: item?.name,
      codeNumber: values?.codeNumber,
      description: {
        ua: values?.description,
        en: values?.descriptionEN
      }
    })
  };

  const handleEditCreate = () => {
    const formData = new FormData();
    photos.forEach((e, i) => formData.append(i, e));
    if (isEditing) {
      formData.append('data', JSON.stringify(editItemData));
      dispatch(editItem({ type, _id: item?._id, data: formData }));
    } else {
      formData.append('data', JSON.stringify(createItemData));
      dispatch(createItem({ type, data: formData }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteItem({ type, _id: item?._id }));
  };

  const getTitleSecondPart = (e) => {
    switch (e) {
      case 'categories':
        return 'категорію';
      case 'subcategories':
        return `підкатегорію в ${item?.categoryName?.ua || categoryName}`;
      case 'products':
        return `одиницю товару в ${item?.subcategoryName?.ua || subcategoryName}`;
    }
  };

  const titleSecondPart = useMemo(() => getTitleSecondPart(type), [type]);

  const onImagePick = (e) => {
    e.preventDefault();

    let files = Object.values(e.target?.files);
    files?.forEach((file, i) => {
      setPhotos((prev) => [...prev, file]);
    });
  };

  const renderPhotosSection = () => {
    const onDelete = (e) => {
      const images = [...photos];
      const index = images.indexOf(e);
      const deletedItem = images.splice(index, 1)[0];
      setPhotos(images);
      if (deletedItem?.url) {
        setPhotosToDelete((prev) => [...prev, deletedItem]);
      }
    };

    const fileSource = (e) => e?.url || URL.createObjectURL(e);

    return (
      <Grid container direction="column" sx={{ m: 4 }}>
        <Typography variant="h5">Фото</Typography>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {photos?.map((e, idx) => (
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mr: 2,
                mt: 2,
                width: '10rem',
                wordBreak: 'break-all',
                cursor: 'pointer'
              }}
              key={e?.name || e?.fileName || idx}
            >
              <div className="previewImageWrap">
                {isVideo(e) ? (
                  <video controls className="previewVideo">
                    <source src={fileSource(e)} type={e?.mimetype || e?.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={fileSource(e)}
                    className="previewImage"
                    alt={e?.name || idx}
                    onClick={() => setModalCurrentImageIndex(idx)}
                  />
                )}
                <button className="deleteIcon" onClick={() => onDelete(e)}>
                  <CancelIcon />
                </button>
              </div>
              <Typography variant="body2" onClick={() => setModalCurrentImageIndex(idx)}>
                {e?.name || e?.fileName}
              </Typography>
            </Grid>
          ))}
          <ModalGallery
            isOpened={modalCurrentImageIndex !== null}
            closeModal={() => setModalCurrentImageIndex(null)}
            photos={[photos[modalCurrentImageIndex]]}
          />
        </Grid>
        <Button
          label="додати"
          startIcon={<PlusIcon />}
          onClick={() => imagePickInput.current.click()}
        />
        <input
          ref={imagePickInput}
          type="file"
          multiple
          accept="image/*,video/*"
          style={{ display: 'none' }}
          onChange={(e) => onImagePick(e)}
        />
      </Grid>
    );
  };

  const goBack = () => {
    if (isEditing) {
      if (location.pathname === '/admin/categories/edit') {
        dispatch(clearItems('subcategoriesById'));
      }
      if (location.pathname === '/admin/subcategories/edit') {
        dispatch(clearItems('productsById'));
      }
    }
    navigate(-1);
  };

  return (
    <Container>
      <Button startIcon={<ArrowBackIosIcon />} onClick={goBack} label="назад" variant='text' />
      <Grid container direction="row" alignItems="center" sx={{ mt: 4 }}>
        <Typography variant="h4">
          {isEditing ? `Редагувати` : `Створити`} {titleSecondPart}
        </Typography>
        {isProcessing && <CircularProgress color="inherit" sx={{ ml: 4 }} />}
      </Grid>
      {!isProcessing && (
        <form>
          <Grid container direction="column" sx={{ mt: 4, mb: 4 }}>
            <Input
              label="Назва"
              value={values.name}
              onChange={(e) => setInputValue('name', e.target.value)}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <Input
              label="Назва EN"
              value={values.nameEN}
              onChange={(e) => setInputValue('nameEN', e.target.value)}
              error={Boolean(touched.nameEN && errors.nameEN)}
              helperText={touched.nameEN && errors.nameEN}
            />
            {isProduct && (
              <>
                <Input
                  label="Номер"
                  value={values.codeNumber}
                  onChange={(e) => setInputValue('codeNumber', e.target.value)}
                  error={Boolean(touched.codeNumber && errors.codeNumber)}
                  helperText={touched.codeNumber && errors.codeNumber}
                />
                <Input
                  label="Опис"
                  value={values.description}
                  onChange={(e) => setInputValue('description', e.target.value)}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  multiline
                />
                <Input
                  label="Опис EN"
                  value={values.descriptionEN}
                  onChange={(e) => setInputValue('descriptionEN', e.target.value)}
                  error={Boolean(touched.descriptionEN && errors.descriptionEN)}
                  helperText={touched.descriptionEN && errors.descriptionEN}
                  multiline
                />
                {renderPhotosSection()}
              </>
            )}
          </Grid>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Button
              startIcon={isEditing ? <SaveIcon /> : <PlusIcon />}
              onClick={handleSubmit}
              label={isEditing ? 'зберегти' : 'створити'}
            />
            {isEditing && (
              <Button startIcon={<DeleteIcon />} onClick={handleDelete} label="Видалити" />
            )}
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default AddEditItem;
