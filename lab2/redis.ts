const Redis = require('ioredis');
const redis = new Redis();

async function demonstrateRedisDataTypes() {
  try {
    console.log('Демонстрация работы с различными типами данных в Redis');

    await redis.set('stringKey', 'stringValue');
    console.log('Строка:', await redis.get('stringKey'));

    await redis.rpush('listKey', 'listValue1', 'listValue2');
    console.log('Связный список:', await redis.lrange('listKey', 0, -1));

    await redis.sadd('setKey', 'setValue1', 'setValue2');
    console.log('Множество:', await redis.smembers('setKey'));

    await redis.zadd('sortedSetKey', 1, 'sortedSetValue1', 2, 'sortedSetValue2');
    console.log('Сортированное множество:', await redis.zrange('sortedSetKey', 0, -1));

    await redis.hset('hashKey', 'field1', 'value1', 'field2', 'value2');
    console.log('Хэш:', await redis.hgetall('hashKey'));

    await redis.pfadd('hyperLogLogKey', 'value1', 'value2', 'value3', 'value2');
    console.log('Приблизительное количество уникальных элементов в HyperLogLog:', await redis.pfcount('hyperLogLogKey'));
  } catch (error) {
    console.error('Произошла ошибка:', error);
  } finally {
    await redis.quit();
  }
}

demonstrateRedisDataTypes();
