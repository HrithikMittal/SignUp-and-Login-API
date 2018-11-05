var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Details = require('./app/models/details');

// Configure app for bodyParser()
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Set up port for server to listen on
var port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect('mongodb://localhost:27017/login');

//API Routes
var router = express.Router();

// Routes will all be prefixed with /API
app.use('/api',router);

//MIDDLE WARE-
router.use(function(req,res,next){
  console.log('FYI...There is some processing currently going down');
  next();
});

// test route
router.get('/',function(req,res){
  res.json({message:'Welcome !'});
});

router.route('/details')
.post(function(req,res){
  var person = new Details();
  person.bname = req.body.bname;
  person.pno = req.body.pno;
  person.email = req.body.email;
  person.baddress = req.body.baddress;

  person.save(function(err){
    if(err){
       res.send(err);
    }
    res.json({message:'User was successfully Signup'});
});
})

  .get(function(req,res){
    Details.find(function(err,details){
      if(err){
        res.send(err);
      }
      res.json(details);
    });
  });

router.route('/details/:detail_id')
   .get(function(req,res){
     Details.findById(req.params.detail_id,function(err,detail){
       if(err){
         res.send(err);
       }
       res.json(detail);
     });
   });

   router.route('/details/bname/:bname')
      .get(function(req,res){
        Details.find({bname:req.params.bname},function(err,detail){
          if(err){
            res.send(err);
          }
          res.json(detail);
        });
      });
    router.route('/details/pno/:pno')
       .get(function(req,res){
         Details.find({pno:req.params.pno},function(err,detail){
           if(err){
             res.send(err);
           }
           res.json(detail);
         });
       });



// Fire up server
app.listen(port);

// print friendly message to console
console.log('Server listening on port '+port);
