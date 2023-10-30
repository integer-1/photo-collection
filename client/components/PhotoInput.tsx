import React, { useState } from 'react'
import { usePhoto } from './hooks/usePhoto'

const PhotoInput = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { addPhotoMutation } = usePhoto()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault()

      if (newImage === null) {
        console.error('Please select an image')
        return
      }
      console.log('new image is', newImage)

      const reader = new FileReader()
      reader.readAsDataURL(newImage)

      reader.onload = async () => {
        const base64Image = reader.result as string
        const newPhoto = {
          photo: base64Image,
          title: newTitle,
          date: newDate,
          description: newDescription,
        }

        console.log('New photo data is ', newPhoto)

        await addPhotoMutation.mutateAsync(newPhoto)
        window.location.reload()
      }
      reader.onerror = (error) => {
        console.error('Error reading image:', error)
      }
    } catch (error) {
      console.error('Error adding photo:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null

    if (selectedFile) {
      setNewImage(selectedFile)
      setImagePreview(URL.createObjectURL(selectedFile)) // Create a preview of the selected image
    } else {
      setNewImage(null)
      setImagePreview(null)
    }
  }
  return (
    <div>
      <h2>Upload a New Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="image"
            accept="image/*"
            multiple={false}
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Selected"
              style={{ maxWidth: '50%' }}
            />
          </div>
        )}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default PhotoInput
