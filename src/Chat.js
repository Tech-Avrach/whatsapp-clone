import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import db from './firebase';
import {  collection, getDoc, doc, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    const { roomId } = useParams();
    const user = useSelector((state) => state.userData);


    useEffect(() => {
        const profileImageOptions = [
            "adventure",
            "avataaars",
            "big-ears",
            "big-smile",
            "bottts",
            "croodles",
            "micah",
            "open-peeps",
            "personas",
        ]

        const randomIndex = Math.floor(Math.random() * profileImageOptions.length);
        setSeed(profileImageOptions[randomIndex]);
    }, [roomName]);

    async function getChatDetails() {
        console.log(roomId)
        const docRef = doc(db, "rooms", roomId);
        const docSnap = await getDoc(docRef);
        const ChatData = docSnap.data();
        setRoomName(ChatData['name']);
    }

    async function getMessages() {
        const val = doc(db, "rooms", roomId);
        const collectionVal = collection(val, "messages");
        const querySnapshot = await getDocs(query(collectionVal, orderBy("timeStamp", "asc")));
        setMessages(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }


    useEffect(() => {
        if (roomId) {
            getMessages();
            getChatDetails();
        }
      }, [roomId]); // Re-run only when roomId changes

    const sendMessage = async (e) => {
        e.preventDefault();
        const currentTime = new Date();
        const val = doc(db, "rooms", roomId);
        const collectionVal = collection(val, "messages");
        addDoc(collectionVal,{
            message: input,
            name: user.displayName,
            timeStamp: currentTime.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
                timeZoneName: 'short'
            }),
        })

        // console.log({
        //         message: input,
        //         name: user.displayName,
        //         timeStamp: currentTime.toLocaleString('en-US', {
        //             year: 'numeric',
        //             month: 'long',
        //             day: 'numeric',
        //             hour: 'numeric',
        //             minute: 'numeric',
        //             second: 'numeric',
        //             hour12: true,
        //             timeZoneName: 'short'
        //         }),
        //     })

        setInput("");
        getMessages();
        getChatDetails();
    }

    // console.log(messages)



  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src={`https://api.dicebear.com/8.x/${seed}/svg`}/>
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {
                            messages[messages.length - 1]? (messages[messages.length - 1]).timeStamp.slice(0, -9):("No messages yet")
                        }
                </p>
            </div>
            <div className='chat_headerRight'>
                <Tooltip title="Comming Soon" placement="bottom">    
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Comming Soon" placement="bottom">    
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                </Tooltip>  
                <Tooltip title="Comming Soon" placement="bottom">    
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </Tooltip>      
            </div>
        </div>

        <div className='chat_body'>
        {messages.map(message => (
            <div key={message.id}>
                <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}<br/>
                    <span className="chat_timestemp">{message.timeStamp.slice(0, -9)}</span>
                </p>
            </div>
        ))}

        </div>

        <div className='chat_footer'>
            <Tooltip title="Comming Soon" placement="top">    
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
            </Tooltip>  
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
            <Tooltip title="Comming Soon" placement="top">    
                <IconButton>
                    <Mic />
                </IconButton>
            </Tooltip>  
        </div>
    </div>
  )
}

export default Chat