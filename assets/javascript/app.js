$(document).ready(function () {

    //Starting buttons list
    var buttonList = ["Motorcycle", "Jeep", "Cars", "Boats", "Boxing", "Jiu-Jitsu", "Computers", "Dogs", "Surfing", "Outdoors"];

    //Create buttons function and append to list buttons id
    var createBtn = function () {
        $("#list-buttons").empty();

        for (var i = 0; i < buttonList.length; i++) {
            var btn = $("<button class='btn btn-primary mx-1 my-1'>" + buttonList[i] + "</button>");
            btn.attr("data", buttonList[i]);
            $("#list-buttons").append(btn);
        };
    }

    //Main process with api key
    $("#list-buttons").on("click", ".btn", function () {
        var pics = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pics + "&api_key=2BlgTwwTMrj4xE50HOorpS8vL1dWdQAs&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            //Use for loop, create div for pics and ratings paragraph, set attributes to images
            for (var i = 0; i < results.length; i++) {
                var picDiv = $("<div class='pics'>");
                var p = $("<p>");
                p.text(results[i].rating);
                var p = $("<p>").text("Rated: " + results[i].rating);
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_width_still.url);
                image.attr("still-img", results[i].images.fixed_width_still.url);
                image.attr("animate-img", results[i].images.fixed_width.url);
                image.attr("ds", "still");
                image.addClass("giffy");
                picDiv.append(image);
                picDiv.append(p);
                $("#images-show").prepend(picDiv);
            }
        })
    })

    //On click function for gifs still to animate
    $(document).on("click", ".giffy", function () {
        console.log(".giffy");
        var animation = $(this).attr("animate-img");
        var still = $(this).attr("still-img");
        var state = $(this).attr("ds");
        if (state === "still") {
            $(this).attr({
                "ds": "animate",
                src: animation
            });
        }
        else {
            $(this).attr({
                "ds": "still",
                src: still
            });
        }
    })

    //Create a submit button that adds to list with attr
    $("#submit-btn").on("click", function (e) {
        e.preventDefault();
        var newSearch = $("#text-search").val().trim();
        buttonList.push(newSearch);
        createBtn();
    });

    createBtn();

    //Place a button to reset
    $("#clear-btn").on("click", function () {
        $("#images-show").clear();
    })

});