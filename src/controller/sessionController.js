const connection = require('../database/connection')

module.exports = {


    async session(req,res){

        const {code} = req.body;

        const session = await connection('users')
        .where('code', code)
        .select('*')
        .first();

        if(!session){
            return res.status(400).json({error: "No Users found this is ID"})
        }
        return res.json({session});

    }
}
