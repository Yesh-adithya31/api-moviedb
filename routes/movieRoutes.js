import express from "express";
import {
  getDiscoverData,
  getMovieGenres,
  getMovies,
  getMoviesByGenre,
  getTVGenres,
  getTVShowsByGenre,
  getTVshows,
} from "../controllers/movieController.js";

const router = express.Router();
// All myflixs
router.route("/all").get(getDiscoverData);

// Movies Routes
router.route("/movie").get(getMovies);
router.route("/movie/genre").get(getMovieGenres);
router.route("/movie/:genreId").get(getMoviesByGenre);

// TV Shows Routes
router.route("/tv").get(getTVshows);
router.route("/tv/genre").get(getTVGenres);
router.route("/tv/:genreId").get(getTVShowsByGenre);

export default router;
