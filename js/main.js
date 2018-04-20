/**
 * jTinder initialization
 */
var liked = 0;
var disliked = 0;
var totalSlides = $("#tinderslide ul").children().length;
var remainingSlides = $("#tinderslide ul").children().length;

$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        $('#status').html((item.index())+ " MORE SWIPES.");
				disliked++;
				remainingSlides--;
				console.log("disliked: " + disliked);
				checkIfDone();
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        $('#status').html((item.index())+ " MORE SWIPES.");
				liked++;
				remainingSlides--;
				console.log("liked: " + liked);
				checkIfDone();
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});

/**
 * Watch and load results when all cards have been swiped.
 */
function checkIfDone(){
	if(remainingSlides === 0 | remainingSlides < 0){
		console.log("DONE");
		$("#quiz").css("display", "none");
		$("#results").css("display", "block");
		var totalAgainstNN = liked/totalSlides*100;
		if (totalAgainstNN >= 50.0){
			$("#foragainst").text("for");
			$("#foragainst2").text("for");
			$("#magicNum").text(Math.round(totalAgainstNN));
			$("#folksAgainstNN").css("display", "block");
		} else {
			$("#foragainst").text("against");
			$("#foragainst2").text("against");
			$("#magicNum").text(Math.round(100-totalAgainstNN));
			$("#folksForNN").css("display", "block");
		}
	}
}
