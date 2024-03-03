// bien toan cuc

var _tu = 500;
var content = document.getElementById("message");

function timeControl(v) {
	switch (v) {
		case "1": _tu = 500; break;
		case "2": _tu = 300; break;
		case "3": _tu = 200; break;
		case "4": _tu = 100; break;
		case "5": _tu = 50; break;
	}
}


// Constructor for BST
function BST() {
	this.root = null;
	this.size = 0;
	this.draw = null;
	this.click = function (e) { alert(e); };
	this.mesg = " ";
	this.timeline = null;
	this.delay = 0
	this.searchLength = 0;
	this.fillByValue = true;
}

// Constructor for Node
function TreeNode(e, draw) {
	this.element = e;
	this.left = null;
	this.right = null;
	this.parent_n = null;

	this.searchHit = 0;

	this.x = 350;
	this.y = 10;

	this.o = draw.nested().attr({ 'cursor': 'pointer' });
	this.o.addClass('node')
	this.c = this.o.circle(30).cx(16).cy(16).stroke({ width: 1, color: '#000' }).fill('#fff');
	this.t = this.o.text(e.toString()).attr({ x: 16, y: 5, 'font-size': '12px', 'text-anchor': 'middle', stroke: '#000', 'stroke-width': 0 });
	this.l_l = draw.line(this.x + 15, this.y + 15, this.x + 15, this.y + 15).stroke({ width: 1, color: '#000' });
	this.r_l = draw.line(this.x + 15, this.y + 15, this.x + 15, this.y + 15).stroke({ width: 1, color: '#000' });

	this.o.move(350, 10);
	this.l_l.back()
	this.r_l.back()
	this.o.front()
	this.o.on('mouseover', function () {
		this.get(0).attr({ 'stroke-width': 3 });
	});
	this.o.on('mouseout', function () {
		this.get(0).attr({ 'stroke-width': 1 });
	});
}
BST.prototype.hightcode = function (i) {
	let temp = document.getElementsByClassName("code");
	for (let elem in temp) {
		temp[i - 1].style.background = "rgb(113, 220, 120)";
		setTimeout(function () {
			temp[i - 1].style.background = "";
		}, 500);
	}
}
BST.prototype.message = function (t) {
	document.getElementById("message").innerHTML = t;
}

BST.prototype.init = function (draw) {
	this.draw = draw;
	this.timeline = new SVG.Timeline()
}


BST.prototype.createNewNode = function (e) {
	var tn = new TreeNode(e, this.draw);

	if (this.fillByValue) {
		var col;
		col = 255 - ((e < 0) ? 0 : ((e >= 1000) ? 255 : Math.floor((e / 1000.0) * 255)));
		tn.c.fill({ r: 255, g: 255, b: col });
	}

	tn.o.click(this.click);
	return tn;
}


BST.prototype.search = function (e) {
	var current = this.root; // Start from the root

	while (current != null) {

		if (e < current.element) {
			current = current.left;
			this.mesg = e.toString() + " nho hon " + current.toString();

		} else if (e > current.element) {
			current = current.right;
			this.mesg.innerHTML = e.toString() + " lon hon " + current.toString();

		} else { // element matches current.element
			this.mesg = e.toString() + " found";
			return true; // Element is found
		}
	}
	this.mesg = e.toString() + " not found";
	return false;
}

// Search with animate 
BST.prototype.search_ani = function (e) {
	this.hightcode(44);
	let current = this.root; // Start from the root
	let td = 0;
	this.searchLength = 0;
	let ft = this.draw.text(e.toString()).attr({ x: 380, y: 10, 'text-anchor': 'end' });
	let fl = this.draw.line(400, 25, 485, 25).attr({ stroke: '#f00', 'stroke-width': 5, opacity: 0.3 });

	while (current != null) {
		this.hightcode(46);
		if (e < current.element) {
			this.hightcode(47);
			current.c.animate(_tu, td * _tu / 2, 'now').ease('>').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
			td++;
			if (current != null) {
				current.l_l.animate(_tu, td * _tu / 2, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
				td++;
			}
			current = current.left;
			this.searchLength++;

		} else if (e > current.element) {
			this.hightcode(49);
			current.c.animate(_tu, td * _tu / 2, 'now').ease('>').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
			td++;
			if (current != null) {
				current.r_l.animate(_tu, td * _tu / 2, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
				td++;
			}
			current = current.right;
			this.searchLength++;

		} else { // element matches current.element
			this.hightcode(51);
			this.hightcode(52);
			current.c.animate(_tu, td * _tu / 2, 'now').attr({ stroke: '#f00', 'stroke-width': 5, fill: '#f00' }).reverse();

			this.mesg = e.toString() + " found";
			ft.animate((td * _tu / 2) + _tu, 0, 'now').after(function () { this._element.remove() });
			fl.animate((td * _tu / 2) + _tu, 0, 'now').after(function () { this._element.remove() });
			return true; // Element is found
		}
	}
	ft.animate((td * _tu / 2) + _tu, 0, 'now').after(function () { this._element.remove() });
	fl.animate((td * _tu / 2) + _tu, 0, 'now').after(function () { this._element.remove() });

	this.mesg = e.toString() + " not found";
	this.hightcode(55);
	return false;

}

BST.prototype.insert = function (e) {

	let new_node = this._insert(e);
	if (new_node == null) {
		this.mesg = e.toString() + " is already in tree";

		return false;
	} else {
		//this.reDrawTree();
		changeZoomFactor(this.draw);
	}
	this.mesg = e.toString() + " is inserted";

	return true;
}

// Insert a new element e
BST.prototype._insert = function (e) {
	let td = 0;
	let ft = this.draw.text(e.toString()).attr({ x: 380, y: 10, 'text-anchor': 'end' });
	let fl = this.draw.line(400, 25, 485, 25).attr({ stroke: '#f00', 'stroke-width': 5, opacity: 0.3 });
	var new_node = null;
	this.hightcode(12);
	if (this.root == null) {
		//document.getElementById("message").innerHTML = "the tree empty";
		this.message.toString("the tree is empty");

		new_node = this.createNewNode(e);
		this.root = new_node;
		this.root.o.animate(td * _tu / 4).move(500, 10);
		this.root.x = 500;
		this.root.y = 10;
		this.totalDept = 1;

		ft.animate((td * _tu / 4) + _tu, 0, 'now').after(function () { this._element.remove() });
		fl.animate((td * _tu / 4) + _tu, 0, 'now').after(function () { this._element.remove() });
		td++;
		new_node.c.animate(_tu, _tu, 'now').attr({ stroke: '#f00', 'stroke-width': 5, fill: '#f00' }).reverse();
		this.hightcode(14);
	} else {
		// Locate the parent node
		var p = null; var path = [];
		this.hightcode(17);
		var current = this.root;

		this.message = "the tree is not empty";
		path.push([400, 25]);
		while (current != null) {
			this.hightcode(20);
			path.push([current.x + 15, current.y + 15]);

			if (e < current.element) {
				this.hightcode(21);
				current.c.animate(td * _tu / 4, td * _tu / 4, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
				td++;

				current.l_l.animate(_tu, td * _tu / 4, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
				td++;

				this.mesg = e.toString + "< " + current.toString;
				p = current;

				current = current.left;

			} else if (e > current.element) {
				this.hightcode(24);
				current.c.animate(_tu, td * _tu / 4, 'now').ease('>').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
				td++;

				current.r_l.animate(_tu, td * _tu / 4, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
				td++;
				this.mesg = e.toString + "> " + current.toString;
				p = current;
				current = current.right;

			} else {
				this.hightcode(27);
				current.c.animate(_tu, td * _tu / 4, 'now').attr({ stroke: '#f00', 'stroke-width': 5, fill: '#f00' }).reverse();

				ft.animate((td * _tu / 4) + _tu, 0, 'now').after(function () { this._element.remove() });
				fl.animate((td * _tu / 4) + _tu, 0, 'now').after(function () { this._element.remove() });
				this.mesg = e.toString + "= " + current.toString;
				return null; // Duplicate node not inserted
			}

		}


		var new_node = this.createNewNode(e);
		this.hightcode(31);
		new_node.c.timeline(this.timeline);
		new_node.c.animate(_tu, td * _tu / 3, 'now').attr({ stroke: '#f00', 'stroke-width': 5, fill: '#f00' }).reverse();

		if (e < p.element) {
			this.hightcode(32);
			p.left = new_node;
			p.left.x = p.x - 40; p.left.y = p.y + 80;
			p.left.parent_n = p;
			p.left.l_l.animate(_tu, td * _tu / 4, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
		} else {
			this.hightcode(35);
			p.right = new_node;
			p.right.x = p.x + 40; p.right.y = p.y + 80;
			p.right.parent_n = p;
		}
		path.push([new_node.x + 15, new_node.y + 15])

		ft.animate((td * _tu / 4) + _tu, 0, 'now').after(function () { this._element.remove() });
		fl.animate((td * _tu / 4) + _tu, 0, 'now').after(function () { this._element.remove() });

		var delay = td * _tu / 4;
		var width = [];
		this.fixedPosition(this.root, 0, 500, width);
		this.reCenter();
		this.fixedPosSub(this.root, delay);
	}

	this.size++;
	this.hightcode(41);
	this.mesg = e.toString() + " is insert into tree";
	return new_node; // Element inserted
}


//xoa nut
//tra ve false, true
BST.prototype.remove = function (e) {
	if (e == undefined) return false;

	var node = this._remove(e);
	if (node != null) {
		//this.reDrawTree();
		changeZoomFactor(this.draw);
		return true;
	}
	return false;
}

BST.prototype._remove = function (e) {
	this.hightcode(57);
	let ft = this.draw.text(e.toString()).attr({ x: 380, y: 10, 'text-anchor': 'end', stroke: '#000', 'stroke-width': 0 });
	let fl = this.draw.line(400, 25, 485, 25).attr({ stroke: '#f00', 'stroke-width': 5, opacity: 0.3 });
	//xac dinh vi tri nut xoa va vi tri nut cha
	var p = null;
	var current = this.root;
	let td = 0;
	var del_p = null;
	var path = [];
	path.push([400, 25]);
	while (current != null) {
		this.hightcode(61);
		path.push([current.x + 15, current.y + 15]);

		if (e < current.element) {
			this.hightcode(62);
			current.c.animate(_tu, td * _tu, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
			td++;

			current.l_l.animate(_tu, td * _tu, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
			td++;
			p = current;
			current = current.left;
		} else if (e > current.element) {
			this.hightcode(65);
			current.c.animate(_tu, td * _tu, 'now').ease('>').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
			td++;

			current.r_l.animate(_tu, td * _tu, 'now').attr({ stroke: '#f00', 'stroke-width': 5 }).reverse();
			td++;
			p = current;
			current = current.right;
		} else {
			this.hightcode(68);
			this.hightcode(69);
			td++;
			break; //phan tu nam trong cay duoc tro by current
		}
	}

	if (current == null) {
		this.hightcode(72);
		this.hightcode(73);
		this.mesg = e.toString() + " is no in tree";
		return null; // phan tu khong co trong cay
	}

	// TH1: xoa nut khong co con (nut la), => xoa no
	if (current.left == null && current.right == null) {
		this.hightcode(76);
		current.c.animate(td * _tu, 0, 'now').fill('#f00');
		td++;
		current.l_l.remove(td * _tu);
		current.r_l.remove(td * _tu);
		current.o.animate(_tu, td * _tu).move(300, 10).opacity(0).after(function () { this._element.remove() });
		td++;
		if (p != null) {
			this.hightcode(77);
			if (p.left == current) {
				this.hightcode(78);
				p.left = null;
				p.l_l.animate(_tu, _tu, 'now').plot(p.x + 15, p.y + 15, p.x + 15, p.y + 15)

			}
			if (p.right == current) {
				this.hightcode(81);
				p.right = null;
				p.r_l.animate(_tu, _tu, 'now').plot(p.x + 15, p.y + 15, p.x + 15, p.y + 15)

			}
		}
		this.hightcode(85);
		del_p = p

	} else if (current.left == null || current.right == null) {
		// Case 1: one child  move child replace current
		// Connect the parent with the right child of the current node
		//co con phai
		this.hightcode(87);
		if (p == null) {
			this.hightcode(88);
			this.root = (current.left || current.right)
			del_p = this.root;
		} else {
			this.hightcode(91);
			if (p.left == current) {
				this.hightcode(92);
				p.left = (current.left != null ? current.left : current.right)
				p.left.parent_n = p
				p.l_l.animate(_tu, _tu, 'now').plot(p.x + 15, p.y + 15, p.left.x + 15, p.left.y + 15)

			} else {
				this.hightcode(95);
				p.right = (current.left != null ? current.left : current.right)
				p.right.parent_n = p
				p.r_l.animate(_tu, _tu, 'now').plot(p.x + 15, p.y + 15, p.right.x + 15, p.right.y + 15)

			}
			this.hightcode(99);
			del_p = p
		}
		current.c.animate(td * _tu / 2, 0, 'now').fill('#f00');
		td++;
		current.l_l.remove(td * _tu / 2);
		current.r_l.remove(td * _tu / 2);
		current.o.animate(_tu, td * _tu / 2).move(300, 10).opacity(0).after(function () { this._element.remove() });

	} else {
		this.hightcode(102);
		// Case 2: The current node has a 2 child
		//xac dinh vi tri ngoai cung ben trai trong cay con ben trai
		current.c.timeline(this.timeline)
		current.c.animate(td * _tu).stroke('#f00')

		td++;
		var parentOfLeftMost = current;
		var leftmost = current.right;
		var path = [];
		path.push([current.x + 15, current.y + 15]);
		while (leftmost.left != null) {
			this.hightcode(105);
			path.push([leftmost.x + 15, leftmost.y + 15])
			leftmost.c.animate(2 * _tu).stroke('#f00').reverse();
			td++;
			parentOfLeftMost = leftmost;
			leftmost = leftmost.left; // Keep going to the left
		}
		this.drawPath(path, '#00f');

		leftmost.c.timeline(this.timeline)
		leftmost.c.animate(_tu).stroke('#00f')
		td++;

		//thay the nut xoa bang nut ngoai cung ben trai
		var c1 = current.o.clone()
		this.draw.add(c1)
		c1.timeline(this.timeline)
		c1.get(0).attr({ stroke: '#f00', 'stroke-width': 3, opacity: 0.5 });

		c1.animate(_tu, 0, 'after').move(leftmost.x, leftmost.y).after(function () { this._element.remove() });
		td++;
		var c2 = leftmost.o.clone()
		this.draw.add(c2)
		c2.timeline(this.timeline)
		c2.get(1).attr({ stroke: '#f00', 'stroke-width': 3, opacity: 0.5 });

		c2.animate(_tu, 0, 'after').move(current.x, current.y).after(function () {
			td++;
			let ce = current.element;
			current.element = leftmost.element;
			current.c.stroke('#000')
			current.t.text(leftmost.element.toString());
			leftmost.t.text(ce.toString());
			this._element.remove()
		});

		// as normal delete 
		if (leftmost.right == null) {
			//  no child 
			this.hightcode(109);
			if (leftmost.parent_n.left == leftmost) {
				leftmost.parent_n.left = null
				this.hightcode(110);
			}
			if (leftmost.parent_n.right == leftmost) {
				leftmost.parent_n.right = null
				this.hightcode(111);
			}

		} else {
			//con trai nho nhat co mot con phai
			this.hightcode(112);
			if (leftmost.parent_n.left == leftmost) {
				leftmost.parent_n.left = leftmost.right
				this.hightcode(114);
			}
			if (leftmost.parent_n.right == leftmost) {
				leftmost.parent_n.right = leftmost.right
				this.hightcode(115);
			}
			this.hightcode(117);
			leftmost.right.parent_n = leftmost.parent_n

		}


		leftmost.o.timeline(this.timeline)
		leftmost.c.animate(td * _tu).fill('#f00');
		td++;
		leftmost.l_l.remove(_tu); leftmost.r_l.remove(_tu);
		leftmost.o.animate(_tu, 0, 'after').move(300, 10).opacity(0).after(function () { this._element.remove() });
		td++;

		this.fixedPosSub(this.root, td * _tu / 2);
		this.hightcode(119);
		del_p = parentOfLeftMost;
	}
	ft.timeline(this.timeline)
	ft.animate(td * _tu / 2, 0, 'after').after(function () { this._element.remove() });
	fl.animate(td * _tu / 2, 0, 'after').after(function () { this._element.remove() });
	var width = [];
	this.fixedPosition(this.root, 0, 500, width);
	this.reCenter();
	this.fixedPosSub(this.root, td * _tu / 2);

	this.mesg = e.toString() + " is removed";
	this.size--;
	this.hightcode(121);
	if (this.size == 0) {
		this.root = null;
		this.hightcode(122);
	}
	this.hightcode(123);
	return del_p;
}

//tra ve true neu cay rong
BST.prototype.isEmpty = function () {
	return this.root == null;
}

// tra ve size cua tree
BST.prototype.getSize = function () {
	return this.size;
}

// duong dan tu goc den phan tu da chi dinh 
BST.prototype.path = function (e) {
	list = [];
	var current = this.root; // bat dau tu root

	while (current != null) {
		list.push(current); //them nut vao list
		if (e < current.element) {
			current = current.left;
		}
		else if (e > current.element) {
			current = current.right;
		}
		else
			break;
	}

	return list; // tra ve mang cac nut

}
BST.prototype.getRoot = function () {
	return this.root;
}
BST.prototype.getTotalDept = function (node = this.root, dept = 1) {
	if (node == null) return 0;
	return dept + this.getTotalDept(node.left, dept + 1) + this.getTotalDept(node.right, dept + 1);
}

BST.prototype.preorder_ani = function () {
	this.mesg = "Pre order : "
	this.timeline.finish()
	this._preorder_ani(this.root, 0);
}
BST.prototype._preorder_ani = function (node, delay) {
	this.hightcode(126);
	if (node == null) {
		this.hightcode(127);
		return delay;

	}
	this.mesg += node.element.toString() + " ";
	this.hightcode(128);
	node.c.timeline(this.timeline)
	node.c.animate(_tu).ease('>').attr({ fill: '#f00', stroke: '#f00', 'stroke-width': 3 }).reverse();
	delay++;
	this.hightcode(129);

	if (node.left != null) {
		this.hightcode(130);
		var pd = delay;
		node.l_l.timeline(this.timeline)
		node.l_l.animate(_tu).ease('>').attr({ stroke: '#f00', 'stroke-width': 3 }).reverse();
		delay = this._preorder_ani(node.left, delay);
		node.l_l.animate(_tu).ease('>').attr({ stroke: '#00f', 'stroke-width': 3 }).after(function () {
			this._element.attr({ stroke: '#000', 'stroke-width': 1 });
		});
	}
	if (node.right != null) {
		this.hightcode(134);
		node.r_l.timeline(this.timeline)
		node.r_l.animate(_tu).ease('>').attr({ stroke: '#f00', 'stroke-width': 3 }).reverse();
		delay = this._preorder_ani(node.right, delay);
		node.r_l.animate(_tu).ease('>').attr({ stroke: '#00f', 'stroke-width': 3 }).after(function () {
			this._element.attr({ stroke: '#000', 'stroke-width': 1 })
		});
	}
	this.hightcode(137);
	return delay;
}

BST.prototype.inorder_ani = function () {
	this.mesg = "In order : "
	this.timeline.finish()
	this._inorder_ani(this.root, 0);
}
BST.prototype._inorder_ani = function (node, delay) {
	this.hightcode(140);
	if (node == null) {
		this.hightcode(141);
		return delay;
	}

	if (node.left != null) {
		this.hightcode(142);
		node.l_l.timeline(this.timeline)
		node.l_l.animate(_tu).ease('>').attr({ stroke: '#f00', 'stroke-width': 3 }).reverse();
		delay = this._inorder_ani(node.left, delay);
		node.l_l.animate(_tu).ease('>').attr({ stroke: '#00f', 'stroke-width': 3 }).after(function () {
			this._element.attr({ stroke: '#000', 'stroke-width': 1 })
		});
	}

	this.mesg += node.element.toString() + " ";
	this.hightcode(145);
	node.c.timeline(this.timeline)
	node.c.animate(_tu).attr({ fill: '#f00', stroke: '#f00', 'stroke-width': 3 }).reverse();

	if (node.right != null) {
		this.hightcode(146);
		node.r_l.timeline(this.timeline)
		node.r_l.animate(_tu).ease('>').attr({ stroke: '#f00', 'stroke-width': 3 }).reverse();
		delay = this._inorder_ani(node.right, delay);
		node.r_l.animate(_tu).ease('>').attr({ stroke: '#00f', 'stroke-width': 3 }).after(function () {
			this._element.attr({ stroke: '#000', 'stroke-width': 1 })
		});
	}
	this.hightcode(149);
	return delay;
}

BST.prototype.postorder_ani = function () {
	this.mesg = "Post order : "
	this.timeline.finish()
	this._postorder_ani(this.root, 0);
}
BST.prototype._postorder_ani = function (node, delay) {
	this.hightcode(152);
	if (node == null) {
		this.hightcode(153);
		return delay;
	}

	if (node.left != null) {
		this.hightcode(154);
		node.l_l.timeline(this.timeline)
		node.l_l.animate(_tu).ease('>').attr({ stroke: '#f00', 'stroke-width': 3 }).reverse();
		delay = this._postorder_ani(node.left, delay);
		node.l_l.animate(_tu).ease('>').attr({ stroke: '#00f', 'stroke-width': 3 }).after(function () {
			this._element.attr({ stroke: '#000', 'stroke-width': 1 })
		});
	}
	if (node.right != null) {
		this.hightcode(157);
		node.r_l.timeline(this.timeline)
		node.r_l.animate(_tu).ease('>').attr({ stroke: '#f00', 'stroke-width': 3 }).reverse();
		delay = this._postorder_ani(node.right, delay);
		node.r_l.animate(_tu).ease('>').attr({ stroke: '#00f', 'stroke-width': 3 }).after(function () {
			this._element.attr({ stroke: '#000', 'stroke-width': 1 })
		});
	}

	this.mesg += node.element.toString() + " ";
	this.hightcode(160);
	node.c.timeline(this.timeline)
	node.c.animate(_tu).attr({ fill: '#f00', stroke: '#f00', 'stroke-width': 3 }).reverse();
	delay++;
	this.hightcode(161);
	this.hightcode(162);
	return delay;
}

BST.prototype.drawPath = function (path, col = '#f00') {
	var pl = this.draw.polyline(path).fill('none').stroke({ color: col, width: 5 }).opacity(0.3);

	pl.timeline(this.timeline)
	pl.animate(_tu).after(function () { pl.remove(); })
}

BST.prototype.animAllDone = function () {
	if (this.draw == null) return true;
	var done = true;
	this.draw.each(function (i, children) {
		if (this._timeline) {
			if (this._timeline._runners.length > 0) {
				done = false
			}
		}
	}, true);

	return done;
}

//ve cay + animation
//di chuyen nut tu vi tri cu sag x,y moi
BST.prototype.fixedPos = function (node, delay) {
	if (node == null) return;
	node.o.timeline(this.timeline)
	node.l_l.timeline(this.timeline)
	node.r_l.timeline(this.timeline)
	node.o.animate(_tu, delay, 'now').move(node.x, node.y)
	if (node.left != null) {
		node.l_l.animate(_tu, delay, 'now').plot(node.x + 15, node.y + 15, node.left.x + 15, node.left.y + 15)
		node.l_l.back()
	} else {
		node.l_l.animate(_tu, delay, 'now').plot(node.x + 15, node.y + 15, node.x + 15, node.y + 15);
	}
	if (node.right != null) {
		node.r_l.animate(_tu, delay, 'now').plot(node.x + 15, node.y + 15, node.right.x + 15, node.right.y + 15)
		node.r_l.back()
	} else {
		node.r_l.animate(_tu, delay, 'now').plot(node.x + 15, node.y + 15, node.x + 15, node.y + 15);
	}
}

//ve cay cale x,y moi
BST.prototype.fixedPosition = function (root = this.root, level = 0, x = 500, width) {
	var rx, lx;
	if (root == null) return null;
	root.x = x; root.y = (level * 80) + 10;

	if (width[level] === 'undefined') {
		width[level] = Math.max(root.x, width[level - 1]);
	} else {
		if (width[level] + 40 > root.x) {
			x = width[level] + 40;
			root.x = width[level] + 40;
			width[level] = root.x;
		} else {
			width[level] = root.x;
		}
	}
	lx = this.fixedPosition(root.left, level + 1, x - 40, width);
	rx = this.fixedPosition(root.right, level + 1, x + 40, width);
	if (lx != null && rx == null) root.x = lx + 40;
	if (lx == null && rx != null) root.x = rx - 40;
	if (rx != null && lx != null) root.x = (lx + rx) / 2;
	if (root.x < width[level]) {
		root.x = width[level];
	} else {
		width[level] = root.x;
	}
	//this.fixedPos(root);
	return root.x;
}

BST.prototype.reCenter = function () {
	if (this.root == null) return;
	this._recenter(this.root, 500 - this.root.x);
}

BST.prototype._recenter = function (node, offset) {
	if (node == null) return;
	node.x = node.x + offset;
	this._recenter(node.left, offset);
	this._recenter(node.right, offset);
}

BST.prototype.fixedPosSub = function (n, delay) {
	if (n == null) return;

	this.fixedPosSub(n.left, delay);
	this.fixedPosSub(n.right, delay);
	this.fixedPos(n, delay);

}

BST.prototype.reDrawTree = function (delay = _tu) {  /////
	var width = [];
	this.fixedPosition(this.root, 0, 500, width);
	this.reCenter();
	this.fixedPosSub(this.root, delay);
}




