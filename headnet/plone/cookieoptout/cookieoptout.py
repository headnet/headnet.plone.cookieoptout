import time

from zope.component import ComponentLookupError
from zope.component import getMultiAdapter
from plone.app.layout.viewlets.common import ViewletBase
from interfaces import ICookieOptoutSettings
from headnet.plone.cookieoptout import log


def _contents_cachekey(method, self):
    return (self.language, time.time() // 60)


class CookieOptOutViewlet(ViewletBase):
    """ """

    def contents(self):
        
        footers = {
            'en': 'english_cookieoptout',
            'da': 'danish_cookieoptout'
        }

        return getattr(
            self.settings,
            footers.get(self.language, footers['da']), u''
        )
        
    @property
    def settings(self):
        try:
            return ICookieOptoutSettings(self.context)
        except ComponentLookupError:
            log.warn("Could not lookup ICookieOptoutSettings")
            return {}
        except TypeError:
            log.warn("Could not lookup ICookieOptoutSettings")
            return {}
        
    
    @property
    def language(self):
        portal_state = getMultiAdapter(
            (self, self.context.REQUEST), name=u'plone_portal_state'
        )

        language = portal_state.language().split('-', 1)[0]

        return language
