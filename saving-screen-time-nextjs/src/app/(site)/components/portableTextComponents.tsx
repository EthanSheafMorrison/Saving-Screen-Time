import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "../../../sanity/lib/image";

// Renderers for Sanity rich text (pull quotes and inline images), shared by
// blog posts and talk pages.
export const portableComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <figure className="blog-pullquote">
        <blockquote>{children}</blockquote>
      </figure>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="blog-post-image">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption && (
            <figcaption className="blog-post-image-caption">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};
