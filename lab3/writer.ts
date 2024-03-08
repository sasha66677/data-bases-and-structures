import { client } from "./declarations";

async function updateDocument() {
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("increment");

    let doc = await collection.findOneAndUpdate({ name: "counter" }, { $inc: { value: 1 } }, { upsert: true, returnDocument: "after" });
    if (!doc.value) {
      await collection.insertOne({ name: "counter", value: 0 });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

setInterval(updateDocument, 2000);
