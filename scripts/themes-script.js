function getThemes(category) {
  $.ajax({
    url: "./scripts/categories.json",
    dataType: "json",
    success: function (data) {
      $.each(data, function(area, categoryList) {
        if (area === category) {
          var array = categoryList.split(",");

          $("#categories-div ol").html("<li id='" + array[0] + "' class='active'>" + array[0].replace(/_/g, ' ').toUpperCase() + "</li>");
          for(var i = 1; i < array.length; i++) {
            $("#categories-div ol").append("<li id='" + array[i] + "' >" + array[i].replace(/_/g, ' ').toUpperCase() + " </li>");
          }

          $("#categories-div ol li").click(function(){
            $("#categories-div ol li").removeClass("active");
            $(this).addClass("active");
          });
        }
      });
    },
    error: function (err) {
      console.log("ERROR: " + err.status);
    }
  });
}

$(document).ready(function() {

  getThemes("basic");

  //buttons
  $("#areas-div ol li").click(function(){
    $("#areas-div ol li").removeClass("active");
    $(this).addClass("active");
    // console.log($(this).html());
    getThemes($(this).attr("id"));
  });

  $("#categories-div ol li").click(function(){
    $("#categories-div ol li").removeClass("active");
    $(this).addClass("active");
  });

});