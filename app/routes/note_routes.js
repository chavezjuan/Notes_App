const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = function(app, db) {
    
    app.get('/notes', async (req, res) => {
        const notes = await connection('notes').select('*');

        return res.json(notes);
    });


    app.post('/notes', async (req, res) => {
        //Creating routes
        const { title, description } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('notes').insert({
            id,
            title,
            description
        })

        return res.send('Your note was created!')
    })
}