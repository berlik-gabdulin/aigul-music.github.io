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
			console.log('src: ' + src);
		}
		console.log(target);
		$('.toggle-menu').addClass('active');
		$('.fullscreen[id = "' + target + '"]').fadeIn().addClass('active').css('z-index', '2');
	})

	if (document.cookie != "cookiesAccept=true") {
		setTimeout(function() {
			$('.cookies').removeClass('hidden');
		}, 3000);
		$('.accept').click(function() {
			$('.cookies').addClass('hidden');
			document.cookie = "cookiesAccept=true";
		})
	}

});
