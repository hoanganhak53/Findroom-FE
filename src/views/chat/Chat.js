import React from 'react';
import { Input } from './components/Input';
import { Message } from './components/Message';
import { NavBar } from './components/NavBar';
import { SideBar } from './components/SideBar';

export const Chat = () => {
    return (
        <div className="d-flex m-chat" style={{ height: '84vh' }}>
            <SideBar />
            <div className="col-8 pl-0 pr-0">
                <NavBar></NavBar>
                <Message></Message>
                <Input />
            </div>
        </div>
    );
};
