var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');

//index
router.get('/', function(req, res, next){
    Contact.find({},function(err, contacts){
        if(err) return next(err);
        res.render('contacts/index', {contacts:contacts});
    });
});

//new
router.get('/new', function(req, res){
    res.render('contacts/new');
});

//Create
router.post('/', function(req, res, next){
    Contact.create(req.body, function(err, contact){
        if(err) return next(err);
        res.redirect('/contacts');
    });
});

//show
router.get('/:id', function(req, res, next){
    Contact.findOne({_id:req.params.id}, function(err, contact){
        if(err) return next(err);
        res.render('contacts/show', {contact:contact});
    });
});

//edit
router.get('/:id/edit', function(req, res, next){
    Contact.findOne({_id:req.params.id}, function(err, contact){
        if(err) return next(err);
        res.render('contacts/edit', {contact:contact});
    })
})

//update
router.put('/:id', function(req, res, next){
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
        if(err) return next(err);
        res.redirect('/contacts/'+req.params.id);
    });
});

// destroy
router.delete('/:id', function(req, res, next){
    Contact.findOneAndDelete({_id:req.params.id}, function(err){
        if(err) return next(err);
        res.redirect('/contacts');
    });
});

module.exports = router;