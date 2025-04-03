import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{9}$/, 'Phone number must be 9 digits')
    .required('Phone number is required'),
  idFrontData: Yup.object().shape({
    name: Yup.string().required('ID Front name is required'),
    number: Yup.string().required('ID number is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    nationality: Yup.string().required('Nationality is required'),
    raw: Yup.string().required(),
  }),
  idBackData: Yup.object().shape({
    raw: Yup.string().required(),
    occupation: Yup.string().notRequired(),
    sponsorName: Yup.string().notRequired(),
    cardNumber: Yup.string().notRequired(),
  }),
  // Mark the file fields as nullable so null is an allowed initial value
  idFront: Yup.mixed().nullable().required('Front image is required'),
  idBack: Yup.mixed().nullable().required('Back image is required'),
});
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  idFrontData: {
    name: '',
    number: '',
    dateOfBirth: new Date(),
    nationality: '',
    raw: '',
  },
  idBackData: {
    raw: '',
    occupation: '',
    sponsorName: '',
    cardNumber: '',
  },
  idFront: '',
  idBack: '',
};

export const AuthSchema = {
  initialValues,
  resolver: yupResolver(schema),
};

export type AuthSchemaType = Yup.InferType<typeof schema>;
