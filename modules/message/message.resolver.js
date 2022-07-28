const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');

const messageService = require('./message.service');
const RoomMember = require('../../models/room-member.model');

const messageQuery = {
  getMessagesByRoom: (_, args, context) => messageService.getMessagesByRoom(args.id, context.user),
};

const messageMutation = {
  addTextMessage: (_, args) => messageService.addTextMessage(args.input),
  addGifMessage: (_, args) => messageService.addGifMessage(args.input),
};

const messageSubscription = {
  messageCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('MESSAGE_CREATED'),
      async (payload, variables) => {
        const { userId } = variables;
        const { room } = payload.messageCreated;

        const roomMember = await RoomMember.findOne({
          userId,
          room: room._id,
        }).exec();

        const isMine = payload.messageCreated.user._id.toString() === userId;
        const shouldSend = !!roomMember && !isMine;

        return shouldSend;
      },
    ),
  },
};

module.exports = {
  messageQuery,
  messageMutation,
  messageSubscription,
};
