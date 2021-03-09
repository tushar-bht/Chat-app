const { gql } = require("apollo-server-express");

module.exports = gql(`

type user{
    name:String!
    email:String!,
    id:ID!,
    password:String
}

type room{
    id:ID!,
    roomCreator:user!,
    createdAt:String!,
    messages:[message]!,
    roomMembers:[user!]!
}

type message{
    id:ID!,
    creator:user!,
    content:String!,
    room:room!
}

type Query {
  users: [user!]!

}


type Mutation{
    createUser(email:String!,password:String!,name:String!):user!,
    loginUser(email:String!,password:String!):user!,
    createRoom(creatorId:ID!):room!,
    writeMessage(roomId:ID!,message:String!,creatorId:ID!):message!
    leaveRoom(userId:ID!,roomId:ID!):String!,
    joinRoom(userId:ID!,roomId:ID!):room!,
    findRoom(roomId:ID!):room!,
    endRoom(userId:ID!,roomId:ID!):String!
}

type Subscription{
   getRoomMessages(roomId:ID!):message!
}



`);
