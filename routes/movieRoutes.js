import express from "express";
import {
  getMovieGenres,
  getMovies,
  getTVGenres,
  getTVshows,
} from "../controllers/movieController.js";

const router = express.Router();

// Movies Routes
router.route("/movie").get(getMovies);
router.route("/movie/genre").get(getMovieGenres);

// TV Shows Routes
router.route("/tv/genre").get(getTVGenres);
router.route("/tv").get(getTVshows);

export default router;
