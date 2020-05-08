const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes.map(n => n.toJSON()))
  // Note.find({}).then(notes => {
  //   response.json(notes.map(note => note.toJSON()))
  // })
})

//try-catch handled by express-async-errors package
notesRouter.get('/:id', async (request, response, next) => {
  //try {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note.toJSON())
  } else {
    response.status(404).end()
  }
  //} catch (exception) {
  next(exception)
  //}

  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note.toJSON())
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  })

  //try {
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.json(savedNote.toJSON())
  //} catch (exception) {
  next(exception)
  //}

  // note
  //   .save()
  //   .then(savedNote => {
  //     response.json(savedNote.toJSON())
  //   })
  //   .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response, next) => {
  // try {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
  // } catch (exception) {
  next(exception)
  // }

  // Note.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

module.exports = notesRouter
