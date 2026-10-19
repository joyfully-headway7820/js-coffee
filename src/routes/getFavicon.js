import renderIcon from '../renderIcon.js'

export default function getFavicon(req, res) {
  res.type('image/svg+xml')
  res.set('Cache-Control', 'public, max-age=86400')
  res.send(renderIcon('coffee'))
}
