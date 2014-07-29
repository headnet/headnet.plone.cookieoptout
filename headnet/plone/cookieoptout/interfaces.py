from headnet.plone.cookieoptout import message_factory as _
from zope import schema
from zope.interface import Interface

class ICookieOptoutLayer(Interface):
    """ """

class ICookieOptoutSettings(Interface):
    """ Global site specific settings """

    danish_cookieoptout = schema.Text(
        title=_(u"Danish cookie banner"),
        description=_(u"Use the following link-hashes in the banner '#cookieoptoutdefer' for the read more link and '#cookieoptout' for the opt-out link."),
        required=False,
        default=u''
    )

    english_cookieoptout = schema.Text(
        title=_(u"English cookie banner"),
        description=_(u"Use the following link-hashes in the banner '#cookieoptoutdefer' for the read more link and '#cookieoptout' for the opt-out link."),
        required=False,
        default=u''
    )

