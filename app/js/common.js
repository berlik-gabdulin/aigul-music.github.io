$(function() {

	$('.toggle-menu').click(function() {
		if ($('.fullscreen').is(':visible') === false) {
			$('.menu').fadeIn();
			$(this).addClass('active');
			$('.menu').addClass('active');
			$('body').addClass('popup');
		} else if ($('.fullscreen').is(':visible') === true) {
			$('.fullscreen').fadeOut().removeClass('active');
			$(this).removeClass('active');
			// $('.fullscreen')
			$('body').removeClass('popup');
		}
	})

	$('a.popup').click(function(e) {
		e.preventDefault();
		if ($(this).attr('data-src')) {

		} else {
			var target = $(this).attr('href');
			console.log(target);
			$('.toggle-menu').addClass('active');
			$('.fullscreen[id = "' + target + '"]').fadeIn().addClass('active').css('z-index', '2');
		}
	})

});
