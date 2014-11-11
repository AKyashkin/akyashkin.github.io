$(function() {

    /*- Promo Carousel -*/

    $(".global-carousel").owlCarousel({
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
    });

    $(".local-carousel").owlCarousel({
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,

        afterMove: function(){
            console.log("afterMove");
        },

        beforeMove: function(carousel){
            var globalCarousel = $(".global-carousel"),
                globalCarouselData = globalCarousel.data('owlCarousel'),
                carouselData = carousel.data('owlCarousel'),
                carouselSlidesCount = carousel.find(".owl-item").length,
                activeSlideIndex = carousel.find(".active").index() + 1;
            if (activeSlideIndex == carouselSlidesCount){
                if (carouselData.dragDirection == "left")
                    globalCarouselData.next();
            }
        }
    });

    /*- Promo Carousel End -*/


    /*- Fancybox popups -*/

    $('.fancy_desc').fancybox({
        padding   : 30,
        maxWidth  : "85%",
        wrapCSS   : 'desc_popup',
        closeEffect: 'none'
    });

    $('.fancy_full').fancybox({
        padding   : 0,
        margin  : 0,
        wrapCSS   : 'full-screen_popup',
        closeEffect: 'none',
        autoSize : false,
        helpers : {
            overlay: {
                css: {'background-color': '#000000'}
            }
        }
    });

    /*- Fancybox popups End -*/


    $(document).ready(function(){
        $('.img-overlay').animo( { animation: 'fadeInRightTopBig',duration:3} , function() {
            $('.logo').animo( { animation: 'fadeIn', duration: 1.6 , keep: true });
        });
        $(".carousel-content").on('touchmove  mousedown', function(){
            $(".img-overlay").animo().stop();
            $('.logo').css('opacity','1');
        });
    });


    $('.owl-item').on('touchmove mouseover', function(){
        var $el = $('.active').find('.word-bg');
        setTimeout(function () {
            $('.word-bg').css({ backgroundColor: "#e4ccb4" });
            $el.css({ backgroundColor: "transparent" });
        }, 4000);
    });

    /*- Touch events  -*/

});


