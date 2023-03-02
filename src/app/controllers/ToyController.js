const Toy = require('../models/Toy');
const { multipleMongooseToObject, mongooseToObject} = require('../../until/mongoose');

class ToyController {
    // [GET] /toys/:slug
    show(req, res, next) {
        Toy.findOne({slug: req.params.slug})
            .then(toy => {
                res.render('toys/show', {toy: mongooseToObject(toy)});
            })
            .catch(next);
    }

    // [GET] /toys/create
    create(req, res, next) {
        res.render('toys/create');
    }

    // [POST] /toys/store
    store(req, res, next) {
        let toy = new Toy(req.body);
        toy.description = toy.description.replace(/(\r\n|\n|\r)/gm, "\n"); // Replace line breaks with newline characters
        toy.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }


    // [GET] / toys
    index(req, res, next) {
        Toy.find({})
            .then(toys => {
                res.render('home', {
                    toys: multipleMongooseToObject(toys),
                });
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = new ToyController();