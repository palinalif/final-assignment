import "./style.css";
import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { socket } from "../../services/socketService";

const CreateChatroomPage = () => {
    const navigate = useNavigate();

    const [isLocked, setIsLocked] = useState(false);

    const createChatroom = (evt) => {
        console.log(socket);
        evt.preventDefault();
    
        const { title, locked, password } = evt.target.elements;
        if (!socket.connected) {
            socket.connect();
        }
        socket.emit('joinroom', { title, password: (locked ? password : undefined)}, (success, reason) => {
            if (success) {
              alert('The room was successfully created!');
              navigate(`/chatrooms/${title}`);
            }
            else {
                alert('Oops, something went wrong and we could not create your chatroom!');
                console.log(reason);
            }
          });
    }

    const handleLockedChange = (evt) => {
        setIsLocked(evt.target.checked);
    };

    return(
        <>
        <form onSubmit={createChatroom} className="createChatroomForm">
            <label htmlFor="title" >Title:</label>
            <input name="title" type="text" required/>
            <div>
            <label htmlFor="locked" >Locked? </label>
            <input type="checkbox" name="locked" checked={isLocked} onChange={handleLockedChange}/>
            </div>
            {
                isLocked ? <div className="passwordArea"><label for="password">Password:</label><input type="password" name="password" /></div> : <></>
            }
            
            <input type="submit" />
        </form>
        </>
    );
};


export default CreateChatroomPage;