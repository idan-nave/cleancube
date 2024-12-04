const apiKey = "your-api-key";

const data = {
  'Image 1': [
    ['yellow', 'blue', 'orange'],
    ['yellow', 'red', 'orange'],
    ['red', 'blue', 'green']
  ],
  'Image 2': [
    ['white', 'orange', 'red'],
    ['white', 'yellow', 'red'],
    ['yellow', 'orange', 'red']
  ],
  'Image 3': [
    ['white', 'red', 'yellow'],
    ['white', 'orange', 'yellow'],
    ['white', 'green', 'orange']
  ]
};


const res = {
  'Image 1': [
    ['yellow', 'blue', 'orange'],
    ['yellow', 'red', 'orange'],
    ['red', 'blue', 'green']
  ],
  'Image 2': [
    ['white', 'orange', 'red'],
    ['white', 'yellow', 'red'],
    ['yellow', 'orange', 'red']
  ],
  'Image 3': [
    ['white', 'red', 'yellow'],
    ['white', 'orange', 'yellow'],
    ['white', 'green', 'orange']
  ]
};

async function getRubikSolutions() {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an assistant that generates Rubik's Cube solutions." },
          { role: "user", content: `Here is the Rubik's Cube state data: ${JSON.stringify(data)}. Return the solutions in JSON format, including easy, medium, and hard difficulty levels for each cube state. number of stages for each- is up to you to decide.` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Solutions:", result.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching Rubik's solutions:", error);
  }
}

// Call the function
getRubikSolutions();
