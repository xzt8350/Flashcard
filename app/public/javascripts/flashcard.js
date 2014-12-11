var count = 0; /* even means front */ /*odd means back */ 


$(document).ready(function() {
  $('.flashcard').on('click', function() {
    $('.flashcard').toggleClass('flipped');
  });
});


$(document).ready(function() {
  $('.mark').on('click', function() {
    $('.flashcard').toggleClass('flipped');
  });
});

document.addEventListener('DOMContentLoaded', main);

function main() {
	var next = document.getElementById('next');
	var mark1 = document.getElementById('mark1');	
	var mark2 = document.getElementById('mark2');	
	var box = document.getElementById('box');
	
	
	/* use when check wether the first flashcard is marked or not*/
	var check_mark = document.getElementById('check');
	if(check_mark.innerHTML != -1){
		/*that means the first flash card is marked */
			box = document.getElementById('box');
			box.id = 'marked';
	}	
	
	/*use to check whether this page is redirected by other pages*/
	var status = document.getElementById('status');
	if(status.innerHTML == 'done'){
		document.getElementById('message').innerHTML = "❤❤❤You have done all marked flashcards❤❤❤";
		document.getElementById('message').className = "done";
		$("#message").fadeOut(4000);
		console.log("jinlaile");
	}
	else if(status.innerHTML == 'none'){
		document.getElementById('message').innerHTML = "!!!You have not marked any flashcards yet!!!";
		document.getElementById('message').className = "none";
		$("#message").fadeOut(4000);
		console.log("jinlaile");
	}


    next.addEventListener('click',next_func);
	mark1.addEventListener('click',mark_func);
	mark2.addEventListener('click',mark_func);
	box.addEventListener('click', function(){
		count ++;
		console.log(count);	
	});
	

}
	

function next_func() {
	
	/*check whether we need to flip the card */
	if(count %2 == 1){
		 count = 0;
		 $('.flashcard').toggleClass('flipped');
	} 
	
	/*first, we need to enable the onclick for back button */
	var back = document.getElementById('back');
	back.addEventListener('click',back_func);
	back.className= "enable";
		
	var req = new XMLHttpRequest(),
    url = 'http://localhost:3000/api/next';
	req.open('POST', url, true);
	
	var index = document.getElementById('index').innerHTML;
	
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400){
			data = JSON.parse(req.responseText);
				
			/*update the card index, question, and answer */
			document.getElementById('index').innerHTML = data.index.toLocaleString();
	    	document.getElementById('ftxt').innerHTML = data.question.toLocaleString();
			document.getElementById('btxt').innerHTML = data.answer.toLocaleString();
			
			/*check whether this card is marked */
			var check = data.is_mark;
			var box;
			if(check != -1){
				/*this card is marked, so highlight it*/
				box = document.getElementById('box');
				if(box !== null){
					box.id = 'marked';	
				}	
			}else{
				box = document.getElementById('marked');
				if(box !== null){
					box.id = 'box';	
				}	
			}
			
			/*check if whether this is the last card*/
			var last = data.last.toLocaleString();
			if(last == 'true'){ /*this is the last card */
				/*we should diable the next button*/
				var next = document.getElementById('next');
				next.removeEventListener('click', next_func);
				/* and fade out the next button */
				next.className = "disable";
			}
		} 
	});
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send('index=' + index);	
}



function back_func() {
	
	/*check whether we need to flip the card */
	if(count %2 == 1){
		 count = 0;
		 $('.flashcard').toggleClass('flipped');
	} 

	
	/*first, we need to enable the onclick for next button */
	var next = document.getElementById('next');
	next.addEventListener('click',next_func);
	next.className= "enable";
	
	var req = new XMLHttpRequest(),
    url = 'http://localhost:3000/api/back';
	req.open('POST', url, true);
	
	var index = document.getElementById('index').innerHTML;
	
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400){
			data = JSON.parse(req.responseText);
				
			/*update the card index, question, and answer */
			document.getElementById('index').innerHTML = data.index.toLocaleString();
	    	document.getElementById('ftxt').innerHTML = data.question.toLocaleString();
			document.getElementById('btxt').innerHTML = data.answer.toLocaleString();
			
			/*check whether this card is marked */
			var check = data.is_mark;
			var box;
			if(check != -1){
				/*this card is marked, so highlight it*/
				box = document.getElementById('box');
				if(box !== null){
					box.id = 'marked';	
				}	
			}else{
				box = document.getElementById('marked');
				if(box !== null){
					box.id = 'box';	
				}	
			}
			
			/*check if whether this is the last card*/
			var first = data.first.toLocaleString();
			if(first == 'true'){ /*this is the last card */
				/*we should diable the next button*/
				var back = document.getElementById('back');
				back.removeEventListener('click', back_func);
				/* and fade out the next button */
				back.className = "disable";
			}
		} 
	});
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send('index=' + index);	
}



function mark_func() {
	
	count++;
	
	var box = document.getElementById('box');
	var req, url, index;
	
	if(box === null){

		/* If box marked, change to unmarked */
		req = new XMLHttpRequest();
	    url = 'http://localhost:3000/api/unmark';
		req.open('POST', url, true);
		
		index = document.getElementById('index').innerHTML;
		
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400){
				box = document.getElementById('marked');
				box.id = 'box';	
			} 
		});
			
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send('index=' + index);
	}
	else{
		/* If box is unmarked, change to marked */
		req = new XMLHttpRequest();
	    url = 'http://localhost:3000/api/mark';
		req.open('POST', url, true);
		
		index = document.getElementById('index').innerHTML;
		
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400){
				box = document.getElementById('box');
				box.id = 'marked';	
			} 
		});
		
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send('index=' + index);
	}	
}










