
/* ---------------------------------------------- /*
 * Preloader
 /* ---------------------------------------------- */
(function(){
    $(document).ready(function() {
        var ytIframes = $('iframe[src*="youtube.com"]');
        ytIframes.each(function(i,e) {
            var replaced = false;
            var ytFrame = $(e);
            var ytLoader = $('<div style="height: 600px;">');
            ytLoader.data('ytFrame',ytFrame);
            ytFrame.replaceWith(ytLoader);
            $(window).on('scroll',function() {
                if (! replaced) {
                    ytLoader.replaceWith(ytFrame);
                    replaced = true;
                }
            });
            $(window).hover(function() {
                if (! replaced) {
                    ytLoader.replaceWith(ytFrame);
                    replaced = true;
                }
            });
        });

        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
         /* ---------------------------------------------- */

        wow = new WOW({
            mobile: false
        });
        wow.init();


        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });


        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = $('.home-section'),
            navbar      = $('.navbar-custom'),
            navHeight   = navbar.height(),
            worksgrid   = $('#works-grid'),
            width       = Math.max($(window).width(), window.innerWidth),
            mobileTest  = false;

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        navbarAnimation(navbar, homeSection, navHeight);

        $(window).resize(function() {
            var width = Math.max($(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
        });

        $(window).scroll(function() {
//            effectsHomeSection(homeSection, this);
            navbarAnimation(navbar, homeSection, navHeight);
        });

        /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */

        var module = $('.home-section, .module, .module-small, .side-image');
        module.each(function(i) {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height($(window).height());
                } else {
                    homeSection.height($(window).height() * 0.85);
                }
            }
        }


        /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */

        function effectsHomeSection(homeSection, scrollTopp) {
            if (homeSection.length > 0) {
                var homeSHeight = homeSection.height();
                var topScroll = $(document).scrollTop();
                if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    homeSection.css('top', (topScroll * 0.55));
                }
                if (homeSection.hasClass('home-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    var caption = $('.caption-content');
                    caption.css('opacity', (1 - topScroll/homeSection.height() * 1));
                }
            }
        }

        /* ---------------------------------------------- /*
         * Intro slider setup
         /* ---------------------------------------------- */

        if( $('.hero-slider').length > 0 ) {
            $('.hero-slider').flexslider( {
                animation: "fade",
                animationSpeed: 1000,
                animationLoop: true,
                prevText: '',
                nextText: '',
                before: function(slider) {
                    $('.titan-caption').fadeOut().animate({top:'-80px'},{queue:false, easing: 'swing', duration: 700});
                    slider.slides.eq(slider.currentSlide).delay(500);
                    slider.slides.eq(slider.animatingTo).delay(500);
                },
                after: function(slider) {
                    $('.titan-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'swing', duration: 700});
                },
                useCSS: true
            });
        }


        /* ---------------------------------------------- /*
         * Rotate
         /* ---------------------------------------------- */

        $(".rotate").textrotator({
            animation: "dissolve",
            separator: "|",
            speed: 3000
        });


        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarAnimation(navbar, homeSection, navHeight) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && homeSection.length > 0) {
                if(topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

        /* ---------------------------------------------- /*
         * Testimonials
         /* ---------------------------------------------- */

        if ($('.testimonials-slider').length > 0 ) {
            $('.testimonials-slider').flexslider( {
                animation: "slide",
                smoothHeight: true
            });
        }


        /* ---------------------------------------------- /*
         * Post Slider
         /* ---------------------------------------------- */

        if ($('.post-images-slider').length > 0 ) {
            $('.post-images-slider').flexslider( {
                animation: "slide",
                smoothHeight: true,
            });
        }



        /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */

        $('.section-scroll').bind('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });


$('#contactForm').on('submit',function(e){
        e.preventDefault();
        if ($("#contactForm").serialize() === 'nombre=&email=&message=') {
            alert('Por favor, rellena los campos para enviar tu solicitud');
            return;

        }

        $('#cfsubmit').text('Enviando...');
      
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbwLUHNN2H2FDdKsZqofstXtQxV5i0uae2x2FGKXAsjzWDD0IKo5RaK4ndyjWbvLflzVPA/exec",
            method: "POST",
            crossDomain: true,
            dataType: "json",
            data: $("#contactForm").serialize(),
            success: function(response) {
                
                if(response.result == "success") {
                    $('#contactForm')[0].reset();
                    $('#contactSuccess').removeClass('hidden');
                    $('#contactError').addClass('hidden');
                    $('#cfsubmit').text('¡Sí! Me interesa');
                    
                    return true;
                }
                else {
                    $('#contactError').removeClass('hidden');
                    $('#contactSuccess').addClass('hidden');
                    $('#cfsubmit').text('¡Sí! Me interesa');
                }
            },
            error: function(e) {                
                $('#contactError').removeClass('hidden');
                $('#contactSuccess').addClass('hidden');
                $('#cfsubmit').text('¡Sí! Me interesa');
            }
        })
    });
  

    });
})(jQuery);



