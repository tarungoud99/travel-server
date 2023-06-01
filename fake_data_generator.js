const {faker} = require('@faker-js/faker');
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://saitarun:8e5i4A4HTabvtj5q@cluster0.ralyv0x.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function generateAndInsertFakeData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('hobbies');
    const collection = db.collection('travel');

    const records = [];
    const numRecords = 15;

    for (let i = 0; i < numRecords; i++) {
      const record = {
        _id: new ObjectId(),
        place: faker.location.city(),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        notes: faker.lorem.paragraph(),
        imageUrl: faker.image.url(),
      };

      records.push(record);
    }

    await collection.insertMany(records);
    console.log(`Inserted ${numRecords} records into the collection`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

generateAndInsertFakeData();
