odoo.define('theme_scita.scita_frontend_js', function(require) {
    'use strict';
    var animation = require('website.content.snippets.animation');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var _t = core._t;
    animation.registry.oe_cat_slider = animation.Class.extend({
        selector: ".oe_cat_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $cate_slider = $('#wrapwrap').find('#theme_scita_custom_category_slider');
                var cat_name = _t("Category Slider")
                _.each($cate_slider, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + cat_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_id = self.$target.attr('data-cat-slider-id');
                $.get("/theme_scita/category_get_dynamic_slider", {
                    'slider-id': self.$target.attr('data-cat-slider-id') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".oe_cat_slider").removeClass('o_hidden');
                    }
                });
            }
        }
    });
    animation.registry.second_cat_slider = animation.Class.extend({
        selector: ".second_cat_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $cate_slider = $('#wrapwrap').find('#second_custom_category_slider');
                var cat_name = _t("Category Slider")
                _.each($cate_slider, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + cat_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_id = self.$target.attr('data-cat-slider-id');
                $.get("/theme_scita/second_get_dynamic_cat_slider", {
                    'slider-id': self.$target.attr('data-cat-slider-id') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".second_cat_slider").removeClass('o_hidden');
                    }
                });
            }
        }
    });
    animation.registry.theme_scita_product_slider = animation.Class.extend({
        selector: ".oe_prod_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $prod_slider = $('#wrapwrap').find('#theme_scita_custom_product_slider');
                var prod_name = _t("Products Slider")
                
                _.each($prod_slider, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + prod_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_id = self.$target.attr('data-prod-slider-id');
                $.get("/theme_scita/product_get_dynamic_slider", {
                    'slider-id': self.$target.attr('data-prod-slider-id') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".oe_prod_slider").removeClass('o_hidden');

                        ajax.jsonRpc('/theme_scita/product_image_effect_config', 'call', {
                            'slider_id': slider_id
                        }).then(function(res) {
                            $('div#' + res.s_id).owlCarousel({
                                margin: 10,
                                responsiveClass: true,
                                items: res.counts,
                                loop: false,
                                rewind:true,
                                nav:true,
                                autoplay: res.auto_rotate,
                                autoplayTimeout:res.auto_play_time,
                                autoplayHoverPause:true,
                                responsive: {
                                    0: {
                                        items: 1,
                                    },
                                    420: {
                                        items: 2,
                                    },
                                    768: {
                                        items: 3,
                                    },
                                    1000: {
                                        items: res.counts,
                                    },
                                    1500: {
                                        items: res.counts,
                                    },
                                },
                            });
                        });
                    }
                });
            }
        }
    });
    animation.registry.scita_multi_cat_custom_snippet = animation.Class.extend({
        selector: ".oe_multi_category_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $multi_cat_slider = $('#wrapwrap').find('.oe_multi_category_slider');
                var multi_cat_name = _t("Multi Product Slider")

                _.each($multi_cat_slider, function (single){
                    $(single).empty().append('<div class="container">\
                                                <div class="row our-categories">\
                                                    <div class="col-md-12">\
                                                        <div class="title-block">\
                                                            <h4 id="snippet-title" class="section-title style1"><span>'+ multi_cat_name+'</span></h4>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>')
                });

            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-multi-cat-slider-type');
                $.get("/retial/product_multi_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-multi-cat-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".oe_multi_category_slider").removeClass('hidden');

                        ajax.jsonRpc('/theme_scita/product_multi_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            $('div.retail_featured_product_1 .owl-carousel').owlCarousel({
                                loop:false,
                                autoplay: res.auto_rotate,
                                autoplayTimeout:res.auto_play_time,
                                autoplayHoverPause:true,
                                margin:30,
                                nav:false,
                                rewind:true,
                                items: 4,
                                responsive: {
                                    0: {
                                        items: 1,
                                    },
                                    420: {
                                        items: 2,
                                    },
                                    767: {
                                        items: 3,
                                    },
                                    1000: {
                                        items: 4,
                                    },
                                
                                },
                            });
                        });

                    }
                });
            }
        }
    });
    animation.registry.fashion_multi_cat_custom_snippet = animation.Class.extend({
        selector: ".fashion_multi_category_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $multi_cat_slider = $('#wrapwrap').find('.fashion_multi_category_slider');
                var multi_cat_name = _t("Multi Product Slider")

                _.each($multi_cat_slider, function (single){
                    $(single).empty().append('<div class="container">\
                                                <div class="row our-categories">\
                                                    <div class="col-md-12">\
                                                        <div class="title-block">\
                                                            <h4 id="snippet-title" class="section-title style1"><span>'+ multi_cat_name+'</span></h4>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>')
                });

            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-multi-cat-slider-type');
                $.get("/fashion/fashion_product_multi_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-multi-cat-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".fashion_multi_category_slider").removeClass('hidden');

                        ajax.jsonRpc('/theme_scita/product_multi_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            $('div.fashion_featured_product_1 .fashion_cro ').owlCarousel({
                                loop:false,
                                rewind:true,
                                autoplay: res.auto_rotate,
                                autoplayTimeout:res.auto_play_time,
                                autoplayHoverPause:true,
                                margin:25,
                                items: 5,
                                responsive: {
                                    0: {
                                        items: 1,
                                    },
                                    375: {
                                        items: 2,
                                        margin: 20
                                    },
                                    767: {
                                        items: 3,
                                    },
                                    1000: {
                                        items: 4,
                                    },
                                    1600: {
                                        items: 5,
                                    },
                                },
                            });
                        });

                    }
                });
            }
        }
    });
    // for brand slider 
    animation.registry.prod_brands = animation.Class.extend({
        selector: ".oe_brand_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                // $('.oe_brand_slider .owl-carousel').empty();
                var $brand_snip = $('#wrapwrap').find('.oe_brand_slider .owl-carousel');
                _.each($brand_snip, function(single) {
                    $(single).empty();
                });
                

            }
            if (!this.editableMode) {
                
                $.get("/shop/get_brand_slider", {
                    'product_count': self.$target.attr('data-product-count') || 0,
                    'product_label': self.$target.attr('data-product-label') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty().append(data);
                        $(".oe_brand_slider").removeClass('o_hidden');
                        $('#website_brands_slider').owlCarousel({
                            margin: 10,
                            items:6,
                            loop:false,
                            rewind:true,
                            autoplay:true,
                            autoplayTimeout:4000,
                            autoplayHoverPause:true,                           
                            responsive: {
                                0: {
                                    items: 2
                                },
                                480: {
                                    items: 3
                                },
                                768: {
                                    items: 4
                                },
                                1024: {
                                    items: 6
                                },
                                1500: {
                                    items: 6
                                },
                            },
                        });
                    }
                });
            }
        }
    });
    // for box brand slider 
    animation.registry.brands_box_slider_4 = animation.Class.extend({
        selector: ".box_brand_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                // $('.oe_brand_slider .owl-carousel').empty();
                var $brand_snip = $('#wrapwrap').find('.box_brand_slider .owl-carousel');
                var brand_name = _t("Brand Slider");
                _.each($brand_snip, function(single) {
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + brand_name + '</h3>\
                                                    </div>\
                                                </div>');
                });

            }
            if (!this.editableMode) {
                $.get("/shop/get_box_brand_slider", {
                    'product_count': self.$target.attr('data-product-count') || 0,
                    'product_label': self.$target.attr('data-product-label') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty().append(data);
                        $(".box_brand_slider").removeClass('o_hidden');
                        $('#box_brands_slider_owl').owlCarousel({
                            margin: 10,
                            items:6,
                            loop:false,
                            autoplay:true,
                            rewind:true,
                            dots:false,
                            autoplayTimeout:5000,
                            autoplayHoverPause:true,                           
                            responsive: {
                                0: {
                                    items: 2
                                },
                                480: {
                                    items: 3
                                },
                                768: {
                                    items: 4
                                },
                                1024: {
                                    items: 6
                                },
                                1500: {
                                    items: 6
                                },
                            },
                        });
                    }
                });
            }
        }
    });
    // for brand slider 
    animation.registry.it_prod_brands = animation.Class.extend({
        selector: ".it_brand_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                // $('.oe_brand_slider .owl-carousel').empty();
                var $brand_snip = $('#wrapwrap').find('.it_brand_slider .our-brands');
                _.each($brand_snip, function(single) {
                    $(single).empty();
                });

            }
            if (!this.editableMode) {
                $.get("/shop/get_it_brand", {
                    'product_count': self.$target.attr('data-product-count') || 0,
                    'product_label': self.$target.attr('data-product-label') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty().append(data);
                        $(".it_brand_slider").removeClass('o_hidden');
                    }
                });
            }
        }
    });
    animation.registry.theme_scita_blog_custom_snippet = animation.Class.extend({
        selector: ".scita_blog_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#theme_scita_custom_blog_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".scita_blog_slider").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            
                        });
                    }
                });
            }
        }
    });
    animation.registry.health_blog_custom_snippet = animation.Class.extend({
        selector: ".health_blog_slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#health_custom_blog_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/health_blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".health_blog_slider").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            
                        });
                    }
                });
            }
        }
    });
    animation.registry.blog_2_custom_snippet = animation.Class.extend({
        selector: ".blog_2_custom",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#blog_custom_2_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/second_blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".blog_2_custom").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            $('#blog_2_owl_carosel').owlCarousel({
                                margin: 30,
                                items: 3,
                                loop: false,
                                dots:false,
                                autoplay: res.auto_rotate,
                                autoplayTimeout:res.auto_play_time,
                                autoplayHoverPause:true,
                                nav: false,
                                rewind:true,
                                responsive: {
                                    0: {
                                        items: 1,
                                    },
                                    420: {
                                        items: 2,
                                    },
                                    768: {
                                        items: 3,
                                    },
                                    1000: {
                                        items: 3,
                                    },
                                    1500: {
                                        items: 3,
                                    }
                                },
                            });
                        });
                    }
                });
            }
        }
    });
    animation.registry.blog_3_custom_snippet = animation.Class.extend({
        selector: ".blog_3_custom",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#blog_custom_3_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/third_blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".blog_3_custom").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            $('#blog_3_owl_carosel').owlCarousel({
                                margin: 40,
                                items: 3,
                                loop: false,
                                autoplay: res.auto_rotate,
                                autoplayTimeout:res.auto_play_time,
                                autoplayHoverPause:true,
                                nav: false,
                                dots:false,
                                rewind:true,
                                responsive: {
                                    0: {
                                        items: 1,
                                    },
                                    576: {
                                        items: 2,
                                    },
                                    1000: {
                                        items: 3,
                                    }
                                },
                            });
                        });
                    }
                });
            }
        }
    });
    animation.registry.blog_4_custom_snippet = animation.Class.extend({
        selector: ".blog_4_custom",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#blog_custom_4_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/forth_blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".blog_4_custom").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            
                        });
                    }
                });
            }
        }
    });
    animation.registry.blog_6_custom_snippet = animation.Class.extend({
        selector: ".blog_6_custom",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#blog_custom_6_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/six_blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".blog_4_custom").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            
                        });
                    }
                });
            }
        }
    });
    animation.registry.blog_5_custom_snippet = animation.Class.extend({
        selector: ".blog_5_custom",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#blog_custom_5_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/fifth_blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".blog_5_custom").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            $('#blog_5_owl_carosel').owlCarousel({
                                margin: 30,
                                items: 3,
                                loop: false,
                                dots:false,
                                rewind:true,
                                autoplay: res.auto_rotate,
                                autoplayTimeout:res.auto_play_time,
                                autoplayHoverPause:true,
                                nav: false,
                                responsive: {
                                    0: {
                                        items: 1,
                                    },
                                    576: {
                                        items: 2,
                                    },
                                    1000: {
                                        items: 3,
                                    }
                                },
                            });
                        });
                    }
                });
            }
        }
    });
    animation.registry.blog_8_custom_snippet = animation.Class.extend({
        selector: ".blog_8_custom",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $blog_snip = $('#wrapwrap').find('#blog_custom_8_snippet');
                var blog_name = _t("Blog Slider")
                
                _.each($blog_snip, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + blog_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                var slider_type = self.$target.attr('data-blog-slider-type');
                $.get("/theme_scita/eight_blog_get_dynamic_slider", {
                    'slider-type': self.$target.attr('data-blog-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $(".blog_8_custom").removeClass('o_hidden');
                        ajax.jsonRpc('/theme_scita/blog_image_effect_config', 'call', {
                            'slider_type': slider_type
                        }).then(function(res) {
                            $('#blog_8_owl_carosel').owlCarousel({
                                margin: 30,
                                items: 3,
                                loop: false,
                                autoplay: res.auto_rotate,
                                autoplayTimeout:res.auto_play_time,
                                autoplayHoverPause:true,
                                rewind:true,
                                nav: false,
                                dots:true,
                                responsive: {
                                    0: {
                                        items: 1,
                                    },
                                    768: {
                                        items: 2,
                                    },
                                    1000: {
                                        items: 3,
                                    }
                                },
                            });
                        });
                    }
                });
            }
        }
    });
    // Client sliders 
    animation.registry.s_theme_scita_client_slider_snippet = animation.Class.extend({
        selector: ".our-client-slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $client_slider = $('#wrapwrap').find('#theme_scita_custom_client_slider');
                var client_name = _t("Client Slider")

                _.each($client_slider, function (single){
                    $(single).empty().append('<div class="container">\
                                                    <div class="block-title">\
                                                        <h3 class="fancy">' + client_name + '</h3>\
                                                    </div>\
                                                </div>')
                });
            }
            if (!this.editableMode) {
                $.get("/theme_scita/get_clients_dynamically_slider", {}).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                        $('div#scita-client-slider').owlCarousel({
                            loop: false,
                            margin: 40,
                            nav: false,
                            rewind:true,
                            autoplay:true,
                            dots:false,
                            autoplayTimeout:4000,
                            autoplayHoverPause:true,
                            responsive: {
                                0: {
                                    items: 1,
                                },
                                420: {
                                    items: 2,
                                },
                                768: {
                                    items: 4,
                                },
                                1000: {
                                    items: 6,
                                },
                                1500: {
                                    items: 6,
                                }
                            }
                        });
                    }
                });
            }
        }
    });
    // Client sliders 2
    animation.registry.second_client_slider_snippet = animation.Class.extend({
        selector: ".our-partner-client-slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $client_slider = $('#wrapwrap').find('#second_custom_client_slider');
                var client_name = _t("Our Partners")

                _.each($client_slider, function (single){
                    $(single).empty().append('')
                });
            }
            if (!this.editableMode) {
                $.get("/theme_scita/second_get_clients_dynamically_slider", {}).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                    }
                });
            }
        }
    });
    // Client sliders 2
    animation.registry.third_client_slider_snippet = animation.Class.extend({
        selector: ".testimonial-client-slider",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $client_slider = $('#wrapwrap').find('#our_partner_testimonial');
                var client_name = _t("Our Partners")

                _.each($client_slider, function (single){
                    $(single).empty().append('')
                });
            }
            if (!this.editableMode) {
                $.get("/theme_scita/third_get_clients_dynamically_slider", {}).then(function(data) {
                    if (data) {
                        self.$target.empty();
                        self.$target.append(data);
                    }
                });
            }
        }
    });
    animation.registry.it_our_team = animation.Class.extend({
        selector: ".our_team_1",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $team_one = $('#wrapwrap').find('#it_our_team');

                _.each($team_one, function (single){
                    $(single).empty().append('');
                });
            }
            if (!this.editableMode) {
                $.get("/biztech_emp_data_one/employee_data", {}).then(function(data) {
                    self.$target.empty();
                    self.$target.append(data);
                    $('#myourteam').owlCarousel({
                        loop:false,
                        margin:30,
                        nav:false,
                        items:6,
                        dots:false,
                        rewind:true,
                        autoplay:true,
                        autoplayTimeout:4000,
                        autoplayHoverPause:true,
                        autoHeight: false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:3
                            },
                            1000:{
                                items:4
                            },
                            1200:{
                                items:5
                            },
                            1600:{
                                items:6
                            }
                        }
                    });
                })
            }
        }
    });
    animation.registry.our_team_varient_2 = animation.Class.extend({
        selector: ".our_team_2",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $team_one = $('#wrapwrap').find('#our_team_varient_2');

                _.each($team_one, function (single){
                    $(single).empty().append('');
                });
            }
            if (!this.editableMode) {
                $.get("/biztech_emp_data_two/employee_data", {}).then(function(data) {
                    self.$target.empty();
                    self.$target.append(data);
                    $('#v_2_myourteam').owlCarousel({
                        loop:false,
                        margin:30,
                        nav:false,
                        items:4,
                        rewind:true,
                        autoplay:true,
                        autoplayTimeout:4000,
                        autoplayHoverPause:true,
                        dots:false,
                        autoHeight: false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:3
                            },
                            1000:{
                                items:4
                            },
                            1200:{
                                items:4
                            },
                            1600:{
                                items:4
                            }
                        }
                    });
                })
            }
        }
    });
    animation.registry.our_team_varient_3 = animation.Class.extend({
        selector: ".our_team_3",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $team_one = $('#wrapwrap').find('#our_team_varient_3');

                _.each($team_one, function (single){
                    $(single).empty().append('');
                });
            }
            if (!this.editableMode) {
                $.get("/biztech_emp_data_three/employee_data", {}).then(function(data) {
                    self.$target.empty();
                    self.$target.append(data);
                    $('#v_3_myourteam').owlCarousel({
                        loop:false,
                        margin:30,
                        nav:false,
                        items:3,
                        dots:false,
                        rewind:true,
                        autoplay:true,
                        autoplayTimeout:4000,
                        autoplayHoverPause:true,
                        autoHeight: false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:3
                            },
                            1000:{
                                items:3
                            },
                            1200:{
                                items:3
                            },
                            1600:{
                                items:3
                            }
                        }
                    });
                })
            }
        }
    });
    animation.registry.our_team_varient_4 = animation.Class.extend({
        selector: ".our_team_4",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $team_one = $('#wrapwrap').find('#our_team_varient_4');

                _.each($team_one, function (single){
                    $(single).empty().append('');
                });
            }
            if (!this.editableMode) {
                $.get("/biztech_emp_data_four/employee_data", {}).then(function(data) {
                    self.$target.empty();
                    self.$target.append(data);
                    $('#v_4_myourteam').owlCarousel({
                        loop:false,
                        margin:30,
                        nav:false,
                        items:4,
                        autoplay:true,
                        rewind:true,
                        autoplayTimeout:4000,
                        autoplayHoverPause:true,
                        dots:false,
                        autoHeight: false,
                        responsive:{
                            0:{
                                items:1
                            },
                            576:{
                                items:2
                            },
                            992:{
                                items: 3
                            },
                            1200:{
                                items:4
                            },
                            1600:{
                                items:4
                            }
                        }
                    });
                })
            }
        }
    });
    animation.registry.our_team_varient_5 = animation.Class.extend({
        selector: ".our_team_5",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $team_one = $('#wrapwrap').find('#our_team_varient_5');

                _.each($team_one, function (single){
                    $(single).empty().append('');
                });
            }
            if (!this.editableMode) {
                $.get("/biztech_emp_data_five/employee_data", {}).then(function(data) {
                    self.$target.empty();
                    self.$target.append(data);
                    $('#v_5_myourteam').owlCarousel({
                        loop:false,
                        margin:30,
                        nav:false,
                        items:3,
                        autoplay:true,
                        rewind:true,
                        autoplayTimeout:4000,
                        autoplayHoverPause:true,
                        dots:false,
                        autoHeight: false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:2
                            },
                            768:{
                                items:3
                            }
                        }
                    });
                })
            }
        }
    });
    animation.registry.our_team_varient_6 = animation.Class.extend({
        selector: ".our_team_6",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $team_one = $('#wrapwrap').find('#our_team_varient_6');

                _.each($team_one, function (single){
                    $(single).empty().append('');
                });
            }
            if (!this.editableMode) {
                $.get("/biztech_emp_data_six/employee_data", {}).then(function(data) {
                    self.$target.empty();
                    self.$target.append(data);
                    $('#v_6_myourteam').owlCarousel({
                        loop:false,
                        margin:30,
                        nav:false,
                        rewind:true,
                        autoplay:true,
                        autoplayTimeout:4000,
                        autoplayHoverPause:true,
                        items:3,
                        dots:false,
                        autoHeight: false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:2
                            },
                            1000:{
                                items:3
                            },
                            1200:{
                                items:3
                            }
                        }
                    });
                })
            }
        }
    });
    animation.registry.our_team_varient_7 = animation.Class.extend({
        selector: ".our_team_7",
        disabledInEditableMode: false,
        start: function() {
            var self = this;
            if (this.editableMode) {
                var $team_one = $('#wrapwrap').find('#our_team_varient_7');

                _.each($team_one, function (single){
                    $(single).empty().append('');
                });
            }
            if (!this.editableMode) {
                $.get("/biztech_emp_data_seven/employee_data", {}).then(function(data) {
                    self.$target.empty();
                    self.$target.append(data);
                    $('#v_7_myourteam').owlCarousel({
                        loop:false,
                        margin:30,
                        nav:false,
                        items:2,
                        rewind:true,
                        dots:false,
                        autoplay:true,
                        autoplayTimeout:4000,
                        autoplayHoverPause:true,
                        autoHeight: false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:2
                            },
                            1000:{
                                items:2
                            },
                            1200:{
                                items:2
                            },
                            1600:{
                                items:2
                            }
                        }
                    });
                })
            }
        }
    });
});
