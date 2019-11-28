# -*- coding: utf-8 -*-
# Part of AppJetty. See LICENSE file for full copyright and licensing details.
import re
import math
import json
import os
from werkzeug.exceptions import Forbidden, NotFound
from odoo import http, SUPERUSER_ID, fields
from odoo.http import request
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.website.controllers.main import QueryURL
from odoo.addons.website_sale.controllers import main
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.addons.website_sale.controllers.main import TableCompute


class ScitaSliderSettings(http.Controller):

    def get_blog_data(self, slider_type):
        slider_header = request.env['blog.slider.config'].sudo().search(
            [('id', '=', int(slider_type))])
        values = {
            'slider_header': slider_header,
            'blog_slider_details': slider_header.collections_blog_post,
        }
        return values

    def get_categories_data(self, slider_id):
        slider_header = request.env['category.slider.config'].sudo().search(
            [('id', '=', int(slider_id))])
        values = {
            'slider_header': slider_header
        }
        values.update({
            'slider_details': slider_header.collections_category,
        })
        return values

    def get_clients_data(self):
        client_data = request.env['res.partner'].sudo().search(
            [('add_to_slider', '=', True), ('website_published', '=', True)])
        values = {
            'client_slider_details': client_data,
        }
        return values

    def get_teams_data(self):
        employee = request.env['hr.employee'].sudo().search(
            [('include_inourteam', '=', 'True')])
        values = {
            'employee': employee,
        }
        return values

    @http.route(
        "/scita_cookie_notice/ok", auth="public", website=True, type='json',
        methods=['POST'])
    def accept_cookies(self):
        http.request.session["accepted_cookies"] = True
        http.request.env['ir.ui.view'].search([
            ('type', '=', 'qweb')
        ]).clear_caches()
        return {'result': 'ok'}

    @http.route(['/theme_scita/blog_get_options'], type='json', auth="public", website=True)
    def scita_get_slider_options(self):
        slider_options = []
        option = request.env['blog.slider.config'].search(
            [('active', '=', True)], order="name asc")
        for record in option:
            slider_options.append({'id': record.id,
                                   'name': record.name})
        return slider_options

    @http.route(['/theme_scita/blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def scita_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.theme_scita_blog_slider_view", values)

    @http.route(['/theme_scita/health_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def health_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.health_blog_slider_view", values)

    @http.route(['/theme_scita/second_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def second_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.scita_blog_2_slider_view", values)

    @http.route(['/theme_scita/third_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def third_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.scita_blog_3_slider_view", values)

    @http.route(['/theme_scita/six_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def six_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.scita_blog_6_slider_view", values)

    @http.route(['/theme_scita/forth_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def forth_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.scita_blog_4_slider_view", values)

    @http.route(['/theme_scita/fifth_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def fifth_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.scita_blog_5_slider_view", values)

    @http.route(['/theme_scita/seven_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def seven_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.scita_blog_7_slider_view", values)

    @http.route(['/theme_scita/eight_blog_get_dynamic_slider'], type='http', auth='public', website=True)
    def eight_get_dynamic_slider(self, **post):
        if post.get('slider-type'):
            values = self.get_blog_data(post.get('slider-type'))
            return request.render("theme_scita.scita_blog_8_slider_view", values)

    @http.route(['/theme_scita/blog_image_effect_config'], type='json', auth='public', website=True)
    def scita_product_image_dynamic_slider(self, **post):
        slider_data = request.env['blog.slider.config'].search(
            [('id', '=', int(post.get('slider_type')))])
        values = {
            's_id': str(slider_data.no_of_counts) + '-' + str(slider_data.id),
            'counts': slider_data.no_of_counts,
            'auto_rotate': slider_data.auto_rotate,
            'auto_play_time': slider_data.sliding_speed,
        }
        return values

    # for Client slider
    @http.route(['/theme_scita/get_clients_dynamically_slider'], type='http', auth='public', website=True)
    def get_clients_dynamically_slider(self, **post):
        values = self.get_clients_data()
        return request.render("theme_scita.theme_scita_client_slider_view", values)

    @http.route(['/theme_scita/second_get_clients_dynamically_slider'], type='http', auth='public', website=True)
    def second_get_clients_dynamically_slider(self, **post):
        values = self.get_clients_data()
        return request.render("theme_scita.second_client_slider_view", values)

    @http.route(['/theme_scita/third_get_clients_dynamically_slider'], type='http', auth='public', website=True)
    def third_get_clients_dynamically_slider(self, **post):
        values = self.get_clients_data()
        return request.render("theme_scita.third_client_slider_view", values)

    # our team

    @http.route(['/biztech_emp_data_one/employee_data'], type='http', auth='public', website=True)
    def get_team_one_dynamically_slider(self, **post):
        values = self.get_teams_data()
        return request.render("theme_scita.it_our_team_view", values)

    @http.route(['/biztech_emp_data_two/employee_data'], type='http', auth='public', website=True)
    def get_team_two_dynamically_slider(self, **post):
        values = self.get_teams_data()
        return request.render("theme_scita.our_team_varient_2_view", values)

    @http.route(['/biztech_emp_data_three/employee_data'], type='http', auth='public', website=True)
    def get_team_three_dynamically_slider(self, **post):
        values = self.get_teams_data()
        return request.render("theme_scita.our_team_varient_3_view", values)

    @http.route(['/biztech_emp_data_four/employee_data'], type='http', auth='public', website=True)
    def get_team_four_dynamically_slider(self, **post):
        values = self.get_teams_data()
        return request.render("theme_scita.our_team_varient_4_view", values)

    @http.route(['/biztech_emp_data_five/employee_data'], type='http', auth='public', website=True)
    def get_team_five_dynamically_slider(self, **post):
        values = self.get_teams_data()
        return request.render("theme_scita.our_team_varient_5_view", values)

    @http.route(['/biztech_emp_data_six/employee_data'], type='http', auth='public', website=True)
    def get_team_six_dynamically_slider(self, **post):
        values = self.get_teams_data()
        return request.render("theme_scita.our_team_varient_6_view", values)

    @http.route(['/biztech_emp_data_seven/employee_data'], type='http', auth='public', website=True)
    def get_team_seven_dynamically_slider(self, **post):
        values = self.get_teams_data()
        return request.render("theme_scita.our_team_varient_7_view", values)

    # For Category slider

    @http.route(['/theme_scita/category_get_options'], type='json', auth="public", website=True)
    def category_get_slider_options(self):
        slider_options = []
        option = request.env['category.slider.config'].search(
            [('active', '=', True)], order="name asc")
        for record in option:
            slider_options.append({'id': record.id,
                                   'name': record.name})
        return slider_options

    @http.route(['/theme_scita/category_get_dynamic_slider'], type='http', auth='public', website=True)
    def category_get_dynamic_slider(self, **post):
        if post.get('slider-id'):
            values = self.get_categories_data(post.get('slider-id'))
            return request.render("theme_scita.theme_scita_cat_slider_view", values)

    @http.route(['/theme_scita/second_get_dynamic_cat_slider'], type='http', auth='public', website=True)
    def second_get_dynamic_cat_slider(self, **post):
        if post.get('slider-id'):
            values = self.get_categories_data(post.get('slider-id'))
            return request.render("theme_scita.second_cat_slider_view", values)

    @http.route(['/theme_scita/scita_image_effect_config'], type='json', auth='public', website=True)
    def category_image_dynamic_slider(self, **post):
        slider_data = request.env['category.slider.config'].search(
            [('id', '=', int(post.get('slider_id')))])
        values = {
            's_id': slider_data.name.lower().replace(' ', '-') + '-' + str(slider_data.id),
            'counts': slider_data.no_of_counts,
            'auto_rotate': slider_data.auto_rotate,
            'auto_play_time': slider_data.sliding_speed,
        }
        return values

    # For Product slider
    @http.route(['/theme_scita/product_get_options'], type='json', auth="public", website=True)
    def product_get_slider_options(self):
        slider_options = []
        option = request.env['product.slider.config'].search(
            [('active', '=', True)], order="name asc")
        for record in option:
            slider_options.append({'id': record.id,
                                   'name': record.name})
        return slider_options

    @http.route(['/theme_scita/product_get_dynamic_slider'], type='http', auth='public', website=True)
    def product_get_dynamic_slider(self, **post):
        if post.get('slider-id'):
            slider_header = request.env['product.slider.config'].sudo().search(
                [('id', '=', int(post.get('slider-id')))])
            values = {
                'slider_header': slider_header
            }
            values.update({
                'slider_details': slider_header.collections_products,
            })
            return request.render("theme_scita.theme_scita_product_slider_view", values)

    @http.route(['/theme_scita/product_image_effect_config'], type='json', auth='public', website=True)
    def product_image_dynamic_slider(self, **post):
        slider_data = request.env['product.slider.config'].search(
            [('id', '=', int(post.get('slider_id')))])
        values = {
            's_id': slider_data.name.lower().replace(' ', '-') + '-' + str(slider_data.id),
            'counts': slider_data.no_of_counts,
            'auto_rotate': slider_data.auto_rotate,
            'auto_play_time': slider_data.sliding_speed,
        }
        return values

    # For multi product slider
    @http.route(['/theme_scita/product_multi_get_options'], type='json', auth="public", website=True)
    def product_multi_get_slider_options(self):
        slider_options = []
        option = request.env['multi.slider.config'].sudo().search(
            [('active', '=', True)], order="name asc")
        for record in option:
            slider_options.append({'id': record.id,
                                   'name': record.name})
        return slider_options

    @http.route(['/retial/product_multi_get_dynamic_slider'], type='http', auth='public', website=True)
    def retail_multi_get_dynamic_slider(self, **post):
        context, pool = dict(request.context), request.env
        if post.get('slider-type'):
            slider_header = request.env['multi.slider.config'].sudo().search(
                [('id', '=', int(post.get('slider-type')))])

            if not context.get('pricelist'):
                pricelist = request.website.get_current_pricelist()
                context = dict(request.context, pricelist=int(pricelist))
            else:
                pricelist = pool.get('product.pricelist').browse(
                    context['pricelist'])

            context.update({'pricelist': pricelist.id})
            from_currency = pool['res.users'].sudo().browse(
                SUPERUSER_ID).company_id.currency_id
            to_currency = pricelist.currency_id

            def compute_currency(price): return pool['res.currency']._convert(
                price, from_currency, to_currency, fields.Date.today())
            values = {
                'slider_details': slider_header,
                'slider_header': slider_header,
                'compute_currency': compute_currency,
            }
            return request.render("theme_scita.scita_multi_cat_slider_view", values)

    @http.route(['/fashion/fashion_product_multi_get_dynamic_slider'], type='http', auth='public', website=True)
    def fashion_multi_get_dynamic_slider(self, **post):
        context, pool = dict(request.context), request.env
        if post.get('slider-type'):
            slider_header = request.env['multi.slider.config'].sudo().search(
                [('id', '=', int(post.get('slider-type')))])

            if not context.get('pricelist'):
                pricelist = request.website.get_current_pricelist()
                context = dict(request.context, pricelist=int(pricelist))
            else:
                pricelist = pool.get('product.pricelist').browse(
                    context['pricelist'])

            context.update({'pricelist': pricelist.id})
            from_currency = pool['res.users'].sudo().browse(
                SUPERUSER_ID).company_id.currency_id
            to_currency = pricelist.currency_id

            def compute_currency(price): return pool['res.currency']._convert(
                price, from_currency, to_currency, fields.Date.today())
            values = {
                'slider_details': slider_header,
                'slider_header': slider_header,
                'compute_currency': compute_currency,
            }
            return request.render("theme_scita.fashion_multi_cat_slider_view", values)

    @http.route(['/theme_scita/product_multi_image_effect_config'], type='json', auth='public', website=True)
    def product_multi_product_image_dynamic_slider(self, **post):
        slider_data = request.env['multi.slider.config'].sudo().search(
            [('id', '=', int(post.get('slider_type')))])
        values = {
            's_id': slider_data.no_of_collection + '-' + str(slider_data.id),
            'counts': slider_data.no_of_collection,
            'auto_rotate': slider_data.auto_rotate,
            'auto_play_time': slider_data.sliding_speed,
            'rating_enable': slider_data.is_rating_enable
        }
        return values

    # Multi image gallery
    @http.route(['/theme_scita/scita_multi_image_thumbnail_config'], type='json', auth="public", website=True)
    def get_multi_image_effect_config(self):

        cur_website = request.website
        values = {
            'theme_panel_position': cur_website.thumbnail_panel_position,
            'change_thumbnail_size': cur_website.change_thumbnail_size,
            'thumb_height': cur_website.thumb_height,
            'thumb_width': cur_website.thumb_width,
        }
        return values


class ScitaShop(WebsiteSale):

    @http.route(['/shop/pager_selection/<model("product.per.page.no"):pl_id>'], type='http', auth="public", website=True)
    def product_page_change(self, pl_id, **post):
        request.session['default_paging_no'] = pl_id.name
        main.PPG = pl_id.name
        return request.redirect(request.httprequest.referrer or '/shop')

    @http.route('/shop/products/recently_viewed', type='json', auth='public', website=True)
    def products_recently_viewed(self, **kwargs):
        return self._get_scita_products_recently_viewed()

    def _get_scita_products_recently_viewed(self):
        max_number_of_product_for_carousel = 12
        visitor = request.env['website.visitor']._get_visitor_from_request()
        if visitor:
            excluded_products = request.website.sale_get_order().mapped(
                'order_line.product_id.id')
            products = request.env['website.track'].sudo().read_group(
                [('visitor_id', '=', visitor.id), ('product_id', '!=', False),
                 ('product_id', 'not in', excluded_products)],
                ['product_id', 'visit_datetime:max'], ['product_id'], limit=max_number_of_product_for_carousel, orderby='visit_datetime DESC')
            products_ids = [product['product_id'][0] for product in products]
            if products_ids:
                viewed_products = request.env['product.product'].browse(
                    products_ids)

                FieldMonetary = request.env['ir.qweb.field.monetary']
                monetary_options = {
                    'display_currency': request.website.get_current_pricelist().currency_id,
                }
                rating = request.website.viewref(
                    'theme_scita.theme_scita_rating').active
                res = {'products': []}
                for product in viewed_products:
                    combination_info = product._get_combination_info_variant()
                    res_product = product.read(
                        ['id', 'name', 'website_url'])[0]
                    res_product.update(combination_info)
                    res_product['price'] = FieldMonetary.value_to_html(
                        res_product['price'], monetary_options)
                    if rating:
                        res_product['rating'] = request.env["ir.ui.view"].render_template('website_rating.rating_widget_stars_static', values={
                            'rating_avg': product.rating_avg,
                            'rating_count': product.rating_count,
                        })
                    res['products'].append(res_product)

                return res
        return {}

    @http.route([
        '''/shop''',
        '''/shop/page/<int:page>''',
        '''/shop/category/<model("product.public.category"):category>''',
        '''/shop/category/<model("product.public.category"):category>/page/<int:page>''',
        '''/shop/brands'''
    ], type='http', auth="public", website=True, sitemap=WebsiteSale.sitemap_shop)
    def shop(self, page=0, category=None, search='', ppg=False, brands=None, **post):
        add_qty = int(post.get('add_qty', 1))
        Category = request.env['product.public.category']
        if category:
            category = Category.search([('id', '=', int(category))], limit=1)
            if not category or not category.can_access_from_current_website():
                raise NotFound()
        else:
            category = Category
        if brands:
            req_ctx = request.context.copy()
            req_ctx.setdefault('brand_id', int(brands))
            request.context = req_ctx
        result = super(ScitaShop, self).shop(
            page=page, category=category, search=search, ppg=ppg, **post)
        page_no = request.env['product.per.page.no'].sudo().search(
            [('set_default_check', '=', True)])
        if page_no:
            ppg = int(page_no.name)
        else:
            ppg = result.qcontext['ppg']

        ppr = request.env['website'].get_current_website().shop_ppr or 4

        attrib_list = request.httprequest.args.getlist('attrib')
        attrib_values = [[int(x) for x in v.split("-")]
                         for v in attrib_list if v]
        attributes_ids = {v[0] for v in attrib_values}
        attrib_set = {v[1] for v in attrib_values}

        domain = self._get_search_domain(search, category, attrib_values)

        url = "/shop"
        if search:
            post["search"] = search
        if attrib_list:
            post['attrib'] = attrib_list
        if post:
            request.session.update(post)

        Product = request.env['product.template'].with_context(bin_size=True)
        session = request.session
        cate_for_price = None
        search_product = Product.search(domain)
        website_domain = request.website.website_domain()
        pricelist_context, pricelist = self._get_pricelist_context()
        categs_domain = [('parent_id', '=', False)] + website_domain
        if search:
            search_categories = Category.search(
                [('product_tmpl_ids', 'in', search_product.ids)] + website_domain).parents_and_self
            categs_domain.append(('id', 'in', search_categories.ids))
        else:
            search_categories = Category
        categs = Category.search(categs_domain)

        if category:
            url = "/shop/category/%s" % slug(category)
            cate_for_price = int(category)
        prevurl = request.httprequest.referrer
        if prevurl:
            if not re.search('/shop', prevurl, re.IGNORECASE):
                request.session['pricerange'] = ""
                request.session['min1'] = ""
                request.session['max1'] = ""
                request.session['curr_category'] = ""
        brand_list = request.httprequest.args.getlist('brand')
        brand_set = set([int(v) for v in brand_list])
        if brand_list:
            brandlistdomain = list(map(int, brand_list))
            domain += [('product_brand_id', 'in', brandlistdomain)]
            bran = []
            brand_obj = request.env['product.brands'].sudo().search(
                [('id', 'in', brandlistdomain)])
            if brand_obj:
                for vals in brand_obj:
                    if vals.name not in bran:
                        bran.append((vals.name, vals.id))
                if bran:
                    request.session["brand_name"] = bran
        if not brand_list:
            request.session["brand_name"] = ''
        product_count = len(search_product)
        is_price_slider = request.website.viewref(
            'theme_scita.scita_price_slider_layout').active
        if is_price_slider:
            # For Price slider
            is_discount_hide = True if request.website.get_current_pricelist(
            ).discount_policy == 'with_discount' or request.website.get_current_pricelist(
            ).discount_policy == 'without_discount' else False
            product_slider_ids = []
            if is_discount_hide:
                price_list = Product.search(domain).mapped('price')
                if price_list:
                    product_slider_ids.append(min(price_list))
                    product_slider_ids.append(max(price_list))

            else:
                asc_product_slider_ids = Product.search(
                    domain, limit=1, order='list_price')
                desc_product_slider_ids = Product.search(
                    domain, limit=1, order='list_price desc')
                if asc_product_slider_ids:
                    product_slider_ids.append(
                        asc_product_slider_ids.price if is_discount_hide else asc_product_slider_ids.list_price)
                if desc_product_slider_ids:
                    product_slider_ids.append(
                        desc_product_slider_ids.price if is_discount_hide else desc_product_slider_ids.list_price)
            if product_slider_ids:
                if post.get("range1") or post.get("range2") or not post.get("range1") or not post.get("range2"):
                    range1 = min(product_slider_ids)
                    range2 = max(product_slider_ids)
                    result.qcontext['range1'] = math.floor(range1)
                    result.qcontext['range2'] = math.ceil(range2)
                if request.session.get('pricerange'):
                    if cate_for_price and request.session.get('curr_category') and request.session.get('curr_category') != float(cate_for_price):
                        request.session["min1"] = math.floor(range1)
                        request.session["max1"] = math.ceil(range2)

                if session.get("min1") and session["min1"]:
                    post["min1"] = session["min1"]
                if session.get("max1") and session["max1"]:
                    post["max1"] = session["max1"]
                if range1:
                    post["range1"] = range1
                if range2:
                    post["range2"] = range2
                if range1 == range2:
                    post['range1'] = 0.0

                if request.session.get('min1') or request.session.get('max1'):
                    if is_discount_hide:
                        price_product_list = []
                        product_withprice = Product.search(domain)
                        for prod_id in product_withprice:
                            if prod_id.price >= float(request.session['min1']) and prod_id.price <= float(request.session['max1']):
                                price_product_list.append(prod_id.id)

                        if price_product_list:
                            domain += [('id', 'in',
                                        price_product_list)]
                        else:
                            domain += [('id', 'in', [])]
                    else:
                        domain += [('list_price', '>=', float(request.session.get('min1'))),
                                   ('list_price', '<=', float(request.session.get('max1')))]
                    request.session["pricerange"] = str(
                        request.session['min1']) + "-To-" + str(request.session['max1'])

                if session.get('min1') and session['min1']:
                    result.qcontext['min1'] = session["min1"]
                    result.qcontext['max1'] = session["max1"]
        if cate_for_price:
            request.session['curr_category'] = float(cate_for_price)
        if request.session.get('default_paging_no'):
            ppg = int(request.session.get('default_paging_no'))
        keep = QueryURL('/shop', category=category and int(category),
                        search=search, attrib=attrib_list, order=post.get('order'))
        product_count = Product.search_count(domain)
        pager = request.website.pager(
            url=url, total=product_count, page=page, step=ppg, scope=7, url_args=post)
        products = Product.search(
            domain, limit=ppg, offset=pager['offset'], order=self._get_search_order(post))

        ProductAttribute = request.env['product.attribute']
        if products:
            # get all products without limit
            attributes = ProductAttribute.search(
                [('product_tmpl_ids', 'in', search_product.ids)])
        else:
            attributes = ProductAttribute.browse(attributes_ids)

        layout_mode = request.session.get('website_sale_shop_layout_mode')
        if not layout_mode:
            if request.website.viewref('website_sale.products_list_view').active:
                layout_mode = 'list'
            else:
                layout_mode = 'grid'
        result.qcontext.update({
            'search': search,
            'category': category,
            'attrib_values': attrib_values,
            'attrib_set': attrib_set,
            'pager': pager,
            'pricelist': pricelist,
            'add_qty': add_qty,
            'products': products,
            'search_count': product_count,  # common for all searchbox
            'bins': TableCompute().process(products, ppg, ppr),
            'ppg': ppg,
            'ppr': ppr,
            'categories': categs,
            'attributes': attributes,
            'keep': keep,
            'search_categories_ids': search_categories.ids,
            'layout_mode': layout_mode,
            'brand_set': brand_set,
        })
        return result

    def get_brands_data(self, product_count, product_label):
        keep = QueryURL('/shop/get_it_brand', brand_id=[])
        value = {
            'website_brands': False,
            'brand_header': False,
            'keep': keep
        }
        if product_count:

            brand_data = request.env['product.brands'].sudo().search(
                [('active', '=', True)], limit=int(product_count))
            if brand_data:
                value['website_brands'] = brand_data
        if product_label:
            value['brand_header'] = product_label
        return value

    @http.route(['/shop/get_brand_slider'],
                type='http', auth='public', website=True)
    def get_brand_slider(self, **post):
        values = self.get_brands_data(
            post.get('product_count'), post.get('product_label'))
        return request.render(
            "theme_scita.retial_brand_snippet_1", values)

    @http.route(['/shop/get_box_brand_slider'],
                type='http', auth='public', website=True)
    def get_box_brand_slider(self, **post):
        values = self.get_brands_data(
            post.get('product_count'), post.get('product_label'))
        return request.render(
            "theme_scita.box_brand_snippet_4", values)

    @http.route(['/shop/get_it_brand'],
                type='http', auth='public', website=True)
    def get_it_brand(self, **post):
        values = self.get_brands_data(
            post.get('product_count'), post.get('product_label'))
        return request.render(
            "theme_scita.it_brand_snippet_1", values)

    @http.route('/update_my_wishlist', type="http", auth="public", website=True)
    def qv_update_my_wishlist(self, **kw):
        if kw['prod_id']:
            self.add_to_wishlist(product_id=int(kw['prod_id']))
        return
