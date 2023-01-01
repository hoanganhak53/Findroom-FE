import { Avatar, Tooltip } from '@mui/material';
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { convertTimeMessage } from '../../../utilities/convert';
import { firestore } from '../firebase/firebase';

export const Message = ({ converstationId }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dummy = useRef();
    const [listMessage, setListMessage] = useState(null);
    const [snapShot, setSnapshot] = useState(null);
    const [limitMessage, setLimitMessage] = useState(20);

    useEffect(() => {
        const queryMessage = query(
            collection(firestore, 'messages'),
            where('converstationId', '==', converstationId),
            orderBy('created_at', 'desc'),
            limit(limitMessage)
        );
        const unsub = onSnapshot(queryMessage, (querySnapshot) => {
            setSnapshot(querySnapshot);
        });

        return () => {
            unsub();
        };
    }, [converstationId, limitMessage]);

    useEffect(() => {
        setListMessage(snapShot?.docs?.reverse());
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [snapShot]);

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [listMessage]);

    const loadMore = () => {
        setLimitMessage((prev) => prev + 20);
    };

    return (
        <div
            className="pt-0 pb-3 pl-3"
            style={{ height: 'calc(100% - 105px)' }}
        >
            <div
                className="d-flex flex-column"
                style={{ overflowY: 'auto', height: 'calc(100%)' }}
            >
                <div
                    style={{ flex: '1 1 auto' }}
                    className="d-flex justify-content-center"
                >
                    {snapShot?.size >= limitMessage && (
                        <span
                            onClick={loadMore}
                            style={{ cursor: 'pointer' }}
                            className="mt-2 fs-5 text-primary active-hover"
                        >
                            Tải thêm
                        </span>
                    )}
                </div>
                {listMessage &&
                    listMessage.map((e) => (
                        <div
                            className={`d-flex flex-start pb-3 pt-3 pr-3 ${
                                e.data()?.sender === currentUser.id
                                    ? 'flex-row-reverse'
                                    : ''
                            }`}
                            key={e.data().created_at.seconds}
                        >
                            {e.data()?.sender === currentUser.id ? (
                                <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    src={currentUser.avatar_url}
                                />
                            ) : (
                                <Avatar sx={{ width: 40, height: 40 }} />
                            )}
                            <Tooltip
                                title={convertTimeMessage(
                                    e.data()?.created_at?.seconds
                                )}
                                placement="left"
                            >
                                <div
                                    className={`m-mess ${
                                        e.data()?.sender === currentUser.id
                                            ? 'owner'
                                            : ''
                                    }`}
                                >
                                    {e.data()?.content}
                                </div>
                            </Tooltip>
                        </div>
                    ))}
                <div ref={dummy}></div>
            </div>
        </div>
    );
};
