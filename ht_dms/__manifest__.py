# -*- coding: utf-8 -*-
{
    'name': "Document Management",
    'version': '1.0',
    'summary': """
        Module for managing documents
    """,
    'category': 'Custom',
    'author': 'HT',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'data/user_groups.xml',
        'views/document_views.xml',
        'views/request_views.xml',
        'views/menu_views.xml',
    ],
    'installable': True,
    'application': True,
}