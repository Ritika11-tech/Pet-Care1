import { useLocation } from "react-router-dom"

export default function DogDetails() {

  const { search } = useLocation()
  const params = new URLSearchParams(search)

  const name = params.get("name")
  const breed = params.get("breed")
  const owner = params.get("owner")
  const phone = params.get("phone")

  return (
    <div className="min-h-screen bg-[#fefaf6] flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[300px]">

        <h2 className="text-2xl font-bold mb-4 text-center">
          🐶 Dog Details
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><b>Name:</b> {name}</p>
          <p><b>Breed:</b> {breed}</p>
          <p><b>Owner:</b> {owner}</p>
          <p><b>Phone:</b> {phone}</p>
        </div>

        <button className="mt-5 w-full bg-green-500 text-white py-2 rounded-lg">
          Call Owner
        </button>

      </div>

    </div>
  )
}