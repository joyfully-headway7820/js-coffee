import contacts from '../../data/contacts.js'

export default function getContacts(req, res) {
  res.render('contacts', {
    title: 'Контакты',
    page: 'contacts',
    path: '/contacts',
    contacts,
  })
}
