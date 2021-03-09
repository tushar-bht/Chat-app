const { PubSub, withFilter } = require("graphql-subscriptions");
const { ApolloError } = require("apollo-server");

const pubsub = new PubSub();

const userModel = require("../models/users");
const messageModel = require("../models/messages");
const roomModel = require("../models/rooms");

const SOMETHING_CHANGED_TOPIC = "something_changed";

const output = [{ id: "1" }, { id: "2" }];

const resolver = {
  Query: {
    users: async () => {
      return await userModel.find();
    },
  },
  Mutation: {
    //.....................................................................................................................
    createUser: async (_, args) => {
      const { email, password, name } = args;
      try {
        const exestingUser = await userModel.findOne({ email: email });

        if (exestingUser) throw Error("User already Exists", 422);

        const newUser = new userModel({
          name,
          email,
          password,
        });
        await newUser.save();
        return newUser;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    //.....................................................................................................................
    loginUser: async (_, args) => {
      const { email, password } = args;

      try {
        const exestingUser = await userModel.findOne({ email: email });

        if (!exestingUser) throw new ApolloError("User does not Exist");
        else {
          if (exestingUser.password == password) return exestingUser;
          else throw new ApolloError("Wrong Credentials");
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    //.....................................................................................................................
    createRoom: async (_, args) => {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;

      try {
        const { creatorId } = args;
        const requiredUser = await userModel.findById(creatorId);

        if (!requiredUser) throw Error("User does not Exit", 422);
        const newRoom = new roomModel({
          roomCreator: requiredUser,
          createdAt: dateTime.toString(),
          messages: [],
          roomMembers: [requiredUser],
        });
        await newRoom.save();

        return newRoom;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    //.....................................................................................................................
    writeMessage: async (_, args) => {
      const { roomId, message, creatorId } = args;

      try {
        const requiredRoom = await roomModel
          .findById(roomId)
          .populate("roomCreator")
          .populate("roomMembers");
        const requiredUser = await userModel.findById(creatorId);

        if (!requiredRoom) throw Error("Room does not Exist");
        if (!requiredUser) throw Error("User does not Exist");
        const x = requiredRoom.roomMembers;
        const [roomMember] = x.filter((member) => {
          return member._id.toString() == requiredUser._id.toString();
        });
        if (!roomMember) throw Error("Member does not exist in Room", 422);

        const newMessage = new messageModel({
          creator: requiredUser,
          content: message,
          room: requiredRoom,
        });
        await newMessage.save();
        requiredRoom.messages.push(newMessage);
        await requiredRoom.save();

        pubsub.publish(SOMETHING_CHANGED_TOPIC, {
          getRoomMessages: newMessage,
        });
        return newMessage;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    //.....................................................................................................................
    joinRoom: async (_, args) => {
      const { userId, roomId } = args;
      try {
        const requiredUser = await userModel.findById(userId);
        const requiredRoom = await roomModel
          .findById(roomId)
          .populate("roomCreator")
          .populate("roomMembers");

        if (!requiredUser) throw Error("User does not Exist", 422);
        if (!requiredRoom) throw Error("Room does not Exist", 422);

        const [exestingUser] = requiredRoom.roomMembers.filter((user) => {
          return user.id == userId;
        });
        if (exestingUser && exestingUser.length != 0) {
          return requiredRoom;
        }

        requiredRoom.roomMembers.push(requiredUser);
        await requiredRoom.save();
        return requiredRoom;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    //.....................................................................................................................
    findRoom: async (_, args) => {
      const { roomId } = args;
      try {
        const requiredRoom = await roomModel
          .findById(roomId)
          .populate("roomCreator")
          .populate("roomMembers");

        if (!requiredRoom) throw Error("Room does not Exist", 422);
        return requiredRoom;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    //.....................................................................................................................
    leaveRoom: async (_, args) => {
      const { userId, roomId } = args;

      try {
        const requiredUser = await userModel.findById(userId);
        const requiredRoom = await roomModel.findById(roomId);

        if (!requiredUser && !requiredUser) throw Error("wrong request", 422);

        if (!requiredRoom.roomMembers && requiredRoom.roomMembers.length != 0)
          requiredRoom.roomMembers = requiredRoom.roomMembers.filter(
            (memberId) => {
              return memberId != userId;
            }
          );
        await requiredRoom.save();
        return "Leaving the room Successfull";
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    endRoom: async (_, args) => {
      const { userId, roomId } = args;

      try {
        const requiredRoom = await roomModel.findById(roomId);
        const requiredUser = await userModel.findById(userId);

        if (!requiredRoom) throw Error("Room does not exist", 422);
        if (!requiredUser) throw Error("User does not exist", 422);

        if (requiredRoom.roomCreator != requiredUser.id)
          throw Error("Invalid operations", 422);

        await messageModel.deleteMany({ room: roomId });

        await roomModel.findByIdAndDelete(roomId);

        return "room deleted Successfully";
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  //......................................................................................................................
  Subscription: {
    getRoomMessages: {
      subscribe: withFilter(
        () => {
          try {
            return pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC);
          } catch (err) {
            console.log(err);
          }
        },
        (payload, variables) => {
          return payload.getRoomMessages.room.id === variables.roomId;
        }
      ),
    },
  },
  //.....................................................................................................................
};

module.exports = resolver;
