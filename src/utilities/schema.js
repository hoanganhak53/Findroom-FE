import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registerSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            "len",
            "Tên đăng nhập phải từ 4 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 4 &&
                val.toString().length <= 20
        )
        .required("Đây là trường bắt buộc!"),
    email: Yup.string()
        .email("Hãy nhập đúng email của bạn!")
        .required("Đây là trường bắt buộc!"),
    password: Yup.string()
        .test(
            "len",
            "Mật khẩu phải từ 8 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 8 &&
                val.toString().length <= 20
        )
        .required("Đây là trường bắt buộc!"),
});

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            "len",
            "Tên đăng nhập phải từ 4 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 4 &&
                val.toString().length <= 20
        )
        .required("Đây là trường bắt buộc!"),
    password: Yup.string()
        .test(
            "len",
            "Mật khẩu phải từ 8 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 8 &&
                val.toString().length <= 20
        )
        .required("Đây là trường bắt buộc!"),
});


export const editProfileSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            "len",
            "Tên đăng nhập phải từ 4 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 4 &&
                val.toString().length <= 20
        )
        .required("Đây là trường bắt buộc!"),

    email: Yup.string()
        .email("Hãy nhập đúng email của bạn!")
        .required("Đây là trường bắt buộc!"),

    full_name: Yup.string()
        .test(
            "len",
            "Họ và tên phải từ 4 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 4 &&
                val.toString().length <= 20
        )
        .required("Đây là trường bắt buộc!"),

    phone_number: Yup.string()
        .matches(phoneRegExp, 'Số điện thoại không khả dụng')
        .min(10, 'Số điện thoại phải tối thiểu 10 ký tự')
        .max(11, 'Số điện thoại phải tối đa 11 ký tự')
        .required("Đây là trường bắt buộc!")
});

export const passwordSchema = Yup.object({
    current_password: Yup.string()
        .test(
            "len",
            "Mật khẩu phải từ 8 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 8 &&
                val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
    new_password: Yup.string()
        .test(
            "len",
            "Mật khẩu phải từ 8 đến 20 ký tự",
            (val) =>
                val &&
                val.toString().length >= 8 &&
                val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Xác nhận mật khẩu không đúng')
        .required('Đây là trường bắt buộc!')
});