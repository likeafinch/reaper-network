import { useCallback } from 'react';
import { default as useFormHandlers } from './useFormHandlers';
import fetch from 'unfetch';

const sendContactFormToEmail = (data, reset) =>
  fetch('/api/mailer', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(() => reset());

export const formatEmail = ({ name, email, message }) => ({
  name,
  email,
  message,
  date: Date.now(),
  html: `
						  <div>From: ${name}</div>
						  <div>Email: <a href="mailto:${email}">${email}</a></div>
						  <div>Date: ${Date.now()}</div>
						  <div>Message: ${message}</div>
						  `,
});

export const CONTACT_FORM_VALIDATORS = {
  name: (value) => value && /[A-Za-z0-9]+/.test(value),
  email: (email) => email && /\S+@\S+\.\S+/.test(email),
  message: () => true,
};

export const INITIAL_CONTACT_FORM = { name: '', email: '', message: '' };
export const INITIAL_CONTACT_FORM_ERRORS = {
  name: false,
  email: false,
  message: false,
};
const useContactForm = () => {
  const {
    form: contactForm,
    handleReset: handleContactFormReset,
    submittable,
    ...contactFormProps
  } = useFormHandlers(
    INITIAL_CONTACT_FORM,
    INITIAL_CONTACT_FORM_ERRORS,
    CONTACT_FORM_VALIDATORS
  );

  const handleContactFormSubmit = useCallback(
    () =>
      submittable &&
      sendContactFormToEmail(formatEmail(contactForm), handleContactFormReset),
    [contactForm, submittable, handleContactFormReset]
  );

  return {
    submittable,
    handleReset: handleContactFormReset,
    handleSubmit: handleContactFormSubmit,
    ...contactForm,
    ...contactFormProps,
  };
};

export default useContactForm;
