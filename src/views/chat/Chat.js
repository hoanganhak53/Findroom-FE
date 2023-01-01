import React from 'react';
import { Input } from './components/Input';
import { Message } from './components/Message';
import { NavBar } from './components/NavBar';
import { SideBar } from './components/SideBar';
import { useParams } from 'react-router-dom';

export const Chat = () => {
    const { chatId } = useParams();

    return (
        <div className="d-flex m-chat" style={{ height: '84vh' }}>
            <SideBar />
            <div className="col-8 pl-0 pr-0">
                <NavBar />
                <Message converstationId={chatId} />
                <Input converstationId={chatId} />
            </div>
        </div>
    );
};
