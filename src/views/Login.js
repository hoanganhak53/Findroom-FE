import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { login } from '../slices/auth';
import { clearMessage } from '../slices/message';
import { loginSchema } from '../utilities/schema';

const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: '',
        password: '',
    };

    const handleLogin = async (formValue) => {
        const { username, password } = formValue;
        setLoading(true);

        await dispatch(login({ username, password }))
            .unwrap()
            .then(async () => {
                navigate('/profile/1');
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/profile/1" />;
    }

    return (
        <div className="col-md-12 login-form">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
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
                                disabled={loading}
                            >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-center">
                            <span>Chưa có tài khoản?&nbsp;</span>
                            <Link to={'/register'}>Đăng ký ngay</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
