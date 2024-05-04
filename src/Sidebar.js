import React, { useEffect, useState } from 'react'
import './Sidebar.css'

import Avatar from '@mui/material/Avatar';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Fade, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { addUserData } from './redux/userDataSlice';
import { useDispatch } from 'react-redux';



function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        // const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
        // //   setRooms(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        // });
      
        // return () => unsubscribe();

        getUserDataFromLocalStorage()
        getData();
        // console.log(rooms)
      }, []);

    const getUserDataFromLocalStorage = () =>{
        const userDataFromLocalStorage = localStorage.getItem('userData');

        if (userDataFromLocalStorage) {
            // Parse the JSON string to convert it back to an object
            const userData = JSON.parse(userDataFromLocalStorage);
        
            // Now userData contains the user data retrieved from local storage
            // You can use it as needed, such as setting it in the Redux store
            dispatch(addUserData(userData));
        } else {
            // Handle the case when user data doesn't exist in local storage
            console.log('User data not found in local storage');
        }
    }

    const getData = async () => {
        try {
            const dataList = [];
            const querySnapshot = await getDocs(collection(db, "rooms"));
            querySnapshot.forEach((doc) => {
                let d = doc.data();
                let showData = {
                    name: d['name'],
                    id: doc.id
                };
                dataList.push(showData);
            });
            setRooms(dataList);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Error fetching data:", error);
            // Handle error, e.g., display an error message to the user
        }
    };
    

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logOut = () => {
        localStorage.removeItem('userData');
        window.location.reload();
    }




    return (
        <div className="sidebar">
            <div className='sidebar_header'>
                <IconButton aria-controls="fade-menu" onClick={handleClick}>
                    <Avatar src={user?.photoURL} aria-controls="fade-menu"/>
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={logOut}>Log Out</MenuItem>
                </Menu>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <Tooltip title="Comming Soon" placement="bottom">
                                <DonutLarge/>
                        </Tooltip>
                    </IconButton>
                    <IconButton>
                        <Tooltip title="Comming Soon" placement="bottom">
                                <Chat/>
                        </Tooltip>
                    </IconButton>
                    <IconButton>
                        <Tooltip title="Comming Soon" placement="bottom">
                                <MoreVert/>
                        </Tooltip>
                    </IconButton>
                </div>
            </div>
            <div className='sidebar_search'>
            <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className='sidebar_chats'>
                <SidebarChat addNewChat />
                {rooms?.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar