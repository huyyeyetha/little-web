from odoo import models, fields

class ProjectBudget(models.Model):
    _inherit = 'project.project'

    budget_amount = fields.Monetary('Ngân sách dự án')
    spent_amount = fields.Monetary('Chi phí đã sử dụng', compute='_compute_spent_amount')

    def _compute_spent_amount(self):
        for project in self:
            project.spent_amount = sum(project.task_ids.mapped('material_request_ids.amount'))
