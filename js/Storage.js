function SaveItem() {
			
	var matr = document.forms.StudendList.matr.value;
	var name = document.forms.StudendList.name.value;
	var datebis = document.forms.StudendList.datebis.value;
	localStorage.setItem(matr, name);
	//localStorage.setItem(datebis);
	doShowAll();
	
}

function ModifyItem() {
	var name = document.forms.StudendList.name.value;
	document.forms.StudendList.data.value = localStorage.getItem(name);
	doShowAll();
}

function RemoveItem() {
	var name = document.forms.StudendList.name.value;
	document.forms.StudendList.name.value = localStorage.removeItem(name);
	doShowAll();
}

function ClearAll() {
	localStorage.clear();
	doShowAll();
}

// dynamically draw the table

function doShowAll() {
	if (CheckBrowser()) {
		var key = "";
		var list = "<tr><th>Matrikelnummer</th><th>Name</th><th>Gültig bis</th></tr>\n";
		var i = 0;
		for (i = 0; i <= localStorage.length - 1; i++) {
			key = localStorage.key(i);
			
			list += "<tr><td>" + key + "</td>\n<td>" 
					+ localStorage.getItem(key) + localStorage.getItem(key) + "</td></tr>\n";
		}
		if (list == "<tr><th>Name</th><th>Value</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}
		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot student list as your browser do not support local storage');
	}
}

/*
 * Checking the browser compatibility.
 * 
 * Alternately can use Modernizr scripts- JavaScript library that helps us to
 * detect the browser support for HTML5 and CSS features Example - <script
 * type="text/javascript" src="modernizr.min.js"></script>
 * 
 * if (Modernizr.localstorage) { //use localStorage object to store data } else {
 * alert('Cannot store user preferences as your browser do not support local
 * storage'); }
 */
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
			return false;
	}
}