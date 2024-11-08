from odoo import models, fields, api

class InventoryItem(models.Model):
    _inherit = 'stock.quant'

    reorder_level = fields.Integer('Mức đặt hàng lại')
    reorder_alert = fields.Boolean('Cảnh báo đặt hàng lại', compute='_compute_reorder_alert')
    project_id = fields.Many2one('project.project', 'Dự án liên kết')
    supplier_ids = fields.Many2many('res.partner', string='Nhà cung cấp', domain="[('supplier_rank', '>', 0)]")
    
    @api.depends('quantity', 'reorder_level')
    def _compute_reorder_alert(self):
        for item in self:
            item.reorder_alert = item.quantity < item.reorder_level