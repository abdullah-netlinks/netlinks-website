# -*- coding: utf-8 -*-
# Part of AppJetty. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class CustomResConfiguration(models.TransientModel):
    """ Inherit the base settings to add favicon. """
    _inherit = 'res.config.settings'

    header_logo = fields.Binary(
        'Header Logo', related='website_id.header_logo', readonly=False)
    footer_logo = fields.Binary(
        'Footer Logo', related='website_id.footer_logo', readonly=False)
    is_cookie = fields.Boolean(related='website_id.is_cookie', readonly=False)
    msg_cookie = fields.Text(related='website_id.msg_cookie', readonly=False)
    msg_button = fields.Char(related='website_id.msg_button', readonly=False)
    msg_position = fields.Selection(related='website_id.msg_position',
                                    default='top',
                                    string="Message Position", readonly=False)
    # For multi image
    thumbnail_panel_position = fields.Selection([
        ('left', 'Left'),
        ('right', 'Right'),
        ('bottom', 'Bottom')],
        string='Thumbnails panel position',
        related='website_id.thumbnail_panel_position',
        help="Select the position where you want to display the thumbnail panel in multi image.", readonly=False)
    change_thumbnail_size = fields.Boolean(string="Change thumbnail size",
                                           related="website_id.change_thumbnail_size", readonly=False
                                           )
    thumb_height = fields.Char(string='Thumb height',
                               related="website_id.thumb_height", readonly=False
                               )
    thumb_width = fields.Char(string='Thumb width',
                              related="website_id.thumb_width", readonly=False
                              )
    # For brand setting
    is_brand_display = fields.Boolean(
        string="Brand display in product page", related="website_id.is_brand_display", readonly=False)
    brand_display_option = fields.Selection([
        ('name', 'Name'),
        ('logo', 'Logo'),
    ], related="website_id.brand_display_option",
        string='Brand Display Option',
        help="Select the option for brand logo  or name display.", readonly=False)
    is_default_code = fields.Boolean(
        string="Default code display in product page", related="website_id.is_default_code", readonly=False)
    # For social setting
    is_social_display = fields.Boolean(
        string="Social share is display in product page", related="website_id.is_social_display", readonly=False)
