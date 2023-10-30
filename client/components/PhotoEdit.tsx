import { useState } from 'react'
import { usePhoto } from './hooks/usePhoto.ts'
import { Photo } from '../../models/photo.ts'

const PhotoEdit = ({ id, title, photo, date, description }: Photo) => {
  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newDate, setNewDate] = useState(date)
  const [newDescription, setNewDescription] = useState(description)

  const { deletePhotoMutation, updatePhotoMutation } = usePhoto()

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedPhoto: Photo = {
      id,
      title: newTitle,
      photo,
      date: newDate,
      description: newDescription,
    }

    updatePhotoMutation.mutate({ id, photo: updatedPhoto })
    console.log('submitting', updatedPhoto)

    setEditing(false)
    // window.location.reload()
  }

  const handleStopEditingClick = () => {
    setEditing(false)
    setNewTitle(title)
    setNewDate(date)
    setNewDescription(description)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  const handleDeleteClick = () => {
    deletePhotoMutation.mutate({ id })
    window.location.reload()
    console.log('deleting', id)
  }

  return (
    <div>
      {editing ? (
        <form action="/" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <div>
          <h1>{title}</h1>
          <p>Date : {date}</p>
          <p>{description}</p>
          <button onClick={handleStartEditingClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default PhotoEdit
