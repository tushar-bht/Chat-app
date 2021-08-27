import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import LoadingSpinner from "../components/LoadingSpinner";

import "./room.css";

const ROOM_DETAILS = gql`
  mutation($userId: ID!, $roomId: ID!) {
    joinRoom(userId: $userId, roomId: $roomId) {
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

export default function Room() {
  const [joinRoomInfo, { data, loading }] = useMutation(ROOM_DETAILS);

  useEffect(() => {
    joinRoomInfo({
      variables: {
        userId: "6030013dd627b932c098d37c",
        roomId: "6030e60b83ac8b139031d49d",
      },
    });
  }, [joinRoomInfo]);

  console.log(data);

  return <div>{loading && <LoadingSpinner asOverlay={true} />}</div>;
}
