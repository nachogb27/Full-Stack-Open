const mongoose = require('mongoose')

// Verificar argumentos de línea de comandos
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// Reemplaza 'yourpassword' con tu contraseña real y la URL con tu cluster
const url = MONGO_DB_URI;

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Definir el esquema de persona
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Si solo se proporciona la contraseña, mostrar todas las personas
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

// Si se proporcionan nombre y número, agregar nueva persona
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}