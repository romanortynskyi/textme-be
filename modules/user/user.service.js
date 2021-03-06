const bcryptClient = require('../../client/bcrypt-client');
const jwtClient = require('../../client/jwt-client');
const RuleError = require('../../errors/rule.error');
const User = require('../../models/user.model');
const {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} = require('../../error-messages/user.messages');
const {
  STATUS_CODES: { BAD_REQUEST },
} = require('../../consts/status-codes');
const filterHelper = require('../../helpers/filter-helper');

class UserService {
  async signUp(input) {
    const { phoneNumber } = input;

    const candidate = await User.findOne({ phoneNumber }).exec();

    if (candidate) {
      throw new RuleError(USER_ALREADY_EXISTS, BAD_REQUEST);
    }

    const user = await User.create({
      ...input,
    });

    const token = jwtClient.generateAccessToken({ userId: user._id });
    user.token = token;

    return user;
  }

  async login(input) {
    const { phoneNumber } = input;

    const user = await User.findOne({ phoneNumber }).exec();

    if (!user) {
      throw new RuleError(WRONG_CREDENTIALS, BAD_REQUEST);
    }

    const token = jwtClient.generateAccessToken({ userId: user._id });
  
    return {
      ...user._doc,
      token,
    };
  }

  async getUserByToken(token) {
    const { userId } = jwtClient.decodeToken(token);

    if (!userId) {
      return null;
    }

    return this.getUserByFieldOrThrow('_id', userId);
  }

  async getUserByFieldOrThrow(key, param) {
    const checkedUser = await User.findOne({
      [key]: param,
    }).exec();

    if (!checkedUser) {
      throw new RuleError(USER_NOT_FOUND, BAD_REQUEST);
    }

    return checkedUser;
  }

  async getUserById(id) {
    return this.getUserByFieldOrThrow('_id', id);
  }

  async getAllUsers({ filter, pagination, sort }) {
    const filteredItems = filterHelper.filterItems(filter);
    const aggregatedItems = filterHelper.aggregateItems(
      filteredItems,
      pagination,
      sort
    );

    const [users] = await User.aggregate()
      .facet({
        items: aggregatedItems,
        calculations: [{ $match: filteredItems }, { $count: 'count' }],
      })
      .exec();
    let userCount;

    const {
      items,
      calculations: [calculations],
    } = users;

    if (calculations) {
      userCount = calculations.count;
    }

    return {
      items,
      count: userCount || 0,
    };
  }

  async getUserByPhoneNumber(phoneNumber) {
    const user = await this.getUserByFieldOrThrow('phoneNumber', phoneNumber);

    return user;
  }

  async updateUser(id, updatedUser) {
    const user = await this.getUserByFieldOrThrow('_id', id);

    return User.findByIdAndUpdate(id, updatedUser, { new: true });
  }
}

module.exports = new UserService();
