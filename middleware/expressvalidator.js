var expressValidator = require('express-validator');
var User = require("../models/user");


module.exports = expressValidator({
 customValidators: {
   isEmailAvailable: function(email) {
     return new Promise(function(resolve, reject) {
       User.findOne({ email: email })
       .then(function(user) {
         if (!user) {
           resolve();
         }
         else {
           reject();
         }
       })
       .catch(function(error){
         if (error) {
           reject(error);
         }
       });
     });
   }
 }
});