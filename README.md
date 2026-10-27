# E-Book — Developer Portfolio

E-Book is a personal portfolio website for Lucas Devanlay. It presents professional background, skills, projects, and interests in one interactive, easy-to-navigate place. The goal is to give employers and collaborators a quick overview of my experience, the technologies I use, and the work I have completed.

The site is built with HTML, CSS, and vanilla JavaScript. It is a static website: there is no application server, package installation, or build step required.

The site is none the less available on [Git hub](https://github.com/LucasDevan)

## What the site contains

- **Home** (`index.html`): the landing page and navigation to the main sections.
- **About** (`aboutMe.html`): education, work experience, languages, and general information.
- **Projects** (`projects.html`): featured projects and galleries of smaller projects, with links to detailed project pages and external repositories.
- **Skills** (`skills.html`): technologies and tools grouped by area, with visual skill ratings.
- **Miscellaneous** (`miscellaneous.html`): writing, games, sports, and other personal interests.

## Repository structure

```text
.
├── index.html                 # Home page
├── aboutMe.html               # Background and experience
├── projects.html              # Project directory and galleries
├── skills.html                # Skills and tools
├── miscellaneous.html         # Interests and activities
├── componants/                # Header and footer HTML snippets
├── css/
│   └── styleSheet.css          # Shared styles for the main pages
├── js/
│   └── scripts.js             # Shared navigation, cards, and page interactions
├── projects/
│   ├── project.css            # Styles for detailed project pages
│   ├── cardracter/             # CardRacter project page
│   ├── celesteRunner/          # CelesteRunner project page
│   ├── challengeWebSite/       # Standalone challenge generator website
│   ├── knightsRound/            # Knight's tour solver project
│   ├── lockIn/                  # Lock controller project files
│   ├── testBench/               # ESC test bench project page
│   └── VRephi/                  # VRephi project page
└── assets/
    ├── logos/                  # Technology and tool logos
    └── projects/               # Project-specific images and media
```

The `projects/knightsRound/git/` directory is a Git submodule containing the separate Knight's tour solver repository. Initialize it after cloning if you want its contents:

```bash
git submodule update --init --recursive
```

## How it works

Each top-level page is a regular HTML document. The shared stylesheet provides the portfolio's common layout and visual design, while `js/scripts.js` supplies the main navigation and footer, keyboard- and click-enabled project cards, skill ratings, and an image lightbox on project pages. Detailed project pages live in their own folders under `projects/` and use `projects/project.css`. Images, logos, certificates, and project videos are stored under `assets/`.

The files in `componants/` are reusable HTML snippets; the current site also creates the shared header and footer from `js/scripts.js`.

## View the site

Because this is a static site, you can open `index.html` in a browser to explore it locally. For a more production-like preview, serve the repository root with any static file server. No compilation or dependency installation is needed.

## Adding a project

1. Add a project page under a descriptive folder in `projects/`.
2. Put project-specific images and media in a matching folder under `assets/projects/`.
3. Add the project to the appropriate section of `projects.html`, linking to its page or external repository.
4. Reuse the shared styles and scripts where appropriate, and check that relative asset links work from the new page's directory.
