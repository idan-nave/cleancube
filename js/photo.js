export async function sendImagesToServer() {
  try {
    // השתמש בנתיבי הקבצים באופן ישיר
    const imagePaths = [
      "../assests/img-py/image1-backup.jpg",
      "../assests/img-py/image2-backup.jpg",
      "../assests/img-py/image3-backup.jpg",
    ];

    const formData = new FormData();

    imagePaths.forEach((path, index) => {
      formData.append(`image${index + 1}`, path);
    });

    console.log("FormData prepared, sending request...");

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
