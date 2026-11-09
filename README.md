# Adhi.DEV Portfolio

One-page neo-brutalist portfolio. Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it

Open the folder in VS Code and open `index.html` in a browser.
Better: install the **Live Server** extension, right-click `index.html`, then **Open with Live Server**. The page reloads each time you save.

(An internet connection is needed once to load the Google Fonts. Without it the page still works with fallback fonts.)

## Folder structure

```
adhi-portfolio/
├── index.html          all the content (text, sections, SVG icons)
├── css/
│   └── style.css       colours, fonts, layout, animations
├── js/
│   └── main.js         your links (CONFIG) + scroll animations, menu, toast
├── assets/
│   └── images/         put your own screenshots, photo, CV here
└── README.md
```

## What to edit

### 1. Your links: `js/main.js` (top of the file)

```js
var CONFIG = {
  email: "email@example.com",
  linkedin: "",   // https://www.linkedin.com/in/your-name
  github: "",     // https://github.com/your-name
  cv: ""          // e.g. "assets/cv.pdf" or a Google Drive link
};
```

Until a link is filled in, its button shows a small "link isn't set yet" message.

### 2. Your text: `index.html`

Search for these section names / words with `Ctrl+F`:

| What                         | Search for                                             |
|------------------------------|--------------------------------------------------------|
| Logo text                    | `Adhi<b>.DEV</b>` (header) and `Adhi<span` (footer)    |
| Hero greeting and tagline    | `Hello, I am` and `class="lead"`                       |
| About paragraphs and name    | `ABOUT`                                       |
| Stat numbers                 | `data-to=` (the number counts up to this value)        |
| Skills                       | `SKILLS`, each skill is `<span class="chip ...">` |
| Projects                     | `WORKS` (3 `<article class="work">` blocks)      |
| Experience                   | `EXPERIENCE` (3 `<div class="job reveal">` blocks) |
| Testimonials                 | `TESTIMONIALS`                                    |
| Yellow scrolling banner      | `MARQUEE (yellow)`                            |
| Black scrolling tech banner  | `MARQUEE (tech)`                              |
| Contact text                 | `CONTACT`                                     |

**All the names, numbers, projects, jobs and testimonials in the file are placeholders.** Replace them with your real data.

### Add or remove a skill chip

Copy one line and change the text and colour class:

```html
<span class="chip k-g reveal" style="--rot:-2deg">Python</span>
```

Colour classes: `k-o` orange, `k-b` blue, `k-y` yellow, `k-p` purple, `k-w` white, `k-g` green, `k-c` coral, `k-k` black.
`--rot` is the tilt in degrees.

### Add a project

Copy a whole `<article class="work"> ... </article>` block and paste it after the last one.
Add class `rev` (`<article class="work rev">`) to put the image on the left.
Real links go in the `href="#"` of the "Live Site" and "Code" buttons. Remove the `data-soon` attribute from a button once its link is real.

### Use real screenshots for projects

In each project, the laptop picture is an inline `<svg class="lap">`. To use your own image instead, replace that `<svg class="lap"> ... </svg>` with:

```html
<img class="lap" src="assets/images/my-project.png" alt="My project screenshot" style="object-fit:contain">
```

### Colours and fonts: `css/style.css` (top of the file)

```css
:root{
  --cream:#FEF6E4;  --ink:#111111;  --yellow:#FFD93D;
  --blue:#4D8EF7;   --purple:#9B5DE5;  --coral:#FF6B6B;
  --green:#6BCB77;  --orange:#FF9F1C;
}
```

Change a value here and it updates everywhere.

## Put it online (free)

Drag the whole folder to **Netlify Drop** (app.netlify.com/drop), or push it to GitHub and turn on **GitHub Pages**.
