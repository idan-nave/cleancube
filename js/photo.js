export async function sendImagesToServer() {
  try {
    const fileInput1 = document.querySelector("./assests/img-py/image1-backup1.jpg");
    const fileInput2 = document.querySelector("./assests/img-py/image1-backup2.jpg");
    const fileInput3 = document.querySelector("./assests/img-py/image1-backup3.jpg");

    // בדיקה אם כל התמונות הועלו
    if (!fileInput1.files[0] || !fileInput2.files[0] || !fileInput3.files[0]) {
      throw new Error("Please upload all three images.");
    }

    const formData = new FormData();
    formData.append("image1", fileInput1.files[0], "./assests/img-py/image1-backup1.jpg");
    formData.append("image2", fileInput2.files[0], "./assests/img-py/image1-backup2.jpg");
    formData.append("image3", fileInput3.files[0], "./assests/img-py/image1-backup3.jpg");

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

// הוסף Event Listener לכפתור
document.getElementById("uploadButton").addEventListener("click", async () => {
  try {
    const result = await sendImagesToServer();
    alert("Images processed successfully!");
    console.log("Server result:", result);
  } catch (error) {
    alert(error.message);
  }
});
