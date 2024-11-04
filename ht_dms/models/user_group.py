from odoo import models, fields

class UserGroup(models.Model):
    _name = 'document.user.group'
    _description = 'User Group Management for Document Access'

    name = fields.Char(string="Group Name", required=True)
    user_ids = fields.Many2many('res.users', string="Users")
    permissions = fields.Selection([
        ('read', 'Read Only'),
        ('write', 'Read and Write'),
        ('manage', 'Manage Access')
    ], string="Permissions", default='read')
