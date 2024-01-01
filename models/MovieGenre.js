import mongoose from 'mongoose'

const movieGenreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
})

const MovieGenre = mongoose.model('MovieGenre',movieGenreSchema)

export default MovieGenre