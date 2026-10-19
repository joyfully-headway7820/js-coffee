import renderIcon from './renderIcon.js'

export default function attachIcons(req, res, next) {
  res.locals.icon = renderIcon
  next()
}
