const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Write your code here
  const { movieId } = request.params;
  const movie = await service.read(movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, response) {
  response.json({data: response.locals.movie});
}

async function list(request, response) {
  // TODO: Add your code here.
  const is_showing = request.query.is_showing === 'true' || false;
  const movies = await service.list(is_showing);
  response.json({data: movies});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
