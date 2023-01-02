import React, { useState } from 'react';
import { Input } from './components/Input';
import { Message } from './components/Message';
import { NavBar } from './components/NavBar';
import { SideBar } from './components/SideBar';
import { useParams } from 'react-router-dom';

export const Chat = () => {
    const { chatId } = useParams();
    const [targetAvt, setTargetAvt] = useState('');

    return (
        <div className="d-flex m-chat" style={{ height: '84vh' }}>
            <SideBar />
            <div className="col-8 pl-0 pr-0">
                <NavBar setAvt={setTargetAvt} />
                <Message converstationId={chatId} targetAvt={targetAvt} />
                <Input converstationId={chatId} />
            </div>
        </div>
    );
};
