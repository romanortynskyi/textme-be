const Room = require('../../models/room.model');
const RoomMember = require('../../models/room-member.model');
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
};

module.exports = new RoomService();
