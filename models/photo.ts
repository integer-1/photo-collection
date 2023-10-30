export interface Photo {
  id: number
  title: string
  photo: string
  date: string
  description: string
}


export interface NewPhoto {
  title: string
  photo: string | File
  date: string
  description: string
}