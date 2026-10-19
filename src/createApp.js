import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import attachIcons from './attachIcons.js'
import getAbout from './routes/getAbout.js'
import getFavicon from './routes/getFavicon.js'
import getContacts from './routes/getContacts.js'
import getHome from './routes/getHome.js'
import getMenu from './routes/getMenu.js'
import getReservation from './routes/getReservation.js'
import getReservationSuccess from './routes/getReservationSuccess.js'
import notFound from './routes/notFound.js'
import postReservation from './routes/postReservation.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default function createApp() {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(root, 'views'))
  app.disable('x-powered-by')

  app.use(express.urlencoded({ extended: false }))
  app.use(attachIcons)
  app.use(express.static(path.join(root, 'public')))
  app.use('/js', express.static(path.join(root, 'shared')))

  app.get('/favicon.svg', getFavicon)
  app.get('/', getHome)
  app.get('/menu', getMenu)
  app.get('/about', getAbout)
  app.get('/reservation', getReservation)
  app.post('/reservation', postReservation)
  app.get('/reservation/success/:id', getReservationSuccess)
  app.get('/contacts', getContacts)
  app.use(notFound)

  return app
}
