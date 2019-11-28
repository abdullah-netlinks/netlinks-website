# -*- coding: utf-8 -*-
# Part of AppJetty. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class ResPartnerInherit(models.Model):
    _inherit = "res.partner"

    add_to_slider = fields.Boolean(string="Add to client slider")
