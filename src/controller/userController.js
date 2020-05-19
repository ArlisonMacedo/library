const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {

    async index(req,res){
        const users = await connection('users').select('*');

        return res.json({users});

    },

    async create(req,res) {

        const {name, phone, city, uf} = req.body;
        const code = crypto.randomBytes(4).toString('HEX')
        
        await connection('users').insert({
            name,
            phone,
            city,
            uf,
            code
        })

        res.status(201).send();
    }
}