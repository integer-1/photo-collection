import { Photo } from '../../models/photo'
import PhotoInput from './PhotoInput'
import PhotoEdit from './PhotoEdit'

interface PhotoProps {
  list: Photo[]
}

const PhotoList: React.FC<PhotoProps> = ({ list }) => {
  return (
    <>
      <PhotoInput />

      <div className="container">
        {list.map((photo) => {
          return (
            <div key={photo.id} className="photo_container">
              <img src={photo.photo} className="img" alt={`Name is ${photo.title}`} />
              <PhotoEdit
                id={photo.id}
                title={photo.title}
                photo={photo.photo}
                date={photo.date}
                description={photo.description}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PhotoList
