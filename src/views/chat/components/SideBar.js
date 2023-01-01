import { Avatar } from '@mui/material';
import React from 'react';

export const SideBar = () => {
    return (
        <div
            className="col-4 pr-0"
            style={{ borderRight: '1px solid rgba(0,0,0,.1)' }}
        >
            <div className="mb-2 pr-3">
                <h4 className="mt-3 mb-3">Chat</h4>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm chủ nhà"
                    />
                </div>
                <hr />
            </div>
            <div style={{ overflowY: 'auto', height: 'calc(100% - 134px)' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13].map((e) => (
                    <div
                        className="d-flex align-items-center pb-1 pt-1 m-chatbox pl-2 rounded"
                        key={e}
                    >
                        <Avatar sx={{ width: 56, height: 56 }} />
                        <div className="d-flex flex-column ml-3">
                            <span>Hoang anh</span>
                            <small className="text-muted">dmm</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
