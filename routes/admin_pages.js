var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');

// GET pages index

router.get('/',function(req, res){
    res.send('Admin pages');
});

// GET add page index

router.get('/add-page',function(req, res){
    var title = '';
    var slug = '';
    var content = '';

    res.render('admin/add_page', {
        title:title,
        slug:slug,
        content: content
    });
});

router.post('/add-page',function(req, res){
    req.check('title','Title must have a value').notEmpty();
    req.check('content','content must have a value').notEmpty();

    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == '') slug = title.replace(/\s+/g, '-').toLowerCase();
   
     var content = req.body.content;
      
      var errors = req.validationErrors();

      if(errors){
          console.log(errors);
        res.render('admin/add_page', {
            errors:errors,
            title:title,
            slug:slug,
            content: content
        });   

      }else{
          console.log('success');
      }

   
});


//Exports
module.exports = router;