import { Avatar } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Pusher from "pusher-js";
import { apiURL } from "../../constants";

const Chat = () => {
  const { userDetails } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const [message, setMessage] = useState<any>();
  const [id, setId] = useState<any>();
  const [value, setValue] = useState<any>();
  const [messages, setMessages] = useState<any>([]);

  const getConvo = async () => {
    await axios
      .get(
        apiURL + "/conversation",

        {
          params: { email: userInfo.email },
          withCredentials: true,
        }
      )
      .then((res: any) => {
        setId(
          res?.data.created ? res?.data.created?._id : res?.data.recieved?._id
        );
        getMessages(
          res?.data.created ? res?.data.created?._id : res?.data.recieved?._id
        );
      });
  };

  // axios.post(
  //   "http://localhost:8571/conversation",
  //   {message: message,
  //   conversation:res?.created._id
  //   },
  //   {
  //     withCredentials: true,
  //   }
  // )
  const sendMessage = async () => {
    const result = await axios.post(
      apiURL + "/message",
      { message: message, conversationId: id },
      {
        withCredentials: true,
      }
    );
    setValue("");
  };
  const getMessages = async (idd: any) => {
    await axios
      .get(apiURL + "/message", {
        params: { id: idd },
        withCredentials: true,
      })
      .then((res: any) => {
        setMessages(res.data.message);
      });
  };
  useEffect(() => {
    setId(null);
    setValue("");
    userInfo && getConvo();
  }, [userInfo]);
  useEffect(() => {
    message && sendMessage();
  }, [message]);

  useEffect(() => {
    var pusher = new Pusher("859742c6058b5cd78497", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (data: any) => {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-headerInfo">
          <h3>{userInfo?.name}</h3>
          <p>Last seen at</p>
        </div>
      </div>
      <div className="chat-body">
        <br />
        <br />
        {messages?.map((item: any) => (
          <p
            className={`chat-message ${
              item?.sender === userDetails.id && "chat-reciever"
            }`}
          >
            {item.message}
            <span className="chat-timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            setMessage(e.target.message.value);
            message && sendMessage();
          }}
        >
          <input
            type="text"
            name="message"
            placeholder="input text"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          ></input>
          <button type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Chat;
