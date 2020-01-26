const user = require("../model/user");

const findOne = condition => {
  return new Promise((resolve, reject) => {
    user
      .find(condition)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const findAll =()  => {
  return new Promise((resolve, reject) => {
    user
      .find({})
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const insertData = data => {
  return new Promise((resolve, reject) => {
    user
      .create(data)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const removeIds = ids => {
  return new Promise((resolve, reject) => {
    user
      .deleteMany({ _id: { $in: ids } })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const updateData = (id, data) => {
  return new Promise((resolve, reject) => {
    user
      .findByIdAndUpdate({ _id: id }, data, { new: true })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const insertMany = data => {
  return new Promise((resolve, reject) => {
    user
      .insertMany(data)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

module.exports = {
  findOne,
  insertData,
  removeIds,
  updateData,
  findAll,
  insertMany
};
