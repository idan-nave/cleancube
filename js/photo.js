export async function sendImagesToServer() {
  try {
    const fileInput1 = document.querySelector("#image1");
    const fileInput2 = document.querySelector("#image2");
    const fileInput3 = document.querySelector("#image3");

    // לוגים כדי לבדוק אם האלמנטים קיימים ואם הקבצים נבחרו
    console.log("Checking file inputs:");
    console.log("File input element 1:", fileInput1);
    console.log("File input element 2:", fileInput2);
    console.log("File input element 3:", fileInput3);
    console.log("File input 1 content:", fileInput1?.files[0]);
    console.log("File input 2 content:", fileInput2?.files[0]);
    console.log("File input 3 content:", fileInput3?.files[0]);

    // בדיקה אם כל הקבצים נבחרו
    if (!fileInput1 || !fileInput1.files[0] || 
        !fileInput2 || !fileInput2.files[0] || 
        !fileInput3 || !fileInput3.files[0]) {
      throw new Error("Please upload all three images.");
    }

    // יצירת FormData
    const formData = new FormData();
    formData.append("image1", fileInput1.files[0], "image1.jpg");
    formData.append("image2", fileInput2.files[0], "image2.jpg");
    formData.append("image3", fileInput3.files[0], "image3.jpg");

    console.log("FormData constructed. Sending request to server...");

    // שליחת הבקשה לשרת
    const response = await fetch("https://apiserver-1-pksl.onrender.com/api/detect-colors", {
      method: "POST",
      body: formData,
    });

    // בדיקה אם הבקשה הצליחה
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} - ${response.statusText}`);
    }

    // עיבוד תגובת השרת
    const result = await response.json();
    console.log("Server response:", result);
    return result;
  } catch (error) {
    console.error("Error while sending images to the server:", error.message || error);
    throw error;
  }
}

// Event Listener לכפתור העלאת התמונות
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("uploadButton").addEventListener("click", async () => {
    try {
      const result = await sendImagesToServer();
      alert("Images processed successfully!");
      console.log("Server result:", result);
    } catch (error) {
      alert(error.message);
    }
  });

  // Event Listener לבדיקת שינוי בקלטי התמונות
  document.querySelectorAll("input[type='file']").forEach((input) => {
    input.addEventListener("change", (e) => {
      console.log(`File selected in ${e.target.id}:`, e.target.files[0]);
    });
  });
});
