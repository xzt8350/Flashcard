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
	var box = document.getElementById('marked');
	
	
	/*check wether is there a flashcard marked */
	var check_mark = document.getElementById('check');
	if(check_mark.innerHTML != 'true'){
		/*that means no flash cards marked */
		alert("Sorry, you have not marked any cards yet. Please go back to the Flashcard page");
		window.location.replace("http://localhost:3000/flashcard");
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
	
	console.log("zahuishi");
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
    url = 'http://localhost:3000/api/marked/next';
	req.open('POST', url, true);
	
	var index = document.getElementById('index').innerHTML;
	
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400){
			data = JSON.parse(req.responseText);
				
			/*update the card index, question, and answer */
			document.getElementById('index').innerHTML = data.index.toLocaleString();
	    	document.getElementById('ftxt').innerHTML = data.question.toLocaleString();
			document.getElementById('btxt').innerHTML = data.answer.toLocaleString();
			
						
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
    url = 'http://localhost:3000/api/marked/back';
	req.open('POST', url, true);
	
	var index = document.getElementById('index').innerHTML;
	
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400){
			data = JSON.parse(req.responseText);
				
			/*update the card index, question, and answer */
			document.getElementById('index').innerHTML = data.index.toLocaleString();
	    	document.getElementById('ftxt').innerHTML = data.question.toLocaleString();
			document.getElementById('btxt').innerHTML = data.answer.toLocaleString();
			
						
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
	
	var req = new XMLHttpRequest(),
    url = 'http://localhost:3000/api/marked/unmark';
	req.open('POST', url, true);
	
	
	/*need to write wether all flashcards are unmark */
	
	var index = document.getElementById('index').innerHTML;
	
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400){
			/* change the card to unmarked */
			var box = document.getElementById('marked');
			box.id = 'box';	
		} 
	});
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send('index=' + index);

}










