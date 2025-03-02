// Game state
let currentLevel = 1;
let gameData = null;

// DOM elements
let startButton;
let scenarioSelect;
let fileUpload;
let landingPage;
let gameContainer;
let gameTitle;

// Initialize game elements
document.addEventListener('DOMContentLoaded', function() {
    startButton = document.getElementById('start-game');
    scenarioSelect = document.getElementById('scenario-select');
    fileUpload = document.getElementById('file-upload');
    landingPage = document.getElementById('landing-page');
    gameContainer = document.getElementById('game-container');
    gameTitle = document.getElementById('game-title');
    
    startButton.addEventListener('click', function() {
        // Check if a file was uploaded
        if (fileUpload.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    gameData = JSON.parse(e.target.result);
                    startGame(gameData);
                } catch (error) {
                    showAlert('Invalid JSON file. Using default scenario instead.');
                    gameData = defaultGameData;
                    startGame(gameData);
                }
            };
            reader.readAsText(fileUpload.files[0]);
        } 
        // Check if a pre-made scenario was selected
        else if (scenarioSelect.value !== "Choose a scenario") {
            fetch(scenarioSelect.value)
                .then(response => response.json())
                .then(data => {
                    gameData = data;
                    startGame(gameData);
                })
                .catch(error => {
                    showAlert('Could not load scenario. Using default scenario instead.');
                    gameData = defaultGameData;
                    startGame(gameData);
                });
        } 
        // Use default game data if nothing was selected
        else {
            gameData = defaultGameData;
            startGame(gameData);
        }
    });
});

function startGame(data) {
    // Close sidebar on mobile
    closeSidebar();
    
    // Update game title
    if (data.title) {
        gameTitle.textContent = data.title;
    } else {
        gameTitle.textContent = 'Escape Room Challenge';
    }
    
    // Reset current level
    currentLevel = 1;
    
    // Show the first level
    showLevel(currentLevel);
}

function showLevel(levelNum) {
    gameContainer.innerHTML = ''; // Clear current content
    
    // If we're past the last level, show success
    if (levelNum > gameData.levels.length) {
        showSuccessScreen();
        return;
    }
    
    // Get current level data
    const level = gameData.levels[levelNum - 1];
    
    // Create level element
    const levelElement = document.createElement('div');
    levelElement.className = 'card bg-base-100 shadow-xl max-w-2xl mx-auto';
    
    levelElement.innerHTML = `
        <div class="card-body">
            <h2 class="card-title text-2xl">${level.title}</h2>
            <div class="my-4">${level.story}</div>
            
            <div class="collapse collapse-arrow bg-base-200 my-4">
                <input type="checkbox" /> 
                <div class="collapse-title font-medium">
                    Need a hint?
                </div>
                <div class="collapse-content text-info"> 
                    <p>${level.hint}</p>
                </div>
            </div>
            
            <fieldset class="fieldset">
                <label class="fieldset-label">Answer</label>
                <input type="text" id="current-password" placeholder="" class="input w-full" />
                <label class="label">
                <span id="error-message" class="label-text-alt text-error hidden">Incorrect password. Try again.</span>
            </label>
                
                <button class="btn btn-neutral mt-4" onclick="submitPassword('${level.password}')">Submit</button>

            </fieldset>

        </div>
    `;
    
    gameContainer.appendChild(levelElement);
    
    // Add enter key functionality
    const passwordInput = document.getElementById('current-password');
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitPassword(level.password);
        }
    });
    
    // Focus on the password input
    passwordInput.focus();
}

function submitPassword(correctPassword) {
    const passwordInput = document.getElementById('current-password');
    const errorMessage = document.getElementById('error-message');
    const enteredPassword = passwordInput.value.trim().toLowerCase();
    
    if (enteredPassword === correctPassword) {
        // Advance to next level
        currentLevel++;
        showLevel(currentLevel);
    } else {
        // Show error message
        errorMessage.classList.remove('hidden');
        
        // Add shake effect class
        passwordInput.classList.add('animate-shake');
        
        // Remove shake effect class after animation completes
        setTimeout(() => {
            passwordInput.classList.remove('animate-shake');
        }, 500);
    }
}

function showSuccessScreen() {
    const successElement = document.createElement('div');
    successElement.className = 'card bg-base-100 shadow-xl max-w-2xl mx-auto';
    
    successElement.innerHTML = `
        <div class="card-body">
            <h2 class="card-title text-2xl">${gameData.success.title}</h2>
            <div class="my-4">${gameData.success.message}</div>
            <div class="text-success font-bold my-4">You've completed the challenge!</div>
            <div class="card-actions justify-end mt-4">
                <button class="btn btn-primary" onclick="restartGame()">Play Again</button>
            </div>
        </div>
    `;
    
    gameContainer.appendChild(successElement);
}

function restartGame() {
    // Reset form elements
    scenarioSelect.selectedIndex = 0;
    fileUpload.value = '';
    
    // Clear game container
    gameContainer.innerHTML = '';
    
    // Open sidebar for game selection
    openSidebarOnRestart();
}

function showAlert(message) {
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-warning mb-4';
    alertElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>${message}</span>
    `;
    
    // Add alert to the game container
    gameContainer.insertBefore(alertElement, gameContainer.firstChild);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertElement.remove();
    }, 5000);
}
