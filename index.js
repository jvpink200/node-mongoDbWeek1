const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, {useUnifiedTopology: true},(err,client)=> {

    assert.strictEqual(err, null); // checks that there is no errors and continues if there are no errors

    console.log('Connected to mongoDB server correctly');

    const db = client.db(dbname);

    db.dropCollection('campsites',(err, result)=> {
        assert.strictEqual(err,null);
        console.log('Dropped Collection', result); //deleted data document

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops); //ops is short for operations

            collection.find().toArray((err, docs)=> {
                assert.strictEqual(err, null);
                console.log('Found Documents', docs); //finds all the documents

                client.close();
            }); 
        });
    });
});