export async function sendImagesToServer() {
  try {
    const imagePaths = [
      "./assets/img-py/image1-backup.jpg",
      "./assets/img-py/image2-backup.jpg",
      "./assets/img-py/image3-backup.jpg",
    ];

    const formData = new FormData();

    // טוען את התמונות דרך fetch וממיר אותן לקבצים
    for (let i = 0; i < imagePaths.length; i++) {
      const response = await fetch(imagePaths[i]);
      if (!response.ok) {
        throw new Error(`Failed to fetch image at ${imagePaths[i]}: ${response.statusText}`);
      }
      const blob = await response.blob();
      formData.append(`image${i + 1}`, blob, `image${i + 1}.jpg`);
    }

    console.log("Sending images to the server...");

    const response = await fetch("https://apiserver-1-pksl.onrender.com/api/detect-colors", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Server response:", result);
    return result;
  } catch (error) {
    console.error("Error while sending images to the server:", error);
    throw error;
  }
}