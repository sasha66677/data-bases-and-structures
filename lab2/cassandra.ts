import cassandra from 'cassandra-driver'

const KEYSPACE_NAME = 'test'

const normalizedTableSchema = {
  'users_normalized': [
    'id int PRIMARY KEY',
    'username text',
    'email text',
    'address text'
  ],
  'users_by_email_normalized': [
    'email text PRIMARY KEY',
    ''
  ]
}

async function createTables(client: cassandra.Client) {
  const schema = {...normalizedTableSchema}
  for (const tableName of Object.keys(schema)) {
    const table = await client.metadata.getTable(KEYSPACE_NAME, tableName)
    if (!table) {
      const columns = schema[tableName]
      await client.execute(`CREATE TABLE ${tableName} (${columns.join(',')})`)
    }
  }
}

async function main() {
  const authProvider = new cassandra.auth.PlainTextAuthProvider(
    'cassandra',
    'cassandra'
  )
  const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    authProvider,
    localDataCenter: 'datacenter1'
  })

  await client.connect()
  console.log('Connected successfully!')

  const keyspaces = client.metadata.keyspaces
  if (typeof keyspaces[KEYSPACE_NAME] === 'undefined') {
    await client.execute(
      `CREATE KEYSPACE ${KEYSPACE_NAME} 
        WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`
    )
  }

  await client.execute(`USE ${KEYSPACE_NAME}`)

  await createTables(client);

  process.exit(0)
}

main().catch(error => {
  console.error('Произошла ошибка!')
  console.error(error)
  process.exit(-1)
})
