
  "use strict";
  var $ = jQuery;
  /*carouselservice*/
  function carouselservice(){
    $('.carousel-service').owlCarousel({
      dots : false,
      margin: 30,
      loop: true,
      autoplay: 5000,
      addClassActive : true,
      responsive:{
        0:{
          items:1
        },
        768:{
          items:3
        }
      },
    });
  }

//Google Map
function initialize(){
  var mapCanvas = $('.map');
  
  mapCanvas.each(function (){
	var $this           = $(this),
			zoom            = 8,
			lat             = -40.7127,
			lng             = 74.0059,
			scrollwheel     = false,
			draggable       = true,
			mapType         = google.maps.MapTypeId.ROADMAP,
			title           = '',
			contentString   = '';
		
	if ($this.data('zoom')){
	  zoom = parseFloat($this.data('zoom'));
	}

	if ($this.data('lat')){
	  lat = parseFloat($this.data('lat'));
	}
	
	if ($this.data('lng')){
	  lng = parseFloat($this.data('lng'));
	}
	
	if ($this.data('scrollwheel')){
	  scrollwheel = $this.data('scrollwheel');
	}
	
	if ($this.data('type')){
	  if ($this.data('type') == 'satellite'){
			mapType = google.maps.MapTypeId.SATELLITE;
	  } else if ($this.data('type') == 'hybrid'){
			mapType = google.maps.MapTypeId.HYBRID;
	  } else if ($this.data('type') == 'terrain'){
			mapType = google.maps.MapTypeId.TERRAIN;
	  }
	}
	
	if ($this.data('title')){
	  title = $this.data('title');
	}
	
	if( navigator.userAgent.match(/iPad|iPhone|Android/i) ){
	  draggable = false;
	}

	var mapOptions = {
	  zoom              : zoom,
	  scrollwheel       : scrollwheel,
	  draggable         : draggable,
	  center            : new google.maps.LatLng(lat, lng),
	  mapTypeId         : mapType,
	  streetViewControl : false
	};
  
	var map = new google.maps.Map($this[0], mapOptions);
	
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var image = ( is_internetExplorer11 ) ? 'img/point.png' : 'img/svg/point.svg';
	
	if ($this.data('content')){
	  contentString = '<div class="map-content">' +
		'<h3 class="title">' + title + '</h3>' +
		$this.data('content') +
	  '</div>';
	}

	var infowindow = new google.maps.InfoWindow({
      content: contentString
	});
	
	var marker = new google.maps.Marker({
	  position : new google.maps.LatLng(lat, lng),
	  map      : map,
	  icon     : image,
	  title    : title
	});
	
	if ($this.data('content')){
	  google.maps.event.addListener(marker, 'click', function(){
			infowindow.open(map,marker);
	  });
	}
	var styles = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#444444"
        }
      ]
    },
    {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f2f2f2"
      }
    ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        }
      ]
    },
    {
	    "featureType": "road.highway",
	    "elementType": "all",
	    "stylers": [
        {
          "visibility": "simplified"
        }
	    ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
	    "featureType": "water",
	    "elementType": "all",
	    "stylers": [
        {
          "color": "#46bcec"
        },
        {
          "visibility": "on"
        }
	    ]
    }
  ];
	map.setOptions({styles: styles});
  });
}

function loadScript(){
  var script      = document.createElement('script');
		script.type = 'text/javascript';
		script.src  = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
	
  document.body.appendChild(script);
}

/*carouselteam()*/
function carouselteam(){
	var $this   = $('.carousel-team'),
		visible = 5,
		mdcol   = $('.container').width()/3;

	$this.each(function() {
		var $this = $(this);
		
		if ($('body').width() >= 768) {
			$this.trigger('destroy');
			visible = 5;
		} else {
			$this.trigger('destroy');
			visible = 3;
			mdcol = $('.container').width();
		}
	
		var cssSmall = {
			width: 140,
			height: 300,
		};

		var cssLarge = {
			width: mdcol,
			height: 300,
			marginTop: 0
		};

		var aniConf = {
			queue: false,
			duration: 500
		};
	
		if ($('body').width() >= 768) {
			$this
				.children().css(cssSmall)
				.eq(1).css(cssLarge)
				.next().css(cssLarge)
				.next().css(cssLarge)
				.next().css(cssSmall);
		} else {
			$this
				.children().css(cssSmall)
				.eq(1).css(cssLarge)
				.next().css(cssSmall);
		}
	
		$this.carouFredSel({
			width: '100%',
			items: {
				visible: visible,	
			},
			auto: false,
			scroll: {
				items: 1,
				duration: aniConf.duration,
			},
			onCreate: function (data){
				data.items.removeClass('last');
				data.items.addClass('active');
				data.items.first().addClass('first');
				data.items.last().addClass('last');
			},
			prev: {
				button: function() {
				return $(this).parent().siblings(".prev");
				},
				onBefore: function( data ) {				
					data.items.old.removeClass('active');
					data.items.visible.addClass('active');
					data.items.old.removeClass('first').removeClass('last');
					data.items.visible.first().addClass('first');
					data.items.visible.last().addClass('last');
					if ($('body').width() >= 768) {
						data.items.old.eq(-1).animate(cssSmall, aniConf);
						data.items.old.eq(0).animate(cssLarge, aniConf);
						data.items.old.eq(1).animate(cssLarge, aniConf);
						data.items.old.eq(2).animate(cssLarge,  aniConf);
						data.items.old.eq(3).animate(cssSmall, aniConf);
					} else {
						data.items.old.eq(-1).animate(cssSmall, aniConf);
						data.items.old.eq(0).animate(cssLarge, aniConf);
						data.items.old.eq(1).animate(cssSmall, aniConf);
					}
				}
			},
			next: {
				button: function() {
					return $(this).parent().siblings(".next");
				},
				onBefore: function( data ) {				
					data.items.old.removeClass('active');
					data.items.visible.addClass('active');
					data.items.old.removeClass('first').removeClass('last');
					data.items.visible.first().addClass('first');
					data.items.visible.last().addClass('last');
					if ($('body').width() >= 768) {
						data.items.old.eq(1).animate(cssSmall, aniConf);
						data.items.old.eq(2).animate(cssLarge, aniConf);
						data.items.old.eq(3).animate(cssLarge, aniConf);
						data.items.old.eq(4).animate(cssLarge, aniConf);
						data.items.old.eq(5).animate(cssSmall, aniConf);
					} else {
						data.items.old.eq(1).animate(cssSmall, aniConf);
						data.items.old.eq(2).animate(cssLarge, aniConf);
						data.items.old.eq(3).animate(cssSmall, aniConf);
					}
				},
			},
		}).touchwipe({
			wipeLeft: function(){
				$this.trigger('next', 1);
			},
			wipeRight: function(){
				$this.trigger('prev', 1);
			},
			preventDefaultEvents: false
		});
	});
}

/*social*/
var toggleFlag = false;
var toggle;

function toggleInterval(){
	toggleFlag = false;
	clearTimeout(toggle);
}

/*social*/
function social() {
	$('.social-links').hide();
	if ( $('body').width() > 1080 ) {
	  $('.social-links').removeClass('fadeOutLeftBig').addClass('fadeOutRightBig');
	}
	else {
		$('.social-links').removeClass('fadeOutRightBig').addClass('fadeOutLeftBig');
	}
  $('.soc-link').on('click', function(event){
    var target = $(event.target);
    $('.social-links').show();
 		if ( $('body').width()> 1080 ) {
  	 	if (target.hasClass('soc-link-img') && !toggleFlag) {
      	$('.social-links').toggleClass('fadeOutRightBig fadeInRightBig');
      	toggleFlag =true;
      	toggle = setTimeout(toggleInterval,100);
        return false;
      } 
 		}
		else {
	    if (target.hasClass('soc-link-img')  && !toggleFlag) {
	    	$('.social-links').toggleClass('fadeOutLeftBig fadeInRightBig');
	    	toggleFlag =true;
		    toggle = setTimeout(toggleInterval,100);
	      return false;
	    } 
		}
  });
}

 /*layout()*/
function layout() {  
	var heightcontent=$('body').height()-350-$('.impala').height();
	if ( heightcontent < 0 ) {
		$('.copyright-block').css('position','static');
		$('.impala-home').css({'height':'auto'});
		$('.impala').css({'display':'block', 'padding-bottom': '60px'});
	 		if ( $('body').width() > 768 && $('body').width() < 1080 ) {
	 			$('.social-block, .copyright-block ').css('position','static');
	 		}
		else {
			$('.social-block ').css('position','absolute');
		}
	}
	else {
		$('.copyright-block').css('position','absolute');
		$('.impala-home').css({'height':'100%'});
	 	$('.impala').css({'display':'table-cell', 'padding-bottom': '175px'});
 		if ( $('body').width() > 768 && $('body').width() < 1080 ) {
 			$('.social-block, .copyright-block ').css('position','absolute');
 		}
	}
}

  /*.svg to svg */
function imgtosvg() {     
  $('img.svg').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
      var $svg = $(data).find('svg');
      if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
      }
      $svg = $svg.removeAttr('xmlns:a');
      $img.replaceWith($svg);

    }, 'xml');
  });
}  

/*navigationcontent*/
function navigationcontent(){
	$('.btn-nav').on( "click", function(e) {
		var impalapage = $('.impala-page'),
		nextPanelName = $(this).attr('href'),
		nextPanel = $(nextPanelName),
		currentPanel= $('.page-current');
		e.preventDefault();
		currentPanel.scrollTop(0);	
		if($(this).hasClass("btn-prev")){
	    currentPanel.addClass('slideOutRight');
	    nextPanel.addClass('slideInLeft');
	    impalapage.removeClass('page-current');
			nextPanel.addClass('page-current');
			setTimeout(function() {
	      impalapage.removeClass('slideInLeft');
			}, 600);
		}
		if($(this).hasClass( "btn-next" )){
	      currentPanel.addClass('slideOutLeft');
	      nextPanel.addClass('slideInRight');
				impalapage.removeClass('page-current');
				nextPanel.addClass('page-current');
				setTimeout(function() {
		      impalapage.removeClass('slideInRight');
				}, 600);
		}
		if(currentPanel.hasClass("impala-prev")){
			impalapage.removeClass('slideOutRight');
		    currentPanel.addClass('slideOutLeft');
		    nextPanel.addClass('slideInRight');
				setTimeout(function() {
					impalapage.removeClass('page-current');
					nextPanel.addClass('page-current');
		      impalapage.removeClass('slideOutLeft');
		      impalapage.removeClass('slideInRight');
				}, 600);
		}
		if(currentPanel.hasClass("impala-next")){
			impalapage.removeClass('slideOutLeft');
		    currentPanel.addClass('slideOutRight');
		    nextPanel.addClass('slideInLeft');
				setTimeout(function() {
      		impalapage.removeClass('page-current');
			    nextPanel.addClass('page-current');
		      impalapage.removeClass('slideOutRight');
		      impalapage.removeClass('slideInLeft');
				}, 600);
		}
	});
}

var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
$(document).ready(function(){
	navigationcontent();
	carouselservice();
	carouselteam();
	imgtosvg();
	social();
  if($('.impala').length) {
    layout();
  }
  if($('.image-link').length) {
   	$('.image-link').magnificPopup({type:'image'});
  }


/*IE*/
  var ua = navigator.userAgent;
	  if ((ua.match(/MSIE 10.0/i))) {
	    $('.block-nav').addClass('ie');
	  } 
	  else if((ua.match(/rv:11.0/i))){
	     $('.block-nav').addClass('ie');
	  }

  //Notify Me
	function resetForm(e){
		isSend = true;
		if(e.keyCode !== 13){
	  		resetFormError($('.text-danger'));
	  		$(this).off('keydown');
	  	}else{
	  		$('.notify-me').trigger('submit');
	  	}
	 }

	function resetFormError(message, interval){
	  	interval = interval || 500;
	  	$('.form-control').css('color',"#fff");
	  	message.fadeOut(interval);
		setTimeout(function(){
			message.removeClass('text-danger');
			newQuery = true;
		}, interval);
	 }

	var isSend = true;
	var newQuery = true;

	$('.notify-me').submit(function(e){
		var form           = $(this),
			message        = form.find('.form-message'),
			messageSuccess = 'Your email is sended',
			messageInvalid = 'Please enter a valid email address',
			messageSigned  = 'This email is already signed',
			messageErrore  = 'Error request';
		e.preventDefault();
		if(isSend === false){
			isSend = true;
			resetFormError(message);
			return;
		}
		if(newQuery){
			newQuery = false;
	    	$.ajax({
				url     : 'php/notify-me.php',
				type    : 'POST',
				data    : form.serialize(),
				success : function(data){
					form.find('.btn').prop('disabled', true);
					message.removeClass('text-danger').removeClass('text-success').fadeIn();
					switch(data) {
						case 0:
							message.html(messageSuccess).addClass('text-success').fadeIn();
							setTimeout(function(){
								message.removeClass('text-success').fadeOut(10);
								newQuery = true;
							}, 3000);
							setTimeout(function(){
								form.trigger('reset');
								message.fadeOut().delay(500).queue(function(){
									message.html('').dequeue();
									newQuery = true;
								});
							}, 2000);
							
							break;
						case 1:
							message.html(messageInvalid).addClass('text-danger').fadeIn();
							 $('.form-control').on('keydown',resetForm);
							 $('.form-control').css('color',"#fd6967");
							 isSend = false;
							break;
						case 2:
							message.html(messageSigned).addClass('text-danger').fadeIn();
							setTimeout(function(){
								form.trigger('reset');
								message.queue(function(){
									message.html('').dequeue();
								});
								newQuery = true;
							}, 2000);
							break;
						default:
							message.html(messageErrore).addClass('text-danger').fadeIn();
					}
					form.find('.btn').prop('disabled', false);
				}
			});
		}
	});

  //Contact Form
  $('.contact-form').submit(function(e){
		var form = $(this);
		
		e.preventDefault();
		
		$.ajax({
			type: 'POST',
			url : 'php/contact.php',
			data: form.serialize(),
			success: function(data){
				form.find('.form-message').html(data).fadeIn();
		
				form.find('.btn').prop('disabled', true);
					
				if ($(data).is('.send-true')){
					setTimeout(function(){
						form.trigger('reset');
						
						form.find('.btn').prop('disabled', false);
						
						form.find('.form-message').fadeOut().delay(500).queue(function(){
							form.find('.form-message').html('').dequeue();
						});
					}, 2000);
				} else {
					form.find('.btn').prop('disabled', false);
				}
			}
		});
  });

	/*Scroll*/
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/)){
		$('.impala-scroll-overlay').perfectScrollbar("destroy");
	  $('.impala-scroll-overlay').addClass('scroll-block');
	  $('.bg-video').find('video').remove();
	} 
	else {
		$('.impala-scroll-overlay').perfectScrollbar();
		$('.impala-scroll-overlay').removeClass('scroll-block');
	}

  //Retina
  if('devicePixelRatio' in window && window.devicePixelRatio >= 2){
    var imgToReplace = $('img.replace-2x').get(); 
    for (var i=0,l=imgToReplace.length; i<l; i++){
      var src = imgToReplace[i].src;
      src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
      imgToReplace[i].src = src;
      $(imgToReplace[i]).load(function(){
      $(this).addClass('loaded');
      });
    }
  }

	/*Background*/
	/*Slider*/
	if($('.rslides').length){
	  $(function() {
	    $('.rslides').responsiveSlides({
	      timeout: 7000,
	      speed: 200,
	    });
	  });
	}

	/*Parallax*/
	if($('body').hasClass('parallax-theme')){ 
		$.parallaxify({
			positionProperty: 'transform',
			responsive: true,
			motionType: 'natural',
			mouseMotionType: 'gaussian',
			motionAngleX: 70,
			motionAngleY: 70,
			alphaFilter: 0.9,
			adjustBasePosition: true,
			alphaPosition: 0.025,
		});
	}	

	$(window).load(function(){
		loadScript();
    if($('.timer').length) {
			var elem = document.getElementsByClassName("timer")[0];
			var timer = new Timer(elem);
		}

	  /*preloader*/
	  $('.loader').delay(1500).fadeOut();
  });
});

	//Window Resize
	(function(){
	  var delay = (function(){
			var timer = 0;
			return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
			};
	  })();
	  
	  function resizeFunctions() {
			carouselteam();
			initialize();
			if($('.impala').length) {
				layout();
			}
	  }

		if(isTouchDevice) {
			 $(window).bind('orientationchange', function(){
				 delay(function(){
				 resizeFunctions();
			 }, 300);
				 });
		} else {
			 $(window).on('resize', function(){
				 delay(function(){
				 resizeFunctions();
				if(!$('.social-links').hasClass('fadeInRightBig')){
					social();
				}
			}, 500);
		 });
		}
	}());
