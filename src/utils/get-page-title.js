import defaultSettings from '@/settings'

const title = defaultSettings.title || 'KG前端项目'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
