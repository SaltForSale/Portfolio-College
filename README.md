# Evan Lee Portfolio

A responsive static portfolio rebuilt with a bold blue, black, white, and gray interface system.

## Run locally

Open `index.html` directly, or serve the folder with a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Stack

- HTML5
- Bootstrap 5.3.8, vendored locally for reliable offline and hosted use
- Custom responsive CSS
- Vanilla JavaScript

## Design rules

Primary palette:

- White: `#e6e9fa`
- Gray: `#5c6373`
- Black: `#010415`
- Reload Blue: `#009ffb`

Hover motion is limited to interactive elements such as links, buttons, and linked project cards. Non-interactive content does not animate on hover. Active and filled states use white content for consistent contrast.

## Pages

- `index.html`
- `about.html`
- `projects.html`
- `contact.html`

The current resume is included at `assets/resume/Evan_Lee_Resume.pdf`.


## Brand and content updates

- The supplied EL mark is used for the favicon set and in a wide Reload Blue navbar rhombus.
- The EL mark remains the homepage link; the adjacent name and role text are static and non-clickable.
- DQL is grouped with languages, while Visual Studio Code and Adobe Photoshop are listed with tools and platforms.
- Frontend archive entries are explicitly identified as high school projects completed from 2021–2023.

- Favicon now uses the supplied EL mark on the near-black background with no blue rhombus.

- Favicon assets now preserve the supplied logo's transparent background exactly; no blue rhombus or dark backing is added.
- Navbar logo plate narrowed from 94px to 80px on desktop, with proportionally narrower mobile sizes.

- Replaced the About-page portrait with the supplied square headshot.

- Shortened the About-page portrait card by using the supplied square image at a 1:1 ratio and capping the frame at 430px wide.

- Refined the navbar logo: narrower blue rhombus, removed the decorative white line, and replaced the skewed offset hover with a restrained lift and scale interaction.

- Reduced the About-page portrait frame from 430px to 360px wide and optimized the portrait assets to 720×720.

- Reduced the About-page portrait frame to 300px and optimized the source portrait to 600×600 for a sharper, more compact presentation.

- Widened the About-page portrait card to 380px while keeping the square image and a compact caption, producing a balanced near-square card.

- Lowered the LEE line in the homepage display name slightly for cleaner separation from EVAN.

- Raised the homepage LEE line halfway back toward its original position.

- Rewrote the visible site copy to be more direct and natural. No CSS was changed.

- Expanded all four recent project entries into two detailed paragraphs.
- Made the bottom edge of the high-school projects section straight so the navy page background no longer shows above the footer.
