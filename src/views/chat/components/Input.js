import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useSelector } from 'react-redux';

export const Input = ({ converstationId }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [content, setContent] = useState('');

    const sendMessage = async () => {
        const docData = {
            content: content,
            converstationId: converstationId,
            created_at: Timestamp.fromDate(new Date()),
            sender: currentUser.id,
        };
        setContent('');
        const add = await addDoc(collection(firestore, 'messages'), docData);
        console.log(add.id);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="input-group d-flex align-items-center pl-2 pr-2">
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Nhắn gì tin cho họ"
                onKeyDown={handleKeyDown}
            />
            <IconButton
                className="ml-2"
                color="primary"
                onClick={sendMessage}
                disabled={!content.length}
            >
                <SendIcon />
            </IconButton>
        </div>
    );
};
