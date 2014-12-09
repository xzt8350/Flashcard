var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = new mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    
    flashcards : [Flashcard]
});


var Flashcard = new mongoose.Schema({
	num_done  : Number,
	num_total : Number 
});



userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('User', User);
mongoose.model('Flashcard', FlashCard);


mongoose.connect('mongodb://localhost/users');