from zope.i18nmessageid import MessageFactory
message_factory = MessageFactory('policy')

from logging import getLogger
log = getLogger('headnet.plone.cookieoptout')

def initialize(context):
    """Intializer called when used as a Zope 2 product."""
