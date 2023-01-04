import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Profile from './views/profile/Profile';
import BoardAdmin from './views/BoardAdmin';
import NotFound from './views/NotFound';
import Layout from './components/Layout';
import { ROLES } from './constants/roles';
import RequireAuth from './components/RequireAuth';
import { PostDetail } from './views/post/PostDetail';
import CreatePost from './views/CreatePost';
import { PersonalPost } from './views/profile/PersonalPost';
import { FavPost } from './views/profile/FavPost';
import { EditProfile } from './views/profile/EditProfile';
import { SearchPost } from './views/SearchPost';
import { Chat } from './views/chat/Chat';
import LayoutAdmin from './components/LayoutAdmin';
import Post from './views/admin/Post';
import Users from './views/admin/Users';
import Reports from './views/admin/Reports';
import Receipts from './views/admin/Receipts';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Navigate to="home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="room/:roomId" element={<PostDetail />} />
                    <Route path="search/:page" element={<SearchPost />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[ROLES.user, ROLES.admin]}
                                navigate="404"
                            />
                        }
                    >
                        <Route path="profile" element={<Profile />}>
                            <Route path="" element={<PersonalPost />} />
                            <Route path="favorite" element={<FavPost />} />
                        </Route>
                        <Route path="edit-profile" element={<EditProfile />} />
                        <Route path="create-post" element={<CreatePost />} />
                        <Route
                            path="edit-post/:roomId"
                            element={<CreatePost />}
                        />
                        <Route path="chat/:chatId" element={<Chat />} />
                    </Route>
                </Route>
                <Route path="/admin" element={<LayoutAdmin />}>
                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[ROLES.user]}
                                navigate="404"
                            />
                        }
                    >
                        <Route path="posts" element={<Post />} />
                        <Route path="users" element={<Users />} />
                        <Route path="receipts" element={<Reports />} />
                        <Route path="reports" element={<Receipts />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
