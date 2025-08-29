// Toggle mobile menu
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

function showNotification(message, isSuccess = true) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.background = isSuccess ? "#22c55e" : "#ef4444"; // green or red
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("send.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    if (result.trim() === "OK") {
      showNotification("Danke! Deine Nachricht wurde erfolgreich gesendet.", true);
      form.reset();
    } else {
      showNotification("Fehler beim Senden. Bitte versuche es später erneut.", false);
    }
  })
  .catch(() => {
    showNotification("Netzwerkfehler. Bitte versuche es später erneut.", false);
  });
});

// Expandable services
document.querySelectorAll(".service").forEach((card) => {
  card.addEventListener("click", () => {
    const infoText = card.querySelector("p");
    if (card.classList.contains("expanded")) {
      card.classList.remove("expanded");
      card.querySelector(".more")?.remove();
      // Add back the info text if missing
      if (!infoText) {
        const newInfo = document.createElement("p");
        newInfo.textContent = "Zum Aufklappen klicken.";
        card.appendChild(newInfo);
      }
    } else {
      card.classList.add("expanded");
      card.querySelector("p")?.remove(); // Remove info text
      const moreText = document.createElement("div");
      moreText.className = "more";
      moreText.textContent = card.dataset.more;
      card.appendChild(moreText);
    }
  });
});

// Gallery image modal for all images
const imgModal = document.getElementById("img-modal");
const imgModalContent = document.getElementById("img-modal-content");
const closeImgModal = document.getElementById("close-img-modal");

// Add listeners AFTER these variables exist
document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    imgModalContent.src = img.src;
    imgModal.style.display = "flex";
  });
});

closeImgModal.addEventListener("click", () => {
  imgModal.style.display = "none";
  imgModalContent.src = "";
});

imgModal.addEventListener("click", (e) => {
  if (e.target === imgModal) {
    imgModal.style.display = "none";
    imgModalContent.src = "";
  }
});

