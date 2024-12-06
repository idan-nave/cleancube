export async function sendImagesToServer() {
  try {
    const fileInput1 = document.querySelector("#image1");
    const fileInput2 = document.querySelector("#image2");
    const fileInput3 = document.querySelector("#image3");

    console.log("File input 1:", fileInput1.files[0]);
    console.log("File input 2:", fileInput2.files[0]);
    console.log("File input 3:", fileInput3.files[0]);

    if (!fileInput1.files[0] || !fileInput2.files[0] || !fileInput3.files[0]) {
      throw new Error("Please upload all three images.");
    }

    const formData = new FormData();
    formData.append("image1", fileInput1.files[0], "image1.jpg");
    formData.append("image2", fileInput2.files[0], "image2.jpg");
    formData.append("image3", fileInput3.files[0], "image3.jpg");

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
