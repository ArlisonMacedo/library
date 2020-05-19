const express = require('express');
const bookController = require('./controller/bookController')
// const emprestimoController = require('./controller/emprestimoController')
const userController = require('./controller/userController')
const sessionController = require('./controller/sessionController')
const profileController = require('./controller/profileController')

const routes = express.Router();


routes.get('/book', bookController.index)
routes.post('/book', bookController.create)
routes.delete('/book/:id', bookController.delete);
routes.put('/book/:id', bookController.update);
routes.put('/book/emprestimo/:id', bookController.emprestimo);
routes.put('/book/emprestimo/desloc/:id', bookController.desloc);
/**
 * User = Routes
*/

routes.get('/users', userController.index)
routes.post('/users', userController.create)

/**
 * Login
 */
routes.post('/session', sessionController.session);
/**
 * Profile
 */
routes.get('/profile', profileController.index)

/**
 * Emprestimos = Routes
 */

// routes.get('/emprestimos', emprestimoController.index);
// routes.post('/emprestimos', emprestimoController.create);

module.exports = routes;