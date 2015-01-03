var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = new mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
      
	new_user    : Boolean,
	num_marked  : Number,
	marked_index: [Number],
	num_total   : Number, 
    
    flashcards : [Flashcard]
});


var Flashcard = new mongoose.Schema({
	question : String,
	answer :  String,
	mark : Boolean
});



User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('User', User);
mongoose.model('Flashcard', Flashcard);



