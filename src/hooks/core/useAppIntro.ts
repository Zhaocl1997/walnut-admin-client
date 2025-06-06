import introJS from 'intro.js'
import 'intro.js/minified/introjs.min.css'

export function useAppIntro(delay = 1500) {
  const intro = introJS()
  const { t } = useAppI18n()
  const appSetting = useAppStoreSetting()

  intro.setOptions({
    doneLabel: t('app.intro.done'),
    nextLabel: t('app.intro.next'),
    prevLabel: t('app.intro.prev'),
    exitOnOverlayClick: false,

    steps: [
      {
        element: `#${appSetting.menu.id}`,
        title: t('app.intro.sider'),
        intro: t('app.intro.sider.detail'),
        position: 'right',
      },
      {
        element: `#${appSetting.breadcrumb.id}`,
        title: t('app.intro.breadcrumb'),
        intro: t('app.intro.breadcrumb.detail'),
      },
      {
        element: '#walnut-fullscreen',
        title: t('app.intro.fullscreen'),
        intro: t('app.intro.fullscreen.detail'),
      },
      {
        element: '#walnut-lock',
        title: t('app.intro.lock'),
        intro: t('app.intro.lock.detail'),
      },
      {
        element: '#walnut-search',
        title: t('app.intro.search'),
        intro: t('app.intro.search.detail'),
      },
      {
        element: '#walnut-locale',
        title: t('app.intro.locale'),
        intro: t('app.intro.locale.detail'),
      },
      {
        element: '#walnut-dark',
        title: t('app.intro.dark'),
        intro: t('app.intro.dark.detail'),
      },
      {
        element: `#${appSetting.tabs.id}`,
        title: t('app.intro.tab'),
        intro: t('app.intro.tab.detail'),
      },
      {
        element: '#walnut-settings',
        title: t('app.intro.settings'),
        intro: t('app.intro.settings.detail'),
      },
    ],

    dontShowAgain: true,
    dontShowAgainLabel: t('app.intro.dontShowAgain'),
    dontShowAgainCookieDays: 7,
  })

  setTimeout(() => {
    intro.start()
  }, delay)
}
