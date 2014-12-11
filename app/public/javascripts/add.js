document.addEventListener('DOMContentLoaded', main);

function main() {
	var add = document.getElementById('add');
	
	add.addEventListener('click',add_new);
	
}


function add_new() {

	var question = document.getElementById('new_question').value;
	var answer = document.getElementById('new_answer').value;

console.log(question);
	
	if(question.length < 10){
		/* validate the question input */
		alert("Sorry, your question must have at least 10 characters");
	}
	else if(answer.length < 10){
		/* validate the answer input */
		alert("Sorry, your answer must have at least 10 characters");
	}
	else{
		var req = new XMLHttpRequest(),
	    url = 'http://localhost:3000/api/add';
		req.open('POST', url, true);
		
		/* show up the success message */
		document.getElementById('message').innerHTML = "❤❤❤You have created a flashcard successfully❤❤❤";
		document.getElementById('message').className = "success";
		$("#message").fadeOut(4000);
		
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send('question=' + question +"&answer=" + answer);
	}	

}