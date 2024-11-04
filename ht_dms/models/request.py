from odoo import models, fields

class DocumentRequest(models.Model):
    _name = 'document.request'
    _description = 'Document Request'

    document_id = fields.Many2one('document.management', string="Document", required=True)
    request_type = fields.Selection([
        ('create', 'Create'),
        ('borrow', 'Borrow')
    ], string="Request Type", required=True)
    status = fields.Selection([
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ], string="Status", default='pending')
    request_date = fields.Datetime(string="Request Date", default=fields.Datetime.now)
    requested_by = fields.Many2one('res.users', string="Requested By", default=lambda self: self.env.user)
