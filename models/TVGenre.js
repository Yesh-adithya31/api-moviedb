import mongoose from 'mongoose'

const tvGenreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
})

const TVGenre = mongoose.model('TVGenre',tvGenreSchema)

export default TVGenre