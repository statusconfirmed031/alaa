import projects from "./connect-profile-2024-projects.json";

type Project = (typeof projects)[number];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function compactDescription(value: string) {
  const firstSentence = value.split(/(?<=[.!?])\s+/)[0].trim();
  if (firstSentence.length <= 155) return firstSentence;
  return `${firstSentence.slice(0, 152).replace(/\s+\S*$/, "")}…`;
}

function renderProject(project: Project, index: number) {
  const pageNumber = 21 + index;
  const title = escapeHtml(project.title);
  const category = escapeHtml(project.category);
  const description = escapeHtml(compactDescription(project.description));
  const mainImage = project.images[0];
  const secondaryImages = project.images.slice(1);
  const galleryImages = [mainImage, ...secondaryImages].filter(Boolean) as string[];
  const mainGallery = galleryImages.length
    ? `<div class="project-detail-gallery" aria-label="${title} project photographs">${galleryImages
        .slice(0, 3)
        .map(
          (image, imageIndex) =>
            `<img src="${escapeHtml(image)}" alt="${title} ${imageIndex === 0 ? "featured " : ""}project photograph" loading="eager" />`,
        )
        .join("")}</div>`
    : "";

  return `<section class="sheet project-detail-page${mainGallery ? " with-gallery" : " no-gallery"}" id="p${pageNumber}" aria-label="Page ${pageNumber}: ${title}"><img class="page-watermark-circle" src="images/page-watermark-circle.png" alt="" aria-hidden="true" /><div class="sheet-top"><img class="header-icon" src="images/header-icon.png" alt="WMINFRA" /></div><div class="project-detail-body"><p class="kicker">${category}</p><h1>${title}</h1><span class="title-rule"></span><p class="project-detail-description">${description}</p></div>${mainGallery}<div class="page-number">${pageNumber}</div></section>`;
}

export const connectProfile2024PagesMarkup = projects
  .map((project, index) => renderProject(project, index))
  .join("");
