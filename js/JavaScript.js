function fancyboxer()
{
	//rel == data-fancybox="images"
	$(".Fancy")
    .fancybox({

        openEffect	: 'elastic',
    	closeEffect	: 'elastic',
    	loop: false,
    });

    $(".fancy-video")
    .fancybox({
    	openEffect	: 'elastic',
    	closeEffect	: 'elastic',
    	loop: false,
        media:true,
    });
}

function scrollDown(el)
{
	var a = $(el).outerHeight();

	console.log('test');

	$('html, body').animate({ scrollTop: a }, 500);	

}

function showOverlay(el)
{
	let delay = 0;

	if ($('.overlays').hasClass('active')) {
 		delay = 600;
	}

	$('.overlays').removeClass('active');

	setTimeout(function() { 
       $('.overlays').addClass('active');
       $('.overlay').removeClass('active');
		$(el).addClass('active');
    }, delay);

	
}

function closeOverlay()
{
	$('.overlays').removeClass('active');
	$('.overlay').removeClass('active');
}

function DoSearch()
{
	$.ajax(
		{
			url: "/zoeken/createlink",
			dataType: 'json',
			type: 'post',
			data: {
				'data' : $("#SearchInput").val()
			},
			success: function(data)
			{
				if(data!="")
				{
					window.location = "/zoeken/"+data;
				}
				else
				{

				}
			}

		});
}


function getSearchResults($search)
{
	$("#BusySearching").show();
		$.ajax(
		{
			url: "/zoeken/get_search_result/"+$search,
		//	dataType: 'json',
			type: 'post',
			data: {

			},
			success: function(data)
			{
				$("#BusySearching").hide();
				$("#SearchResultWrapper").html(data);
			}

		});
}

function signUpForNewsLetter()
{
	$.ajax(
		{
			url: "/contact/sign_for_newsletter",
			dataType: 'json',
			type: 'post',
			data: {
				'email' : $("#EmailForNewsLetter").val()
			},
			success: function(data)
			{
				if(data.success)
				{
					$("#NewsLetterFormFooterError").hide();
					$("#NewsLetterForm").slideUp();
					$("#SuccesSignFooterForm").slideDown();
				}
				else
				{
					$("#NewsLetterFormFooterError").show();
				}
			}

		});
}

function showAddToCart()
{
	$('html, body').animate({
        scrollTop: $("header").offset().top
    }, 500, function()
	{
		$("#MiniCartWrapper").addClass("Active");
		setTimeout(function(){ $("#MiniCartWrapper").removeClass("Active"); }, 3000);
		//animate end
		$("#AmountInCart").addClass("animated bounce");
	});
}

function sisowRadio()
{
	$("#SisowPayMethods div.radio").click(function()
	{
			$("#SisowPayMethods div.radio").each(function()
			{
				$(this).removeClass("Active");
			});
			$(this).addClass("Active");
	});
}

function sliders()
{


	$(".image-slider").slick({
		autoplay:true,
		slidesToShow:1,
		prevArrow: "<i class='fa fa-angle-left prev'></i>",
		nextArrow: "<i class='fa fa-angle-right'></i>",
	});
}

function sectionOnScreen()
{
	console.log('initOnScren');
	//if(!$('section').hasClass('no-animation')) {
		$('section').onScreen({
		   container: window,
		   direction: 'vertical',
		   doIn: function() {
		   },
		   doOut: function() {
		     // Do something to the matched elements as they get off scren
		   },
		   tolerance: 0,
		   throttle: 50,
		   toggleClass: 'onScreen',
		   lazyAttr: null,
		   lazyPlaceholder: 'someImage.jpg',
		   debug: false
		})
	//}
	$("#project").removeClass('onScreen');
	$(window).scroll(function() {
		$("#project").removeClass('onScreen');
	});

	$("section:nth-child(3)").addClass("first");
}

function logo()
{
	var logo = $(".logo-container").contents();
	$(".navbar-collapse ul li:nth-child(3)").after(logo);
}

function ticket()
{
	$("section#project .ticket").addClass("closed");

	$("section#project .ticket").on('click', function() {
		if ($(this).hasClass('closed')) {
			$(this).removeClass('closed');
			$(this).addClass('open');
		} else {
			$(this).removeClass('open');
			$(this).addClass('closed');
		}
	});
}

function toTop()
{
	$(".cd-top").html('<i class="fa fa-angle-up" aria-hidden="true"></i>');
	$(window).scroll(function() {
	    if ($(document).scrollTop() > 850) {
	    	$(".cd-top").fadeIn(500);
		} else {
			$(".cd-top").fadeOut(500);
		}
	});
}

function woningLinks()
{
	$('.woning-link:contains("Woning")').each(function(){
	    $(this).html($(this).html().split("Woning").join("nr."));
	});
}

/* --------- Match Height ------ */

equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
  equalheight('.mh');
});


$(window).resize(function(){
  equalheight('.mh');
});

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

var scrollPos = 0;
var opacityVal = 0;

$(window).on('resize scroll', function() {

	// Set header background
	scrollPos = $(document).scrollTop();
    opacityVal =(Math.min(scrollPos/400,1));

    if (scrollPos > 480) {
    	$('.works-header').addClass('scrolled');
    } else {
    	$('.works-header').removeClass('scrolled');
    }

	if(scrollPos > 5) {

		$('header .menu-icon').css
		({
			'color': '#101339'
		});
		$('header .menu-icon i').css
		({
			'background': '#101339'
		});
	} else {
		$('header .menu-icon').css
		({
			'color': '#fff'
		});
		$('header .menu-icon i').css
		({
			'background': '#fff'
		});
	}

    if(opacityVal<0.9)
    {
		$('#navi').css
		({
			'background-color': 'rgba(255, 255, 255, '+ opacityVal +')'
		});




	}
	else
	{
		$('#navi').css
		({
			'background-color': 'rgba(255, 255, 255, '+ 0.9 +')'
		});
	}

    if ($('section.numbers').isInViewport()) {
        // do something
		$('section.numbers').addClass('in-viewport');
		$countingWrapper = $('[data-component="counting-numbers"]:not(.fonkel-registered)');
		if($countingWrapper.length > 0) {

			$countingWrapper.addClass('fonkel-registered');

			$countingWrapper.find('.counting').each(function(){

				let $numberElement = $(this).find('strong');
				let amountToStop = parseInt($numberElement.html());

				//$numberElement.countTo({from: 0, to: amountToStop});

				$({ Counter: 0 }).animate({ Counter: amountToStop }, {
					duration: 1000,
					easing: 'swing',
					step: function (now) {
						$numberElement.text(Math.ceil(now));
					}
				});

			});

		}

    } else {
        // do something else
		$('section.numbers').removeClass('in-viewport');
    }
});

let $fonkelTicker = $('[data-component="fonkel-ticker"]:not(.fonkel-registered');
if($fonkelTicker.length > 0) {

	$fonkelTicker.addClass('fonkel-registered');

	let sentences = [];
	$fonkelTicker.find('p').each(function() {

		sentences.push($(this).text());
	});

			var loop = true;
			if (sentences.length <= 1) {
				loop = false;
			}
			// the variable is defined
			var options = {
			  strings: sentences,
			  typeSpeed: 40,
			  loop: loop
			};

			$fonkelTicker.html('');
			var typed = new Typed('#'+$fonkelTicker.attr('id'), options);


	console.log(sentences);

}

$(document).ready(function()
{
	// fancyboxer();
	sliders();
	logo();
	sectionOnScreen();
	ticket();
	toTop();
	woningLinks();
	equalheight('.mh');

	Fancybox.bind()

	console.log('test');

	if(typeof searchfor !=="undefined")
	{
		getSearchResults(searchfor);
	}

	$('.mobileMenu').on('click', function() {
		$('.menuBox').toggleClass('active');
	});



});

