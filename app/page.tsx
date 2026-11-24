import { connectProfile2024PagesMarkup } from "./connect-profile-2024-pages";
import { profileMarkup } from "./profile-markup";

const tocMarker = '<span class="toc-page">10</span></a></div></div>       <div class="page-number">02';
const addedProjectsLink = '<span class="toc-page">10</span></a><a class="toc-item" href="#p69"><span class="toc-no">09</span><span class="toc-name">Connect Profile 2024 Projects</span><span class="toc-page">69</span></a></div></div>       <div class="page-number">02';

const withProjectsLink = profileMarkup.replace(tocMarker, addedProjectsLink);
const withUpdatedPageCount = withProjectsLink.replace(
  "Company Profile, 68 pages",
  "Company Profile, 85 pages",
);
const profileWithProjectPages = withUpdatedPageCount.replace(
  "</main>",
  `${connectProfile2024PagesMarkup}</main>`,
);

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: profileWithProjectPages }} />;
}
