# Valentine's Day Interactive Page

A fun, interactive Valentine's Day page where the "Yes" button grows bigger every time they click "No" — with falling hearts, cute GIFs, YouTube music, and playful toast messages. Based on [SahilGogna/v-day](https://github.com/SahilGogna/v-day).

---

## Deploy to GitHub Pages (and link to Cursor)

**What “linking GitHub Pages to Cursor” means:** Your project folder in Cursor is a Git repo. You connect it to a GitHub repo (remote). When you **push** from Cursor, GitHub builds and serves the site. So the “link” is: **Cursor (local) ↔ Git ↔ GitHub (GitHub Pages)**.

### 1. Create the repo on GitHub

1. Go to [github.com/new](https://github.com/new).
2. **Repository name:** `v-day` (or any name; the site will be `https://<username>.github.io/v-day/`).
3. Choose **Public**, leave “Add a README” **unchecked** (you already have one).
4. Click **Create repository**.

### 2. In Cursor: open Terminal and run these commands

Open the project folder in Cursor (`v-day`), then open **Terminal** (`` Ctrl+` `` or **View → Terminal**) and run:

```bash
cd /Users/sricharanreddyjulakanti/v-day

# Initialize Git (if not already)
git init

# Stage all files
git add .

# First commit
git commit -m "Initial commit: Valentine's Day page"

# Rename branch to main (if needed)
git branch -M main

# Add your GitHub repo as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/v-day.git

# Push and set upstream
git push -u origin main
```

Replace **YOUR_USERNAME** with your actual GitHub username (e.g. `julakanti`).

### 3. Turn on GitHub Pages

1. On GitHub, open your repo **v-day**.
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select **main** and **/ (root)**.
5. Click **Save**.

After a minute or two, your site will be live at:

**`https://YOUR_USERNAME.github.io/v-day/`**

### 4. Test in the browser

- Open that URL in Chrome, Safari, or any browser.
- If you change code in Cursor, run in the terminal:
  - `git add .`
  - `git commit -m "Your message"`
  - `git push`
- GitHub Pages will update the site automatically (usually within 1–2 minutes).

### 5. Optional: Open live site from Cursor

- **Quick:** In Terminal run: `open https://YOUR_USERNAME.github.io/v-day/` (macOS).
- Or copy the URL and paste it into your browser.

---

## Project structure

```
v-day/
├── index.html       # Main page — "Will you be my Valentine?"
├── yes.html         # Celebration page after they say Yes
├── script.js        # Main page logic (button growth, GIF swaps, toasts)
├── yes-script.js    # Celebration page animations
├── style.css        # All the styling and animations
└── music/           # Background music — put your MP3 here as background.mp3
```

## Background music

The page is set to use **`music/background.mp3`**.

- **Option A:** Place your own MP3 in the `music/` folder and name it **`background.mp3`**.
- **Option B:** Use a different filename and update the `<source src="music/...">` in both `index.html` and `yes.html` to match.

## Run locally

Open `index.html` in a browser, or use a simple server:

```bash
cd v-day
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Customize

- **index.html** — question, title, GIF
- **yes.html** — celebration message and GIF
- **script.js** — toast messages, button behavior, GIF stages
- **style.css** — colors, fonts, animations
