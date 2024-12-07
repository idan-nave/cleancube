document.addEventListener("DOMContentLoaded", () => {
    let isTimerRunning = false;  // To track if the timer is running
    let timer;
    let elapsedTime = 0;  // Timer in seconds

    const timerButton = document.getElementById('timerButton');

    // Function to update the button text and timer display
    function updateButtonText() {
        const hours = Math.floor(elapsedTime / 3600); // Get hours from total seconds
        const minutes = Math.floor((elapsedTime % 3600) / 60); // Get minutes from remaining seconds
        const seconds = elapsedTime % 60; // Get remaining seconds

        // Format the time as hh:mm:ss
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        // Set the timer text on the button
        timerButton.innerHTML = `<img src="${isTimerRunning ? './media/pause.svg' : './media/play.svg'}" alt="Icon" class="icon"> ${formattedTime}`;
    }

    // Function to start the timer
    function startTimer() {
        isTimerRunning = true;
        timer = setInterval(() => {
            elapsedTime++;
            updateButtonText();
        }, 1000); // Update every second
    }

    // Function to stop the timer
    function stopTimer() {
        isTimerRunning = false;
        clearInterval(timer);
        updateButtonText();
    }

    // Toggle button action between start and stop
    timerButton.addEventListener('click', () => {
        if (isTimerRunning) {
            stopTimer();  // If timer is running, stop it
        } else {
            startTimer();  // If timer is not running, start it
        }
    });

    // Initialize button text on page load
    updateButtonText();
});
