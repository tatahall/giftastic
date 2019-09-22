console.log("I'm linked.")

//create variable called topics.
//theme is comfort foods.
let topics = ["ice cream", "milkshake", "chocolate", "potato chips", "donuts", "caramel candy", "cheeseburger", "pizza", "apple pie", "chocolate cake"]

//create for loop for buttons to display in the 
function buttonsDisplay() {
    $("#food-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        button.addClass("btn btn-primary");
        button.attr("data-name", topics[i]);
        console.log(button)
        $("#food-buttons").append(button);
    }
}
buttonsDisplay();

//create event for ratings to display.
$(document).on("click", "button", function () {
    $("#gif-stuff").empty();
    //create variable to get food attribute.
    var food = $(this).attr("data-name");

    //create variable to declare the query for the api call.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=A8IrCY5VBHgvwHIaWBOZLlG8PuotnEio&limit=10";

    //create ajax request for the query URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            //create variable to store the data from the ajax
            var results = response.data;
            console.log(queryURL)
            console.log("response: " + response);


            //create looping for each response
            for (var i = 0; i < results.length; i++) {
                var foodDiv = $("<div class'food-div'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                console.log(p)

                //create image tag
                var foodImage = $("<img>");
                foodImage.addClass("gifs")
                foodImage.attr("src", results[i].images.fixed_height_still.url);
                foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                foodImage.attr("data-animate", results[i].images.fixed_height.url);
                foodImage.attr("data-state", "still");

                //add the rating to the page.
                //add the food image to the page.
                foodDiv.append(p);
                foodDiv.append(foodImage);

                //add the rating and food image to the page in the food div.
                $("#gif-stuff").prepend(foodDiv);
            }
        })
})

//create event to allow user to add buttons for search.
$("#add-food").on("click", function (event) {
    event.preventDefault();
    var newFood = $("#cf-input").val().trim();
    topics.push(newFood);
    buttonsDisplay();
})
//click event needs to work to animate the gifs.

$(document).on("click", ".gifs", function(){
var state =$(this).attr("data-state");
console.log("state: " + state);

//state should change if image is clicked
if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})
