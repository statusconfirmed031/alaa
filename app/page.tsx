import { profileMarkup } from "./profile-markup";

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: profileMarkup }} />;
}
