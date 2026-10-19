import team from '../../data/team.js'

export default function getAbout(req, res) {
  res.render('about', {
    title: 'О кофейне',
    page: 'about',
    path: '/about',
    team,
  })
}
