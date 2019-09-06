$(document).ready(function() {

  $(".search-results").hide();
  $('#search-bar').keyup(function() {
    if ($(this).val().length != 0) {
      $(".search-results").show(); // unhide results div
    } else {
      $('.search-results').hide(); // hide results div  
      $(".search-results").empty(); // clear all results			
    }
  });

  $("#search").submit(function(event) { // submiting search form
    $(".search-results").empty();

    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts%7Cinfo&generator=search&pilimit=10&exsentences=10&exlimit=10&exintro=1&inprop=url&gsrsearch=" + $("#search-bar").val() + "&gsrlimit=10&pithumbsize=200&callback=?";

    $.getJSON(url, function(data) { // making request

      try {
        var pages = data.query.pages;
      } catch (e) {
        console.log(e);
      }

      if (typeof pages === 'undefined') {
        $(".search-results").append('<div class="alert alert-danger"> <strong>Sorry!</strong> We didn\'t find any results matching this criteria.</div>');
        $(".alert").effect("slide", "slow");
      } else {

        $.each(pages, function(index, element) { // show results

          $(".search-results").append('<a href="' + element.fullurl + '" target="_blank"><div class="wiki-card"><h3>' + element.title + '</h3><p>' + element.extract + '</p></div></a>');

        });
        $(".wiki-card").effect("slide", "slow");
      }
    });
    event.preventDefault();
  });
});