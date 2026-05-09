# MorenoMix Static Website

This folder contains a complete static MorenoMix website.

## Files

- `index.html`
- `styles.css`
- `script.js`
- `/images`
  - `MorenoMix-logo+color+lato.png`
  - `hero.jpg`
  - project/gallery images

## How to publish

Upload all files and the full `images` folder to the root of your hosting account or GitHub Pages repository.

## Important

Do not rename `MorenoMix-logo+color+lato.png` unless you also update the references in:

- `index.html`
- `styles.css` if you later add it as a background image

## GitHub Pages

If using GitHub Pages, your repository should look like this:

```text
/
├── index.html
├── styles.css
├── script.js
└── images/
    ├── MorenoMix-logo+color+lato.png
    ├── hero.jpg
    ├── image (01).jpg
    └── ...
```

## Contact form

The included form is static and opens the user's email app. To receive direct website submissions, connect the form to a service such as Netlify Forms, Formspree, Basin, or your web host's form handler.


## v5 Update
- Feature section image now rotates every 0.5 seconds.
- Feature slideshow starts with `images/image (02).jpg` and excludes `images/image (01).jpg`.
- Desktop/mobile gallery behavior from v4 remains unchanged.


## Formspree estimate form
The contact section now uses a Formspree-compatible form. Before publishing, open `index.html` and replace:

`https://formspree.io/f/{FORM_ID}`

with your real Formspree endpoint, for example:

`https://formspree.io/f/abcdwxyz`

The form is styled in `styles.css` using the `.fs-form`, `.fs-field`, `.fs-input`, `.fs-select`, `.fs-textarea`, and `.fs-button` classes.


UPDATE: Contact form has been replaced with the MorenoMix Formspree request form using https://formspree.io/f/xojrpjrw and matching site styling.
