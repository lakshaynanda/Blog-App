const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET
router.get('/', async(req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
})
//POST

router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//DELETE

router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    res.status(200).send();
})

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@vue-express.4tkk5.mongodb.net/vue-express?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('vue-express').collection('posts');
}


module.exports = router;