var disqus_shortname=theme_config.disqus_shortname;
// !function(){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="//"+disqus_shortname+".disqus.com/count.js",document.getElementsByTagName("BODY")[0].appendChild(e)}();

(function($){
	/* All Images Loaded */
	$(window).load(function(){

	});
	/* Dom Loaded */
	$(document).ready(function($){

        AOS.init({
            offset: 220,
            duration: 700,
            disable: window.innerWidth < 1024,
            easing: 'ease',
            once: true
        });

        $(".epcl-switch button").on('click', function(){
            var current = $(this).data('price');
            $(".epcl-switch, .epcl-plans").attr( 'data-active-price', current );
        });
        
		$(".lazy, img[data-src], iframe[data-src]").Lazy({
            defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            threshold: 0,
            enableThrottle: true,
            throttle: 50,
			afterLoad: function(element){
				element.addClass('loaded');
                element.parents('.epcl-loader').addClass('loaded');
			}
        });

        // Sticky elements

        var document_width = $(document).width();
        if( document_width > 1200 && $('#header').hasClass('enable-sticky') ){
            var header_height = $('#header div.menu-wrapper').outerHeight();
            $('#header').height( header_height );
        }

        $(window).scroll(function(){
            if( document_width > 1200 && $('#header').hasClass('enable-sticky') ){
                if( $(window).scrollTop() >= 300) {
                    $('#header').addClass('is-sticky');                    
                } else {
                    $('#header').removeClass('is-sticky');
                }
            } else{
                $('#header').removeClass('is-sticky');  
            }
            if( document_width > 1200){
                if( $(window).scrollTop() >= 300) {
                    $('#back-to-top').addClass('visible');                    
                } else {
                    $('#back-to-top').removeClass('visible');   
                }
            }
        }); 

        $(window).on('resize', function() {
            var document_width = $(document).width();
            $('#header').removeClass('is-sticky');
            var header_height = $('#header div.menu-wrapper').outerHeight();
            $('#header').height( header_height );
            if( document_width < 1200 ){
                $('#header').removeClass('enable-sticky is-sticky');
                $('#header').height( 'auto' );
            }
        });

        if( theme_config.masonry == 'on' ){
            $('div.articles.grid-posts').masonry({
                // options
                itemSelector: 'article',
                horizontalOrder: true
                // columnWidth: 200
            });
        }     
        
        if( theme_config.sticky_sidebar == 'on' ){
            $('#sidebar').theiaStickySidebar({
                additionalMarginTop: 120,
                additionalMarginBottom: 20
            });
        } 

        // Account page
                          
        if( $(".plan-price").length > 0 ){
            $(".plan-price").each(function(){
                var planAmount = $(this).data('value') / 100;
                $(this).html(planAmount);
            })
        }

        // Single Post copy button
        
        $(".permalink .copy").on('click', function(){
            $("#copy-link").select();
            document.execCommand('copy');
        });
        
        /* Gallery Ghost v2.1 */

        var images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach(function (image) {
            var container = image.closest('.kg-gallery-image');
            var width = image.attributes.width.value;
            var height = image.attributes.height.value;
            var ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        })

        $('.kg-gallery-card').each(function(){
			$(this).find('img').wrap(function() {
				return '<a href="'+$(this).attr('src')+'" class="hover-effect" rel="gallery"></a>';
			});
			$(this).magnificPopup({
				type: 'image',
				gallery:{
					enabled: true,
					arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>'
				},
				delegate: 'a',
				mainClass: 'my-mfp-zoom-in',
				removalDelay: 300,
				closeMarkup: '<span title="%title%" class="mfp-close">&times;</span>',
			});
		});

		/* Global */

		// Open mobile menu        

        $('#header div.menu-mobile').on('click', function(){
			$('body').toggleClass('menu-open');
        });
        $('.menu-overlay').on('click', function(){
			$('body').removeClass('menu-open');
        });

		$('#back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 500);
			return false;
		});

		$('.tooltip').tooltipster({ theme: 'tooltipster-small', contentAsHTML: true, animation: 'grow' });

        // Module: carousel
        
        $('.epcl-carousel').each(function(index, el) {
            var slides_to_show = parseInt( $(this).data('show') );
            var rtl = false;
            if( parseInt( $(this).data('rtl') ) > 0 ){
                rtl = true;
            }
            $(this).slick({
                cssEase: 'ease',
                fade: false,
                arrows: true,
                infinite: true,
                dots: false,
                autoplay: false,
                speed: 600,
                rtl: rtl,
                slidesToShow: slides_to_show,
                slidesToScroll: slides_to_show,
                responsive: [,
                    {
                        breakpoint: 1500,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                ]
            });
            $(this).on('setPosition', function(event, slick, currentSlide, nextSlide){
                $(".lazy, img[data-src], iframe[data-src]").Lazy({
                    placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
                    enableThrottle: true,
                    throttle: 50,
                    afterLoad: function(element){
                        element.addClass('loaded');
                    }
                });
            });
        });

		/* Global Lightbox */

		$('.lightbox').magnificPopup({
			mainClass: 'my-mfp-zoom-in',
			removalDelay: 300,
			closeMarkup: '<i title="%title%" class="mfp-close fa fa-times"></i>',
			fixedContentPos: true
        });

        // Lazy Disqus
        if( $('#disqus_thread').length > 0 ){
            disqusLazy({    
                // threashold: win.innerHeight * .75,
                throttle: 350,
                shortname: theme_config.disqus_shortname,
            });
        }

        // Demo
        $('.epcl-demo-tool a').on('click', function(e){
            var body_class = $(this).data('class');
            $('body').toggleClass( body_class );
            $(this).toggleClass('active');
            if( $('body').hasClass('epcl-shadow-style') ){
                $(":root").css({
                    "--epcl-border-color": "transparent",
                    "--epcl-transition-bezier": "ease",
                    "--epcl-small-shadow": "0 0px 0px 1px rgba(7,10,25, 0.1)",
                    "--epcl-medium-shadow": "0 3px 9px -1px rgba(7,10,25, 0.1)",
                    "--epcl-boxes-shadow": "0 3px 12px -1px rgba(7,10,25, 0.1), 0 22px 27px -30px rgba(7,10,25, 0.1)"
                });
            }else{
                $(":root").css({
                    "--epcl-border-color": "rgba(39, 39, 39, 0.75)",
                    "--epcl-transition-bezier": "cubic-bezier(.5,2.5,.7,.7)",
                    "--epcl-small-shadow": "2px 2px 0px 0px #333",
                    "--epcl-medium-shadow": "4px 4px 0px 0px #333",
                    "--epcl-boxes-shadow": "none"
                });
            }
            if( $('body').hasClass('disable-custom-colors') ){
                $('.epcl-category-overlay').hide();
            }else{
                $('.epcl-category-overlay').show();
            }
            if( $('body').hasClass('disable-decorations') ){
                $('.body-decorations').hide();
            }else{
                $('.body-decorations').show();
            }
            e.preventDefault();
        });
        $(' .epcl-demo-tool input[type=color]').on('input', function(e){
            var value = e.target.value;
            var target = $(this).data('class');
            $(target).css('background', value);
            if( target == 'bg-box' ){
                $(":root").css({
                    "--epcl-content-background-color": value
                });
            }else{
                $(":root").css({
                    "--epcl-content-background-color": "#fffacd"
                });
            }
        });

	});

})(jQuery);

(function() {
    var supportsPassive = eventListenerOptionsSupported();  

    if (supportsPassive) {
      var addEvent = EventTarget.prototype.addEventListener;
      overwriteAddEvent(addEvent);
    }

    function overwriteAddEvent(superMethod) {
      var defaultOptions = {
        passive: true,
        capture: false
      };

      EventTarget.prototype.addEventListener = function(type, listener, options) {
        var usesListenerOptions = typeof options === 'object';
        var useCapture = usesListenerOptions ? options.capture : options;
        options = usesListenerOptions ? options : {};
        if( type == 'touchstart' || type == 'touchmove'){
            options.passive = options.passive !== undefined ? options.passive : defaultOptions.passive;
        }        
        options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;

        superMethod.call(this, type, listener, options);
      };
    }

    function eventListenerOptionsSupported() {
      var supported = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supported = true;
          }
        });
        window.addEventListener("test", null, opts);
      } catch (e) {}

      return supported;
    }

  })();

