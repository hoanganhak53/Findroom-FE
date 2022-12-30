import { Avatar } from '@mui/material';
import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const NavBar = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-between pr-3 pl-3"
            style={{ height: '60px', borderBottom: '1px solid rgba(0,0,0,.1)' }}
        >
            <div className="d-flex align-items-center">
                <Avatar className="mr-2" />
                <span>Sanji</span>
            </div>
            <div>
                <PersonRoundedIcon />
            </div>
        </div>
    );
};
