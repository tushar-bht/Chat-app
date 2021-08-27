import React, { useEffect, useState, useCallback } from "react";

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const logIn = useCallback((userId, name) => {
    setUserId(userId);
    setIsLoggedIn(true);
    setName(name);
  }, []);

  const roomJoin = useCallback((roomId) => {
    setRoomId(roomId);
  }, []);

  return { userId, name, isLoggedIn, roomId, logIn, roomJoin };
};
