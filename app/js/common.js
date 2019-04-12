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

	var $form = $('#mc-embedded-subscribe-form');
	if ($form.length > 0) {
		$('form input[type="submit"]').bind('click', function (event) {
			if (event) event.preventDefault()
				register($form)
		})
	}

	function register($form) {
		$('#mc-embedded-subscribe').val('Sending...');
		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize(),
			cache: false,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
			success: function (data) {
				$('#mc-embedded-subscribe').val('subscribe')
				if (data.result === 'success') {
				// Yeahhhh Success
				console.log(data.msg)
				$('#mce-EMAIL').css('borderColor', '#ffffff')
				$('#subscribe-result').css('color', 'rgb(53, 114, 210)')
				$('#subscribe-result').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
				$('#mce-EMAIL').val('')
			} else {
				// Something went wrong, do something to notify the user.
				console.log(data.msg)
				$('#mce-EMAIL').css('borderColor', '#ff8282')
				$('#subscribe-result').css('color', '#ff8282')
				$('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
			}
			console.log($form.serialize());
		}
	})
	};

});
