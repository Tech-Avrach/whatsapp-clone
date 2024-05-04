import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'
import { collection, addDoc, doc, getDocs, query, orderBy, limit } from 'firebase/firestore'; // Import Firestore methods
import db from './firebase'; // Import firestore from your Firebase configuration
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState('');
    const[lastMessage, setLastMessage] = useState('No message yet');
    // const [count, setCount] = useState(0);
    // let fetchData = getData;
    // console.log(getData)

    const fetchLastMessage = async () => {

        if(id){
            const roomRef = doc(db, "rooms", id);
            const messagesRef = collection(roomRef, "messages");
            const querySnapshot = await getDocs(query(messagesRef, orderBy("timeStamp", "desc"), limit(1)));

            // console.log(querySnapshot)
            
            // Check if any documents exist in the query snapshot
            if (!querySnapshot.empty) {
                // Access the first document in the snapshot and log its data
                console.log("last seen", querySnapshot.docs[0]?.data());
                setLastMessage(querySnapshot.docs[0]?.data().message)
            } else {
                // Log a message if no documents were found
                console.log("No messages found");
            }
        }
        
    };

    useEffect(() => {
        fetchLastMessage()
    },[id])
    


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
    }, []);

    async function createChat() {
        const roomName = prompt("Please Enter Name for Chat");

        if (roomName) {
            const ref = collection(db, "rooms");
            try {
                await addDoc(ref, { name: roomName });
            } catch (err) {
                console.log(err);
            }
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://api.dicebear.com/8.x/${seed}/svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{lastMessage}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
    
}

export default SidebarChat;
