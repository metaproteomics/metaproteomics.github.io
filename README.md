# metaproteomics.org

This repository contains the code for [metaproteomics.org](https://metaproteomics.org). This is an Astro v6 site, hosted by GitHub Pages. When pushing to the main branch, the new website is automatically deployed.

For local development, first run `yarn install` to install the dependencies, then run `yarn dev` to run a local instance of the website.

## Data-driven pages

Several pages are driven by JSON files in `src/data/`. Edit the relevant JSON file and commit — the site rebuilds automatically.

### Research Groups (`groups.astro` → `src/data/labs.json`)

Renders all countries and labs, including automatic totals for labs and countries.

Each lab entry:

```json
{
  "countries": [
    {
      "country": "Country Name",
      "labs": [
        {
          "name": "Lab or Group Name",
          "website": "https://example.com",
          "institute": "University or Institute",
          "city": "City (optionally incl. state/region)",
          "country": "Country Name",
          "groupLeader": "Dr. First Last"
        }
      ]
    }
  ]
}
```

- `website` is optional; if empty or missing, the name renders as plain text instead of a link.
- Each entry renders as: `<a>name</a> (institute, city), led by groupLeader`

### About / Board (`about.astro` → `src/data/board.json`)

Renders board terms and founding members. Each term has a `label`, an optional `description`, and a list of `members` with `name` and `role` fields. Founding members have `name` and `institution` fields.

### Education (`education.astro` → `src/data/education.json`)

Renders tutorials and recorded lectures. Each tutorial has `title`, `url`, and `description`. Each lecture additionally has a `speaker` field.
