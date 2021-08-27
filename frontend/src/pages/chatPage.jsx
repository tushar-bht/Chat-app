import React, { useState, useContext, useEffect } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";

import { AuthContext } from "../components/context/auth-context";
import Profile from "../components/profile";
import MessageInput from "../components/messageInput";
import MessageBox from "../components/messageBox";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import { HiOutlineClipboardCopy } from "react-icons/hi";

import "./chatPage.css";
import Modal from "../components/portals/Modal";
import { useHistory } from "react-router-dom";

const LEAVE_ROOM = gql`
  mutation($roomId: ID!, $userId: ID!) {
    leaveRoom(userId: $userId, roomId: $roomId)
  }
`;

const ROOM_DETAILS = gql`
  mutation($roomId: ID!) {
    findRoom(roomId: $roomId) {
      id
      roomCreator {
        id
        name
      }
      roomMembers {
        name
        id
      }
    }
  }
`;

const ROOM_MESSAGES = gql`
  subscription($roomId: ID!) {
    getRoomMessages(roomId: $roomId) {
      content
      creator {
        name
        id
      }
      id
    }
  }
`;
let roomMessages = [];
export default function ChatPage() {
  const [error, setError] = useState(null);
  const history = useHistory();

  const [joinRoomInfo, { data, loading }] = useMutation(ROOM_DETAILS, {
    update(_, res) {},
    onError(err) {
      console.log(err);
      console.log(err.message);
      setError(err);
    },
  });

  const [leaveRoom] = useMutation(LEAVE_ROOM, {
    update(_, res) {},
    onError(err) {
      setError(err);
    },
  });

  const context = useContext(AuthContext);

  useEffect(() => {
    joinRoomInfo({
      variables: {
        roomId: context.roomId,
      },
    });
  }, [joinRoomInfo, context]);

  const { data: newMessage } = useSubscription(ROOM_MESSAGES, {
    variables: { roomId: context.roomId },
  });
  if (newMessage) {
    roomMessages.push(newMessage.getRoomMessages);
  }

  return (
    <React.Fragment>
      {loading && <LoadingSpinner asOverlay={true} />}
      {error && (
        <Modal show={error} onCancel={() => setError(false)}>
          {error.message}
        </Modal>
      )}
      {!error && (
        <div className="chat-page">
          <div className="room-box">
            <h1>Scoup</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="room-creator">
                <div>
                  <span>Creator - </span>
                  <span
                    style={{
                      fontWeight: "800",
                      fontSize: "x-large",
                      textDecoration: "underline",
                    }}
                  >
                    {data && data.findRoom.roomCreator.name}
                  </span>
                </div>
                <br />
                <div>
                  <span>Room Id - </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "larger",
                      overflowWrap: "break-word",
                      textDecoration: "underline",
                    }}
                  >
                    {" "}
                    {data && data.findRoom.id}
                  </span>
                  <br />
                  <br />

                  <HiOutlineClipboardCopy
                    className="copy-icon "
                    onClick={() => {
                      navigator.clipboard.writeText(data.findRoom.id);
                    }}
                  ></HiOutlineClipboardCopy>
                </div>
                <div>
                  <button
                    className="leave-room"
                    onClick={() => {
                      leaveRoom({
                        variables: {
                          userId: context.userId,
                          roomId: context.roomId,
                        },
                      });
                      context.roomJoin("");

                      roomMessages = [];
                      history.push("/joinRoom");
                    }}
                  >
                    Leave
                  </button>
                </div>
              </div>
              <div className="room-members">
                {data &&
                  data.findRoom.roomMembers.map((member) => (
                    <Profile
                      name={member.name}
                      key={member.id}
                      id={member.id}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="message-box">
            <Header className="responsive-header">
              <div className="room-creator">
                <div>
                  <span>Creator - </span>
                  <span
                    style={{
                      fontWeight: "800",
                      fontSize: "x-large",
                      textDecoration: "underline",
                    }}
                  >
                    {data && data.findRoom.roomCreator.name}
                  </span>
                </div>
                <br />
                <div>
                  <span>Room Id - </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "larger",
                      overflowWrap: "break-word",
                      textDecoration: "underline",
                    }}
                  >
                    {" "}
                    {data && data.findRoom.id}
                  </span>
                </div>
                <div>
                  <br />
                  <button
                    className="leave-room"
                    onClick={() => {
                      roomMessages = [];
                      leaveRoom({
                        variables: {
                          userId: context.userId,
                          roomId: context.roomId,
                        },
                      });
                      history.push("/joinRoom");
                    }}
                  >
                    Leave
                  </button>
                </div>
              </div>
            </Header>
            <div className="messages-space">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {roomMessages.map((message) => (
                  <MessageBox message={message} key={message.id} />
                ))}
              </div>
            </div>
            {data && <MessageInput roomId={data.findRoom.id} />}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
