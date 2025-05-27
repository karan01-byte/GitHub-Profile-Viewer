# GitHub Profile Viewer

**GitHub Profile Viewer** is a sleek, responsive web app that allows users to search for GitHub profiles, view their public information, and generate QR codes for sharing. It also includes features like search history, dark mode, and intelligent username suggestions.

![Preview](preview.png)

## Live Demo

[Click here to view the live site](https://git-hub-profile-viewer-bay.vercel.app/)

## Features

- **GitHub Profile Fetching** – View avatar, bio, repos, followers, etc.
- **Auto-Suggestions** – Smart GitHub username suggestions as you type.
- **Search History** – Stores your last 5 searched usernames.
- **QR Code Generator** – Easily share profiles using a QR code.
- **Copy to Clipboard** – One-click copy of GitHub profile URL.
- **Dark/Light Theme Toggle** – User preference saved locally.
- **Responsive Design** – Works smoothly on mobile and desktop.
- **Error Handling** – User-friendly messages for invalid usernames.

## Tech Stack

- **Frontend**: HTML, CSS (Custom & Bootstrap), JavaScript
- **APIs Used**: 
  - [GitHub Users API](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28)
  - [GitHub Search API](https://docs.github.com/en/rest/search?apiVersion=2022-11-28)
  - [QR Code Generator API](https://goqr.me/api/)

## How to Use

1. Enter a GitHub username in the input box.
2. Choose a suggestion (optional).
3. View profile details and scan/download the QR code.
4. Toggle between dark and light mode as per your preference.

## Setup Instructions (For Local Development)

```bash
# Clone the repo
git clone https://github.com/your-username/github-profile-viewer.git

# Navigate to the folder
cd github-profile-viewer

# Open index.html in your browser
