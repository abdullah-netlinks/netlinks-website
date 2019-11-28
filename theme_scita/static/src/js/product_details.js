odoo.define('theme_scita.scita_product_js', function(require) {
    "use strict";
// Multi image gallery
    var api;
    var ajax = require('web.ajax');
    function check()
    {   
        if (chkObject('gallery')==true)
       {    
        
        ajax.jsonRpc('/theme_scita/scita_multi_image_thumbnail_config', 'call', {})
                    .then(function(res) {
            var dynamic_data = {}

            dynamic_data['gallery_images_preload_type'] = 'all'
            dynamic_data['slider_enable_text_panel'] = false
            dynamic_data['gallery_skin'] = "alexis"
            dynamic_data['gallery_height'] = 850
            dynamic_data['slider_scale_mode']='fit'
            if (res.theme_panel_position != false) {
                dynamic_data['theme_panel_position'] = res.theme_panel_position
            }
            else{
             dynamic_data['theme_panel_position'] = "left"   
            }
            if (res.change_thumbnail_size == true) {
                dynamic_data['thumb_height'] = res.thumb_height
                dynamic_data['thumb_width'] = res.thumb_width
            }
            else{
                dynamic_data['thumb_width'] = 66          
                dynamic_data['thumb_height'] = 86

            }
            api = $('#gallery').unitegallery(dynamic_data);
            api.on("item_change", function(num, data) {
            if (data['index'] == 0) {
                    update_gallery_product_image();
                }
            });
            if (api != undefined && $('#gallery').length != 0) {
                setTimeout(function() {
                    update_gallery_product_image()
                }, 200);
            }
            });
            int=window.clearInterval(int);

       }
       else{

       }
    }
    var int=setInterval(check, 100);
    function chkObject(elemClass)
    {  
       return ($('#'+elemClass).length==1)? true : false;
    }


    function update_gallery_product_variant_image(event_source, product_id) {
        var $imgs = $(event_source).closest('.oe_website_sale').find('.ug-slide-wrapper');
        var $img = $imgs.find('img');
        if (api!= undefined)
        {
            var total_img = api.getNumItems()
            if (total_img != undefined) {
                api.selectItem(0);
            }
            var $stay;
            $img.each(function(e) {
                if ($(this).attr("src").startsWith('/web/image/scita.product.images/') == false) {
                    
                    $(this).attr("src", "/web/image/product.product/" + product_id + "/image_1920");
                    $("img.js_variant_img_small").attr("src", "/web/image/product.product/" + product_id + "/image_1920");
                    $stay = $(this).parent().parent();
                    $(this).css({
                        'width': 'initial',
                        'height': 'initial'
                    });
                    api.resetZoom();
                    api.zoomIn();
                    
                }
            });    
        }
        
    }

    setTimeout(function() {
        $('.oe_website_sale').on('change', 'ul[data-attribute_exclusions]', function(ev) {
            var self = this
            setTimeout(function() {
                var product_id = $('input.product_id').val();
                if (product_id) {
                    if (chkObject('gallery')==true)
                    {  
                        update_gallery_product_variant_image(self, product_id);
                    }
                }
            }, 500)
        });
   } ,500)

   function update_gallery_product_image() {
        var $container = $('.oe_website_sale').find('.ug-slide-wrapper');
        var $img = $container.find('img');
        var $product_container = $('.oe_website_sale').find('.js_product').first();
        var p_id = parseInt($product_container.find('input.product_id').first().val());

        if (p_id > 0) {
            $img.each(function(e_img) {
                if ($(this).attr("src").startsWith('/web/image/scita.product.images/') == false) {
                    
                    $(this).attr("src", "/web/image/product.product/" + p_id + "/image_1920");
                    
                }
            });
        } else {
            var spare_link = api.getItem(0).urlThumb;
            $img.each(function(e_img) {
                if ($(this).attr("src").startsWith('/web/image/scita.product.images/') == false) {
                    
                    $(this).attr("src", spare_link);
                    
                }
            });
        }
    }
});