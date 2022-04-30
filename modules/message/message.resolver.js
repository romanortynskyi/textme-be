const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');

const messageService = require('./message.service');
const RoomMember = require('../../models/room-member.model');

const messageQuery = {
  getMessagesByRoom: (_, args, context) => messageService.getMessagesByRoom(args.id, context.user),
};

const messageMutation = {
  addMessage: (_, args) => messageService.addMessage(args.input),
};

const messageSubscription = {
  messageCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('MESSAGE_CREATED'),
      async (payload, variables) => {
        const { userId } = variables;

        const roomMember = await RoomMember.findOne({
          userId,
          room: payload.messageCreated.room._id,
        }).exec();

        const isMine = payload.messageCreated.user._id.toString() === userId;

        const shouldSend = !!roomMember || !isMine;
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
