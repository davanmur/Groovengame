// var active = "BASIC";
// TEMPORARY
const BASIC = ["COLORS", "FOOD", "BODY PARTS", "SCHOOL SUBJECTS"];
const PLACES = ["COUNTRIES", "CITIES", "US CITIES"];
const POP_CULTURE = ["MOVIES", "BOOKS, FICTION", "CELEBRITIES", "VIDEO GAMES"];
const MUSIC = ["RHYTHM GAME SONGS"];

function getThemes(category) {
  let array;
  if (category === 'BASIC') {
    array = BASIC;
  } else if (category === 'PLACES') {
    array = PLACES;
  } else if (category === 'POP CULTURE') {
    array = POP_CULTURE;
  } else if (category === 'MUSIC') {
    array = MUSIC;
  }

  $("#themes-div ol").html("<li class='active'>" + array[0] + "</li>");
  for(var i = 1; i < array.length; i++) {
    $("#themes-div ol").append("<li>" + array[i] + "</li>");
  }

  $("#themes-div ol li").click(function(){
    $("#themes-div ol li").removeClass("active");
    $(this).addClass("active");
  });
}

$(document).ready(function() {

  // getThemes("BASIC");

  //buttons
  $("#catagories-div ol li").click(function(){
    $("#catagories-div ol li").removeClass("active");
    $(this).addClass("active");
    // console.log($(this).html());
    getThemes($(this).html());
  });

  $("#themes-div ol li").click(function(){
    $("#themes-div ol li").removeClass("active");
    $(this).addClass("active");
  });

});