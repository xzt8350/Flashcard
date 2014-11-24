Final Project
=========

## Description

I use the Node.js to build up my personal website for the final project. Users are required to sign up first to access the whole website. The website includes the introduction of me, the project i have done relative to my major of computer science, and the Sneak Game i wrote. 

##Schemas

  user : to store the user information
  
    var user = new mongoose.Schema({
	      login: [Login],
	      game: [Game]
    });
    
  Login: to store users' login in information including local log in or access by facebook and google
    
    var Login = new mongoose.Schema({
    
        local         : {
          email    : String,
          password : String,
        },
        
        facebook      : {
          id       : String,
          token    : String,
          email    : String,
          name     : String
        },
  
        google        : {
          id       : String,
          token    : String,
          email    : String,
          name     : String
      }
    }); 
  
  Game : store the three highest score of all users' play and the highest score of the playing user		
 
    var Game = new mongoose.Schema({
	      top_three_scores : [],
	      highest_score    : number
    });

## Wireframes

*   **Sign in Page** 
  
    ![Sign in Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/login_page.png)

*   **Home Page** 
  
    ![Home Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/home_page.png)

*   **About Me Page** 
  
    ![About Me Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/about_me.png)

*   **Project Page** 
  
    ![Project Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/about_me.png)

*   **Game Page** 
  
    ![Game Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/game_page.png)

*   **Contact Page** 
  
    ![Contact Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/contact_page.png)


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


