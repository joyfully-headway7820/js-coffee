import menu from '../../data/menu.js'
import advantages from '../../data/advantages.js'
import stats from '../../data/stats.js'

export default function getHome(req, res) {
  res.render('index', {
    title: 'Главная',
    page: 'home',
    path: '/',
    advantages,
    hits: menu.filter(({ hit }) => hit),
    stats,
  })
}
