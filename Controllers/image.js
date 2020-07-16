const Clarifai = require('clarifai');

const handleImageUrl = (req, res) => {
    // Instantiate a new Clarifai app by passing in your API key.
    const app = new Clarifai.App({apiKey: '4470b3bdbc974e228e698234c68c52ec'});
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
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