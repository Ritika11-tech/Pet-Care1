const handleSubmit = async () => {
  try {
    const formData = new FormData()

    formData.append("name", form.name)
    formData.append("breed", form.breed)
    formData.append("owner", form.owner)
    formData.append("phone", form.phone)
    formData.append("address", form.address)
    formData.append("image", imageFile)

    const res = await fetch("http://localhost:5000/dog", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
  const qrUrl = `http://localhost:5173/dog/${data.id}`
    console.log("RESPONSE:", data)



    // redirect to QR page
    navigate("/qr-result", {
      state: {
        qrUrl,
        image: URL.createObjectURL(imageFile)
      }
    })

  } catch (error) {
    console.log("ERROR:", error)
  }
}