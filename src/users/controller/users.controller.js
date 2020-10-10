const User = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    User.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
}

exports.insertNotes = (req, res) => {
    User.createNote(req.body)
    .then(result => {
        res.status(200).send({
            message: "note saved successfully!"
        })
    })
}

exports.getById = (req, res) => {
    User.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(404).send({
            message: "user not found!"
        })
    })
};

 exports.patchById = (req, res) => {
    if (req.body.password){
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }
    User.patchUser(req.params.userId, req.body).then((result) => {
            res.status(200).send({
                message: "user details updated successfully"
            });
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    User.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
};

exports.removeById = (req, res) => {
    User.removeById(req.params.userId)
        .then((result)=>{
            res.status(200).send({
                message: "user deleted successfully!"
            });
        });
};