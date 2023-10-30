import { Photo, NewPhoto } from '../../models/photo.ts'
import db from '../db/connection.ts'

export async function getAllPhoto(): Promise<Photo[]> {
  return db('photo').select('*')
}

export async function deletePhoto(id: number): Promise<void> {
  await db('Photo').where({ id }).delete()
}

export async function addPhoto(photo: NewPhoto): Promise<Photo> {
  return db('Photo')
    .insert({...photo})
    .returning(['id', 'title', 'photo', 'date', 'description'])
}

export async function updatePhoto(id: number, photo: Photo): Promise<Photo> {
  return db('Photo').where({ id }).update(photo)
}

export async function getLastPhotoId() {
  const lastPhoto = await db('Photo').select()
  return lastPhoto[lastPhoto.length - 1].id
}
