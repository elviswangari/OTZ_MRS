const { Person } = require('../model/RocDbModel')

const newPerson = Person({
    firstName: 'elvis',
    lastName: 'wangari',
    surname: '',
    dateOfBirth: new Date('1900-01-01'),
    residence: 'baraka',
    phoneNumber: '254710374236'
})