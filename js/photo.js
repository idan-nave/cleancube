//  *****************************************************
//  * File: photo.js
//  * Description: logic for sending images to the server
//    for image-processing & analayzing
//  *
//  * Author: Amit
//  * Reviewer(s): Idan
//  * Created On: 2024-12-06
//  * Last Modified By: Amit
//  * Last Modified On: 2024-12-07
//  *
//  * Version: 1.0.5
//  *
//  * Notes:
//  * - Accuracy improvement using absolute color codes
//  * - server-side tests
//  *****************************************************/

// // JavaScript code starts below

export async function sendImagesToServer() {
  try {
    const imagePaths = [
      "../assests/img-py/image1-backup.jpg",
      "../assests/img-py/image2-backup.jpg",
      "../assests/img-py/image3-backup.jpg",
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