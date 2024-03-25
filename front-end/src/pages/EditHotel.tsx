import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from "../api/api-client"
import { ManageHotelForm } from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../context/AppContext"

export const EditHotel = () => {
  const { hotelId } = useParams()
  const { showToast } = useAppContext()

  const { data: hotel } = useQuery("fetchMyHotelById", () =>
    apiClient.fetchMyHotelById(hotelId || ''), {
      enabled: !!hotelId,
    }
  )

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({message: "Hotel Edited successfully", type: "SUCCESS"})
    },
    onError: () => {
      showToast({message: "Error Editing Hotel", type: "ERROR"})
    }
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
}
