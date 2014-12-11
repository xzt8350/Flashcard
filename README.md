Final Project
=========

## Description

I use the Node.js to build up the website based on the app of flashcards. I integrate the user authentication to allow the user to local login and uses CSS framwork of bootstrap to beautify the website.

##Schemas

User : store the user log in information and flashcards 

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

    
Flashcard: to store users' flashcards
    
	var Flashcard = new mongoose.Schema({
		question : String,
		answer :  String,
		mark : Boolean
	});
  
  Game : store the three highest score of all users' play and the highest score of the playing user		
 
    var Game = new mongoose.Schema({
	      top_three_scores : [],
	      highest_score    : number
    });

## Wireframes

*   **Log in Page** 
  
    ![Sign in Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/login_page.png)

*   **Home Page** 
  
    ![Home Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/home_page.png)

*   **Flashcard Page** 
  
    ![Flashcard Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/flashcard_page.png)

*   **Marked Page** 
  
    ![Project Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/marked_page.png)

*   **Add Page** 
  
    ![Game Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/add_page.png)

## Site Map

 ![Contact Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/sitemap.png)


## User Stories

#####Login

  As a user, I want to log in to my own account.

#####Sign up

  As a new user, I want to sign up a new account of this website.
  
#####About me
  
  As a user, I want to look at the introduction of this website's owner.

#####Project
  
  As a user, I want to check it out projects built by this website's owner .

#####Game
  
  As a user, I want to play the Sneak game.

#####Contact
  
  As a user, I want to contact the author of this website.

##Research Topics

1. **Unit testing with JavaScript**

    **Definition** : *Unit testing* is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures are tested to determine if they are fit for use. Intuitively, one can view a unit as the smallest testable part of an application. 
    
    **Why Use It** : Unit Tests allows us to make big changes to code quickly. We know it works now because we've run the tests, when we make the changes you need to make, we need to get the tests working again. This saves hours. Also, Unit tests help with code re-use. Migrate both our code and our tests to your new project. Tweak the code till the tests run again.
    
    **Candidate Solution** : *Mocha* is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

    ![solarized selective contrast](https://github.com/altercation/solarized/raw/master/img/solarized-selcon.png)
    
2. **Use a CSS preprocesser**
	
   **Definition** : *Unit testing* is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures are tested to determine if they are fit for use. Intuitively, one can view a unit as the smallest testable part of an application. 
    
    **Why Use It** : Unit Tests allows us to make big changes to code quickly. We know it works now because we've run the tests, when we make the changes you need to make, we need to get the tests working again. This saves hours. Also, Unit tests help with code re-use. Migrate both our code and our tests to your new project. Tweak the code till the tests run again.
    
    **Candidate Solution** : *Mocha* is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

3. **Integrate JSHint **

   **Definition** : *Unit testing* is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures are tested to determine if they are fit for use. Intuitively, one can view a unit as the smallest testable part of an application. 
    
    **Why Use It** : Unit Tests allows us to make big changes to code quickly. We know it works now because we've run the tests, when we make the changes you need to make, we need to get the tests working again. This saves hours. Also, Unit tests help with code re-use. Migrate both our code and our tests to your new project. Tweak the code till the tests run again.
    
    **Candidate Solution** : *Mocha* is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.
    
4. **Integrate User Authentication**
5. **Client Side Form Validation** 
6. **Use External API** 

