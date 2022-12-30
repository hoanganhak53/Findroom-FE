import { IconButton } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const Input = () => {
    return (
        <div className="input-group d-flex align-items-center pl-2 pr-2">
            <IconButton
                className="mr-2"
                color="primary"
                aria-label="upload picture"
                component="label"
            >
                <input type="file" id="files" style={{ display: 'none' }} />
                <AddPhotoAlternateIcon color="primary" />
            </IconButton>
            <input
                type="text"
                class="form-control"
                placeholder="Nhắn gì tin cho họ"
            />
            <IconButton className="ml-2" color="primary">
                <SendIcon />
            </IconButton>
        </div>
    );
};
