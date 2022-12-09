import * as Yup from "yup";

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
        .email("Vui lòng nhập gmail!")
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