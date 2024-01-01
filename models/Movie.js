import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    adult: Boolean,
    backdrop_path: String,
    title: String,
    original_language: String,
    original_title: String,
    overview: String,
    poster_path: String,
    media_type: String,
    genre_ids: [String],
    popularity: Number,
    release_date: Date,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
});

const Movie = mongoose.model('Movie', movieSchema);

export default  Movie;
