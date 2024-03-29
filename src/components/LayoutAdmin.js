import { Snackbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { hiddenMessage } from '../slices/message';
import SideBar from '../views/admin/SideBar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LayoutAdmin = () => {
    const open = useSelector((state) => state.message.isShow);
    const message = useSelector((state) => state.message.message);
    const severity = useSelector((state) => state.message.severity);
    const dispatch = useDispatch();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hiddenMessage(false));
    };

    return (
        <React.Fragment>
            <div className='admin'>
                <SideBar/>
                <div
                    className="container mt-3"
                >
                    <Outlet />
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};
export default LayoutAdmin;
