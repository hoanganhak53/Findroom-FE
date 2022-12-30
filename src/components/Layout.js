import { Snackbar } from '@mui/material';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../views/Footer';
import { NavBar } from '../views/NavBar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { hiddenMessage } from '../slices/message';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Layout = () => {
    const { pathname } = useLocation();
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
            <NavBar />
            <div
                className="container mt-3 pl-5 pr-5"
                style={{ minHeight: '41vh' }}
            >
                <Outlet />
            </div>
            {!pathname.includes('chat') && <Footer />}
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
export default Layout;
