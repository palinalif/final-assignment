import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ChatroomListPage from "../pages/ChatroomList/ChatroomList";
import Start from "../pages/Start/Start";
import CreateChatroomPage from "../pages/CreateChatroomPage/CreateChatroomPage";
import Chatroom from "../pages/Chatroom/Chatroom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Start />} />
      <Route path="/chatrooms" element={<ChatroomListPage />} />
      <Route path="/chatrooms/new" element={<CreateChatroomPage />} />
      <Route path="/chatrooms/:chatroomName" element={<Chatroom />} />
    </>
  )
);

export default router;
