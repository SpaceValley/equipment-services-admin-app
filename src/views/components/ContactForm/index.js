import React, { useCallback, useLayoutEffect } from 'react';
import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../Button';
import Input from '../Input';
import { closeSuccessMessage, sendContactRequest } from '../../../store/app/actions';
import { useTranslation } from 'react-i18next';
import './index.sass';

const ContactForm = ({ isProduct }) => {
  const dispatch = useDispatch();
  const { selectedItem, showSuccessMessage } = useSelector(({ appReducer }) => appReducer);
  const { t } = useTranslation();

  useLayoutEffect(() => document.activeElement.blur(), []);

  const closeMessage = () => dispatch(closeSuccessMessage());

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const productRequestValidationSchema = yup.object().shape({
    email: yup
      .string()
      .min(5, 'field_too_short_5')
      .email('invalid_email')
      .required('required_field'),
    name: yup.string().min(3, 'field_too_short_3'),
    phoneNumber: yup.string().min(5, 'field_too_short_5').matches(phoneRegExp, 'invalid_number'),
    message: yup.string().min(5, 'field_too_short_5')
  });

  const contactRequestValidationSchema = yup.object().shape({
    email: yup
      .string()
      .min(5, 'field_too_short_5')
      .email('invalid_email')
      .required('required_field'),
    name: yup.string().min(3, 'field_too_short_3'),
    phoneNumber: yup.string().min(5, 'field_too_short_5').matches(phoneRegExp, 'invalid_number'),
    message: yup.string().min(5, 'field_too_short_5').required('required_field')
  });

  const onSubmit = (values) => {
    dispatch(
      sendContactRequest({
        requesterData: {
          ...values
        },
        isProduct,
        ...(isProduct && {
          product: {
            name: selectedItem?.product?.name.ua,
            codeNumber: selectedItem?.product?.codeNumber,
            subcategoryId: selectedItem?.product?.subcategoryId,
            _id: selectedItem?.product?._id
          }
        })
      })
    );
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      message: ''
    },
    validationSchema: isProduct ? productRequestValidationSchema : contactRequestValidationSchema,
    onSubmit
  });

  const { touched, values, errors, setFieldTouched, setValues, resetForm, handleSubmit } = formik;

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

  return (
    <Grid container justifyContent="center" sx={{ mt: isProduct ? 0 : 10 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t(isProduct ? 'send_product_request' : 'send_contact_request')}
      </Typography>
      <form className="contactForm">
        <Input
          label={t('name')}
          value={values.name}
          onChange={(e) => setInputValue('name', e.target.value)}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && t(errors.name)}
        />
        <Input
          label="Email"
          value={values.email}
          onChange={(e) => setInputValue('email', e.target.value)}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && t(errors.email)}
        />
        <Input
          label={t('phone_number')}
          value={values.phoneNumber}
          onChange={(e) => setInputValue('phoneNumber', e.target.value)}
          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
          helperText={touched.phoneNumber && t(errors.phoneNumber)}
        />
        <Input
          label={t('message')}
          value={values.message}
          onChange={(e) => setInputValue('message', e.target.value)}
          multiline
          rows={10}
          error={Boolean(touched.message && errors.message)}
          helperText={touched.message && t(errors.message)}
        />
        <Button label={t('send')} onClick={handleSubmit} />
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={showSuccessMessage}
        autoHideDuration={5000}
        onClose={closeMessage}
      >
        <Alert onClose={closeMessage} severity="success" sx={{ width: '100%' }}>
          {t('request_sent_message')}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ContactForm;
