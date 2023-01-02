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

function linkify(text) {
    /* eslint-disable no-useless-escape */
    const urlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
}

export const Message = ({ converstationId, targetAvt }) => {
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
                            key={e.id}
                        >
                            {e.data()?.sender === currentUser.id ? (
                                <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    src={currentUser.avatar_url}
                                />
                            ) : (
                                <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    src={targetAvt}
                                />
                            )}
                            <Tooltip
                                title={convertTimeMessage(
                                    e.data()?.created_at?.seconds
                                )}
                                placement="left"
                            >
                                {e.data()?.img_url ? (
                                    <img
                                        src={e.data()?.img_url}
                                        alt="attach_img"
                                        className={`m-mess-img ${
                                            e.data()?.sender === currentUser.id
                                                ? 'owner'
                                                : ''
                                        }`}
                                    />
                                ) : (
                                    <div
                                        className={`m-mess ${
                                            e.data()?.sender === currentUser.id
                                                ? 'owner'
                                                : ''
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: linkify(e.data()?.content),
                                        }}
                                    />
                                )}
                            </Tooltip>
                        </div>
                    ))}
                <div ref={dummy}></div>
            </div>
        </div>
    );
};
