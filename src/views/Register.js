import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { register } from '../slices/auth';
import { clearMessage, showMessage } from '../slices/message';
import { Link } from 'react-router-dom';
import { registerSchema } from '../utilities/schema';

const Register = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const handleRegister = (formValue) => {
        const { username, email, password } = formValue;

        dispatch(register({ username, email, password }))
            .unwrap()
            .then(() => {
                dispatch(
                    showMessage({
                        message: 'Tạo tài khoản thành công',
                        severity: 'success',
                    })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="col-md-12 signup-form">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field
                                    name="username"
                                    type="text"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div className="form-group d-flex align-items-center justify-content-center">
                                <span>Bạn đã có tài khoản?&nbsp;</span>
                                <Link to={'/login'}>Đăng nhập ngay</Link>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;
