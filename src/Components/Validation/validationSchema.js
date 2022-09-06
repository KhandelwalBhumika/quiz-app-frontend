import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    registrationId: yup.number().max(6).required()
})