const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Running')
})

const users = [
    { id: 1, name: "kamrul", email: 'kamrul@gmail.com' },
    { id: 2, name: "Sakil", email: 'sakil@gmail.com' },
    { id: 3, name: "rakib", email: 'rakib@gmail.com' },
    { id: 4, name: "sabbir", email: 'sabbir@gmail.com' },
]


const uri = "mongodb+srv://kamrul:oERGeAgX03wrZb8D@kamrul.iyiyxhu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        const user = { name: 'kamrul', email: 'kamrul@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async(req, res)=>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(error => { console.log(error) })


app.get('/users', (req, res) => {
    console.log(req);
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
        res.send(filtered);
    }
    else {
        res.send(users);
    }
})

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(req.body);
//     res.send(user);
// })

app.listen(port, () => {
    console.log(port);
})