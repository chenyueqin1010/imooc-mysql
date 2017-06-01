$(function(){
	$('.doubanBtn').click(function(){
		var id = $('.douban').val();
		
		if(id){
			$.ajax({
				type: 'get',
				url: 'https://api.douban.com/v2/movie/subject/'+id,
				async: true,
				cache: true,
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: 'callback',
				success: function(data){
					$('#inputTitle').val(data.title);
					$('#inputDirector').val(data.directors[0].name);
					$('#inputCountry').val(data.countries[0]);
					$('#inputLanguage').val();
					$('#inputPoster').val(data.images.large);
					$('#inputYear').val(data.year);
					$('#inputSummary').val(data.summary);
				}
			});
		}
	})
})
