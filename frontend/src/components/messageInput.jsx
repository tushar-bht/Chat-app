import React, { useState, useContext, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "./context/auth-context";
import { useHistory } from "react-router-dom";
import Modal from "../components/portals/Modal";
import "./messageInput.css";
import { IoSend } from "react-icons/io5";

const WRITE_MESSAGE = gql`
  mutation($message: String!, $creatorId: ID!, $roomId: ID!) {
    writeMessage(creatorId: $creatorId, roomId: $roomId, message: $message) {
      content
      room {
        id
      }
    }
  }
`;

export default function MessageInput(props) {
  const [typedMessage, setTypedMessage] = useState("");
  const [error, setError] = useState(false);

  const [writeMessage] = useMutation(WRITE_MESSAGE, {
    update(_, res) {},
    onError(err) {
      setError(err);
    },
  });
  const context = useContext(AuthContext);
  const history = useHistory();

  const messageSubmitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (typedMessage) {
        writeMessage({
          variables: {
            message: typedMessage,
            creatorId: context.userId,
            roomId: props.roomId,
          },
        });
      }
      setTypedMessage("");
    },
    [props.roomId, typedMessage, writeMessage, context]
  );

  return (
    <React.Fragment>
      {" "}
      {error && (
        <Modal show={error} onCancel={() => setError(false)}>
          {error.message}
          <br />
          <button
            className="modal-button"
            onClick={() => {
              context.roomJoin("");
              history.push("/joinRoom");
            }}
          >
            Leave
          </button>
        </Modal>
      )}
      <form onSubmit={messageSubmitHandler} className="type-message">
        <input
          type="text"
          placeholder="how its going..."
          value={typedMessage}
          onChange={(event) => setTypedMessage(event.target.value)}
        />
        <IoSend className="send-icon" onClick={messageSubmitHandler} />
      </form>
    </React.Fragment>
  );
}
