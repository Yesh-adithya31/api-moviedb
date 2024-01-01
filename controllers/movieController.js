import asyncHandler from 'express-async-handler'
import Movie from '../models/Movie.js'
import MovieGenre from '../models/MovieGenre.js'
import TVGenre from '../models/TVGenre.js';
import TVShow from '../models/TVShow.js';

// @desc GET all
// @route GET /api/discover/all
// @access private
const getDiscoverData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;

  const startIndex = (page - 1) * limit;

  const movieTotal = await Movie.countDocuments();
  const totalPagesMovie = Math.ceil(movieTotal / limit);
  const movies = await Movie.find({}, { _id: 0, id: '$_id', adult: 1, backdrop_path: 1, title: 1, original_language: 1, original_title: 1, overview: 1, poster_path: 1, media_type: 1, genre_ids: 1, popularity: 1, release_date: 1, video: 1, vote_average: 1, vote_count: 1 }).skip(startIndex).limit(limit);

  const tvShowTotal = await TVShow.countDocuments();
  const totalPagesTVShow = Math.ceil(tvShowTotal / limit);
  const tvShows = await TVShow.find({}, { _id: 0, id: '$_id', adult: 1, backdrop_path: 1, name: 1, original_language: 1, original_name: 1, overview: 1, poster_path: 1, media_type: 1, genre_ids: 1, popularity: 1, first_air_date: 1, vote_average: 1, vote_count: 1, origin_country: 1 }).skip(startIndex).limit(limit);

  const mappedTVShows = tvShows.map(tvShow => ({
    adult: tvShow.adult,
    backdrop_path: tvShow.backdrop_path,
    title: tvShow.name,
    original_language: tvShow.original_language,
    original_title: tvShow.original_name,
    overview: tvShow.overview,
    poster_path: tvShow.poster_path,
    media_type: tvShow.media_type,
    genre_ids: tvShow.genre_ids,
    popularity: tvShow.popularity,
    release_date: tvShow.first_air_date,
    video: undefined, // Not present in TV shows
    vote_average: tvShow.vote_average,
    vote_count: tvShow.vote_count,
  }));

  const allMovies = [...movies, ...mappedTVShows];

  const sortedAllMovies = allMovies.sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB - dateA;
  });

  const results = {
    total_results: movieTotal + tvShowTotal,
    total_pages: totalPagesMovie + totalPagesTVShow,
    page,
    results: sortedAllMovies,
  };

  res.json(results);
});



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
  const genresMovies = await MovieGenre.find({}, { _id: 0, id: '$_id', name: 1 })

  if (genresMovies) {
    res.json({
      genres: genresMovies 
    })
  } else {
    res.status(404)
    throw new Error('Genres not Found')
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

  const totalTVShow = await TVShow.countDocuments();
  const totalPages = Math.ceil(totalTVShow / limit);

  const tvshows = await TVShow.find({}, { _id: 0, id: '$_id', adult: 1, backdrop_path: 1, name: 1, original_language: 1, original_name: 1, overview: 1, poster_path: 1, media_type: 1, genre_ids: 1, popularity: 1, first_air_date: 1, vote_average: 1, vote_count: 1, origin_country: 1}).skip(startIndex).limit(limit);

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
  const genresTV = await TVGenre.find({}, { _id: 0, id: '$_id', name: 1 })

  if (genresTV) {
    res.json({
      genres: genresTV 
    })
  } else {
    res.status(404)
    throw new Error('Genres not Found')
  }
})

// @desc GET TV Shows depend on genre
// @route GET /api/discover/tv/:genreId
// @access private
const getTVShowsByGenre = asyncHandler(async (req, res) => {
  const genreId = req.params.genreId;  // Assuming genre ID is passed as a route parameter
  const page = parseInt(req.query.page) || 1;
  const limit = 20;

  const startIndex = (page - 1) * limit;

  const totalTVShows = await TVShow.countDocuments({ genre_ids: genreId });
  const totalPages = Math.ceil(totalTVShows / limit);

  const tvShows = await TVShow.find({ genre_ids: genreId }, { _id: 0, id: '$_id', adult: 1, backdrop_path: 1, name: 1, original_language: 1, original_name: 1, overview: 1, poster_path: 1, media_type: 1, genre_ids: 1, popularity: 1, first_air_date: 1, vote_average: 1, vote_count: 1, origin_country: 1 })
    .skip(startIndex)
    .limit(limit);

  res.json({
    page,
    total_pages: totalPages,
    total_results: totalTVShows,
    results: tvShows,
  });
});

// @desc GET Movies depend on genre
// @route GET /api/discover/movie/:genreId
// @access private
const getMoviesByGenre = asyncHandler(async (req, res) => {
  const genreId = req.params.genreId;
  const page = parseInt(req.query.page) || 1;
  const limit = 20;

  const startIndex = (page - 1) * limit;

  const totalMovies = await Movie.countDocuments({ genre_ids: genreId });
  const totalPages = Math.ceil(totalMovies / limit);

  const movies = await Movie.find({ genre_ids: genreId }, { _id: 0, id: '$_id', adult: 1, backdrop_path: 1, title: 1, original_language: 1, original_title: 1, overview: 1, poster_path: 1, media_type: 1, genre_ids: 1, popularity: 1, release_date: 1, video: 1, vote_average: 1, vote_count: 1 })
    .skip(startIndex)
    .limit(limit);

  res.json({
    page,
    total_pages: totalPages,
    total_results: totalMovies,
    results: movies,
  });
});




export {
  getDiscoverData,
  getMovieGenres,
  getMovies,
  getTVGenres,
  getTVshows,
  getTVShowsByGenre,
  getMoviesByGenre
}
