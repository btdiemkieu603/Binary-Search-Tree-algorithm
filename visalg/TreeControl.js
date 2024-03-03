var _tu = 500;
var data = [];
var search_num = 0;
var avgSL = 0;
this.mesg="";
	
var insertB = new inputGen('value',insert_,_tu);		
function insert(d) {
	
	if (!insertB.run(d)) 
		message(insertB.mesg);

}
function insert_(num) {
	if (tree.insert(num)) 
		data.push(num);
	message(tree.mesg);
	
}

var _insert_r = function() {
	if(tree.animAllDone()) {
		var num = Math.floor(Math.random() * 1000);
		//var num = parseInt(this.inputA[0]);
		insert_(num);
	}
};

function insert_r(d) {
	if (d.interval === undefined){
		d.interval=setInterval( _insert_r,_tu);
		d.innerHTML='Stop insert';
		_insert_r();
	} else {
		clearInterval(d.interval);
		d.interval = undefined;
		d.innerHTML='Start insert';
	}
}

var searchB = new inputGen('value',search_,_tu);
function search(d) {
	if (!searchB.run(d)) 
		message(searchB.mesg);
}	
function search_(num) {
	tree.search_ani(num);
	message(tree.mesg);
	avgSL = ((avgSL * search_num) + tree.searchLength) / (++search_num);
	
}
var _search_r = function() {
	if(tree.animAllDone()) {
		var num = Math.floor(Math.random() * (data.length));
		search_(data[num]);
	}
};
function search_r(d) {
	if (d.interval === undefined){
		d.interval=setInterval(_search_r,_tu);
		let txt = d.innerHTML;
		d.innerHTML='Stop' + txt.substring(5);
		_search_r();
	} else {
		clearInterval(d.interval);
		d.interval = undefined;
		let txt = d.innerHTML;
		d.innerHTML='Start' + txt.substring(4);
	}
}

var removeB = new inputGen('value',remove_,5*_tu);
function remove(d) {
	if(tree.isEmpty()) {
		message("Tree is empty");
		return;
	}
	if (!removeB.run(d)) 
		message(removeB.mesg);
}	 
function remove_(num) {
	tree.remove(num);
	deleteData(num);
	message(tree.mesg);
	
}

function remove_r(d) {
	if (d.interval === undefined){
		d.interval=setInterval(function() {
			if(tree.animAllDone()) {
				var num = Math.floor(Math.random() * (data.length));
				remove_(data[num]);
				if(tree.isEmpty()) 
				remove_r(d);
			}
		},5*_tu);
		d.innerHTML='Stop remove';
		var num = Math.floor(Math.random() * (data.length));
		remove_(data[num]);
		if(tree.isEmpty()) 
			remove_r(d);		
	} else {
		clearInterval(d.interval);
		d.interval = undefined;
		d.innerHTML='Start remove';
	}
}

function deleteData(num) {
	for(let i=0,len=data.length;i<len;i++) {
		if (data[i] == num) {
			data.splice(i,1);
			break;
		}
	}
}

function message(t) {
	document.getElementById("message").innerHTML = t;
}

function clear_avgsl(d){
	search_num = 0;
	avgSL = 0;
	
}

	

