jQuery(document).ready(function($) {

			//Anomation at load -----------------
			Pace.on('done', function(event) {

			});//Pace


			


			$('*[data-toggle="tooltip"]').tooltip();
			//Nav Menu for Bootstrap-------------->
				$(".jqueryslidemenu ul.nav > li .children, .jqueryslidemenu ul.nav > li .sub-menu").each(function(index) {
				    $(this).parent("li").addClass("dropdown");
				    $(this).prev("a").addClass("dropdown-toggle").attr('data-toggle', 'dropdown').append('<b class="caret"></b>');
				    $(this).addClass("dropdown-menu");
				});
			//Nav Menu for Bootstrap-------------->

			$('#nav .dropdown').hover(function() {
				$(this).find('.dropdown-menu').first().stop(true, true).delay(10).slideDown();
				}, function() {
				$(this).find('.dropdown-menu').first().stop(true, true).delay(10).slideUp();
			});

			//Sidebar Menu Function
			$('#sidebar .widget ul li ul').parent().addClass('hasChildren').children('a').append("<i class='fa fa-angle-down' />");
			var children;
			$("#sidebar .widget ul li").hoverIntent(
				  function () {
					children = $(this).children("ul");
					if($(children).length > 0){
							$(children).stop(true, true).slideDown('fast');	   
					}
				  }, 
				  function () {
					  $(this).children('ul').stop(true, true).slideUp(10);
				  }
			);

});