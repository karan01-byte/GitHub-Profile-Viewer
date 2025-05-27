async function generateLink(usernameFromParam = null) {
  const input = document.getElementById("usernameInput");
  const username = usernameFromParam || input.value.trim();
  const resultDiv = document.getElementById("result");
  const loading = document.getElementById("loading");
  const qrDiv = document.getElementById("qrCode");

  resultDiv.innerHTML = "";
  qrDiv.innerHTML = "";

  if (!username) {
    resultDiv.innerHTML = `<p style="color:red;">Please enter a GitHub username.</p>`;
    return;
  }

  input.value = username;
  loading.classList.remove("hidden");

  const githubUrl = `https://github.com/${username}`;

  try {
    const response = await fetch(`https://api.github.com/users/${username}` , {
      /*headers: {
        Authorization: "add your token here"
      }*/
    }); 

    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    resultDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="Avatar" class="avatar" />
      <p><a href="${githubUrl}" target="_blank">${githubUrl}</a></p>
      <p><strong>Name:</strong> ${data.name || "N/A"}</p>
      <p><strong>Bio:</strong> ${data.bio || "N/A"}</p>
      <p><strong>Repos:</strong> ${data.public_repos}</p>
      <p><strong>Followers:</strong> ${data.followers} | Following: ${data.following}</p>
      <button class="copy-btn" onclick="copyToClipboard('${githubUrl}')">Copy URL</button>
    `;

    qrDiv.innerHTML = `
      <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(githubUrl)}&size=100x100" alt="QR Code" />
    `;

    updateSearchHistory(username);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">GitHub user not found.</p>`;
  } finally {
    loading.classList.add("hidden");
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert("GitHub URL copied to clipboard!"))
    .catch(() => alert("Failed to copy URL."));
}

function updateSearchHistory(username) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history = history.filter(u => u !== username);
  history.unshift(username);
  if (history.length > 5) history = history.slice(0, 5);
  localStorage.setItem("searchHistory", JSON.stringify(history));
  loadSearchHistory();
}

function loadSearchHistory() {
  const historyList = document.getElementById("searchHistory");
  historyList.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  history.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user;
    li.onclick = () => generateLink(user);
    historyList.appendChild(li);
  });
}

// Auto-Suggestion Setup
const usernameInput = document.getElementById("usernameInput");
const suggestionList = document.getElementById("suggestions");

usernameInput.addEventListener("input", async () => {
  const query = usernameInput.value.trim();
  suggestionList.innerHTML = "";

  if (query.length < 2) return;

  try {
    const res = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5` /*, {
      headers: {
        Authorization: "token YOUR_GITHUB_TOKEN"
      }
    }*/);
    const data = await res.json();

    data.items.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user.login;
      li.addEventListener("click", () => {
        usernameInput.value = user.login;
        suggestionList.innerHTML = "";
      });
      suggestionList.appendChild(li);
    });
  } catch (err) {
    console.error("Suggestion fetch failed", err);
  }
});

document.addEventListener("click", (e) => {
  if (!usernameInput.contains(e.target) && !suggestionList.contains(e.target)) {
    suggestionList.innerHTML = "";
  }
});

// Theme Toggle
const toggle = document.getElementById("toggleTheme");
toggle.addEventListener("change", () => {
  const isDark = toggle.checked;
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// On Load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";
  document.body.classList.toggle("dark", isDark);
  toggle.checked = isDark;

  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");
  if (username) generateLink(username);

  loadSearchHistory();
};