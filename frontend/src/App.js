import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { AuthContext } from "./components/context/auth-context";
import Authentication from "./pages/authentication";
import ChatPage from "./pages/chatPage";
import JoinRoom from "./pages/joinRoom";
import { useAuth } from "./components/hook/auth-hook";

import "./App.css";

const link = new WebSocketLink({
  uri: "wss://chat-app02.herokuapp.com/graphql",
  options: {
    reconnect: true,
  },
});
//" ws://localhost:4000/graphql"
const client = new ApolloClient({
  link,
  uri: "https://chat-app02.herokuapp.com/graphql ",
  cache: new InMemoryCache(),
});

//" http://localhost:4000/graphql  "
function App() {
  const { userId, name, isLoggedIn, roomId, logIn, roomJoin } = useAuth();

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          userId: userId,
          isLoggedIn: isLoggedIn,
          name: name,
          roomId: roomId,
          roomJoin: roomJoin,
          logIn: logIn,
        }}
      >
        <div className="App">
          <Router>
            <Switch>
              {roomId && (
                <Route path="/chatRoom">
                  <ChatPage />
                </Route>
              )}
              {isLoggedIn && (
                <Route path="/joinRoom">
                  <JoinRoom />
                </Route>
              )}
              <Route path="/">
                <Authentication />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
