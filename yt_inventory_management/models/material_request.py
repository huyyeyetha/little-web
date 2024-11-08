from odoo import models, fields, api

class MaterialRequest(models.Model):
    _inherit = 'stock.picking'

    project_id = fields.Many2one('project.project', 'Dự án liên quan')
    approver_id = fields.Many2one('res.users', 'Người phê duyệt', readonly=True)
    request_status = fields.Selection([
        ('pending', 'Chờ phê duyệt'),
        ('approved', 'Đã phê duyệt'),
        ('rejected', 'Từ chối'),
    ], default='pending', string='Trạng thái yêu cầu')

    def submit_request(self):
        self.write({'request_status': 'pending'})

    def approve_request(self):
        self.write({'request_status': 'approved', 'approver_id': self.env.user.id})

    def reject_request(self):
        self.write({'request_status': 'rejected', 'approver_id': self.env.user.id})
