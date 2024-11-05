from odoo import models, fields, api, exceptions
from datetime import date

class DocumentLoan(models.Model):
    _name = 'document.loan'
    _description = 'Document Loan Management'

    document_id = fields.Many2one('document.management', string="Document", required=True)
    borrower_id = fields.Many2one('res.users', string="Borrower", required=True, default=lambda self: self.env.user)
    loan_date = fields.Date(string="Loan Date", default=fields.Date.today, required=True)
    return_date = fields.Date(string="Return Date")
    state = fields.Selection([
        ('borrowed', 'Borrowed'),
        ('returned', 'Returned')
    ], string="Status", default='borrowed')
    
    @api.constrains('loan_date', 'return_date')
    def _check_dates(self):
        for record in self:
            if record.return_date and record.return_date < record.loan_date:
                raise exceptions.ValidationError("Return date cannot be before the loan date.")
    
    def action_return(self):
        """Mark the document as returned and update the status."""
        for record in self:
            record.state = 'returned'
            record.return_date = date.today()
            record.document_id.status = 'available'

    @api.model
    def create(self, vals):
        """Ensure the document is available before allowing a loan."""
        document = self.env['document.management'].browse(vals['document_id'])
        if document.status == 'borrowed':
            raise exceptions.UserError("The document is currently borrowed and cannot be loaned out.")
        document.status = 'borrowed'
        return super(DocumentLoan, self).create(vals)
