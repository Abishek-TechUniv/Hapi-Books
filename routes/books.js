const rp = require('request-promise');
const Models = require('../models');

const groupedData = (data) => {
  const group = {};
  data.forEach((elem) => {
    if (group[elem.Author] === undefined) { group[elem.Author] = [elem]; }
    group[elem.Author].push(elem);
  });
  return group;
};

const resolveBooks = (values) => {
  const { books } = JSON.parse(values[0]);
  books.forEach((elem, index) => {
    elem.rating = JSON.parse(values[index + 1]).rating;
  });
  return books;
};

const promiseArray = () => {
  const promArr = [];
  promArr[0] = rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks');
  for (let id = 1; id < 13; id += 1) {
    promArr[id] = rp(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${id}`);
  }
  return promArr;
};

const getAllRatings = (request, reply) => {
  const arr = promiseArray();
  Promise.all(arr).then(resolveBooks).then(data => reply({
    data: groupedData(data),
    status: 200,
  }));
};

const saveValues = (request, reply) => {
  const arr = promiseArray();
  Promise.all(arr).then(resolveBooks).then((data) => {
    data.forEach(element => Models.Book.create({
      Author: element.Author,
      Name: element.Name,
      rating: element.rating,
    }));
  }).then(reply({
    status: 201,
  }));
};

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllRatings,
  },
  {
    method: 'POST',
    path: '/books/save',
    handler: saveValues,
  },
  {
    method: 'PATCH',
    path: '/books/like/{id}',
    handler: (request, reply) => {
      Models.Book.update(
        {
          disliked: false,
          liked: true,
        },
        { where: { id: request.params.id } },
      ).then(() => reply({ status: 201 }));
    },
  },
  {
    method: 'PATCH',
    path: '/books/dislike/{id}',
    handler: (request, reply) => {
      Models.Book.update(
        {
          liked: false,
          disliked: true,
        },
        { where: { id: request.params.id } },
      ).then(() => reply({ status: 201 }));
    },
  },
];

module.exports = routes;
