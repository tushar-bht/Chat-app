import React, { useCallback, useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../components/context/auth-context";
import { FaArrowAltCircleRight } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/portals/Modal";

import "./joinRoom.css";

const ROOM_DETAILS = gql`
  mutation($userId: ID!, $roomId: ID!) {
    joinRoom(userId: $userId, roomId: $roomId) {
      id
    }
  }
`;

const CREATE_ROOM = gql`
  mutation($userId: ID!) {
    createRoom(creatorId: $userId) {
      id
    }
  }
`;

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const context = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(false);

  const [joinRoomInfo, { data, loading }] = useMutation(ROOM_DETAILS, {
    update(_, res) {},
    onError(err) {
      setError(err);
    },
  });
  const [
    createdRoomInfo,
    { data: roomData, loading: roomLoading },
  ] = useMutation(CREATE_ROOM, {
    update(_, res) {},
    onError(err) {
      setError(err);
    },
  });

  const submitHandler = useCallback(() => {
    joinRoomInfo({
      variables: {
        userId: context.userId,
        roomId: roomId,
      },
    });
  }, [context, roomId, joinRoomInfo]);

  const createRoomClickHandler = useCallback(() => {
    createdRoomInfo({
      variables: {
        userId: context.userId,
      },
    });
  }, [context, createdRoomInfo]);

  if (data) {
    context.roomJoin(data.joinRoom.id);
    history.push("/chatRoom");
  }

  if (roomData) {
    context.roomJoin(roomData.createRoom.id);
    history.push("/chatRoom");
  }

  return (
    <React.Fragment>
      {(loading || roomLoading) && <LoadingSpinner asOverlay={true} />}
      {error && (
        <Modal show={error} onCancel={() => setError(false)}>
          {error.message}
        </Modal>
      )}
      <div className="join-room-page">
        <div className="block-1">
          <div className="block-2">
            <span>Join Room</span>

            <input
              type="text"
              value={roomId}
              onChange={(event) => {
                setRoomId(event.target.value);
              }}
              placeholder="XXXXXXXXXXXX"
            />

            <FaArrowAltCircleRight
              className="room-submit-icon"
              onClick={submitHandler}
            />
          </div>
          <span>OR</span>
          <button onClick={createRoomClickHandler}>Create Room</button>
        </div>
      </div>
    </React.Fragment>
  );
}
