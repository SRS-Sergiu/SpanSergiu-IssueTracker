
// trimitem datele spre local storage

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e)
{//1.pregatim datele
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid(); //folosim libraria changeJs pentru a genera un id unic automat
	var issueStatus = 'Open';

	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
	}
//2.verificam daca este spatiu' - introducem datele
	if (localStorage.getItem('issues') == null)//daca LocalStorage este gol 
	{
		var issues = []; //initializam un sir gol
		issues.push(issue); // punem in sirul gol datele primite
		localStorage.setItem('issues', JSON.stringify(issues)); // luam 'issues' ca identificator si adaugam valoate in local storage prin JSON
	}else{//daca avem ceva in LocalStorage
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();

	fetchIssues(); 

	e.preventDefault();
}


// setam functia butonului closed

function setStatusClosed(id){
	var issues = JSON.parse(localStorage.getItem('issues'));

	for ( var i = 0; i < issues.length; i++){
		if (issues[i].id == id) {
			issues[i].status = 'Closed';
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}


//setam functia butonului delete

function deleteIssue(id){
	var issues = JSON.parse(localStorage.getItem('issues'));

	for ( var i = 0; i < issues.length; i++){
		if (issues[i].id == id) {
			issues.splice(i, 1);
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}


 // functia aduce "problemele" :D
function fetchIssues(){   // functia aduce "problemele" :D
	var issues = JSON.parse(localStorage.getItem('issues')); //analizam valoarea returnata si aducem prin item valoarea stocata local "issues"
	var issuesListe = document.getElementById('issuesList'); //aduce lista de probleme si o legam prin id la DIV-ul pentru afisarea listei

	issuesList.innerHTML = '';

	if(issues != null || issues != undefined﻿){
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
}



