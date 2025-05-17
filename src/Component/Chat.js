import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "../Style/Chat.css";
import { PiUserCircleFill } from "react-icons/pi";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import music from "./../xat_notify.mp3";
import axios from "axios";
import { IoImages } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

const socket = io.connect("https://coorgtour.in");
const Chat = () => {
  const { state } = useLocation();
  const item = state;

  let user = JSON.parse(sessionStorage.getItem("user"));
  const [showD, setShowD] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const getjobById = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getJobsById/" + item?._id
      );
      if (res.status == 200) {
        setMessages(res.data?.success?.chat);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (item) {
      getjobById();
    }
  }, [item]);

  const handleSend = () => {
    try {
      if (inputText.trim() !== "") {
        let obj = {
          id: messages.length,
          text: inputText,
          fromUser: true,
          sendId: user?._id,
          recivedId: item?.userId,
          jobId: item?._id,
          data: moment().format("LLL"),
          name: user?.name,
        };
        setMessages([...messages, obj]);

        socket.emit("chat message", obj);
        setInputText("");
        socket.emit("receive message", item?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chatContainerRef = useRef(null);
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };
  useEffect(() => {
    if (item) {
      socket.emit("receive message", item?._id);
      scrollToBottom()
    }
  }, [item]);

  const audioPlayer = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  function playAudio() {
    if (!hasInteracted) {
      // If the user hasn't interacted, set the flag and return
      setHasInteracted(true);
      return;
    }
    // Otherwise, play the audio
    audioPlayer.current.play();
  }

  useEffect(() => {
    socket.on(`receive message client ${item._id}`, (message) => {
      if (message.length > 0) {
        const privMsg = message[message.length - 1];

        if (privMsg?.sendId !== user?._id) {
          playAudio();
          scrollToBottom()
        }
      }

      setMessages(message);
    });

    socket.on("connect_error", (error) => {
      console.log("Socket connection error:", error.message);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off(`receive message client ${item._id}`);
      socket.off("connect_error");
    };
  }, [socket, item, user]);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Function to handle image selection
  const handleImageSelect = () => {
    imageInputRef.current.click();
  };

  // Function to handle video selection
  const handleVideoSelect = () => {
    videoInputRef.current.click();
  };

  const handleImageUpload = async (image) => {
    const formData = new FormData();
    if (!image) return;
    formData.append("image", image);
    const config = {
      url: "/uploadChatImges",
      method: "post",
      baseURL: "http://192.168.1.29:8000",
      headers: { "content-type": "multipart/form-data" },
      data: formData,
    };
    let res = await axios(config);
    let images = "";
    if (res.status == 200) {
      images = res.data.success;
      let obj = {
        id: messages.length,
        image: images,
        text: inputText,
        fromUser: true,
        sendId: user?._id,
        recivedId: item?.userId,
        jobId: item?._id,
        data: moment().format("LLL"),
        name: user?.name,
      };
    
      setMessages([...messages, obj]);
      socket.emit("chat message", obj);

      socket.emit("receive message", item?._id);
      setShowD(!showD);
      setInputText("");
    }
  };

  const handleVideoUpload = async (videos) => {
    if (!videos) return;

    const formData = new FormData();

    formData.append("image", videos);
    const config = {
      url: "/uploadChatImges",
      method: "post",
      baseURL: "http://192.168.1.29:8000",
      headers: { "content-type": "multipart/form-data" },
      data: formData,
    };
    try {
      let res = await axios(config);
      let image = "";
      if (res.status == 200) {
        image = res.data.success;
        let obj = {
          id: messages.length,
          video: image,
          text: inputText,
          fromUser: true,
          sendId: user?._id,
          recivedId: item?.userId,
          jobId: item?._id,
          data: moment().format("LLL"),
          name: user?.name,
        };

        setMessages([...messages, obj]);
        socket.emit("chat message", obj);

        socket.emit("receive message", item?._id);
        setInputText("");
        setShowD(!showD);
      }
    } catch (error) {
      console.log("api error", error);
    }
  };

  return (
    <div className="containerChat">
      <audio ref={audioPlayer} src={music} />

      <div className="header">
        <PiUserCircleFill className="avatar" />
        {/* <img src="user-avatar.png" alt="User Avatar" className="avatar" /> */}
        <span className="userName">{item?.vendorName}</span>
      </div>
      <div className="messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div className="mb-4">
            <div
              key={index}
              className={message.sendId == user?._id ? "fromUser" : "fromOther"}
            >
              {message.image && (
                <a
                  href={`https://coorgtour.in/Chat/${message.image}`}
                  target="_blank"
                >
                  {" "}
                  <img
                    src={`https://coorgtour.in/Chat/${message.image}`}
                    className="MessageImage"
                  />
                </a>
              )}
              {message.video && (
                <a
                  href={`https://coorgtour.in/Chat/${message.video}`}
                  target="_blank"
                >
                  {" "}
                  <video controls className="MessageVideo">
                    <source
                      src={`https://coorgtour.in/Chat/${message.video}`}
                      type="video/mp4"
                    />
                  </video>
                </a>
              )}
              {message.text && (
                <p className="messageText mb-0">{message.text}</p>
              )}
            </div>
            <p className={message.sendId == user?._id ? "FromDate" : "ToDate"}>
              {message.data}
            </p>
          </div>
        ))}
      </div>
      <div className="inputContainer" style={{ position: "relative" }}>
        {showD ? (
          <div className="ArrowButton">
            <IoImages className="IconeStyle" onClick={handleImageSelect} />{" "}
            <br />
            <MdVideoLibrary
              className="IconeStyle"
              onClick={handleVideoSelect}
            />
          </div>
        ) : (
          <></>
        )}
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            handleImageUpload(e.target.files[0]);
          }}
        />
        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            const video = document.createElement("video");
            video.preload = "metadata";

            video.onloadedmetadata = function () {
              if (video.duration > 30) {
                alert("Video duration with in 30 seconds .");
                // Optionally, you can clear the selection
                e.target.value = "";
              } else {
                handleVideoUpload(file)
              }
            };

            video.src = URL.createObjectURL(file);
          }}
        />
        {showD ? (
          <FaRegArrowAltCircleDown
            className="CirclButton"
            onClick={() => setShowD(!showD)}
          />
        ) : (
          <FaRegArrowAltCircleUp
            className="CirclButton"
            onClick={() => setShowD(!showD)}
          />
        )}

        <textarea
          className="input"
          style={{ paddingLeft: "40px" }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
