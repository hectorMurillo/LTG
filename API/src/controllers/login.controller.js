const Login = require('../models/login');

exports.findByEmailAndPassword = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede venir vacío"
        });
    }

    const login = new Login({
        email: req.body.email,
        password: req.body.password,
    });

    Login.findByUserAndPassword(login.email, login.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Usuario with email ${login.email}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Usuario with email ${login.email}.`
                });
            }
        } else res.send(data);
    });

};