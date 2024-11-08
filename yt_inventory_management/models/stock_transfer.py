from odoo import models, fields

class StockTransfer(models.Model):
    _inherit = 'stock.picking'

    transfer_status = fields.Selection([
        ('pending', 'Chờ phê duyệt'),
        ('approved', 'Đã phê duyệt'),
        ('rejected', 'Từ chối'),
    ], default='pending', string='Trạng thái chuyển kho')
    
    def approve_transfer(self):
        self.write({'transfer_status': 'approved'})

    def generate_purchase_order(self):
        # Tạo đơn hàng mua 
        pass