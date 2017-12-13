let apikey = "6fe893b2";
let searchterm = "superman";
let url = "http://www.omdbapi.com/?s=" + searchterm + "&apikey=" + apikey;
let resultsplacement = $(".results-container");
let $bio = $(".bio");
let $id;

$bio.hide();

console.log(url);

$.get(url, function(data) {
  let results = data.Search;
  let seenIDs = {};

  let uniqueArray = results.filter(function(movie) {
    if (movie.imdbID in seenIDs) {
      return false;
    } else {
      seenIDs[movie.imdbID] = true;
      return true;
    }
  });

  $(uniqueArray).each(function(index, movie) {
    $("<div>")
      .attr("class", "movies")
      .attr("id", movie.imdbID)

      .click(function() {
        let $this = $(this);

        if ($this.hasClass("selected")) {
          $this.removeClass("selected");
          $bio.slideUp();
        } else {
          $(".selected").removeClass("selected");
          $this.addClass("selected");
          detailedSearch(this.id);
        }
      })

      .append(
        $("<div>")
          .attr("class", "poster")
          .append($("<img>").attr("src", movie.Poster))
      )
      .append(
        $("<div>")
          .attr("class", "title")
          .html(movie.Title + " (" + movie.Year + ")")
      )

      .appendTo(resultsplacement);
  });
});

function detailedSearch(id) {
  let moredetails = "https://www.omdbapi.com/?i=" + id + "&apikey=" + apikey;
  let itemsPerRow = 0;

  let firstMovie = $(".movies").eq(0);
  let itemTop = firstMovie.position().top;

  $(".movies").each(function(i) {
    if ($(this).position().top != itemTop) {
      itemsPerRow = i;
      return false;
    }
  });

  selectedIndex = $(".movies").index($(".selected")[0]);
  selectedRowNum = Math.floor(selectedIndex / itemsPerRow) + 1;

  if ($(".movies").eq(selectedRowNum * itemsPerRow).length) {
    detailPlacement = selectedRowNum * itemsPerRow - 1;
  } else {
    detailPlacement = (selectedRowNum - 1) * itemsPerRow - 1;
  }

  $(".bio").empty();

  $.get(moredetails, function(thismovie) {
    let results = $("<div>")
      .attr("class", "detailedlook")
      .attr("id", thismovie.imdbID)
      .append(
        $("<img>")
          .attr("src", thismovie.Poster)
          .attr("class", "detailedposter")
      )
      .appendTo($(".bio"));
  });
  $(".bio")
    .insertAfter($(".movies").eq(detailPlacement))
    .slideDown();
}

$(window).resize(function() {
  $(".bio").hide(); // hide Bio so it doesn't interfere with the flex layout during resize
  clearTimeout(window.resizedFinished);

  window.resizedFinished = setTimeout(function() {
    $(".detailedlook").on(function() {
      let tempid = $(this).attr(id);
      console.log(tempid);
    });
    detailedSearch(tempid); // show Bio again now that resize has stabilised
  }, 250);
});
