import express from 'express'
import * as db from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const photo = await db.getAllPhoto()
    res.json(photo)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get photo')
  }
})

router.post('/', async (req, res) => {
  const { ...newPhoto } = req.body

  try {
    const photo = await db.addPhoto(newPhoto)
    res.status(200).json({ photo })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add photo')
  }
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  const addedPhoto = req.body
  if (!addedPhoto) {
    res.status(400).send('Bad Request: Photo is required')
    return
  }

  try {
    await db.updatePhoto(id, addedPhoto)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not update photo')
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deletePhoto(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not delete photo')
  }
})

export default router
