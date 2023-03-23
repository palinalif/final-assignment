import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import ChatroomListPage from '../pages/ChatroomList/ChatroomList';
import Start from '../pages/Start/Start';

const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<Start />} />
    <Route path="/chatrooms" element={<ChatroomListPage />} />
    </>
));

export default router;