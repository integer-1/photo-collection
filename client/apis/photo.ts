import request from 'superagent'
import type { Photo, NewPhoto } from '../../models/photo.ts'

export async function getAllPhoto() {
  const response = await request.get('/api/v1/photo')

  return response.body as Photo[]
}

export async function addPhoto(photo: NewPhoto): Promise<void> {
  await request.post('/api/v1/photo').send({ ...photo })
}

export async function updatePhoto({
  id,
  photo,
}: {
  id: number
  photo: Photo
}): Promise<void> {
  await request.patch(`/api/v1/photo/${id}`).send(photo)
}

interface DeletePhoto {
  id: Photo['id']
}
export async function deletePhoto({ id }: DeletePhoto): Promise<void> {
  await request.delete(`/api/v1/photo/${id}`)
}
