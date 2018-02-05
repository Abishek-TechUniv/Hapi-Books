const rp = require('request-promise');
const Models = require('../models');

const resolveBooks = (values) => {
  const { books } = JSON.parse(values[0]);
  books.forEach((elem, index) => {
    elem.rating = JSON.parse(values[index + 1]).rating;
  });
  return books;
};

const getAllRatings = (request, reply) => {
  const ar = [];
  ar[0] = rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks');
  for (let id = 1; id < 13; id += 1) {
    ar[id] = rp(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${id}`);
  }
  Promise.all(ar).then(resolveBooks).then(data => reply({
    data,
    status: 200,
  }));
};


const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllRatings,
  },

  {
    method: 'PATCH',
    path: '/books/{id}/like',
    handler: (request, reply) => {
      Models.book.update(
        {
          dislike: false,
          like: true,
        },
        { where: { id: request.params.id } },
      ).then(() => reply({ status: 201 }));
    },
  },
  {
    method: 'PATCH',
    path: '/books/{id}/dislike',
    handler: (request, reply) => {
      Models.book.update(
        {
          like: false,
          dislike: true,
        },
        { where: { id: request.params.id } },
      ).then(() => reply({ status: 201 }));
    },
  },
];

module.exports = routes;
