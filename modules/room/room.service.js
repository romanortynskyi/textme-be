const Room = require('../../models/room.model');
const Message = require('../../models/message.model');
const RoomMember = require('../../models/room-member.model');
const ReadMessage = require('../../models/read-message.model');
const uploadService = require('../upload/upload.service');

class RoomService {
  async addRoom(input, image) {
    const { name, members } = input;

    const uploadedImage = await uploadService.uploadFile({
      file: image,
      directory: 'roomImages'
    });

    const room = await Room.create({
      name,
      image: uploadedImage,
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

    const rooms = roomMembers.map((roomMember) => ({
      ...roomMember._doc.room._doc,
    }));

    return rooms;
  }

  async getRoomById(id) {
    const room = await Room
      .findById(id)
      .exec();

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
