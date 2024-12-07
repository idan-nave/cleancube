async function loadStages(difficulty) {
    try {
        // מידע סטטי של השלבים לפי דרגת קושי
        const cubeState = {
            easy: [
                { header: "Stage 1", content: "Content for Stage 1", image: "../media/chain/easy/easy1.png" },
                { header: "Stage 2", content: "Content for Stage 2", image: "../media/chain/easy/easy2.png" },
                { header: "Stage 3", content: "Content for Stage 3", image: "../media/chain/easy/easy3.png" },
                { header: "Stage 4", content: "Content for Stage 4", image: "../media/chain/easy/easy4.png" },
                { header: "Stage 5", content: "Content for Stage 5", image: "../media/chain/easy/easy5.png" },
                { header: "Stage 6", content: "Content for Stage 6", image: "../media/chain/easy/easy6.png" },
                { header: "Stage 7", content: "Content for Stage 7", image: "../media/chain/easy/easy7.png" },
            ],
            medium: [
                { header: "Stage 1", content: "Content for Stage 1", image: "../media/chain/medium/medium1.png" },
                { header: "Stage 2", content: "Content for Stage 2", image: "../media/chain/medium/medium2.png" },
                { header: "Stage 3", content: "Content for Stage 3", image: "../media/chain/medium/medium3.png" },
                { header: "Stage 4", content: "Content for Stage 4", image: "../media/chain/medium/medium4.png" },
            ],
            hard: [
                { header: "Stage 1", content: "Content for Stage 1", image: "../media/chain/hard/hard1.png" },
                { header: "Stage 2", content: "Content for Stage 2", image: "../media/chain/hard/hard2.png" },
                { header: "Stage 3", content: "Content for Stage 3", image: "../media/chain/hard/hard3.png" },
                { header: "Stage 4", content: "Content for Stage 4", image: "../media/chain/hard/hard4.png" },
                { header: "Stage 5", content: "Content for Stage 5", image: "../media/chain/hard/hard5.png" },
            ],
        };

        // קבלת השלבים בהתאם לדרגת הקושי
        const stages = cubeState[difficulty];

        if (!stages) {
            console.error(`No stages found for difficulty: ${difficulty}`);
            return;
        }

        // ניקוי התוכן הקודם
        const stagesList = document.querySelector(".stages-list");
        stagesList.innerHTML = "";

        // יצירת שלבים
        stages.forEach((stage, index) => {
            const stageDiv = document.createElement("div");
            stageDiv.className = "stage";
            stageDiv.dataset.index = index;

            const image = document.createElement("img");
            image.src = stage.image;
            image.alt = `${stage.header} image`;
            image.className = "stage-image";

            const textDiv = document.createElement("div");
            textDiv.className = "stage-text";

            const header = document.createElement("div");
            header.className = "stage-header";
            header.innerText = stage.header;

            const content = document.createElement("div");
            content.className = "stage-content";
            content.innerText = stage.content;

            textDiv.appendChild(header);
            textDiv.appendChild(content);

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "stage-checkbox";

            const checkboxDiv = document.createElement("div");
            checkboxDiv.className = "stage-checkbox-container";
            checkboxDiv.appendChild(checkbox);
            textDiv.appendChild(checkboxDiv);

            stageDiv.appendChild(image);
            stageDiv.appendChild(textDiv);

            stagesList.appendChild(stageDiv);
        });
    } catch (error) {
        console.error("Error loading stages:", error);
    }
}
