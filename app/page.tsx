import { connectProfile2024PagesMarkup } from "./connect-profile-2024-pages";
import { profileMarkup } from "./profile-markup";

// These source page IDs were matched against the user's requested title list.
// Source pages 12 and 39 render as visible pages 11 and 12 and are removed.
const removedPageIds = new Set<number>([
  12,
  39,
  ...Array.from({ length: 26 }, (_, index) => index + 13),
  ...Array.from({ length: 22 }, (_, index) => index + 40),
]);

function removeRequestedPagesAndRenumber(markup: string) {
  let nextPageNumber = 0;
  return markup.replace(
    /<section\b[^>]*\bid="p(\d+)"[^>]*>[\s\S]*?<\/section>/g,
    (section, oldPageId: string) => {
      if (removedPageIds.has(Number(oldPageId))) return "";
      nextPageNumber += 1;
      const pageNumber = String(nextPageNumber).padStart(2, "0");
      return section
        .replace(/\bid="p\d+"/, `id="p${nextPageNumber}"`)
        .replace(/aria-label="Page \d+:/, `aria-label="Page ${nextPageNumber}:`)
        .replace(/(<div class="page-number">)\d+(<\/div>)/, `$1${pageNumber}$2`);
    },
  );
}

const filteredProfileMarkup = removeRequestedPagesAndRenumber(profileMarkup);
const tocEnd = '<span class="toc-page">10</span></a></div></div>';
const archiveLink = '<span class="toc-page">10</span></a><a class="toc-item" href="#p21"><span class="toc-no">09</span><span class="toc-name">Additional Projects</span><span class="toc-page">21</span></a></div></div>';
const withProjectsLink = filteredProfileMarkup.replace(tocEnd, archiveLink);
const withUpdatedPageCount = withProjectsLink.replace(
  "Company Profile, 68 pages",
  "Company Profile, 42 pages",
);
const projectSections = connectProfile2024PagesMarkup.match(/<section\b[\s\S]*?<\/section>/g) ?? [];
const pages21to35 = projectSections
  .filter((section) => {
    const pageId = Number(section.match(/\bid="p(\d+)"/)?.[1] ?? 0);
    return pageId >= 21 && pageId <= 35;
  })
  .join("");
const remainingProjectPages = projectSections
  .filter((section) => {
    const pageId = Number(section.match(/\bid="p(\d+)"/)?.[1] ?? 0);
    return pageId < 21 || pageId > 35;
  })
  .join("");
const page10End = withUpdatedPageCount.indexOf("</section>", withUpdatedPageCount.indexOf('id="p10"')) + "</section>".length;
const profileBeforePage11 = withUpdatedPageCount.slice(0, page10End);
const profileAfterPage10 = withUpdatedPageCount.slice(page10End).replace("</main>", "");
const selectedVillaWorksPage = `<section class="sheet villa-showcase-page" id="p38" aria-label="Page 38: Selected Villa Works"><img class="page-watermark-circle" src="images/page-watermark-circle.png" alt="" aria-hidden="true" /><div class="sheet-top"><img class="header-icon" src="images/header-icon.png" alt="WMINFRA" /></div><div class="villa-showcase-body"><div class="villa-showcase-copy"><p class="kicker">SELECTED VILLA WORKS</p><h1>Villa work,<br />inside and out.</h1><span class="title-rule"></span><p>WMINFRA’s supplied profile describes concrete works and finishing works across 10 villa projects, supported by coordinated interior fit-out, MEP, and construction delivery.</p><div class="villa-showcase-facts"><span><strong>10</strong> villa projects</span><span><strong>01</strong> integrated contracting partner</span><span><strong>Scope</strong> concrete &amp; finishing works</span></div><p class="villa-showcase-source">Client name as printed in the supplied profile: Al Muasron Trading &amp; Contracting. Project-specific scope should be confirmed before external publication.</p></div><div class="villa-showcase-gallery"><figure><img src="/images/villa-works/villa-project-photo-06.jpg" alt="Villa interior with staircase and finished living area" /><figcaption>Interior finish</figcaption></figure><figure><img src="/images/villa-works/villa-project-photo-01.jpg" alt="Villa project exterior at construction and finishing stage" /><figcaption>Villa project · exterior works</figcaption></figure><figure><img src="/images/villa-works/villa-project-photo-03.jpg" alt="Interior finishing in a villa project" /><figcaption>Interior finishing</figcaption></figure><figure><img src="/images/villa-works/villa-project-photo-04.jpg" alt="Staircase and interior finishing in a villa project" /><figcaption>Staircase detail</figcaption></figure><figure><img src="/images/villa-works/villa-project-photo-05.jpg" alt="Living area with interior finishes in a villa project" /><figcaption>Living area</figcaption></figure></div></div><div class="page-number">38</div></section>`;
const qualityPolicyPage = `<section class="sheet quality-policy-page" id="p39" aria-label="Page 39: Quality Policy Statement"><img class="quality-policy-image" src="/images/quality-policy-2026.png" alt="WM Infra Quality Policy Statement" /><div class="page-number">39</div></section>`;
const brochureProjectPages = `<section class="sheet brochure-project-page" id="p40" aria-label="Page 40: Msheireb Downtown"><div class="brochure-project-copy"><p class="kicker">SELECTED PROJECT</p><h1>Msheireb Downtown</h1><span class="title-rule"></span><p>Construction-stage view showing active site works, cranes, and structural construction.</p></div><div class="brochure-project-image"><img src="/images/project-showcase/msheireb-downtown.jpg" alt="Msheireb Downtown during construction" /></div><div class="page-number">40</div></section><section class="sheet brochure-project-page" id="p41" aria-label="Page 41: Katara Tower"><div class="brochure-project-copy"><p class="kicker">SELECTED PROJECT</p><h1>Katara Tower</h1><span class="title-rule"></span><p>Completed: The completed Katara Towers, showing their distinctive curved twin-tower form and illuminated exterior.</p></div><div class="brochure-project-image"><img src="/images/project-showcase/katara-tower.jpg" alt="Completed Katara Towers with curved twin towers and illuminated exterior" /></div><div class="page-number">41</div></section><section class="sheet brochure-project-page" id="p42" aria-label="Page 42: Lusail Palace"><div class="brochure-project-copy"><p class="kicker">SELECTED PROJECT</p><h1>Lusail Palace</h1><span class="title-rule"></span><p>Aerial view of Lusail Palace and its surrounding landscaped grounds.</p></div><div class="brochure-project-image"><img src="/images/project-showcase/lusail-palace.jpg" alt="Aerial view of Lusail Palace and surrounding landscaped grounds" /></div><div class="page-number">42</div></section>`;
const profileWithProjectPages = `${profileBeforePage11}${selectedVillaWorksPage}${qualityPolicyPage}${brochureProjectPages}${pages21to35}${profileAfterPage10}${remainingProjectPages}</main>`;

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: profileWithProjectPages }} />;
}
