import menu, { categories } from '../../data/menu.js'

export default function getMenu(req, res) {
  res.render('menu', {
    title: 'Меню',
    page: 'menu',
    path: '/menu',
    menu,
    categories,
  })
}
