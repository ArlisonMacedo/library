const connection = require('../database/connection');

module.exports = {


    async index(req,res) {

        const code_id = req.headers.authorization;

        const book = await connection('livros')
        .where('users_id', code_id)
        .select('*')

        if(!code_id){
            return res.status(404).send("Not Found!")
        }

        return res.json({book});

    }
    
}