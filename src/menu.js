import { audioManager } from "./audio.js";
import { createParticles } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize audio
  audioManager.init();

  // Create particles
  createParticles(30);

  // Button hover effects
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      audioManager.playSound("click");
    });
  });

  // Navigation buttons
  document.getElementById("start-btn").addEventListener("click", () => {
    audioManager.playSound("click");
    window.location.href = "ingame.html";
  });

  document.getElementById("how-to-play-btn").addEventListener("click", () => {
    audioManager.playSound("click");
    window.location.href = "instruction.html";
  });

  document.getElementById("about-btn").addEventListener("click", () => {
    audioManager.playSound("click");
    window.location.href = "about.html";
  });

  document.getElementById("settings-btn").addEventListener("click", () => {
    audioManager.playSound("click");
    // Modal is handled in utils.js
  });

  document.getElementById("exit-btn").addEventListener("click", () => {
    audioManager.playSound("click");
    
    Swal.fire({
      title: 'Exit Game?',
      text: "Are you sure you want to exit?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#39ff14',
      cancelButtonColor: '#ff416c',
      confirmButtonText: 'Yes, exit!',
      cancelButtonText: 'Cancel',
      background: '#1a1a1a',
      color: '#39ff14',
      customClass: {
        popup: 'game-modal',
        title: 'game-modal-title',
        content: 'game-modal-content'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Show thank you message and stop the game
        document.body.innerHTML = `
          <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: 'GameFont', 'Arial', sans-serif;
            font-size: 2rem;
            color: #39ff14;
            text-align: center;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          ">
            <div>
              <h1 style="margin-bottom: 1rem;">Thank you for playing!</h1>
              <p style="font-size: 1rem; opacity: 0.8;">We hope you enjoyed the game</p>
            </div>
          </div>
        `;
        // Stop any background music or sounds
        audioManager.stopAllSounds();
      }
    });
  });

  // Handle volume slider
  const volumeSlider = document.getElementById("volume-slider");
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      audioManager.setVolume(e.target.value);
    });
  }

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
      case "1":
      case "s":
        document.getElementById("start-btn").click();
        break;
      case "2":
      case "h":
        document.getElementById("how-to-play-btn").click();
        break;
      case "3":
      case "a":
        document.getElementById("about-btn").click();
        break;
      case "4":
      case "o":
        document.getElementById("settings-btn").click();
        break;
      case "escape":
      case "q":
        document.getElementById("exit-btn").click();
        break;
      case "m":
        audioManager.toggleMute();
        break;
    }
  });

  // Add animation to buttons
  const buttons = document.querySelectorAll(".menu-btn");
  buttons.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.1}s`;
  });
});
