import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables')
    throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

interface Cached {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: Cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        console.log('Using cached database connection')
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        }

        console.log('Connecting to MongoDB...')
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            console.log('MongoDB connected successfully')
            return mongoose
        }).catch((error) => {
            console.error('MongoDB connection error:', error)
            cached.promise = null
            throw error
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        console.error('Failed to establish database connection:', e)
        throw e
    }

    return cached.conn
}

export default dbConnect 