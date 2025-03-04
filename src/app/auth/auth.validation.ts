import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    user: z.object({
name: z.string().nonempty("Name is required"),
email: z.string().email("Invalid email format"),
password:  z.string({invalid_type_error: "password must be string"}).nonempty("Title is required").min(6, { message: "password must be at least 6 characters" }).max(10, { message: "password must be maximum 10 characters" }). optional(),
role: z.enum(["admin", "user"], { message: "Role must be 'admin' or 'user'" }),
})
  })
});
const loginValidationSchema = z.object({
  body: z.object({
    user: z.object({
      email: z.string().email("Invalid email format"),
    password: z.string({ required_error: 'Password is required' }),
    })
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};