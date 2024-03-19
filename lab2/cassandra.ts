const { Client, auth } = require('cassandra-driver')
const { v4: uuid } = require('uuid')

const KEYSPACE_NAME = 'test'

const newTableSchema = {
  'products': [
    'id UUID PRIMARY KEY',
    'name text',
    'price decimal'
  ],
  'orders': [
    'order_id UUID PRIMARY KEY',
    'product_id UUID',
    'quantity int',
    'total_price decimal',
    'customer_id UUID'
  ]
}

async function createTables(client: any) {
  const schema: { [key: string]: string[] } = { ...newTableSchema }
  for (const tableName of Object.keys(schema)) {
    const table = await client.metadata.getTable(KEYSPACE_NAME, tableName)
    if (!table) {
      const columns = schema[tableName as string]; // Явное приведение типа
      await client.execute(`CREATE TABLE ${tableName} (${columns.join(',')})`)
    }
  }
}

async function main() {
  const authProvider = new auth.PlainTextAuthProvider('cassandra', 'cassandra')
  const client = new Client({
    contactPoints: ['0.0.0.0'],
    authProvider,
    localDataCenter: 'datacenter1'
  })

  await client.connect()
  console.log('Connected successfully!')

  const keyspaces = client.metadata.keyspaces
  if (!keyspaces[KEYSPACE_NAME]) {
    await client.execute(
      `CREATE KEYSPACE ${KEYSPACE_NAME}
  	WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`
    )
  }

  await client.execute(`USE ${KEYSPACE_NAME}`)

  await createTables(client)

  // Генерация нового UUID (universal unique ID)
  const newId = uuid()

  // Вставка новой записи
  await client.execute(`
	INSERT INTO products (id, name, price)
	VALUES (?, ?, ?)`,
    [newId, 'Product A', 10.99]
  )

  console.log('Data inserted successfully!')

  // Проверка, что данные успешно вставлены
  const result = await client.execute(`
	SELECT * FROM products
	WHERE name = ? ALLOW FILTERING`,
    ['Product A']
  )


  if (result.rowLength > 0) {
    console.log('Data retrieval successful:', result.rows)
  } else {
    console.log('Data retrieval failed!')
  }

  process.exit(0)
}

main().catch(error => {
  console.error('Произошла ошибка!')
  console.error(error)
  process.exit(-1)
})



