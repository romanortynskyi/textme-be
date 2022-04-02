class FilterHelper {
  filterItems(args = {}) {
    const filter = {};
    const { roles, search } = args;

    if (roles?.length) {
      filter.role = { $in: roles };
    }

    if (search && search.trim()) {
      filter.$or = this.searchItems(search.trim());
    }
    return filter;
  }

  searchItems(searchString) {
    return [
      { firstName: { $regex: new RegExp(searchString, 'i') } },
      { lastName: { $regex: new RegExp(searchString, 'i') } },
      { email: { $regex: new RegExp(searchString, 'i') } },
      { phoneNumber: { $regex: new RegExp(searchString, 'i') } },
    ];
  }

  aggregateItems(filters = {}, pagination = {}, sort = {}) {
    const aggregationItems = [];

    if (Object.keys(sort).length) {
      aggregationItems.push({
        $sort: sort,
      });
    }

    aggregationItems.push({ $match: filters });

    if (pagination.skip && pagination.limit) {
      aggregationItems.push({
        $skip: pagination.skip,
      });
      aggregationItems.push({
        $limit: pagination.limit,
      });
    }

    return aggregationItems;
  }
}

module.exports = new FilterHelper();
