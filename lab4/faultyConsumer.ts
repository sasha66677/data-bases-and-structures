import { Connection, Message } from 'amqp-ts'

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let shouldHandleNext = false

async function handleMessage(message: Message): Promise<void> {
  if (shouldHandleNext) {
    shouldHandleNext = false
    await delay(3000)
  }

  const content = message.getContent()
  console.log('Получено сообщение', content)

  if (content.number && content.number > 10) {
    shouldHandleNext = true
    message.nack()
    console.log('Сообщение не подтверждено')
    return
  }
  await delay(2000)
  message.ack()
  console.log('Сообщение подтверждено')
}


async function main(): Promise<void> {
  try {
    const connection = new Connection('amqp://localhost')
    const queue = connection.declareQueue('queue', { durable: true })

    queue.prefetch(1)

    await connection.completeConfiguration()

    await queue.activateConsumer(handleMessage)
  } catch (error) {
    console.error('Произошла ошибка при запуске программы:', error)
  }
}

main()
