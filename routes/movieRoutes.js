import express from "express";
import {
  getDiscoverData,
  getMovieGenres,
  getMovies,
  getTVGenres,
  getTVshows,
} from "../controllers/movieController.js";

const router = express.Router();
// All myflixs
router.route("/all").get(getDiscoverData);

// Movies Routes
router.route("/movie").get(getMovies);
router.route("/movie/genre").get(getMovieGenres);

// TV Shows Routes
router.route("/tv").get(getTVshows);
router.route("/tv/genre").get(getTVGenres);

export default router;
