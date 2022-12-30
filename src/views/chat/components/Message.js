import { Avatar } from '@mui/material';
import React from 'react';

export const Message = () => {
    return (
        <div
            className="pt-0 pb-3 pl-3"
            style={{ height: 'calc(100% - 105px)' }}
        >
            <div
                className="d-flex flex-column"
                style={{ overflowY: 'auto', height: 'calc(100%)' }}
            >
                <div style={{ flex: '1 1 auto' }}></div>
                {[1, 2, 3, 4, 6].map((e) => (
                    <div
                        className={`d-flex flex-start pb-3 pt-3 pr-3 ${
                            e % 2 === 0 ? 'flex-row-reverse' : ''
                        }`}
                        key={e}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <div className={`m-mess ${e % 2 === 0 ? 'owner' : ''}`}>
                            Hello aligomoto
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
