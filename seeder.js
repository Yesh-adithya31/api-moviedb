import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import MovieGenre from './models/MovieGenre.js'
import moviegenre from './data/genre.js'
import Movie from './models/Movie.js'
import movies from './data/movie.js'
import TVGenre from './models/TVGenre.js'
import tvgenre from './data/tvgenre.js'
import TVShow from './models/TVShow.js'
import tvshows from './data/tvshows.js'


dotenv.config()

connectDB()


const importNewData = async () => {
    try {
        await TVShow.deleteMany()
        await TVShow.insertMany(tvshows)

        console.log('Data Imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        // await MovieGenre.deleteMany()

        console.log('Data Destroyed'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importNewData()
}