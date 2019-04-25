$(function() {

	$('.toggle-menu').click(function() {
		if ($('.fullscreen').is(':visible') === false) {
			$('.toggle-menu').addClass('active');
			$('.menu').fadeIn();
			$('body').addClass('popup');
			$('.menu').addClass('active');
		} else if ($('.fullscreen').is(':visible') === true) {
			$(this).removeClass('active');
			$('body').removeClass('popup');
			$('.fullscreen').removeClass('active');
			$('.video-frame__frame').attr('src', '');
			$('toggle-menu').removeClass('dark');
			setTimeout(function() {
				$('.fullscreen').fadeOut();
			}, 500)
		}
	})

	$('.nav a').click(function() {
		$('body').removeClass('popup');
		$('.fullscreen, .toggle-menu').removeClass('active');
		setTimeout(function() {
			$('.fullscreen').fadeOut();
		}, 500)
	})

	$('a.popup').click(function(e) {
		e.preventDefault();
		var target = $(this).attr('href');
		if ($(this).attr('data-src') !== null) {
			var src = $(this).attr('data-src');
			$('.video-frame__frame').attr('src', src);
			$('.toggle-menu').addClass('dark');
			console.log('src: ' + src);
		}
		console.log(target);
		$('.toggle-menu').addClass('active');
		$('.fullscreen[id = "' + target + '"]').fadeIn().addClass('active').css('z-index', '2');
	})

	function getCookie(name) {
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		}
		else
		{
			begin += 2;
			var end = document.cookie.indexOf(";", begin);
			if (end == -1) {
				end = dc.length;
			}
		}
	    // because unescape has been deprecated, replaced with decodeURI
	    //return unescape(dc.substring(begin + prefix.length, end));
	    return decodeURI(dc.substring(begin + prefix.length, end));
	} 

	function doSomething() {
		var myCookie = getCookie("cookiesAccept");

		if (myCookie == null) {
	        // do cookie doesn't exist stuff;
	        setTimeout(function() {
	        	$('.cookies').removeClass('hidden');
	        }, 3000);
	        $('.accept').click(function() {
	        	$('.cookies').addClass('hidden');
	        	document.cookie = "cookiesAccept=true";
	        })
	    }
	    else {
	        // do cookie exists stuff

	    }
	}
});
