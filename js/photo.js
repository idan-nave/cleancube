export async function sendImagesToServer() {
  try {
    const fileInput1 = document.querySelector("./assests/img-py/image1-backup.jpg");
    const fileInput2 = document.querySelector("./assests/img-py/image1-backup.jpg");
    const fileInput3 = document.querySelector("./assests/img-py/image1-backup.jpg");

    // בדיקה שהאלמנטים קיימים בדף
    if (!fileInput1 || !fileInput2 || !fileInput3) {
      throw new Error("One or more file input elements are missing in the DOM.");
    }

    // בדיקה שכל התמונות נבחרו
    if (!fileInput1.files[0] || !fileInput2.files[0] || !fileInput3.files[0]) {
      console.error("File input values:", {
        image1: fileInput1.files[0],
        image2: fileInput2.files[0],
        image3: fileInput3.files[0],
      });
      throw new Error("Please upload all three images.");
    }

    const formData = new FormData();
    formData.append("image1", fileInput1.files[0], "image1.jpg");
    formData.append("image2", fileInput2.files[0], "image2.jpg");
    formData.append("image3", fileInput3.files[0], "image3.jpg");

    console.log("FormData prepared, sending request...");

    const response = await fetch("https://apiserver-1-pksl.onrender.com/api/detect-colors", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Server response:", response);
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
