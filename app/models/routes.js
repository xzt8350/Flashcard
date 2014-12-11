var mongoose = require('mongoose');
var User      = mongoose.model('User');
var Flashcard = mongoose.model('Flashcard');
var session = require('express-session'); /*require session moduel*/

//session set up
var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};

module.exports = function(app, passport) {
	
	app.use(session(sessionOptions));

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('login'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true  // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home',     // redirect to the secure profile section
        failureRedirect : '/signup',  // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    
    // =====================================
    // HOME SECTION ========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home', isLoggedIn, function(req, res) {
	    
		var user = req.user;
	    
	  
	    if(user.new_user == null){
		    initialFlashcards(user);
	    	
	    	user.num_marked = 0;
			user.num_total = 10;
			user.new_user = true;
			
			user.markModified('local');
			user.save(function(err, modifiedItems, count) {});					
		}
				
		res.render('home', {
            username : user.local.email // get the user out of session and pass to template
        });	
							
	
		
    });
    
    // =====================================
    // Flashcard SECTION ===================
    // =====================================
    app.get('/flashcard', isLoggedIn, function(req, res) {
	    
	    var user = req.user;
	    
	    /*Render the first index of flashcard to the user*/	    
	    var card_to_do = user.flashcards[0];
	    		
		/* check whether the first flashcard is marked or not*/
		var is_mark = user.marked_index.indexOf(1); 
				
		/*check wether this page is redirected by other page*/
		var temp = req.session.status; 
		req.session.status = "nothing";
					
		res.render('flashcard', {
			flashcard : card_to_do,
			index     : 1,
			total     : user.num_total,
			is_mark   : is_mark,
			status    : temp
 		});
		
   		
    });
	
	
	// =====================================
    // API@Flashcard When user click  next==  
    // =====================================	
	app.post('/api/next',isLoggedIn, function(req, res) {
		
		var index = +req.body.index;
		var last = false; /*counter for record if the card is the last one */
		
		var user = req.user;
		
		console.log(user.flashcards);
		
		/*render the next card for user */
		var next_card = user.flashcards[index];
		/*check whether the next card is marked */
		var is_mark = user.marked_index.indexOf(index+1);
		/* If user answerd the last question */ 
		if(+index + 1 == user.num_total){
			index++;
			last = true;
		}
		else{
			index++; /*increment the index of the card*/ 		
		}

		
		res.json({ question : next_card.question , answer : next_card.answer, index: index, last : 						last, is_mark : is_mark});
		
		
		
});
	
			
	// =====================================
    // API@Flashcard When user click  back =
    // =====================================	
	app.post('/api/back',isLoggedIn, function(req, res) {
		
		var index = +req.body.index;
		var first = false; /*counter for record if the card is the last one */
		
		User.findOne({email : req.user.email}, function(err, user){
			if(!err){
				
				/*render the next card for user */
				var next_card = req.user.flashcards[index - 2];
				/*check whether the next card is marked */
				var is_mark = user.marked_index.indexOf(index-1); 
		
				/* If user answerd the last question */
				if(+index - 2 ===  0){
					index--;
					first = true;
				}
				else{
					index--; /*increment the index of the card*/ 		
				}
			
				res.json({ question : next_card.question , answer : next_card.answer, index: index, first : first, is_mark : is_mark});
				
			}
		});
			
	});
	
		
	// =====================================
    // API@Flashcard When user click mark ==
    // =====================================	
	app.post('/api/mark',isLoggedIn, function(req, res) {
		
		var index = +req.body.index;
		
		console.log(typeof index, "hello");
		User.findOne({email : req.user.email}, function(err, user){
			if(!err){	
				user.marked_index.push(index); /*push index to the array of marked cards */
				/*update the database*/
				console.log(user.marked_index);
				user.markModified('flashcards');
				user.save(function(err, modifiedItems, count) {
				});			
			}			
		});
		
		res.json();
	   
	});
	
	
	// =====================================
    // API@Flashcard When user click unmark 
    // =====================================	
	app.post('/api/unmark',isLoggedIn, function(req, res) {
		
		var index = +req.body.index;
	
		User.findOne({email : req.user.email}, function(err, user){
			if(!err){	
				user.marked_index.remove(index); /*push index to the array of marked cards */
				/*update the database*/
				console.log(user.marked_index);
				user.markModified('flashcards');
				user.save(function(err, modifiedItems, count) {
				});			
			}			
		});
		
		res.json();
	   
	});
	
	
	// =====================================
    // @Marked Page ========================
    // =====================================
    app.get('/marked', isLoggedIn, function(req, res) {
	     
	     
	    var check = false; /*counter to whether the user has marked at least one card*/ 
	     
	    User.findOne({email : req.user.email}, function(err, user){
			if(!err){
				var total = user.marked_index.length;
				 if(total !== 0){
				    /*user marked card before*/
				    check = true;
				     
				    /*find the first card*/
				    var index = user.marked_index[0];
				    console.log(index);
				    card_to_do = user.flashcards[index-1];
				    console.log(card_to_do);
				     
				    /*render the page for the user*/ 
				    res.render('marked', {
							flashcard : card_to_do,
							index     : 1,
							total     : total,
							check     : check
			     	});
			     	
			     }else{ /*the user have not yet marked any card before */
				    
				    /*set the status*/ 
				    req.session.status = 'none'; 
					res.redirect('flashcard');
			     }		
			}			
		});
		
		
	});
    
    
    // =====================================
    // API@Marked When user click next =====  
    // =====================================	
	app.post('/api/marked/next',isLoggedIn, function(req, res) {
		
		var index = +req.body.index;
		var last = false; /*counter for record if the card is the last one */
		
		User.findOne({email : req.user.email}, function(err, user){
			if(!err){
				
				var total = user.marked_index.length;
				/* check whether this card is the last marked card */
				console.log("index :",index, "total", total);
				if(index+1 == total){
					last = true;
				}
				
				/*find the next card*/
				var flashcard_index = user.marked_index[index] -1;
				var next_card = user.flashcards[flashcard_index];
				index++;
				res.json({ question : next_card.question , answer : next_card.answer, index: index, last : last});
	
			}
		});
			
	});
	
	
	// =====================================
    // API@Marked When user click back =====  
    // =====================================	
	app.post('/api/marked/back',isLoggedIn, function(req, res) {
		
		var index = +req.body.index;
		var first = false; /*counter for record if the card is the last one */
		
		User.findOne({email : req.user.email}, function(err, user){
			if(!err){
				
				/*check whether this card is the first marked */				
				if(index-2 === 0){
					first = true;
				}
				
				/*find the next card*/
				var flashcard_index = user.marked_index[index-2] -1;
				console.log(flashcard_index);
				var next_card = user.flashcards[flashcard_index];
				index--;
				
				res.json({ question : next_card.question , answer : next_card.answer, index: index, first : first});

			}
		});
			
	});
	
	
		
	// =====================================
    // API@Marked When user click unmark ===  
    // =====================================	
	app.post('/api/marked/unmark',isLoggedIn, function(req, res) {
		
		var index = +req.body.index;
	
		console.log(index);
		
		var question;
		var answer;
		
		User.findOne({email : req.user.email}, function(err, user){
			if(!err){
							
				var this_index = index -1;
				
				var flashcard_index = user.marked_index[this_index];
				user.marked_index.remove(flashcard_index); /*remove index to the array of marked cards */
				
				var total = user.marked_index.length;
				
				/*check if this is the last unmarked flashcard */
				if(total === 0){
					req.session.status = "done";
					question = "";
					answer   = "";
				}
				else{
					/*check wether this is the last index*/
					console.log("jilai");
					console.log('this_index',this_index);
					console.log(user.marked_index);
					if(this_index == 1){
						this_index =0;
						index--;
					}
					/*find the next unmarked card*/
					flashcard_index = user.marked_index[this_index];
					console.log(flashcard_index);
					var next_card = user.flashcards[flashcard_index-1];	
					question = next_card.question;
					answer =  next_card.answer;
				}
				
				/*update the database*/
				console.log("marked index",user.marked_index);
				user.markModified('flashcards');
				user.save(function(err, modifiedItems, count) {
				});
				
				console.log("index", index, "total", total);
				
				res.json({question : question , answer : answer, index: index, total : total});			
			}			
		});
		
			
	});
	
	// =====================================
    // Add Flashcards SECTION =====================
    // =====================================
    app.get('/add', isLoggedIn, function(req, res) {
	   	
	
	   	var user = req.user;
	    
	    /* check whether the first flashcard is marked or not*/
		var is_mark = user.marked_index.indexOf(1); 
				
		/*check wether this page is redirected by other page*/
		var temp = req.session.add; 
		req.session.add = "nothing";
		
		res.render('add', {
			add       : temp
 		});


   		
    });
    
    // =====================================
    // Add Flashcards SECTION(post) ========
    // =====================================
    app.post('/api/add', isLoggedIn, function(req, res) {
	   
		var user = req.user;
	    var question = req.body.question;
	    var answer = req.body.answer;
	    
	    
		var flashcard = new Flashcard({
			question : question,  
			answer   : answer,
			mark: false
		});
		
	    user.num_total = user.num_total+1;
	    user.flashcards.push(flashcard);
	    user.markModified('flashcards');
		user.save(function(err, savedUser, count) {
	    });
		
		console.log(user.flashcards);
		
		res.json();
   		
    });
    
	
	
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



// =====================================
// Build-in Questions ================== 
// =====================================
function initialFlashcards(user){
	
	user.update({$push: {flashcards : {
				question : "Q: What is Ajax?",  
				answer : "AJAX is short for asynchronous JavaScript and XML. It's basically a bunch of interrelated technologies and techniques used to create asynchronous web applications",
				mark: false}}},  function(err, flashcard, count) {console.log(err,  flashcard, count);});		
	
	user.update({$push: {flashcards : {question : "Q: Describe the use of the XMLHttpRequest",  
				answer : "1.It provides an interface for retrieving data from a URL 2.a page can update just a part of the itself rather than reloading itself entirely", 
				mark: false}}},function(err,  flashcard, count) {console.log(err,  flashcard, count);});
								
	user.update({$push: {flashcards : {question : "Q: What is XMLHttpRequest?",  
				answer : "XMLHttpRequest is JavaScript object that allows browser based JavaScript to make http requests", 
				mark: false}}},function(err,  flashcard, count) {console.log(err,  flashcard, count);});	
		
	
	user.update({$push: {flashcards : {
				question : "Q: What does same site or same origin mean??",  
				answer : "Two pages have the same origin if the protocol, port (if one is specified), and host are the same for both pages",             			    mark: false}}},function(err, flashcard, count) {console.log(err, flashcard, count);});	
	
	
	user.update({$push: {flashcards : {
				question : "Q: What is SOP?",  
				answer : "The same origin policy is a policy implemented by browsers that restricts how a document, script or data from one origin can interact with a document, script or data from another origin.", 
				mark: false}}},function(err, flashcard, count) {console.log(err, flashcard, count);});	
	
	user.update({$push: {flashcards : {
				question : "Q: How do we read or change text contained within a node? How do we create new nodes?",  
				answer : "node.nodeValue and node.textContent",
				mark: false}}},function(err, flashcard, count) {console.log(err, flashcard, count);});
				
	user.update({$push: {flashcards : {
				question : "Q: How do we set up an element that responds to events?",  
				answer : "element.addEventListener('eventName', callback)", 
				mark: false}}},function(err, flashcard, count) {console.log(err, flashcard, count);});	
							
	user.update({$push: {flashcards : {
				question : "Q: Why should we use sessions?",  
				answer : "It allows us to store data on a per-session basis by maintaining a small piece of data on the client (via cookies)", 		mark: false}}},function(err, flashcard, count) {console.log(err, flashcard, count);});	
				
	user.update({$push: {flashcards : {
				question : "Q: What's a NoSQL database ?",  
				answer : "a database that doesn't model data using tables and relations between those tables", 
				mark: false}}},function(err, flashcard, count) {console.log(err, flashcard, count);});
				
	user.update({$push: {flashcards : {
				question : "Q: What's an ODM? ?",  
				answer : "object document mapper : maps application objects (objects in your code) to documents in your database", 
				mark: false}}},function(err, flashcard, count) {console.log(err, flashcard, count);});	

				
				

		
}



