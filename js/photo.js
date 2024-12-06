import fs from "fs";
import fetch from "node-fetch"; // ייבוא node-fetch
import FormData from "form-data"; // ייבוא מודול form-data

export async function sendImagesToServer() {
  try {
    // קריאת התמונות המקומיות כ-Buffer
    const imagePaths = [
      "./assests/img-py/image1-backup.jpg",
      "./assests/img-py/image2-backup.jpg",
      "./assests/img-py/image3-backup.jpg",
    ];

    // בדיקה אם כל הקבצים קיימים
    imagePaths.forEach((path) => {
      if (!fs.existsSync(path)) {
        throw new Error(`File not found: ${path}`);
      }
    });

    // יצירת אובייקט FormData ושילוב התמונות
    const formData = new FormData();
    imagePaths.forEach((path, index) => {
      const file = fs.readFileSync(path);
      formData.append(`image${index + 1}`, file, `image${index + 1}.jpg`);
    });

    // שליחת הבקשה לשרת
    const response = await fetch("https://apiserver-1-pksl.onrender.com/api/detect-colors", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(), // חשוב להוסיף את הכותרות
    });

    // טיפול בתגובה מהשרת
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Server response:", result);
    return result; // החזרת התוצאה
  } catch (error) {
    console.error("Error while sending images to the server:", error);
    throw error; // משליך את השגיאה למי שקורא לפונקציה
  }
}
