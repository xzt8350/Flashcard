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
  

## Wireframes

*   **Log in Page** 
  
    ![Sign in Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/login_page.png)

*   **Home Page** 
  
    ![Home Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/home_page.png)

*   **Flashcard Page** 
  
    ![Flashcard Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/flashcard_page.png)

*   **Marked Page** 
  
    ![Mared Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/marked_page.png)

*   **Add Page** 
  
    ![Add Page](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/add_page.png)

## Site Map

 ![Site Map](https://github.com/nyu-csci-ua-0480-002-fall-2014/zx283-final-project/blob/master/documentation/sitemap.png)


## User Stories

#####Login

  As a user, I want to log in to my own account.

#####Sign up

  As a new user, I want to sign up a new account of this website.
  
#####Flashcard
  
  As a user, I want to play with my flashcards

#####Marked
  
  As a user, I want to mark the flashcards what i want to review later

#####Next
  
  As a user, I want to see the next flashcard

#####Back
  
  As a user, I want to see the previous flashcard
  
#####Add
  
  As a user, I want to add my own flashcards

##Research Topics

1. **Integrate user authentication**

    **Why Use It** : Help the user create their own account on my website. It allows the user to create and store their own flashcards. Also, it coud make sure that users marked their choice of flashcards they want.
    
    
2. **Use a CSS framework**
	
    **Why Use It** : CSS framework of bootstrap helps me save tons of time on beautify my website. Also, it makes the style of the website really clean. 


3. **Integrate JSHint**

    **Why Use It** : It helps me to detect any potential error on my javascript file. 
    
    
4. **External API**
 
   **Why Use It** : I uses two API in my website. One is the countdown clock of final. The second one is make my text of "shake the final" shake. Using API saving a lot of time to recode the same app that someone have done already.


5. **Client Side Form Validation** 

   **Why Use It** : I uses the javascript build-in function to check the form validation. As the user create their own flashcards, if the length of the answer or question is less than 15, the validation will alert the window to force the user to recreate a flashcard.


6. **JQuery** 

   **Why Use It** : I uses the JQuery to achieve the effect of 'fliping' as the user click on the flashcard. Also, i uses the fade out function to render my message to the user, making the webiste looks nice.
   



