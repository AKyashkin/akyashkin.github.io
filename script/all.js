$(function() {

    /*Ipad vertical bounce dissable*/

    $(document).bind('touchmove',function(e) {
        e.preventDefault();
    });


    /*Creating variables*/

    var owlExternal = $(".global-carousel"),
        owlInternal = $(".internal-carousel"),
        owlFull = $(".full-carousel"),
        owlAnimate = $(".animate_carousel"),
        audio = $('#firstly-player')[0],
        audioDesc = $('#desc-player')[0];


    /*Audio initialization*/

    /*audioStart = function(){
        setTimeout(function(){
         audio.play();
         audio.volume = 1;
        },250);
    }*/
    audioDescStart = function(){
            audioDesc.volume = 1;
            audioDesc.play();
    };
    audioEnd = function(){
        $('audio').each(function(){$(this).animate({volume:0},500)});
        setTimeout(function(){
            audioDesc.pause();
            audioDesc.currentTime = 0;
        }, 150);
    };


    /*- Carousel initialization -*/

    owlExternal.owlCarousel({
     slideSpeed : 450,
     navigation: false,
     pagination:false,
     singleItem : true,
     items : 1,
        afterMove : function(){
            var $el = $('.active').find('.word-bg').addClass('visible');
            if($el.hasClass('visible')){
                var timerID = setTimeout(function () {
                    $el.css({ backgroundColor: "transparent" });
                }, 2500);
            }
            $('.word-bg').removeClass('visible').css({ backgroundColor: "#e4ccb4" });
            owlExternal.on('mousedown touchstart', function(){
                if(this.newRelativeX !== 0){
                    clearTimeout(timerID);
                }
            });
            if(this.currentItem === this.maximumItem){

                /*- Animation -*/
                setTimeout(function(){
                    $('.animate-item.item-1').animo( { animation: 'FadeLeftStep1',duration:.9, timing:"ease-in", keep: true });
                    $('.animate-item.item-2').animo( { animation: 'FadeLeftStep2',duration:1, timing:"ease-in-out", keep: true });
                    $('.animate-item.item-3').animo( { animation: 'FadeLeftStep3',duration: 1.4,timing:"ease-in-out", keep: true });
                    $('.animate-item.item-4').animo( { animation: 'FadeLeftStep4',duration: 1.8,timing:"ease-in-out", keep: true });
                    $('.animate-item.item-5').animo( { animation: 'FadeLeftStep5',duration: 2.2,timing:"ease-in-out", keep: true }, function(){
                        $('.animate_label tbody').animo({ animation: 'fadeIn',duration: 1, keep: true })
                    });
                    $('.enter').on('mousedown touchstart', function(){
                        $('.animate_label').animo({ animation: 'fadeOutUp',duration:.4,  keep: true });
                        $('.animate_break').animo({ animation: 'visibilityOut',duration:.4,  keep: true });
                        $('.left-half').animo({ animation: 'fadeOutLeftBig',duration:3, timing:"linear", keep: true },function(){});
                        $('.right-half').animo({ animation: 'fadeOutRightBig',duration:3, timing:"linear", keep: true });
                    });
                },80);

                /*- Animation end  -*/
            }
            if(this.currentItem === 0 && this.playDirection === "prev"){
                setTimeout(function(){
                    animate();
                },700)
            }
        },
        afterInit:function(){
                $this = this;
                window.animate = function(){
                    $('.front-slide_image').animo( { animation: 'leftPullImg',duration:5, keep: true });
                    $('.shadow-overlay').animo( { animation: 'leftPullOverlay',duration:5, keep: true });
                    $('.shadow-overlay_wrapper').animo( { animation: 'leftOpacity',duration:7, keep: true });
                    $('.logo').animo( { animation: 'fadeOut', duration: 6 , keep: true });
                    /*audioStart()*/
                };

            window.onload = function() {
                setTimeout(function(){ $('.overlap').fadeOut(1);},600);
                animate();
            };
        },
        afterAction:function(){
            if(this.currentItem === 1){
               /* audioEnd();*/
                setTimeout(function(){
                    $('.shadow-overlay_wrapper').removeClass('leftOpacity animated').removeAttr('style');
                    $(".shadow-overlay").removeClass('leftPullOverlay animated').removeAttr('style');
                    $('.logo').removeClass('fadeOut animated').removeAttr('style');
                    $('.front-slide_image').removeClass('leftPullImg animated').removeAttr('style');
                }, 350)

            }
        }
     });
    owlInternal.owlCarousel({
        singleItem: true,
        navigation: false,
        startDragging: function(){
            if(this.currentItem === 0){
                if(this.newRelativeX < 0){
                }else{
                    owlExternal.trigger("owl.prev");
                    setTimeout(function(){
                        animate();
                    },700)
                }
            }if(this.currentItem === this.maximumItem){
                if(this.newRelativeX < 0){
                    owlExternal.trigger("owl.next")
                }else{
                }
            }
        },
        afterInit: function(){
            owlInternal.on("mousedown touchstart", function(event){
                event.stopPropagation();
            });
            $('.openCarousel').on('mousedown touchstart', function(){
                $('.full-carousel_wrapper').fadeIn(0).css('right',"0");
                setTimeout(function(){
                    $('.full-carousel_wrapper').addClass('opacity')
                },200)
            });
            $('.closeCarousel').on('mousedown touchstart', function(){
                $('.full-carousel_wrapper').removeClass('opacity').delay(300).fadeOut(0)
            });
        },
        afterMove: function(){
            var owlFullData = owlFull.data('owlCarousel');
            if(this.currentItem === 0){
                owlFullData.goTo(0);
            }if(this.currentItem === 1){
                owlFullData.goTo(1);
            }if(this.currentItem === 2){
                owlFullData.goTo(2);
            }if(this.currentItem === this.maximumItem){
                owlFullData.goTo(3);
            }
        }
    });
    owlFull.owlCarousel({
        slideSpeed : 450,
        singleItem: true,
        navigation: false,
        startDragging: function(){
            if(this.currentItem === 0){
                if(this.newRelativeX < 0){
                }else{
                    setTimeout(function(){
                        animate();
                    },700);
                    owlExternal.trigger("owl.prev");
                    setTimeout(function(){
                        $('.full-carousel_wrapper').removeClass('opacity').fadeOut(0)
                    },400)
                }
            }if(this.currentItem === this.maximumItem){
                if(this.newRelativeX < 0){
                    owlExternal.trigger("owl.next");
                    setTimeout(function(){
                        $('.full-carousel_wrapper').removeClass('opacity').fadeOut(0)
                    },400)
                }else{
                }
            }
        },
        afterInit: function(){
            owlFull.on("mousedown touchstart", function(event){
                event.stopPropagation();
            })
        },
        afterMove: function(){
            var owlInternalData = owlInternal.data('owlCarousel');
            if(this.currentItem === 0){
                owlInternalData.goTo(0);
            }if(this.currentItem === 1){
                owlInternalData.goTo(1);
            }if(this.currentItem === 2){
                owlInternalData.goTo(2);
            }if(this.currentItem === this.maximumItem){
                owlInternalData.goTo(3);
            }
        }
    });
    owlAnimate.owlCarousel({
        slideSpeed : 450,
        singleItem: true,
        navigation: false,
        startDragging: function(){
            if(this.currentItem === 0){
                if(this.newRelativeX < 0){
                }else{
                    owlExternal.trigger("owl.prev");
                }
            }
        },
        afterInit: function(){
            owlAnimate.on("mousedown touchstart", function(event){
                event.stopPropagation();
            })
        }
    });


    /*- Fancybox initialization -*/

    $('.fancy_desc').on("mousedown touchstart", function() {
        $(this).fancybox({
            padding    : 30,
            maxWidth   : "85%",
            wrapCSS    : 'desc_popup',
            openSpeed  : 500,
            beforeShow  : function(){
                if($('#desc-2').is(':visible') ){
                    audioDescStart()
                }
            },
            afterClose : function(){
                audioEnd()
            }
        });
    });
    $('.fancy_full').fancybox({
        padding   : 0,
        margin  : 0,
        wrapCSS   : 'full-screen_popup',
        autoSize : false,
        openSpeed  : 600,
        helpers : {
            overlay: {
                css: {'background-color': '#000000'}
            }
        }
    });


    /*- Double Click emulate on touch devices -*/

    var isiOS = false;
    var agent = navigator.userAgent.toLowerCase();
    isiOS = true;

    $.fn.doubletap = function(onDoubleTapCallback, onTapCallback, delay){
        var eventName, action;
        delay = delay == null? 200 : delay;
        eventName = isiOS == true? 'touchend' : 'click';

        $(this).bind(eventName, function(event){
            var now = new Date().getTime();
            var lastTouch = $(this).data('lastTouch') || now + 1 ;
            var delta = now - lastTouch;
            clearTimeout(action);
            if(delta<200 && delta>0){
                if(onDoubleTapCallback != null && typeof onDoubleTapCallback == 'function'){
                    onDoubleTapCallback(event);
                }
            }else{
                $(this).data('lastTouch', now);
                action = setTimeout(function(evt){
                    if(onTapCallback != null && typeof onTapCallback == 'function'){
                        onTapCallback(evt);
                    }
                    clearTimeout(action);
                }, delay, [event]);
            }
            $(this).data('lastTouch', now);
        });
    };
    $('.internal-carousel .owl-item').doubletap(
            function(event){
                $('.full-carousel_wrapper').fadeIn(0).css('right',"0");
                setTimeout(function(){
                    $('.full-carousel_wrapper').addClass('opacity')
                },200)
        },
            function(event){
        },
        4000
    );
    $('.full-carousel .owl-item').doubletap(
        function(event){
           $('.full-carousel_wrapper').removeClass('opacity').delay(300).fadeOut(0)
        },
        function(event){
        },
        4000
    );


    /*Paralax*/

    var isMouseDown = false,
        RightParallax = $('.right-parallax'),
        RightParallaxParent = RightParallax.closest('.owl-item'),
        RightParallaxParentPrev = RightParallaxParent.prev('.owl-item'),
        CssValueR =  RightParallax.width()/4,
        ProportionChangesR = $this.itemWidth/CssValueR,
        returnPos = function(){RightParallax.css({
            "right":'-' +CssValueR+ 'px',
            "-webkit-transform":'translate(0px,0)',
            "-ms-transform":'translate(0px,0)',
            "transform":'translate(0px,0)'
        })};
    var LeftParallax = $('.left-parallax'),
        LeftParallaxParent = LeftParallax.closest('.owl-item'),
        LeftParallaxParentNext = LeftParallaxParent.next('.owl-item'),
        CssValueL =  LeftParallax.width()/ 6,
        ProportionChangesL = $this.itemWidth/CssValueL;
    returnPos();
    owlExternal.on('mousedown touchstart',  function(){
        isMouseDown = true;
        RightParallax.removeClass('transition');
        LeftParallax.removeClass('transition');
    });
    owlExternal.on('mousemove touchmove', function(){
        var  currentPosR  =  RightParallaxParentPrev.offset().left,
             currentPosL  =  LeftParallaxParent.offset().left;
        if(isMouseDown){
            if(RightParallaxParent.hasClass('active') && currentPosR > -$this.itemWidth || RightParallaxParentPrev.hasClass('active') && currentPosR < 0){
                RightParallax.css({
                    "-webkit-transform":'translate('+currentPosR/ProportionChangesR+'px,0)',
                    "-ms-transform":'translate('+currentPosR/ProportionChangesR+'px,0)',
                    "transform":'translate('+currentPosR/ProportionChangesR+'px,0)'
                });
            }
            if(/*LeftParallaxParent.hasClass('active') && currentPosL < 0 ||*/ LeftParallaxParentNext.hasClass('active') && currentPosL > -$this.itemWidth){
                LeftParallax.css({
                    "-webkit-transform":'translate('+currentPosL/ProportionChangesL+'px,0)',
                    "-ms-transform":'translate('+currentPosL/ProportionChangesL+'px,0)',
                    "transform":'translate('+currentPosL/ProportionChangesL+'px,0)'
                });
            }
        }
    });
    owlExternal.on('mouseup touchend',function(){
        RightParallax.addClass('transition').css({
            "-webkit-transform":'translate(-'+CssValueR+'px,0)',
            "-ms-transform":'translate(-'+CssValueR+'px,0)',
            "transform":'translate(-'+CssValueR+'px,0)'
        });
        LeftParallax.addClass('transition').css({
            "-webkit-transform":'translate(0px,0)',
            "-ms-transform":'translate(0px,0)',
            "transform":'translate(0px,0)'
        });
        isMouseDown = false;

    });

});


