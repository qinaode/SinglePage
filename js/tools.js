;
(function(window) {
	var request = {};
	request.QueryString = function(name) {
		var svalue = location.search.match(new RegExp('[\?\&]' + name + '=([^\&]*)(\&?)', 'i'));
		return svalue ? svalue[1] : svalue;
	}
	window.request = request;
	/////////////////////////////
	var storage = {};
	//根据key得到存储对象.
	storage.getJsonObj = function(key) {
			return JSON.parse(localStorage.getItem(key)) || {}; //防止直接返回null
		}
		//根据key存储对象.如果key已经存在则合并属性.
	storage.setJsonObj = function(key, obj) {
			var jsonObj = this.getJsonObj(key); //旧
			if (jsonObj != null) {
				for (var k in obj) {
					jsonObj[k] = obj[k]; //合并属性
				}
				obj = jsonObj;
			}
			this.addJsonObj(key, obj);
			return obj; //返回存储的对象。
		}
		//根据key存储对象.(此函应该改进成私有 没必要暴露给外界访问)
	storage.addJsonObj = function(key, obj) {
			this.remove(key);
			localStorage.setItem(key, JSON.stringify(obj)); //只能存字符串数据
		}
		//  storage.clearJsonObj=function(key){
		//  	
		//  }
	storage.clear = function() {
		localStorage.clear();
	};
	storage.remove = function(key) {
		localStorage.removeItem(key);
	};
	window.storage = storage;


})(window, undefined)

/**
 * 获取当前月的第一天
 */
function getCurrentMonthFirst() {
	var date = new Date();
	date.setDate(1);
	return date;
}
/**
 * 获取当前月的最后一天
 */
function getCurrentMonthLast() {
	var date = new Date();
	var currentMonth = date.getMonth();
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
	var oneDay = 1000 * 60 * 60 * 24;
	return new Date(nextMonthFirstDay - oneDay);
}

var Validate = {};
Validate.Mobile = function(mobile) {
	return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(mobile);
}

Array.prototype.remove = function(obj) {
	for (var i = 0; i < this.length; i++) {
		var temp = this[i];
		if (!isNaN(obj)) {
			temp = i;
		}
		if (temp == obj) {
			for (var j = i; j < this.length; j++) {
				this[j] = this[j + 1];
			}
			this.length = this.length - 1;
		}
	}
}