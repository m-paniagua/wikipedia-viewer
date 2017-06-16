$(document).ready(function() {
  var usrInput;
  var APIUrl;
  var link;
  
  $('#search').on('click', function(event) {
    event.preventDefault();
    clear();
    usrInput = $('#article').val();
    APIUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=' + usrInput;
    
    $.ajax({
      url: APIUrl,
      success: function(response) {
        renderHTML(response);
      }
    })
    
    $("#article").val("");
  })
  
  function clear() {
		$("#results").empty();
	}
  
  function renderHTML(data) {
    
		var htmlString = '<h3 class="center-align">Search Results</h3>';
    $.each(data.query.pages, function(key, val) {
      link = 'https://en.wikipedia.org/?curid=' + val.pageid;
      htmlString += '<a href="' + link + '" target="_blank"><div class="card-panel hoverable"><p class="title">' + val.title + '</p>';
      htmlString += '<p class="descr">' + val.extract + '</p></div></a>';
    })
		$("#results").append(htmlString);
    
	};
  
  $('#article').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
		    $('#search').click();
		    return false;  
		  }
	});
});