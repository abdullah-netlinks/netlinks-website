// Owl slider
odoo.define('theme_scita.scita_general_js', function(require) {
    "use strict";
    // for megamenu  menu_style_3
    var ajax = require('web.ajax');

        $(".cc-cookies .btn-primary").click(function(e) {
            e.preventDefault();
            ajax.jsonRpc('/scita_cookie_notice/ok', 'call').then(function (data) {
                if (data.result == 'ok') {
                    $(e.target).closest(".cc-cookies").hide("fast");
                }
            });
        });
    
    
    $(document).on('click', '.li-mega-menu', function(e) {
        e.stopPropagation()
    });
    //End megamemu
     $(document).ready(function(){

        $('li.position-static').mouseenter(
            function(){ 
                if ($("div.o_mega_menu_container_size").length==0)
                {
                    $(this).parent().addClass('full-size-megamenu');
                    $(this).parent().closest('div.container').css("position", "static");
                }
                else
                {
                    $(this).parent().addClass('container-size-megamenu');
                    $(this).parent().closest('div.container').css("position", "relative");
                    
                }
            }
        )
        $('li.position-static').mouseleave(
            function(){ 
                if ($("div.o_mega_menu_container_size").length==0)
                {
                    $(this).parent().removeClass('full-size-megamenu');
                    $(this).parent().closest('div.container').css("position", "relative");
                }
                else
                {
                   $(this).parent().removeClass('container-size-megamenu');
                   $(this).parent().closest('div.container').css("position", "relative");

                }
            }
        )
        $('li.position-static').addClass('li-mega-menu');
        $('li.position-static').removeClass('dropdown');
        $('li.position-static div').addClass('mega-dropdown-menu');
        // for accordion 2 snippets 

        $("section.accordion_v_2 a.card-header").click(function(e) {
             $(this).parent().toggleClass('active');
        });
    // recommended_products_slider
        $('div#recommended_products_slider').owlCarousel({
            margin: 20,
            responsiveClass: true,
            items: 4,
            // loop: true,
            autoPlay: 7000,
            stopOnHover: true,
            navigation: true,
            responsive: {
                0: {
                    items: 1,
                },
                500: {
                    items: 2,
                },
                700: {
                    items: 3,
                },
                1000: {
                    items: 4,
                },
                1500: {
                    items: 4,
                }
            }
        });
            // Grid/List switching code
        $(".oe_website_sale .shift_list_view").click(function(e) {
            $(".oe_website_sale .shift_grid_view").removeClass('active');
            $(".oe_website_sale .shift_2_col_grid_view").removeClass('active');
            $(".oe_website_sale .shift_4_col_grid_view").removeClass('active');
            $(this).addClass('active');
            $('#products_grid').addClass("list-view-box");
            $('.oe_website_sale .oe_subdescription').removeClass('o_hidden');
            localStorage.setItem("product_view", "list");
        });

        $(".oe_website_sale .shift_grid_view").click(function(e) {
            $(".oe_website_sale .shift_list_view").removeClass('active');
            $(".oe_website_sale .shift_2_col_grid_view").removeClass('active');
            $(".oe_website_sale .shift_4_col_grid_view").removeClass('active');
            $(this).addClass('active');
            $(".oe_website_sale .grid_column").removeClass('col-md-6');
            $(".oe_website_sale .grid_column").removeClass('col-md-3');
            $(".oe_website_sale .grid_column").addClass('col-md-4');
            $('#products_grid').removeClass("list-view-box");
            $('.oe_website_sale .oe_subdescription').addClass('o_hidden');
            localStorage.setItem("product_view", "grid");
        });
        $(".oe_website_sale .shift_2_col_grid_view").click(function(e) {
            $(".oe_website_sale .shift_list_view").removeClass('active');
            $(".oe_website_sale .shift_grid_view").removeClass('active');
            $(".oe_website_sale .shift_4_col_grid_view").removeClass('active');
            $(this).addClass('active');
            $(".oe_website_sale .grid_column").removeClass('col-md-4');
            $(".oe_website_sale .grid_column").removeClass('col-md-3');
            $(".oe_website_sale .grid_column").addClass('col-md-6');
            $('#products_grid').removeClass("list-view-box");
            $('.oe_website_sale .oe_subdescription').addClass('o_hidden');
            localStorage.setItem("product_view", "2-grid");
        });
        $(".oe_website_sale .shift_4_col_grid_view").click(function(e) {
            $(".oe_website_sale .shift_list_view").removeClass('active');
            $(".oe_website_sale .shift_grid_view").removeClass('active');
            $(".oe_website_sale .shift_2_col_grid_view").removeClass('active');
            $(this).addClass('active');
            $(".oe_website_sale .grid_column").removeClass('col-md-4');
            $(".oe_website_sale .grid_column").removeClass('col-md-6');
            $(".oe_website_sale .grid_column").addClass('col-md-3');
            $('#products_grid').removeClass("list-view-box");
            $('.oe_website_sale .oe_subdescription').addClass('o_hidden');
            localStorage.setItem("product_view", "4-grid");
        });
        

        if (localStorage.getItem("product_view") == 'list') {
            $(".oe_website_sale .shift_grid_view").removeClass('active');
            $(".oe_website_sale .shift_list_view").addClass('active');
            $('.oe_website_sale .oe_subdescription').addClass('o_hidden');
            $('#products_grid').addClass("list-view-box");
            $(".oe_website_sale .grid_column").removeClass('col-md-3');
            $(".oe_website_sale .grid_column").removeClass('col-md-6');
            $(".oe_website_sale .grid_column").addClass('col-md-4');
            $('.oe_website_sale .oe_subdescription').removeClass('o_hidden');
        }

        if (localStorage.getItem("product_view") == 'grid') {
            $(".oe_website_sale .shift_list_view").removeClass('active');
            $(".oe_website_sale .shift_grid_view").addClass('active');
            $('.oe_website_sale .oe_subdescription').removeClass('o_hidden');
            $('#products_grid').removeClass("list-view-box");
            $(".oe_website_sale .grid_column").removeClass('col-md-3');
            $(".oe_website_sale .grid_column").removeClass('col-md-6');
            $(".oe_website_sale .grid_column").addClass('col-md-4');
            $('.oe_website_sale .oe_subdescription').addClass('o_hidden');
        }
        if (localStorage.getItem("product_view") == '2-grid') {
            $(".oe_website_sale .shift_list_view").removeClass('active');
            $(".oe_website_sale .shift_grid_view").removeClass('active');
            $(".oe_website_sale .shift_2_col_grid_view").addClass('active');
            $('.oe_website_sale .oe_subdescription').removeClass('o_hidden');
            $('#products_grid').removeClass("list-view-box");
            $(".oe_website_sale .grid_column").removeClass('col-md-4');
            $(".oe_website_sale .grid_column").removeClass('col-md-3');
            $(".oe_website_sale .grid_column").addClass('col-md-6');
            $('.oe_website_sale .oe_subdescription').addClass('o_hidden');
        }
        if (localStorage.getItem("product_view") == '4-grid') {
            $(".oe_website_sale .shift_list_view").removeClass('active');
            $(".oe_website_sale .shift_grid_view").removeClass('active');
            $(".oe_website_sale .shift_2_col_grid_view").removeClass('active');
            $(".oe_website_sale .shift_4_col_grid_view").addClass('active');
            $('.oe_website_sale .oe_subdescription').removeClass('o_hidden');
            $('#products_grid').removeClass("list-view-box");
            $(".oe_website_sale .grid_column").removeClass('col-md-4');
            $(".oe_website_sale .grid_column").removeClass('col-md-6');
            $(".oe_website_sale .grid_column").addClass('col-md-3');
            $('.oe_website_sale .oe_subdescription').addClass('o_hidden');
        }

            var videoSrc;  
            $('.static-youtube').on('click',function() {
                event.preventDefault();
                videoSrc = $(this).attr('href');
               
                if(videoSrc)
                {
                    var convt_embed = videoSrc.replace("watch?v=", "embed/");    
                    
                    $('#youtube_id').attr('data',convt_embed)
                }
                
            });
            // $('section#adv_banner').masonry({rowMinAspectRatio: 3.3, borderWidth: 4});
            var offset = 300,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 700,
            //grab the "back to top" link
            $back_to_top = $('.cd-top');

            //hide or show the "back to top" link
            $(window).on('scroll',function() {
                ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
                if ($(this).scrollTop() > offset_opacity) {
                    $back_to_top.addClass('cd-fade-out');
                }
            });

            
            //smooth scroll to top
            $back_to_top.on('click', function(event) {
                event.preventDefault();
                $('body,html').animate({scrollTop: 0}, scroll_top_duration);
            });
            if($(".oe_website_sale").length === 0){
                $("div#wrap").addClass("oe_website_sale");
            }
            if($(".js_cart_summary").length === 0){
                $("div.oe_cart").removeClass("col-xl-8");
            }
            else
            {
             $("div.oe_cart").addClass("col-xl-8");   
            }
            //scroll top end
            //number slider count start
                var totalItems = $('.myNumCarousel .carousel-item').length;
                var currentIndex_active = $('.myNumCarousel  div.carousel-item.active').index() + 1;

                var down_index=currentIndex_active;
                $('.myNumCarousel .num').html(''+currentIndex_active+'/'+totalItems+'');
                $(".myNumCarousel .carousel-control-next").on('click',function(){
                    currentIndex_active = $('.myNumCarousel div.carousel-item.active').index() + 2;
                    if (totalItems >= currentIndex_active)
                    {
                        down_index= $('.myNumCarousel div.carousel-item.active').index() + 2;
                        $('.myNumCarousel .num').html(''+currentIndex_active+'/'+totalItems+'');
                    }
                    if (totalItems<currentIndex_active)
                    {   
                        var currentIndex_active = currentIndex_active - totalItems;
                        $('.myNumCarousel .num').html(''+currentIndex_active+'/'+totalItems+'');
                    }
                });
                $(".myNumCarousel .carousel-control-prev").on('click',function(){
                    down_index=down_index-1;
                    if (down_index >= 1 )
                    {
                        $('.myNumCarousel .num').html(''+down_index+'/'+totalItems+'');
                    }
                    if(down_index <= 0)
                    {
                        down_index=totalItems;
                        $('.myNumCarousel .num').html(''+down_index+'/'+totalItems+'');
                    }
                });
            //number slider count End
        // Price slider code start
        var minval = $("input#m1").attr('value'),
            maxval = $('input#m2').attr('value'),
            minrange = $('input#ra1').attr('value'),
            maxrange = $('input#ra2').attr('value'),
            website_currency = $('input#scita_website_currency').attr('value');
        if (!minval) {
            minval = 0;
        }
        if (!maxval) {
            maxval = maxrange;
        }
        if (!minrange) {
            minrange = 0;

        }
        if (!maxrange) {
            maxrange = 2000;
        }

        $("div#priceslider").ionRangeSlider({
            keyboard: true,
            min: parseInt(minrange),
            max: parseInt(maxrange),
            type: 'double',
            from: minval,
            to: maxval,
            step: 1,
            prefix: website_currency,
            grid: true,
            onFinish: function(data) {
                $("input[name='min1']").attr('value', parseInt(data.from));
                $("input[name='max1']").attr('value', parseInt(data.to));
                $("div#priceslider").closest("form").submit();
            },
        });
        // Price slider code ends
        $('a.static-youtube').on('click', function(e) {
            $('.data-youtube').removeClass("o_hidden");
        });

        $('li.menu_style_3').on('click', function(e) {
                equal_height_prod();
        });
        equal_height_all();
        setTimeout(function(){
            $('.o_extra_menu_items .dropdown-menu').css('display','none');
            $('li.o_extra_menu_items .dropdown').on('click',function(event) {
                event.stopPropagation();
                $(this).find('.dropdown-menu').slideToggle();

            });
            $('li.o_extra_menu_items li.li-mega-menu').on('click',function(event) {
                event.stopImmediatePropagation();
                $(this).find('.dropdown-menu').slideToggle();

            });
            var sliderTwo = $('.mm-slider .carousel').carousel({
                /* your options for slider #2 */
            })

            $(".mm-slider .carousel-control div").click(function (e) {
                var index = $(this).data('slide');
                sliderTwo.carousel(index);
                e.preventDefault();
            });
        },100);
    });
    $(document).on('click',function (e){
       $('span#close_youtube_bar').on('click', function(e) {
            $('.data-youtube').addClass("o_hidden");
        });
    }); 

    function equal_height_prod() {
        function resetHeightReddy() {
            var maxHeight = 0;
            
                $("span.sct-pro-menu-name").height("auto").each(function() {
                    maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
                }).height(maxHeight);
            

        }
        resetHeightReddy();
        $(window).resize(function() {
            resetHeightReddy();
        });
    }
    
    function equal_height_all() {
        function resetHeight() {
            var maxHeight = 0;
            $(".it-icon h4").height("auto").each(function() {
                maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
            }).height(maxHeight);
            $(".myourteam .image-container").height("auto").each(function() {
                maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
            }).height(maxHeight);
            $(".it_blogs .blog-thumb").height("auto").each(function() {
                maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
            }).height(maxHeight);
            $(".case_study_varient_2 .case_study_box").height("auto").each(function() {
                maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
            }).height(maxHeight);
        }
        resetHeight();
        $(window).resize(function() {
            resetHeight();
        });
    }
    function truncateText(selector, maxLength) {
        var element = document.querySelector(selector),
            truncated = element.innerText;

        if (truncated.length > maxLength) {
            truncated = truncated.substr(0,maxLength) + '...';
        }
        return truncated;
    }
//You can then call the function with something like what i have below.

});