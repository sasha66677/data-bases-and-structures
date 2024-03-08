
import { client } from "./declarations";

async function readDocument() {
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("increment");

    const doc = await collection.findOne({ name: "counter" });
    console.log(doc.value);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

setInterval(readDocument, 1000);
