$(function() {

    var owlExternal = $(".global-carousel"),
        owlInternal = $(".internal-slider");
    audio = $('#firstly-player')[0];
    audioDesc = $('#desc-player')[0];
    audioStart = function(){
        setTimeout(function(){
            audio.play();
            audio.volume = 1;
        },250)
    }
    audioDescStart = function(){
        setTimeout(function(){
            audioDesc.currentTime = 0;
            audioDesc.play();
            audioDesc.volume = 1;
        },250)
    }
    audioEnd = function(){
        $('audio').each(function(){$(this).animate({volume:0},500)});
        setTimeout(function(){
            audio.pause();
            audio.currentTime = 0;
            audioDesc.currentTime = 0;
        }, 500);

    }
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
                        $('.lift-left').animo({ animation: 'fadeOutLeftBig',duration:3, timing:"linear", keep: true });
                        $('.lift-right').animo({ animation: 'fadeOutRightBig',duration:3, timing:"linear", keep: true });
                    });
                },350);


                /*- Animation end  -*/

            }
        },
        afterInit:function(){
                $this = this;
                window.animate = function(){
                    setTimeout(function(){
                        $('.foreword-begin_slide img').animo( { animation: 'leftPullImg',duration:5, keep: true }, function(){});
                        $('.img-overlay').animo( { animation: 'leftPullOverlay',duration:10,timing:"ease",  keep: true });
                        $('.logo').animo( { animation: 'fadeOut', duration: 6 , keep: true });
                    });
                    document.timeout =  setTimeout(function(){
                        audioStart()
                    })
                };
            animate();

        },
        afterAction:function(){
            if(this.currentItem === 1 && this.playDirection === "next"){
                clearTimeout(document.timeout)
                 audioEnd()

                 $(".img-overlay").removeClass('leftPullOverlay animated');
                 $('.logo').removeClass('fadeOut animated');
                 $('.foreword-begin_slide img').removeClass('leftPullImg animated')
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
             owlInternal.on("mousedown touchstart", function(event){
                 event.stopPropagation();
             })
             if(this.currentItem === 0){
                 if(this.newRelativeX < 0){
                 }else{
                     owlExternal.trigger("owl.prev")
                     animate();
                 }
             }if(this.currentItem === this.maximumItem){
                 if(this.newRelativeX < 0){
                     owlExternal.trigger("owl.next")
                 }else{
                 }
             }
         }
     })



    /*- Promo Carousel End -*/


    /*- Fancybox popups -*/

    $('.fancy_desc').fancybox({
        padding    : 30,
        maxWidth   : "85%",
        wrapCSS    : 'desc_popup',
        openSpeed  : 700,
        afterShow : function(){
            if($('#desc-2').parent().is('.fancybox-inner')){
                audioDescStart()
            }else{
            }
        },
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

    /*- Fancybox popups End -*/




});


