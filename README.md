# CAMELS-DE static site

This repository now serves a lightweight static landing page for the CAMELS-DE dataset. The previous TypeScript/Ionic application has been archived under `legacy/` so that it can be restored if needed.

## Dataset and paper

- Dataset DOI: https://doi.org/10.5281/zenodo.12733967
- Paper DOI: https://doi.org/10.5194/essd-16-5625-2024

## Interactive map workflow

1. Launch the notebook in `notebooks/CAMELS_DE_map.ipynb`.
2. Update the paths to the data.
3. Run the cells to build a Folium map of all gauging stations.
4. Export the map to `assets/interactive-map.html` (the notebook does this automatically).

## Legacy application

Everything needed to rebuild the former TypeScript website—including `package.json`, Ionic config, sources, and workflow files—resides in `legacy/`. No references to that stack remain on the public-facing site.
