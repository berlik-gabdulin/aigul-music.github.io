$(function() {

	let x = 0;
	$('.toggle-menu').click(function() {
		if (x == 0) {
			$(this).addClass('active');
			// $('menu').addClass('active');
			$('.menu').fadeIn();
			x = 1;
		} else if (x == 1) {
			$(this).removeClass('active');
			// $('menu').removeClass('active');
			$('.menu').fadeOut();
			x = 0;
		}
	})

});
