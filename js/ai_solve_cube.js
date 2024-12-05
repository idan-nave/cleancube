//ai_solve_cube.js

import { readCubeState } from './read_write_json.js';


// export async function getRubikSolutionsAll(promptData) {
//   try {
//     const response = await fetch("https://apiserver-1-pksl.onrender.com/api/openai", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-4",
//         messages: [
//           { role: "system", content: "You are an assistant that generates Rubik's Cube solutions." },
//           { role: "user", content: `The Rubik's Cube state data is within 'cubeState': ${JSON.stringify(promptData)}. Return the solutions in JSON format, including easy, medium, and hard difficulty levels for each cube state. number of stages for each- is up to you to decide.` }
//         ]
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log("Solutions:", result.choices[0].message.content);
//   } catch (error) {
//     console.error("Error fetching Rubik's solutions:", error);
//   }
// }

// export async function getRubikSolutionsEasy(promptData) {
//   try {
//     const response = await fetch("https://apiserver-1-pksl.onrender.com/api/openai", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-4",
//         messages: [
//           { role: "system", content: "You are an assistant that generates Rubik's Cube solutions." },
//           { role: "user", content: `The Rubik's Cube state data is within 'cubeState': ${JSON.stringify(promptData)}. Only return 'solutions.easy'. number of stages for each- is up to you to decide.` }
//         ]
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log("Easy Solution:", result.choices[0].message.content);
//   } catch (error) {
//     console.error("Error fetching Rubik's solutions:", error);
//   }
// }


export async function getRubikSolutions(promptData) {
  try {
    const response = await fetch("https://apiserver-1-pksl.onrender.com/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptData,
        max_tokens: 1000,
      }),
    });

    const responseText = await response.text(); // Get the raw response as text

    if (response.ok) {
      const data = JSON.parse(responseText);  // Try to parse JSON
      // console.log("Response from GPT-4:", data);
      return data;
    } else {
      console.error("Error:", response.statusText);
      console.error("Response body:", responseText); // Log the response body to debug
    }
  } catch (error) {
    console.error("Error communicating with server:", error);
  }
};




// document.getElementById("submitButton").addEventListener("click", async () => {
//   const prompt = document.getElementById("promptInput").value; // קבלת הטקסט מהמשתמש

//   try {
//     const response = await fetch("https://your-server-url.com/api/openai", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: prompt,
//         max_tokens: 150, // כמות המילים הרצויה בתשובה
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Response from GPT-4:", data);

//       // הצגת התשובה למשתמש
//       document.getElementById("responseOutput").innerText =
//         data.choices[0].message.content;
//     } else {
//       console.error("Error:", response.statusText);
//       document.getElementById("responseOutput").innerText =
//         "Failed to fetch response from GPT-4.";
//     }
//   } catch (error) {
//     console.error("Error communicating with server:", error);
//     document.getElementById("responseOutput").innerText =
//       "An error occurred while contacting the server.";
//   }
// });
