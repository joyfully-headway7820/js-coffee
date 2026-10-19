import createApp from './createApp.js'

const port = Number(process.env.PORT) || 3000
const app = createApp()

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
