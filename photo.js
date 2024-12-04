import fs from "fs";
import fetch from "node-fetch"; // ייבוא node-fetch
import FormData from "form-data"; // ייבוא מודול form-data

async function sendImagesToServer() {
  try {
    // קריאת התמונות המקומיות כ-Buffer
    const image1 = fs.readFileSync("./assests/img-py/image1.jpg");
    const image2 = fs.readFileSync("./assests/img-py/image2.jpg");
    const image3 = fs.readFileSync("./assests/img-py/image3.jpg");

    // יצירת אובייקט FormData ושילוב התמונות
    const formData = new FormData();
    formData.append("image1", image1, "image1.jpg"); // הוספת קובץ כ-Buffer עם שם קובץ
    formData.append("image2", image2, "image2.jpg");
    formData.append("image3", image3, "image3.jpg");

    // שליחת הבקשה לשרת Render
    const response = await fetch("https://apiserver-1-pksl.onrender.com/api/detect-colors", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(), // חשוב להוסיף את הכותרות
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    // קבלת התוצאה מהשרת
    const result = await response.json();
    console.log("Result from server:", result);
  } catch (error) {
    console.error("Error while sending images to the server:", error);
  }
}

// קריאה לפונקציה
sendImagesToServer();
