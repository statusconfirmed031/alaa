import { connectProfile2024PagesMarkup } from "./connect-profile-2024-pages";
import { profileMarkup } from "./profile-markup";

// These source page IDs were matched against the user's requested title list.
// Page 39 (Ministry of Interior Doha, Qatar) is intentionally retained.
const removedPageIds = new Set<number>([
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
const archiveLink = '<span class="toc-page">10</span></a><a class="toc-item" href="#p21"><span class="toc-no">09</span><span class="toc-name">Connect Profile 2024 Projects</span><span class="toc-page">21</span></a></div></div>';
const withProjectsLink = filteredProfileMarkup.replace(tocEnd, archiveLink);
const withUpdatedPageCount = withProjectsLink.replace(
  "Company Profile, 68 pages",
  "Company Profile, 37 pages",
);
const profileWithProjectPages = withUpdatedPageCount.replace(
  "</main>",
  `${connectProfile2024PagesMarkup}</main>`,
);

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: profileWithProjectPages }} />;
}
