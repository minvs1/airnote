import { promisify } from 'util'
import redis from 'redis'

const client = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  url: process.env.REDIS_URL,
})

client.on('connect', function() {
  console.log('Redis client connected')
})

client.on('error', function(err) {
  console.log('Something went wrong ' + err)
})

export default {
  set: promisify(client.set).bind(client),
  get: promisify(client.get).bind(client),
  del: promisify(client.del).bind(client),
}
