import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSquareXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialLinkButtons() {
  return (
    <div className="flex h-10 gap-3">
      <Link
        href={"https://www.linkedin.com/"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-10 items-center justify-center rounded-md hover:text-black hover:ring-2 hover:ring-purple-600"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2xl" />
      </Link>
      <Link
        href={"https://x.com/"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-10 items-center justify-center rounded-md hover:text-black hover:ring-2 hover:ring-purple-600"
      >
        <FontAwesomeIcon icon={faSquareXTwitter} size="2xl" />
      </Link>
      <Link
        href={"https://www.instagram.com/"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-10 items-center justify-center rounded-md hover:text-black hover:ring-2 hover:ring-purple-600"
      >
        <FontAwesomeIcon icon={faInstagram} size="2xl" />
      </Link>
      <Link
        href={"https://www.youtube.com/"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-10 items-center justify-center rounded-md hover:text-black hover:ring-2 hover:ring-purple-600"
      >
        <FontAwesomeIcon icon={faYoutube} size="2xl" />
      </Link>
    </div>
  );
}
