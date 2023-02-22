import * as Yup from 'yup';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const registerSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            'len',
            'Tên đăng nhập phải từ 8 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 8 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
    email: Yup.string()
        .email('Hãy nhập đúng email của bạn!')
        .required('Đây là trường bắt buộc!'),
    password: Yup.string()
        .test(
            'len',
            'Mật khẩu phải từ 8 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 8 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
});

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            'len',
            'Tên đăng nhập phải từ 8 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 8 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
    password: Yup.string()
        .test(
            'len',
            'Mật khẩu phải từ 8 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 8 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
});

export const editProfileSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            'len',
            'Tên đăng nhập phải từ 8 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 8 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),

    full_name: Yup.string()
        .test(
            'len',
            'Họ và tên phải từ 4 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 4 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),

    phone_number: Yup.string()
        .matches(phoneRegExp, 'Số điện thoại không khả dụng')
        .min(10, 'Số điện thoại phải tối thiểu 10 ký tự')
        .max(11, 'Số điện thoại phải tối đa 11 ký tự')
        .required('Đây là trường bắt buộc!'),
});

export const passwordSchema = Yup.object({
    current_password: Yup.string()
        .test(
            'len',
            'Mật khẩu phải từ 8 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 8 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
    new_password: Yup.string()
        .test(
            'len',
            'Mật khẩu phải từ 8 đến 20 ký tự',
            (val) =>
                val && val.toString().length >= 8 && val.toString().length <= 20
        )
        .required('Đây là trường bắt buộc!'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Xác nhận mật khẩu không đúng')
        .required('Đây là trường bắt buộc!'),
});

export const createPostSchema = Yup.object({
    room_name: Yup.string()
        .test(
            'len',
            'Tên phòng phải dưới 256 ký tự',
            (val) => val && val.toString().length < 256
        )
        .required('Tên phòng là trường bắt buộc!'),
    room_price: Yup.number()
        .typeError('Giá phòng phải là số!')
        .required('Giá phòng là trường bắt buộc!'),
    deposit: Yup.number()
        .typeError('Đặt cọc phải là số!')
        .required('Đặt cọc là trường bắt buộc!'),
    room_area: Yup.number()
        .typeError('Diện tích phải là số!')
        .required('Diện tích là trường bắt buộc!'),
    exact_room_address: Yup.string().required('Địa chỉ là trường bắt buộc!'),
    electric_price: Yup.number()
        .typeError('Tiền điện phải là số!')
        .required('Tiền điện là trường bắt buộc!'),
    water_price: Yup.number()
        .typeError('Tiền nước phải là số!')
        .required('Tiền nước là trường bắt buộc!'),
    upload_room_images: Yup.array()
        .min(4, 'Phải tải lên tối thiểu 4 ảnh')
        .required('Ảnh phòng là trường bắt buộc!'),
});
