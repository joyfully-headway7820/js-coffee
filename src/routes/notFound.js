export default function notFound(req, res) {
  res.status(404).render('not-found', {
    title: 'Страница не найдена',
    page: 'not-found',
    path: req.path,
  })
}
