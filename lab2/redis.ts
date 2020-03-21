import {createHandyClient as createClient} from 'handy-redis'
import assert from 'assert'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  const client = createClient({
    host: 'localhost',
    port: 6379
  })

  await client.set('key1', 'value1')
  const value = await client.get('key1')
  assert.equal(value, 'value1')

  client.redis.on('message', (channel, message) => {
    console.log(`${channel}: ${message}`)
  })
  
  await client.subscribe('channel1')

  const publisherClient = createClient({
    host: 'localhost',
    port: 6379
  })

  for (let i = 0; i < 10; i++) {
    await publisherClient.publish('channel1', `Hello world #${i}`)
    await delay(200)
  }

  await client.unsubscribe()

  return 0
}

main().then(process.exit)
