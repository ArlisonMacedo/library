const connection = require('../database/connection');
const crypto = require('crypto')
module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;
        // const [count] = await connection('livros').count();

        const book = await connection('livros')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*')

        return res.json({ book })
    },

    async create(req, res) {

        const { name, price_aloc, author } = req.body;
        const code_book = crypto.randomBytes(4).toString('HEX')
        await connection('livros').insert({
            name,
            price_aloc,
            author,
            code_book
        })


        return res.status(201).send();

    },

    async delete(req, res) {

        const { id } = req.params;

        await connection('livros').where('code_book', id).delete();

        return res.status(204).send();
    },

    async update(req, res) {

        const { id } = req.params;

        const book = await connection('livros')
            .where('code_book', id)
            .select('code_book')
            .first();

        if (book.code_book) {

            const { name, price_aloc, author } = req.body;

            await connection('livros').where('code_book', book.code_book)
                .update({
                    name: name,
                    price_aloc: price_aloc,
                    author: author,

                })

            return res.status(201).send();
        }

        return res.status(404).send();

    },

    async emprestimo(req, res) {
        const { id } = req.params;

        const book = await connection('livros')
            .where('code_book', id)
            .select('code_book', 'users_id')
            .first();

        if (book.code_book) {


            const { emprestimo } = req.body;
            const users_id = req.headers.authorization;

            if (book.users_id !== users_id && book.users_id !== null) {
                return res.json({ erro: "this BOOK is emprested" });
            }

            await connection('livros').where('code_book', book.code_book).update({
                emprestimo: emprestimo,
                users_id: users_id
            })

            return res.status(201).send();
        }

        return res.status(404).json({ erro: "Not found this is ID" });
    },

    async desloc(req, res) {

        const { id } = req.params;

        const book = await connection('livros')
            .where('code_book', id)
            .select('code_book', 'emprestimo', 'users_id')
            .first();

        if (book.code_book) {
            const {emprestimo} = req.body;
            const users_id = req.headers.authorization;
            await connection('livros').where('code_book', book.code_book)
            .update({
                emprestimo: emprestimo,
                users_id: null
            })

            return res.status(201).send();
        }

        return res.status(404).json({ erro: "Not found this is ID" });
    }
}