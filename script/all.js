$(function() {

    var global;

    /*- Promo Carousel -*/

    $(".global-carousel").owlCarousel({
        slideSpeed : 450,
        paginationSpeed : 400,
        singleItem:true,
        mouseDrag: false,

        beforeMove: function(){
            console.log("global");
        },

        afterMove: function(carousel){
            var globalCarousel = $(".global-carousel").data('owlCarousel'),
                activeSlideIndex = globalCarousel.currentItem;
            if (activeSlideIndex == 5){
                $(".rubric-carousel").owlCarousel({
                    slideSpeed: 100,
                    paginationSpeed: 250,
                    singleItem: true,
                    autoPlay: 200,
                    theme: 'rubric-theme',
                    pagination: false,

                    afterMove: function(carousel){
                        var carouselSlidesCount = carousel.find(".owl-item").length,
                            activeSlideIndex = carousel.find(".active").index() + 1;
                        if (activeSlideIndex == carouselSlidesCount){
                            carousel.trigger('owl.stop');
                        }
                    }
                });
            }
        }
    });

    $(".local-carousel").owlCarousel({
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        mouseDrag: false,

        afterMove: function(){
            console.log("afterMove");
            global.reinit();
        },

        beforeMove: function(carousel){
            console.log("local");
            var global = $(".global-carousel"),
                globalCarouselData = globalCarousel.data('owlCarousel'),
                carouselData = carousel.data('owlCarousel'),
                carouselSlidesCount = carousel.find(".owl-item").length,
                activeSlideIndex = carousel.find(".active").index() + 1;
            if (activeSlideIndex == carouselSlidesCount){
                if (carouselData.dragDirection == "left")
                    globalCarouselData.next();
            }
            else {
                globalCarouselData.destroy();
            }
        }
    });

    /*- Promo Carousel End -*/


    /*- Fancybox popups -*/

    $('.fancy_desc').fancybox({
        padding   : 30,
        maxWidth  : "85%",
        wrapCSS   : 'desc_popup',
        closeEffect: 'fade',
        closeBtn: false,
        openSpeed: 'slow',
        closeSpeed: 'slow'
    });

    $('.fancy_full').fancybox({
        padding   : 0,
        margin  : 0,
        wrapCSS   : 'full-screen_popup',
        closeEffect: 'fade',
        closeBtn: false,
        openSpeed: 'slow',
        closeSpeed: 'slow',
        autoSize : false,
        helpers : {
            overlay: {
                css: {'background-color': '#000000'}
            }
        }
    });

    /*- Fancybox popups End -*/


    $(document).ready(function(){
        setTimeout(function(){
            $('.img-overlay').animo( { animation: 'fadeOut', duration: 12, keep: true} , function() {});
            $('.logo').animo({ animation: 'fadeOut', duration: 10 , keep: true });
            $('.img-begin').animate({left: 0}, 6000);
        }, 3000)
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


