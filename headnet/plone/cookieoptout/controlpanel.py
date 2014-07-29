from plone.z3cform import layout
from plone.app.registry.browser import controlpanel
from plone.app.z3cform.wysiwyg import WysiwygFieldWidget
from plone.registry.interfaces import IRegistry

from .interfaces import ICookieOptoutSettings
from headnet.plone.cookieoptout import message_factory as _

from z3c.form import field

from zope.component import ComponentLookupError


class ControlPanelEditForm(controlpanel.RegistryEditForm):
    schema = ICookieOptoutSettings
    fields = field.Fields(ICookieOptoutSettings)
    fields['danish_cookieoptout'].widgetFactory = WysiwygFieldWidget
    fields['english_cookieoptout'].widgetFactory = WysiwygFieldWidget

    label = _(u"Configure CookieOptout")
    description = _(
        u"This form lets you configure the cookie optout settings."
    )


ControlPanel = layout.wrap_form(
    ControlPanelEditForm,
    controlpanel.ControlPanelFormWrapper
)


from zope.component import getUtility


def get_settings(context):
    try:
        return getUtility(IRegistry).forInterface(ICookieOptoutSettings)
    except KeyError:
        raise ComponentLookupError(ICookieOptoutSettings)