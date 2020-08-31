const Clarifai = require('clarifai');

const handleImageUrl = (req, res) => {
    // Instantiate a new Clarifai app by passing in your API key.
    const app = new Clarifai.App({apiKey: process.env.CLARIFAI_KEY});
    let detectType = req.body.type === 'face' ? 'a403429f2ddf4b49b307e318f00e528b' : req.body.type === 'apparel' ? '72c523807f93e18b431676fb9a58e6ad' : 'eeed0b6733a644cea07cf4c60f87ebb7';
    app.models.predict( detectType, req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Something went wrong with api call', err));
}

const handleImageEnrty = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(data => res.json(data[0]))    
    .catch(err => res.status(400).json('Unable to get entry'))
}

module.exports = {
    handleImageEnrty,
    handleImageUrl
}