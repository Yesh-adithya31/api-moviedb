import asyncHandler from 'express-async-handler'
import Movie from '../models/Movie.js'
import MovieGenre from '../models/MovieGenre.js'
import TVGenre from '../models/TVGenre.js';

// @desc GET moviess
// @route GET /api/discover/movie
// @access private
const getMovies = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from query params or default to 1
  const limit = 20; // Limit of results per page

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalMovies = await Movie.countDocuments();
  const totalPages = Math.ceil(totalMovies / limit);

  const movies = await Movie.find({}, { _id: 0, id: '$_id', adult: 1, backdrop_path: 1, title: 1, original_language: 1, original_title: 1, overview: 1, poster_path: 1, media_type: 1, genre_ids: 1, popularity: 1, release_date: 1, video: 1, vote_average: 1, vote_count: 1}).skip(startIndex).limit(limit);

  if (movies) {
    const results = {
      total_results: totalMovies,
      total_pages: totalPages,
      page: page,
      results: movies,
    };
    res.json(results);
  } else {
    res.status(404);
    throw new Error('Movies not found');
  }
})

// @desc GET movies genres
// @route GET /api/discover/movies/genre
// @access private
const getMovieGenres = asyncHandler(async (req, res) => {
  const genres = await MovieGenre.find({}, { _id: 0, id: '$_id', name: 1 })

  if (genres) {
    res.json({
      genres: genres 
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

// @desc GET TV Shows
// @route GET /api/discover/tv
// @access private
const getTVshows = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from query params or default to 1
  const limit = 20; // Limit of results per page

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalTVShow = await Movie.countDocuments();
  const totalPages = Math.ceil(totalTVShow / limit);

  const tvshows = await Movie.find({}, { _id: 0, id: '$_id', adult: 1, backdrop_path: 1, name: 1, original_language: 1, original_name: 1, overview: 1, poster_path: 1, media_type: 1, genre_ids: 1, popularity: 1, first_air_date: 1, vote_average: 1, vote_count: 1, origin_country: 1}).skip(startIndex).limit(limit);

  if (tvshows) {
    const results = {
      total_results: totalTVShow,
      total_pages: totalPages,
      page: page,
      results: tvshows,
    };
    res.json(results);
  } else {
    res.status(404);
    throw new Error('Movies not found');
  }
})

// @desc GET movies genres
// @route GET /api/discover/tv/genre
// @access private
const getTVGenres = asyncHandler(async (req, res) => {
  const genres = await TVGenre.find({}, { _id: 0, id: '$_id', name: 1 })

  if (genres) {
    res.json({
      genres: genres 
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})



export {
  getMovieGenres,
  getMovies,
  getTVGenres,
  getTVshows
}
