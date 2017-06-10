// declare array of button names
var topics = [ 	"The Doors",
			   	"The Who",
			   	"Led Zeppelin",
			   	"Jimi Hendrix",
				"Pink Floyd",
			    ];
function createButtons(){
	var $gifButtons = $('.gifButtons');
	// empty out existing buttons
	$gifButtons.empty();
	// build jquery button object and append
	$.each(topics, function(index, value) {
		var $itemButton = $('<button>')
					.attr("data-band", value)
					.text(value)
					.addClass("btn btn-default gifButton")
					.on("click", clickGifButton)
					.appendTo($gifButtons);			
	})
};
function clickGifButton() {
	// button element that makes ajax call giphy api, builds jquery image objects
	var search = $(this).data('band');
	//changes space to + in search bar
	search = search.replace(/ /g, "+");
	// ajax call to giphy api to grab new gifs
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search",
		data: {
			limit: 13,
			api_key: "dc6zaTOxFJmzC",
			q: search
		},
		method: 'GET'})
			.done(function(response) {
				var results = response.data;
				var gifHolder = $('.gifImages');
				// clear out old gifs
				gifHolder.empty();
				$.each(results, function(key) {
					// build the bandDiv
					var $bandDiv = $('<div>').addClass("bandImage");
					// ratings for images
					var $rating = $('<p>').text(results[key].rating + "-rated").addClass("rating");
					// build bandImage and include the function for clicking to start/stop gif movement		
					var $bandImage = $('<img>').attr('src', results[key].images.fixed_height_still.url)
												  .attr('data-still', results[key].images.fixed_height_still.url)
												  .attr('data-animate', results[key].images.fixed_height.url)
												  .attr('data-state', 'still')
												  .addClass('img-responsive')
												  .on('click', function(){
												      var state =  $(this).data('state');
													  if (state == 'still') {
														$(this).data('state', 'animate');
														$(this).attr('src',  $(this).data('animate'));
													  } 
													  else {
														$(this).data('state', 'still');
														$(this).attr('src',  $(this).data('still'));                
													  }
												});
					$bandDiv.append($rating);
					$bandDiv.append($bandImage);
					gifHolder.append($bandDiv);
				});
			});
    };
// on click function to submit and create new button
$("#addButton").on("click", function(){
	var txtInput = $("#addButtonText").val().trim();
	// create check to make sure button not already exist and text 
	// is entered before adding to topics array
	if (topics.indexOf(txtInput) == -1 && txtInput.length > 0 ) {
			topics.push(txtInput);
			$('#addButtonText').val("");
			$('#addButtonText').focus();
			createButtons();
	} 
	return false;
});
//create document.ready function to call the createButtons function										
$(document).ready(function() { 
	createButtons();
});