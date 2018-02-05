const server = require('../src/server');

// DON"T KNOW HOW TO TEST AN AUTOMATED SAVE LEAVING THIS FOR NOW
// it('Should return 201 status code for sucessful POST request', (done) => {
//   const request = {
//     method: 'POST',
//     url: '/books/save',
//     payload: JSON.stringify({ Name: 'MahBook', Author: 'caje', rating: 2.3 }),
//   };
//   server.inject(request, (response) => {
//     expect(response.result.status).toBe(201);
//     done();
//   });
// });

it('Should return 201 status code for sucessful PATCH request to like or dislike', (done) => {
  const request = {
    method: 'PATCH',
    url: '/books/like/1',
  };
  server.inject(request, (response) => {
    expect(response.result.status).toBe(201);
    done();
  });
});
