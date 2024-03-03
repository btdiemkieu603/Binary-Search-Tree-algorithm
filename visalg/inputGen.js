function inputGen(idtxt,fun,dtime) {
	this.idtxt = idtxt;
	this.func = fun;
	this.mesg = " ";
	this.butt = null;
	
	this.inputA = null;
	this.interval = null;
	this.dtime = dtime * 3;
	this.count = 0;

	this.end  = 0;
	this.isCountUp = true;
	this.countloop = 0;
	
	var _self = this;
	
	this._run = function () {
		if (_self.count >= _self.inputA.length) {
			clearInterval(_self.interval);
			_self.interval = null;
			 document.getElementById(_self.idtxt).disabled = false;
			return true;
		}
		var num = parseInt(_self.inputA[_self.count]);
		_self.count++;
		if (isNaN(num)) {
			_self.mesg = _self.inputA[_self.count].toString() + "is not integer";
			return false;
		}
		return _self.func(num);
	};
	
	this._runloop = function () {
		var res = _self.func(_self.countloop);
		if(_self.isCountUp) {
			_self.countloop++;
			if (_self.countloop > _self.end) {
				clearInterval(_self.interval);
				_self.interval = null;
				document.getElementById(_self.idtxt).disabled = false;
			}
			return res;
		} else {
			_self.countloop--;
			if (_self.countloop < _self.end) {
				clearInterval(_self.interval);
				_self.interval = null;
				document.getElementById(_self.idtxt).disabled = false;
			}
			return res;
		}
	};

}

inputGen.prototype.run = function (butt) {
	var ptxt = document.getElementById(this.idtxt);
	// toggle running timmer to off
	if( this.interval != null ) {
			clearInterval(this.interval);
			this.interval = null;
			ptxt.disabled = false;
			return true;
	}
	
	var val = ptxt.value.trim();
	
	// check empty string 
	if (val == "") {
		this.mesg = "No key entered";
		return false;
	}
	// consume txt
	//ptxt.value = "";
	
	this.inputA = val.split(/\s+/);	
	var hasRange = val.indexOf(":") != -1;
	this.count = 0;

	if (this.inputA.length == 1 && !hasRange) {	//most common do this first and return;
		var num = parseInt(this.inputA[0]);
		ptxt.value = "";
		if (isNaN(num)) {
			this.mesg = inputA[0].toString + " is not integer";
			return false;
		}
		this.func(num);		
		return true;
	}
	
	//dau vao khong co pham vi
	if (!hasRange) {
		
		//chuyen doi trang thai dung or chay
		if (this.interval == null) {
			// start _run
			this._run();
			this.interval = setInterval( this._run , this.dtime);
			ptxt.disabled = true;
			return true;
		}
	} else {
		
		//lay pham vi
		var inputs = val.split(':');
		var num1 = parseInt(inputs[0]);
		var num2 = parseInt(inputs[1]);
		if (isNaN(num1) || isNaN(num2)) {
			this.mesg = inputs[0] + " or " + input[1] + " is not integer";
			return false;
		}

		if (num1 == num2) {
			return this.func(num1);
		}
		
		this.end = num2;
		this.isCountUp = num1 <= num2 ? true : false;
		this.countloop = num1;

		if (this.interval == null) {
			// start _run
			this._runloop();
			this.interval = setInterval( this._runloop , this.dtime);
			ptxt.disabled = true;
			return true;
		}
		return true;
	}
	
	this.mesg = "Check input format"
	return false;
}
