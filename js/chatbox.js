function getChatHistoric() {
	var historic = {
		type: 'GET',
		url: "https://asa-bot-project.herokuapp.com/chat",
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		}
	};
	var query = $.ajax(historic);

	query.done(function( data ) {
		var zone = moment.tz.guess();
		var prevDuration;
		var duration;
		for (var i = 0; i < data.length; ++i) {
			var time = data[i].time.substring(5,25);
			var m = moment.tz(time, 'Atlantic/Azores');
			if (i == 0) {
				prevDuration = m.tz(zone).fromNow();
				$('.chatbox-inside').append('<div class=\"msg-time\">'+prevDuration+'</div>');
			}
			duration = m.tz(zone).fromNow();
			if (duration != prevDuration) {
				$('.chatbox-inside').append('<div class=\"msg-time\">'+duration+'</div>');
			}
			prevDuration = duration;
			$('.chatbox-inside').append('<div class=\"chatbubble\"><p class=\'user-bubble\'>'+data[i].user+'</p></div>');
			var botBubble = '<div class=\"chatbubble\"><div class=\"bot-bubble\"><img class=\"bot-pic\" src=\"media/Sisilala-Overdrive-NIL-profile.png\" /><p class=\"bot-text\">'
			botReplies = data[i].bot.split("\n");
			for (var j = 0; j < botReplies.length; ++j) {
				$( ".chatbox-inside" ).append(botBubble+botReplies[j]+'</p></div></div>');
			}
		}
		$('.chatbox-inside').append('<div class=\"msg-time\">New messages</div>');
		$('.chatbox-inside').animate({ scrollTop: $('.chatbox-inside').get(0).scrollHeight }, 200);
	});
}

function openCloseChatbox() {
	$('div .chatbox-inside').slideToggle(400, "linear", function() {
		$('div .chatbox-inside').height(450);
	});
	$('.chatbox-inside').animate({ scrollTop: $('.chatbox-inside').get(0).scrollHeight }, 0);
}

function sendMessage() {
	// Get some values from elements on the page:
	var $form = $('#chatbox-form'),
	msg = $form.find( "input[name='message']" ).val(),
	url = $form.attr( "action" );

	$form.find("input[name='message']").val("");

	$('div .chatbox-inside').show();
	$('.chatbox-inside').append('<div class=\"chatbubble\"><p class=\'user-bubble\'>'+msg+'</p></div>');
	$('.chatbox-inside').animate({ scrollTop: $('.chatbox-inside').get(0).scrollHeight }, 200);

	var post = {
	  type: 'POST',
	  url: $form.attr( "action" ),
	  crossDomain: true,
	  data: { message: msg},
	  xhrFields: {
	    	withCredentials: true
		}
	};
	var posting = $.ajax(post);

	var botBubble = '<div class=\"chatbubble\"><div class=\"bot-bubble\"><img class=\"bot-pic\" src=\"media/Sisilala-Overdrive-NIL-profile.png\" /><p class=\"bot-text\">'

	// Put the results in a div
	// TODO: Check if posting failed
	posting.done(function(data) {
		data = data.split("\n");
		var i = 0;
		(function displayBotMessages() {
		    $( ".chatbox-inside" ).append(botBubble+data[i]+'</p></div></div>');
		    $('.chatbox-inside').animate({ scrollTop: $('.chatbox-inside').get(0).scrollHeight }, 200);
		    if (++i < data.length) {
		        setTimeout(displayBotMessages, 1500);
		    }
		})();
	});
}

