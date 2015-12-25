//一些全局和公用的配置
;
(function(window, Kami) {

	window.Panel = Kami.Panel; //全局Panel


	////////////config start//////////////////////////////

	//	var config = {
	//		apiurl: "http://www.guopu.com:8071",
	//		appkey: "49BA59ABBE56E057"
	//	}; //本机
    var config = {
        apiurl: "http://115.230.126.33:8071"
		//apiurl: "http://192.168.3.50:8014"
			//,apiurl: "http://www.guopu.com:8071"
			,
		appkey: "49BA59ABBE56E057",
		appurl: '/share/shareapp' //app下载地址
			,
		imgholder: '/img/img_holder.png'
	}; //本机

	// var config = { apiurl: "/API", appkey: "49BA59ABBE56E057" }; //本机
	// var config = { apiurl: "http://192.168.3.53", appkey: "49BA59ABBE56E057" };//PRE
	// var config = { apiurl: "http://192.168.3.53:8017", appkey: "49BA59ABBE56E057" };//QA
	config.getUrl = function(action) {
		return this.apiurl + action + "?appkey=" + this.appkey + "&t=" + Math.random();
	}
	window.config = config;
	/////////////////////config end////////////////////////////////////////////

	////////////////////// CommonFun Start/////////////////////////////////////////////////////
	var CommonFun = {};
	//app下载
	function downloadApp() {
		//return;
		window.location.href = config.appurl;
	}
	//Panel Rsize
	function panelResize(panel, time) {
		var time = time || 200;
		setTimeout(function() {
			panel.resize();
		}, time);
	}

	//处理星星
	function StartList(number) {
		var number = number >= 10 ? 10 : number;
		var List = [];
		var count = parseInt(number / 2)
		for (var i = 0; i < count; i++) {
			List.push(1);
		}
		if (number % 2 == 1) {
			List.push(0);
		}
		var l = List.length;
		for (var i = l; i < 5; i++) {
			List.push(-1);
		}
		return List;
	}
	//图片出错后，加载占位图。
	function imagePlace() {
		var img = event.srcElement;
		img.src = "/img/img_holder.png";

		img.style.backgroundColor = "#f5f5f5";
		//img.style.backgroundImage="/img/img_holder.png";
		img.onerror = null; //防止循环触发
	}

	//购物车抛物线效果
	//点击抛物线效果
	function showRedBall(redball, shopcar, fn) {
		// 抛物线运动
		var myParabola = funParabola(redball, shopcar, {
			speed: 240, //抛物线速度
			curvature: 0.01, //控制抛物线弧度
			complete: function() {
				redball.style.visibility = "hidden";
				if (fn) {
					fn.call(this);
				}

			}
		});
		// 滚动大小
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
		redball.style.left = event.clientX + scrollLeft + "px";
		redball.style.top = event.clientY + scrollTop + "px";
		redball.style.visibility = "visible";
		// 需要重定位
		myParabola.position().move();
	}

	
	CommonFun = {
		downloadApp: downloadApp,
		panelResize: panelResize,
		StartList: StartList,
		imagePlace: imagePlace,
		showRedBall: showRedBall
	};
	window.CommonFun = CommonFun;

	////////////////////// CommonFun End/////////////////////////////////////////////////////  

	////////////////////// PanelFactory Start/////////////////////////////////////////////

	////////////////////// PanelFactory End/////////////////////////////////////////////

})(window, Kami);