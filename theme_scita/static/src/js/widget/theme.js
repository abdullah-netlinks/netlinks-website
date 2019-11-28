odoo.define('website.theme_custom', function (require) {
'use strict';

var Theme = require('website.theme');
var ColorpickerDialog = require('web.ColorpickerDialog');
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
Theme.include({
    xmlDependencies: (Theme.prototype.xmlDependencies || [])
        .concat(['/theme_scita/static/src/xml/website_editor.xml']),
    events: {
        'change .o_theme_customize_option_input': '_onChange',
        'click .checked .o_theme_customize_option_input[type="radio"]': '_onChange',
        'click .o_theme_customize_add_google_font': '_onAddGoogleFontClick',
        'click .o_theme_customize_delete_google_font': '_onDeleteGoogleFontClick',
    },
    _pickColor: function (colorElement) {
        var self = this;
        var $color = $(colorElement);
        var colorName = $color.data('color');
        var colorType = $color.data('colorType');
        return new Promise(function (resolve, reject) {
        var colorpicker = new ColorpickerDialog(self, {
                defaultColor: $color.css('background-color'),
            });
            var chosenColor = undefined;
            colorpicker.on('colorpicker:saved', self, function (ev) {
                ev.stopPropagation();
                chosenColor = ev.data.cssColor;
            });
            colorpicker.on('closed', self, function (ev) {
                if (chosenColor === undefined) {
                    resolve();
                    return;
                }

                var baseURL = '/website/static/src/scss/options/colors/';
                var url = _.str.sprintf('%suser_%scolor_palette.scss', baseURL, (colorType ? (colorType + '_') : ''));
                var url = '/theme_scita/static/src/scss/colors/color_picker.scss'
                var colors = {};
                colors[colorName] = chosenColor;
                if (colorName === 'alpha') {
                    colors['beta'] = 'null';
                    colors['gamma'] = 'null';
                    colors['delta'] = 'null';
                    colors['epsilon'] = 'null';
                }
                var updatedFileContent = "$theme:" + chosenColor+ ";";
                this._rpc({
                    route: '/web_editor/save_asset',
                    params: {
                        'url': url,
                        'bundle_xmlid': 'web.assets_frontend',
                        'content': updatedFileContent,
                        'file_type':'scss'
                    },
                })
                .then(function (d){
                     window.location.reload();
                     });
            });
            colorpicker.open();
        });
    },
});

});								
