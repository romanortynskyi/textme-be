const Room = require('../../models/room.model');
const Message = require('../../models/message.model');
const RoomMember = require('../../models/room-member.model');
const ReadMessage = require('../../models/read-message.model');
const User = require('../../models/user.model');
const uploadService = require('../upload/upload.service');

class RoomService {
  async addRoom(input, image) {
    const { name, members, isPrivate } = input;

    let uploadedImage;

    if (image) {
      uploadedImage = await uploadService.uploadFile({
        file: image,
        directory: 'roomImages'
      });  
    }
  
    const room = await Room.create({
      name,
      image: uploadedImage,
      isPrivate,
    });

    const membersToInsert = members.map((member) => ({
      userId: member,
      room: room._id,
    }));

    await RoomMember.insertMany(membersToInsert);

    return room;
  }

  async getRoomsByUser(id) {
    const roomMembers = await RoomMember
      .find({ userId: id })
      .populate('room')
      .exec();

    const rooms = roomMembers.map(async (roomMember) => {
      if (roomMember.room.isPrivate) {
        const roomId = roomMember.room._id;
        const otherMember = await RoomMember
          .findOne({
            room: roomId,
            userId: {
              $ne: id,
            },
          })
          .exec();
        const them = await User.findById(otherMember.userId).exec();
        
        const name = `${them.firstName} ${them.lastName}`;
        
        return {
          ...roomMember._doc.room._doc,
          name,
        }
      }

      return {
        ...roomMember._doc.room._doc,
      };
    });

    return rooms;
  }

  async getRoomById(id, myId) {
    const room = await Room
      .findById(id)
      .exec();

    if (room.isPrivate) {
      const otherMember = await RoomMember.findOne({
        room: id,
        userId: {
          $ne: myId,
        },
      })
      .exec();

      const them = await User.findById(otherMember.userId).exec();
      const name = `${them.firstName} ${them.lastName}`;

      return {
        ...room._doc,
        name,
      };
    }

    return room;
  }

  async getUnreadMessagesCountByRoom(id, userId) {
    const filters = {
      user: userId,
      room: id,
    };

    const lastReadMessage = await ReadMessage
      .findOne(filters, {}, { createdAt: -1 })
      .exec();
    
    if(lastReadMessage) {
      const unreadMessagesFilters = {
        room: id,
        user: {
          $ne: userId,
        },
        createdAt: {
          $gt: lastReadMessage.createdAt,
        },
      };
      
      const unreadMessages = await Message
        .find(unreadMessagesFilters)
        .exec();

      return unreadMessages.length;
    }

    else {
      const filters = {
        room: id,
        user: {
          $ne: userId,  
        },
      };

      const unreadMessagesCount = await Message
        .find(filters)
        .countDocuments();

      return unreadMessagesCount;
    }
  }
};

module.exports = new RoomService();
