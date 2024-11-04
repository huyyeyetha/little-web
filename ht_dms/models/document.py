from odoo import models, fields, api

class Document(models.Model):
    _name = 'document.management'
    _description = 'Document Management'

    name = fields.Char(string="Document Name", required=True)
    type = fields.Selection([
        ('public', 'Public'),
        ('private', 'Private')
    ], string="Type", required=True, default='public')
    description = fields.Text(string="Description")
    content = fields.Binary(string="Content")
    status = fields.Selection([
        ('available', 'Available'),
        ('borrowed', 'Borrowed')
    ], string="Status", default='available')
    is_private = fields.Boolean(string="Is Private", compute='_compute_is_private')

    @api.depends('type')
    def _compute_is_private(self):
        for record in self:
            record.is_private = record.type == 'private'
