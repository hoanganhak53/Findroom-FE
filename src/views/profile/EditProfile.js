import { Avatar, Badge } from '@mui/material'
import React, { useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { IconButton } from '@mui/material';
import { editProfileSchema, passwordSchema } from '../../utilities/schema';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, editUserProfile } from '../../slices/auth';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { showMessage } from '../../slices/message';

export const EditProfile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialValues = {
        username: currentUser.username,
        email: currentUser.email,
        full_name: currentUser?.full_name ? currentUser?.full_name : '',
        phone_number: currentUser.phone_number,
        avatar_url: currentUser.avatar_url,
    };

    const initialPassValues = {
        current_password: '',
        new_password: '',
        passwordConfirmation: '',
    };

    const handleChangePassword = ({ current_password, new_password }) => {
        dispatch(changePassword({
            current_password,
            new_password,
            id: currentUser.id
        }))
            .unwrap()
            .then(() => {
                setShow(false);
                dispatch(showMessage({
                    message: 'Đổi mật khẩu thành công',
                    severity: 'success'
                }));
            })
            .catch(() => {
                setShow(false);
            });
    }

    const handleEdit = (body) => {
        setLoading(true);
        dispatch(editUserProfile(body))
            .unwrap()
            .then(() => {
                dispatch(showMessage({
                    message: 'Thay đổi thông tin thành công',
                    severity: 'success'
                }));
                navigate("/profile");
            })
            .catch(() => {
                setLoading(false);
            });
    }

    return (
        <div className='m-card'>
            <h4 className="font-weight-bold">Thông tin cá nhân</h4>
            <hr />
            <div className='d-flex'>
                <div className='col-3 mt-3 d-flex flex-column align-items-center'>
                    <div>
                        <Badge overlap="circular"
                            badgeContent={
                                <IconButton aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" />
                                    <CameraAltIcon fontSize='small' />
                                </IconButton>
                            }
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Avatar sx={{ width: 100, height: 100 }}>M</Avatar>
                        </Badge>
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary mt-3" onClick={handleShow}>
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
                <div className='col-6'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={editProfileSchema}
                        onSubmit={handleEdit}
                    >
                        {({
                            isValid,
                            dirty,
                        }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="full_name">Họ và tên</label>
                                    <Field name="full_name" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="full_name"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone_number">Số điện thoại</label>
                                    <Field name="phone_number" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="phone_number"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={!isValid || !dirty}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Đổi thông tin</span>
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialPassValues}
                        validationSchema={passwordSchema}
                        onSubmit={handleChangePassword}
                    >
                        {({
                            isValid,
                            dirty
                        }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="current_password">Mật khẩu cũ</label>
                                    <Field name="current_password" type="password" className="form-control" />
                                    <ErrorMessage
                                        name="current_password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new_password">Mật khẩu mới</label>
                                    <Field name="new_password" type="password" className="form-control" />
                                    <ErrorMessage
                                        name="new_password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordConfirmation">Xác nhận mật khẩu</label>
                                    <Field name="passwordConfirmation" type="password" className="form-control" />
                                    <ErrorMessage
                                        name="passwordConfirmation"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className='d-flex justify-content-end align-items-center border-top pt-3'>
                                    <button type='button' className="btn btn-danger" onClick={handleClose}>
                                        Hủy
                                    </button>
                                    <button type='submit' className="btn btn-primary ml-3" disabled={!isValid || !dirty}>
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    )
}
