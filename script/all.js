$(function() {
    $(document).bind(
        'touchmove',
        function(e) {
            e.preventDefault();
        }
    );
    var owlExternal = $(".global-carousel"),
        owlInternal = $(".internal-slider"),
        owlFull = $(".full-width"),
        owlAnimate = $(".anim-slider");

     var audio = $('#firstly-player')[0],
     audioDesc = $('#desc-player')[0];
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
            owlExternal.on('translate.owl.carousel', function(){
                clearTimeout(timerID);
            });
            if(this.currentItem === this.maximumItem){

                /*- Animation -*/
                setTimeout(function(){
                    $('.anim-item_1').animo( { animation: 'scrolling-right-1',duration:.9, timing:"ease-in", keep: true });
                    $('.anim-item_2').animo( { animation: 'scrolling-right-2',duration:1, timing:"ease-in-out", keep: true });
                    $('.anim-item_3').animo( { animation: 'scrolling-right-3',duration: 1.4,timing:"ease-in-out", keep: true });
                    $('.anim-item_4').animo( { animation: 'scrolling-right-4',duration: 1.8,timing:"ease-in-out", keep: true });
                    $('.anim-item_5').animo( { animation: 'scrolling-right-5',duration: 2.2,timing:"ease-in-out", keep: true }, function(){
                        $('.anim-item_5 .end-nav tbody').animo({ animation: 'fadeIn',duration: 1, keep: true })
                    });

                    $('.anim-item_5 .start-flip').on('mousedown', function(){
                        $('.anim-item_5 .end-nav').animo({ animation: 'fadeOutUp',duration:.4,  keep: true });
                        $('.lift-wrap').animo({ animation: 'fadeOutCust',duration:.4,  keep: true });
                        $('.lift-left').animo({ animation: 'fadeOutLeftBig',duration:3, timing:"linear", keep: true },function(){});
                        $('.lift-right').animo({ animation: 'fadeOutRightBig',duration:3, timing:"linear", keep: true });
                    });
                },350);
                /*- Animation end  -*/

            }
        },
        afterInit:function(){
                $this = this;
                window.animate = function(){
                    $('.foreword-begin_slide img').animo( { animation: 'leftPullImg',duration:5, keep: true });
                    $('.img-overlay').animo( { animation: 'leftPullOverlay',duration:5, keep: true });
                    $('.img-overlay_wrap').animo( { animation: 'leftOpacity',duration:9, keep: true });
                    $('.logo').animo( { animation: 'fadeOut', duration: 6 , keep: true });

                    /*audioStart()*/
                };
            animate();

            /*Paralax*/

                var isMouseDown = false,
                    RightParallax = $('.right-parallax'),
                    RightParallaxParent = RightParallax.closest('.owl-item'),
                    RightParallaxParentPrev = RightParallaxParent.prev('.owl-item'),
                    CssValueR =  RightParallax.width()/ 4,
                    ProportionChangesR = $this.itemWidth/CssValueR,
                    returnPos = function(){RightParallax.css('right','-' +CssValueR+ 'px')};
                var LeftParallax = $('.left-parallax'),
                    LeftParallaxParent = LeftParallax.closest('.owl-item'),
                    LeftParallaxParentNext = LeftParallaxParent.next('.owl-item'),
                    CssValueL =  LeftParallax.width()/ 6,
                    ProportionChangesL = $this.itemWidth/CssValueL;

                returnPos();
                owlExternal.on('mousedown touchstart',function(){
                    isMouseDown = true;
                    RightParallax.removeClass('eff');
                    LeftParallax.removeClass('eff');
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
                    if(LeftParallaxParent.hasClass('active') && currentPosL < 0 || LeftParallaxParentNext.hasClass('active') && currentPosL > -$this.itemWidth){
                        LeftParallax.css({
                            "-webkit-transform":'translate('+currentPosL/ProportionChangesL+'px,0)',
                            "-ms-transform":'translate('+currentPosL/ProportionChangesL+'px,0)',
                            "transform":'translate('+currentPosL/ProportionChangesL+'px,0)'
                            });
                        }
                    }
                });
                owlExternal.on('mouseup touchend',function(){
                    RightParallax.addClass('eff').css({
                        "-webkit-transform":'translate(-'+CssValueR+'px,0)',
                        "-ms-transform":'translate(-'+CssValueR+'px,0)',
                        "transform":'translate(-'+CssValueR+'px,0)'
                    });
                    LeftParallax.addClass('eff').css({
                        "-webkit-transform":'translate(0px,0)',
                        "-ms-transform":'translate(0px,0)',
                        "transform":'translate(0px,0)'
                    });
                    isMouseDown = false;
                });

            /*Paralax End*/
        },
        afterAction:function(){
            if(this.currentItem === 1 && this.playDirection === "next"){
               /* audioEnd();*/
                setTimeout(function(){
                    $('.img-overlay_wrap').removeClass('leftOpacity animated');
                    $(".img-overlay").removeClass('leftPullOverlay animated');
                    $('.logo').removeClass('fadeOut animated');
                    $('.foreword-begin_slide img').removeClass('leftPullImg animated')
                }, 400)

            }
            if(this.currentItem === 0 && this.playDirection === "prev"){
                animate();
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
                    animate();
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
            $('.open_full-width').on('mousedown touchstart', function(){
                owlFull.fadeIn(500);
                owlFull.append('<div class="close_full-width"></div>');
                $('.close_full-width').on('mousedown touchstart', function(){
                    owlFull.fadeOut(500);
                })
            })
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
                    owlExternal.trigger("owl.prev");
                    animate();
                    setTimeout(function(){
                        owlFull.fadeOut(500)
                    },250)
                }
            }if(this.currentItem === this.maximumItem){
                if(this.newRelativeX < 0){
                    owlExternal.trigger("owl.next")
                    setTimeout(function(){
                        owlFull.fadeOut(500)
                    },250)
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

    /*- Promo Carousel End -*/


    /*- Fancybox popups -*/


    $('.fancy_desc').fancybox({
        padding    : 30,
        maxWidth   : "85%",
        wrapCSS    : 'desc_popup',
        openSpeed  : 700,
        afterClose : function(){
                audioEnd()
        }
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

    $('.fancy_desc[href*="#desc-2"]').on('mousedown touchstart',function(){
        if(typeof $.fancybox == 'function') {
            audioDescStart()
        } else {
        }
    });


    /*- Fancybox popups End -*/


    /*- Double Click emulate on touch devices -*/

    var isiOS = false;
    var agent = navigator.userAgent.toLowerCase();
    isiOS = true;

    $.fn.doubletap = function(onDoubleTapCallback, onTapCallback, delay){
        var eventName, action;
        delay = delay == null? 500 : delay;
        eventName = isiOS == true? 'touchend' : 'click';

        $(this).bind(eventName, function(event){
            var now = new Date().getTime();
            var lastTouch = $(this).data('lastTouch') || now + 1 ;
            var delta = now - lastTouch;
            clearTimeout(action);
            if(delta<500 && delta>0){
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
    $('.internal-slider .owl-item').doubletap(
            function(event){
            owlFull.fadeIn(500);
        },
            function(event){
        },
        4000
    );
    $('.full-width .owl-item').doubletap(
        function(event){
            owlFull.fadeOut(500);
        },
        function(event){
        },
        4000
    );

    /*- Double Click emulate on touch devices END -*/




});


