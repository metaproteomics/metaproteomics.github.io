# metaproteomics.org

This repository contains the code for [metaproteomics.org](https://metaproteomics.org). This is an Astro site, hosted by GitHub Pages. When pushing to the main branch, the new website is automatically deployed.

For local development, first run `yarn install` to install the dependencies, then run `yarn dev` to run a local instance of the website.

## Research Groups page: data-driven rendering

- Source data lives at `src/data/labs.json`.
- The page `src/pages/groups.astro` renders all countries and labs from this JSON and automatically displays the total number of labs and countries.
- To add or edit a lab, edit `src/data/labs.json` directly and commit. The site will rebuild automatically.

### JSON schema (strict)

Each lab entry uses explicit fields. `website` is optional and may be an empty string.

```
{
  "countries": [
    {
      "country": "Country Name",
      "labs": [
        {
          "name": "Lab or Group Name",
          "website": "https://example.com", // optional, can be empty
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

Rendering is handled in `groups.astro`. The page formats each item as:

```
<a>name</a> (institute, city), led by groupLeader
```

- If `website` is empty or missing, the name is shown as plain text instead of a link.
- Totals (labs and countries) are computed automatically from the JSON.
