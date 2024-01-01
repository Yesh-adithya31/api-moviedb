import mongoose from 'mongoose'

const tvShowSchema = new mongoose.Schema({
    adult: Boolean,
    backdrop_path: String,
    name: String,
    original_language: String,
    original_name: String,
    overview: String,
    poster_path: String,
    media_type: String,
    genre_ids: [String],
    popularity: Number,
    first_air_date: Date,
    vote_average: Number,
    vote_count: Number,
    origin_country: [String],
});

const TVShow = mongoose.model('TVShow', tvShowSchema);

export default  TVShow;
