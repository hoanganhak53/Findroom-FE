import { Avatar } from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { listUserByEmail } from '../../../slices/auth';
import { firestore } from '../firebase/firebase';

export const SideBar = () => {
    const { chatId } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [userChats, setUserChats] = useState([]);
    const [keySearch, setKeySearch] = useState('');
    const [snapshot, setSnapshot] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = currentUser.email.split('.')[0];
        const queryUser = query(
            collection(firestore, 'conversation'),
            where(user, '==', true)
        );
        const unsub = onSnapshot(queryUser, (querySnapshot) => {
            setSnapshot(querySnapshot);
        });

        return () => {
            unsub();
        };
    }, [currentUser.email]);

    useEffect(() => {
        if (snapshot) {
            const body = [];
            const arr = [];
            snapshot.docs.forEach((e) => {
                body.push(getEmail(e));
                arr.push({
                    conversationId: e.id,
                    email: getEmail(e),
                });
            });

            dispatch(listUserByEmail(body))
                .unwrap()
                .then((res) => {
                    arr.forEach((e) => {
                        e.user = res?.data?.result.filter(
                            (u) => u.email === e.email
                        )[0];
                    });
                    setUserChats(arr);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snapshot]);

    const getEmail = (snap) => {
        return snap.data().full_email.filter((e) => e !== currentUser.email)[0];
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== keySearch) {
            setKeySearch(e.target.value);
        }
    };

    const getFilterUser = useCallback(() => {
        if (keySearch === '') {
            return userChats;
        }
        if (userChats.length) {
            return userChats.filter((e) => {
                const name = e?.user?.full_name
                    ? e.user.full_name
                    : e.user.username;
                return (
                    name.includes(keySearch) ||
                    e?.user?.phonenumber?.includes(keySearch) ||
                    e?.user?.email?.includes(keySearch)
                );
            });
        }
        return [];
    }, [keySearch, userChats]);

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
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <hr />
            </div>
            <div
                style={{
                    overflowY: 'auto',
                    height: 'calc(100% - 134px)',
                    overflowX: 'hidden',
                }}
            >
                {getFilterUser().map((e) => (
                    <div
                        className={`d-flex align-items-center pb-1 pt-1 m-chatbox pl-2 rounded pr-1
                        ${e.conversationId === chatId ? ' active' : ''}`}
                        onClick={() => navigate(`/chat/${e.conversationId}`)}
                        key={e.conversationId}
                    >
                        {e?.user.avatar_url ? (
                            <Avatar
                                sx={{ width: 56, height: 56 }}
                                src={e?.user.avatar_url}
                            />
                        ) : (
                            <Avatar sx={{ width: 56, height: 56 }} />
                        )}
                        <div
                            className="d-flex flex-column ml-3"
                            style={{ maxWidth: '68%' }}
                        >
                            <span className="overflow-hidden text-truncate">
                                {e?.user.full_name
                                    ? e?.user.full_name
                                    : e?.user.username}
                            </span>
                            <small className="text-muted overflow-hidden text-truncate">
                                dmm
                            </small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
