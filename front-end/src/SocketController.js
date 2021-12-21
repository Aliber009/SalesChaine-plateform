import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { positionsActions } from './store';
import { useHistory } from 'react-router-dom';




const SocketController = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  

  //socket in state 
  const [socket, setSocket] = useState(null);
  
    //const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    useEffect(() => {
        const socket = io(`http://localhost:5000`);
        setSocket(socket);
        //data received on socket
        socket.on("tst",data=>{
          dispatch(positionsActions.update(data))
        })
        return () => socket.close();
      }, []);

    

    /* socket.onclose = () => {
      setTimeout(() => connectSocket(), 60 * 1000);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.devices) {
        dispatch(devicesActions.update(data.devices));
      }
      if (data.positions) {
        
        dispatch(positionsActions.update(data.positions));
      }
     
    };
  }

  useEffectAsync(async () => {
    const response = await fetch('/api/server');
    if (response.ok) {
      dispatch(sessionActions.updateServer(await response.json()));
    }
  }, []);

  useEffectAsync(async () => {
    if (authenticated) {
      const response = await fetch('/api/devices');
      if (response.ok) {
        dispatch(devicesActions.refresh(await response.json()));
      }
      connectSocket();
    } else {
      const response = await fetch('/api/session');
      if (response.ok) {
        dispatch(sessionActions.updateUser(await response.json()));
      } else {
        history.push('/login');
      }
    }
  }, [authenticated]); */

  return null;
}

export default connect()(SocketController);