import { Badge, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'transparent',
    },
}));

export const Input = ({ converstationId }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [content, setContent] = useState('');
    const imgRef = useRef();
    const [img, setImg] = useState(null);

    const storage = getStorage();

    const sendMessage = async () => {
        const docData = {
            content: content,
            converstationId: converstationId,
            created_at: Timestamp.fromDate(new Date()),
            sender: currentUser.id,
        };
        setImg(null);
        setContent('');
        if (content.length) {
            await addDoc(collection(firestore, 'messages'), docData);
        }
        if (img) {
            docData.content = '';
            docData.img_url = img;
            await addDoc(collection(firestore, 'messages'), docData);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && (content.length || img)) {
            sendMessage();
        }
    };

    const readImg = async (input) => {
        if (input.target.files && input.target.files[0]) {
            const time = Date.now().toString();
            const storageRef = ref(
                storage,
                `${time + input.target.files[0].name}`
            );
            await uploadBytesResumable(storageRef, input.target.files[0]).then(
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        console.log(downloadURL);
                        setImg(downloadURL);
                    });
                }
            );
        }
        input.target.value = '';
    };

    return (
        <div>
            <div className="input-group d-flex align-items-center pl-2 pr-2">
                <div className="mr-2 position-relative">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={readImg}
                            ref={imgRef}
                        />
                        <AddPhotoAlternateIcon />
                    </IconButton>
                    {img && (
                        <StyledBadge
                            badgeContent={
                                <IconButton
                                    size="small"
                                    onClick={() => setImg(null)}
                                >
                                    <CloseIcon fontSize="15" color="error" />
                                </IconButton>
                            }
                            color="error"
                            className="position-absolute"
                            sx={{
                                bottom: '45px',
                                left: '10px',
                            }}
                        >
                            <img
                                src={img}
                                alt="upload-img"
                                style={{
                                    maxWidth: '125px',
                                }}
                                className="shadow"
                            />
                        </StyledBadge>
                    )}
                </div>

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
                    disabled={!content.length && !img}
                >
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
};
