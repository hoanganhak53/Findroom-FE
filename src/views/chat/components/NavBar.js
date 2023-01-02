import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { listUserByEmail } from '../../../slices/auth';
import { useParams } from 'react-router-dom';

export const NavBar = ({ setAvt }) => {
    const { chatId } = useParams();

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [ownerEmail, setOwnerEmail] = useState({});

    useEffect(() => {
        const unsub = async () => {
            const docRef = doc(firestore, 'conversation', chatId);
            const docSnap = await getDoc(docRef);
            dispatch(
                listUserByEmail([
                    docSnap
                        .data()
                        .full_email.filter((e) => e !== currentUser.email)[0],
                ])
            )
                .unwrap()
                .then((res) => {
                    setOwnerEmail(res?.data.result[0]);
                    setAvt(res?.data.result[0].avatar_url);
                });
        };
        unsub();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    return (
        <div
            className="d-flex align-items-center justify-content-between pr-3 pl-3"
            style={{ height: '60px', borderBottom: '1px solid rgba(0,0,0,.1)' }}
        >
            <div className="d-flex align-items-center">
                {ownerEmail?.avatar_url ? (
                    <Avatar className="mr-2" src={ownerEmail?.avatar_url} />
                ) : (
                    <Avatar className="mr-2" />
                )}
                <span>
                    {ownerEmail?.full_name
                        ? ownerEmail?.full_name
                        : ownerEmail?.username}
                </span>
            </div>
            <div>
                <PersonRoundedIcon />
            </div>
        </div>
    );
};
