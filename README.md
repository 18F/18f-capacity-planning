# 18F Capacity Planning Tool

This is a prototype of how 18F could get a view into employee turnover and therefore develop a plan for consistent staffing levels.

## Updating

This site is hosted on cloud.gov. Before you push updates to it, contact Heather for the `Staticfile` that powers the password protection. *If you deploy without the Staticfile, the password protection will be automatically disabled.*

To push new updates, first [log in to Cloud Foundry].

Target the org/space: `cf target -o sandbox-gsa -s heather.battaglia`.

Push the app: `cf push 18f-capacity-planning`

Note: The site is powered with a `roster.json` file containing the information of every current 18F employee. This file should never be committed (it is in the `.gitignore`); only pushed to cloud.gov.

## The template

This is a Federalist site template that incorporates the [U.S. Web Design
Standards] [Jekyll theme].

View the [theme documentation] for more info on available [layouts] and
[customization] options.

[log in to Cloud Foundry]: https://cloud.gov/docs/getting-started/setup/#quick-reference
[U.S. Web Design Standards]: https://standards.usa.gov
[Jekyll theme]: https://jekyllrb.com/docs/themes/
[theme documentation]: https://github.com/18F/jekyll-uswds/#readme
[layouts]: https://github.com/18F/jekyll-uswds/#layouts
[customization]: https://github.com/18F/jekyll-uswds/#customization
