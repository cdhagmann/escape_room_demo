// Default game data as fallback
const defaultGameData = {
    "levels": [
        {
            "id": "level1",
            "title": "The Mysterious Lab",
            "story": "You find yourself locked in a strange laboratory. The door is sealed with an electronic lock that requires a password. On the desk, you notice a note with a riddle: \"I'm light as a feather, but even the strongest person cannot hold me for more than a few minutes.\"",
            "password": "breath",
            "hint": "What can't be held for long, no matter how strong you are?"
        },
        {
            "id": "level2",
            "title": "Hidden Files",
            "story": "The screen flickers and reveals a hidden computer terminal. There seems to be important files locked behind another password. The terminal displays: \"To proceed, answer this: I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?\"",
            "password": "map",
            "hint": "Something you might use to navigate..."
        },
        {
            "id": "level3",
            "title": "The Final Code",
            "story": "You've uncovered a secret file that contains coordinates to a hidden vault. But there's one last security measure. A prompt appears: \"What has keys but no locks, space but no room, and you can enter but not exit?\"",
            "password": "keyboard",
            "hint": "You're using one right now to type..."
        }
    ],
    "success": {
        "title": "Escape Successful!",
        "message": "Congratulations! You've solved all the puzzles and escaped the mysterious lab. The secrets you've uncovered will change everything..."
    }
};
