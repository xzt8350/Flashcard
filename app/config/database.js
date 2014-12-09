var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = new mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
      
	num_total : Number,
	num_marked : Number,
	marked_index: [Number], 
    
    flashcards : [Flashcard]
});


var Flashcard = new mongoose.Schema({
	question : String,
	answer :  String,
	correct : Boolean,
	mark : Boolean,
	index : Number 
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


mongoose.connect('mongodb://localhost/users');

