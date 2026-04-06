## Page Structure

- Split page markup into section components (one logical section per component)
- Keep the page file as composition only
- Place section components under `components/<page-name>/`
- **High cohesion, low coupling**: keep each section self-contained—define that section’s data (constants, sample records, copy) in the **same file** as the section component whenever it is not shared across sections; only hoist shared types/data to a separate module when two or more sections need the same source of truth

## File Naming

- Prefer kebab-case (hyphenated) file names, e.g. `hero-section.tsx`

## Styling Rules
- MUST use TailwindCSS for styling
- DO NOT use inline styles unless absolutely necessary
- Prefer utility classes over custom CSS