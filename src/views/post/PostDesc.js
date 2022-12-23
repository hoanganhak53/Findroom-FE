import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

export const PostDesc = ({ desc }) => {
    return (
        <div className="m-card">
            <div className="d-flex">
                <InfoIcon color="primary" />
                <h5 className="font-weight-bold">&nbsp;Mô tả thêm</h5>
            </div>
            <div className="mt-2">{desc}</div>
        </div>
    );
};
