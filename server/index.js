require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@anonto96.bxfwp.mongodb.net/?retryWrites=true&w=majority&appName=Anonto96`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db('PairPromiseDb');
    const bioDataCollection = database.collection('bioData');
    const userCollection = database.collection('users')
    const successStoriesCollection = database.collection('successStories')
    const favoritesCollection = database.collection('favorites')
    const checkoutCollection = database.collection('checkout')

    // users 
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    })
    // add new biodata 
    app.post('/allBioData', async (req, res) => {
      const BioData = req.body;
      const result = await bioDataCollection.insertOne(BioData);
      res.send(result);
    })

    // Add a favorite biodata
    app.post('/favorites', async (req, res) => {
      const favorite = req.body;
      const result = await favoritesCollection.insertOne(favorite);
      res.send(result);
    });

    // Add a contact req
    app.post('/contactReq', async (req, res) => {
      const data = req.body;
      const result = await checkoutCollection.insertOne(data);
      res.send(result);
    }); 

    // Add a marriage data
    app.post('/successStories', async (req, res) => {
      try {
        const { selfBiodataId, partnerBiodataId, date, story, stars, coupleImage } = req.body;
    
        // Validate the required fields
        if (!selfBiodataId || !partnerBiodataId || !date || !story || !stars || !coupleImage) {
          return res.status(400).send({ error: 'All fields are required.' });
        }
    
        const newStory = {
          selfBiodataId,
          partnerBiodataId,
          date,
          story,
          stars: Number(stars),
          coupleImage, // Directly store the URL
        };
    
        const result = await successStoriesCollection.insertOne(newStory);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add marriage data.' });
      }
    });

    // getting all checkout data
    app.get('/checkouts', async (req, res) => {
      const result = await checkoutCollection.find().toArray();
      res.send(result)
    })

    // Getting all pending checkouts
app.get('/pendingCheckouts', async (req, res) => {
  try {
    const pendingCheckouts = await checkoutCollection.find({ status: { $ne: "approved" } }).toArray();
    res.status(200).send(pendingCheckouts);
  } catch (error) {
    console.error("Error fetching pending checkouts:", error);
    res.status(500).send({ error: "Failed to fetch pending checkouts" });
  }
});


    // updating single checkout status
    app.put("/checkouts/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
    
      const result = await checkoutCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
    
      res.send(result);
    });

    // getting all users
    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })
    
    // getting user data through email
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    })

    // getting all biodata
    app.get('/allBioData', async (req, res) => {
      const result = await bioDataCollection.find().toArray();
      res.send(result)
    })

    // getting single biodata
    app.get('/profile/:id', async (req, res) => {
      const id = req.params.id;
      let query;

      // Check if the `id` is a valid ObjectId
      if (ObjectId.isValid(id) && id.length === 24) {
        // Match both ObjectId and string
        query = { $or: [{ _id: new ObjectId(id) }, { _id: id }] };
      } else {
        // Match string only
        query = { _id: id };
      }
      const result = await bioDataCollection.find(query).toArray();
      res.send(result);
    })

    // getting user biodata through email
    app.get('/myBioData/:email', async (req, res) => {
      const email = req.params.email;
      const query = { ContactEmail: email };
      const result = await bioDataCollection.findOne(query);
      res.send(result);
    })

    // Update biodata by email
    app.put('/updateBioData/:email', async (req, res) => {
      const email = req.params.email;
      const BioData = req.body;

      const query = { ContactEmail: email };
      const updateDoc = { $set: BioData };

      const result = await bioDataCollection.updateOne(query, updateDoc);

      res.send(result);
    });

    // updating user role for admin through id
app.put('/updateRoleAdmin/:id', (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
  ).then(result => {
      res.status(200).send(result);
  }).catch(err => {
      res.status(500).send({ error: 'Failed to update role' });
  });
});
  
  // update member role for premium through id by admin
  app.put('/updateRolePremium/:id', (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
  
    // Construct query based on the type of `id`
    let query;
    if (ObjectId.isValid(id) && id.length === 24) {
      query = { $or: [{ _id: new ObjectId(id) }, { _id: id }] };
    } else {
      query = { _id: id };
    }
  
    bioDataCollection.updateOne(query, { $set: { role } })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send({ error: 'Failed to update role' }));
  });

    // getting favorites for specific user
    app.get('/myFavorites/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await favoritesCollection.find(query).toArray();
      res.send(result);
    })

    // getting contact requests for specific user
    app.get('/contactReq/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await checkoutCollection.find(query).toArray();
      res.send(result);
    })

    // delete a contact request
    app.delete('/contactReq/:id',async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await checkoutCollection.deleteOne(query)
      res.send(result)
    })

    // getting all success stories
    app.get('/successStories', async (req, res) => {
      const result = await successStoriesCollection.find().toArray();
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`hello from port ${port}`);
})