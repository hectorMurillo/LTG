module.exports = app => {
    const login = require('../controllers/login.controller.js');

    app.post("/login", login.findByEmailAndPassword);

};