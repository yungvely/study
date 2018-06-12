var sum = function (a,b) {
	var c = a+b;
	return c;
};

console.log(sum(10,20));



var person = {
	name: 'John',
	fullName: function () {
		console.log(this.name);
	}
},
myObject = {
	name: 'me'
};

person.fullName.call(myObject);
console.log('??',Function.prototype);


var gallery = function () {
	console.log('다음시간');
}

var clearld = setTimeout(gallery,1000);

clearTimeout(clearld);
// ??????


var count = 1;
var gallery = function () {
	console.log('next');
	if(count == 5){
		clearInterval(clearld2);
	}
	count+=1;
}


var clearld2 = setInterval(gallery,1000);


var this_myObject = {
    name : 'foo',
    sayName : function () {
        console.log(this.name);
    }
};

var otherObject = {
    name : 'bar'
};

otherObject.sayName = this_myObject.sayName;

this_myObject.sayName();
otherObject.sayName();



var test = 'this is test';
console.log(window.test);

var sayFoo = function () {
    console.log(this.test);
};
sayFoo();




var value = 100;

var test_myObject = {
    value : 1,
    func1 : function () 
    {
    	var _this = this;
        _this.value += 1;
        console.log('_this.value1 + ',_this.value);

        func2 = function () {
            _this.value += 1;
            console.log('_this.value2 + ',_this.value);

            func3 = function () {
                _this.value += 1;
                console.log('_this.value3 + ',_this.value);
            }
            func3();
        }
        func2();
    }
};
test_myObject.func1();



var this_Person = function (name) {
    this.name = name;
};

var foo = new this_Person('foo');
console.log(foo.name);




var obj = {
    init : function () {
        this.bindEvents();
    },
    bindEvents : function () {
        $(window).on('load', $.proxy(this.onLoadFunc, this));
    },
    onLoadFunc : function (callback) {
        if (callback) {
            this.callbackFunc();
        }
    },
    callbackFunc : function () {
        console.log(2);
    }
}
obj.init();
