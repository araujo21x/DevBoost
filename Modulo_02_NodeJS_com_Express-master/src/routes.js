const routes = require('express').Router();
const ContactsController = require('./app/controller/ContactController');

routes.get('/contacts', ContactsController.index);
routes.post('/contacts', ContactsController.store);
routes.get('/contacts/:id', ContactsController.show);
routes.delete('/contacts/:id', ContactsController.delete);
routes.put('/contacts/:id', ContactsController.update);
module.exports = routes;
