import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePhoto, updatePhoto, addPhoto } from '../../apis/photo.ts'

export function usePhoto() {
  const queryClient = useQueryClient()

  const updatePhotoMutation = useMutation(updatePhoto, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['Photo'])
    },
  })

  const addPhotoMutation = useMutation(addPhoto, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['Photo'])
    },
  })

  const deletePhotoMutation = useMutation(deletePhoto, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['Photo'])
    },
  })
  return {
    updatePhotoMutation,
    addPhotoMutation,
    deletePhotoMutation,
  }
}
