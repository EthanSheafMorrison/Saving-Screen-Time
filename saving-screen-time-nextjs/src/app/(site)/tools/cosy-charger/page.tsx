import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";
import { formatFileSize } from "../../../../lib/talks";
import ToolPage from "../components/ToolPage";

export const revalidate = 60;

// Placeholder copy and photos, used for any field Alex hasn't filled in yet in
// the "Cosy Charger Page" document in the Studio.
const fallback = {
  subtitle:
    "A handmade bed for your phone. Tuck it in, plug it in, and say goodnight.",
  quote: "Charging becomes a ritual, not a restriction.",
  zineIntro:
    "A cosy charger is made from whatever you have lying around — old tapes, offcuts, a scrap of knitting. A DIY zine with step-by-step instructions is on its way.",
  photos: [
    {
      key: "cassette-bed",
      src: "/Images/cosy-charger/cassette-bed.webp",
      alt: "A phone tucked under a purple knitted duvet on a bed built from cassette tapes and a VHS tape, with stacked cassettes as the headboard.",
      caption: "Cassette and VHS bed frame, knitted duvet. Made by Coral.",
    },
    {
      key: "earplug-duvet",
      src: "/Images/cosy-charger/earplug-duvet.webp",
      alt: "A phone under a purple knitted duvet on a white bed with a curved white headboard, a charging cable running out from the foot of the bed.",
      caption: "Duvet knitted from Air New Zealand earplugs. Made by Coral.",
    },
  ],
};

const description =
  "A handmade phone bed. Charging becomes a ritual, not a restriction — disconnection becomes care, not deprivation.";

export const metadata: Metadata = {
  title: "Cosy Charger",
  description,
  openGraph: { title: "Cosy Charger", description },
};

interface GalleryImage {
  _key: string;
  asset?: unknown;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface CosyCharger {
  subtitle?: string;
  quote?: string;
  body?: unknown[];
  blogSlug?: string;
  gallery?: GalleryImage[];
  zineIntro?: string;
  zineUrl?: string;
  zineSize?: number;
}

export default async function CosyChargerPage() {
  const data: CosyCharger | null = await client.fetch(
    `*[_type == "cosyCharger"][0]{
      subtitle, quote, body, zineIntro,
      "blogSlug": blogPost->slug.current,
      gallery[]{
        ...,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      },
      "zineUrl": zine.asset->url,
      "zineSize": zine.asset->size
    }`
  );

  const gallery = (data?.gallery ?? []).filter((img) => img.asset);
  // ?dl= makes Sanity serve the file as a download under its original filename
  const zineHref = data?.zineUrl ? `${data.zineUrl}?dl=` : null;

  return (
    <ToolPage
      theme="charger"
      tag="Object — Cosy Charger"
      title={<>Cosy <em>Charger</em></>}
      subtitle={data?.subtitle || fallback.subtitle}
      launchUrl={zineHref ?? "#features"}
      ctaLabel={zineHref ? "Get the DIY Zine ↓" : "Make Your Own ↓"}
      featuresLabel="Make One"
      hideCta
      hideFeatures
      featuresTitle={null}
      features={[]}
      heroDecoration={
        <svg className="hero-knit-deco" aria-hidden="true">
          <defs>
            <pattern id="knit-stitch" width="28" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M3 3 L14 17 L25 3 M3 15 L14 29 L25 15 M3 -9 L14 5 L25 -9"
                fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#knit-stitch)" />
        </svg>
      }
      aboutQuote={data?.quote || fallback.quote}
      aboutBody={
        <>
          {data?.body && data.body.length > 0 ? (
            <PortableText value={data.body as Parameters<typeof PortableText>[0]["value"]} />
          ) : (
            <>
              <p>The cosy charger is a handmade &ldquo;bed&rdquo; for your phone: somewhere soft to put it down at the end of the day, tuck it in, and leave it to charge.</p>
              <p>Most advice about screen time is about restriction — limits, locks, and willpower. The cosy charger starts somewhere gentler. Putting your phone to bed is a small act of care, for it and for you. Disconnection becomes care, not deprivation.</p>
            </>
          )}
          {data?.blogSlug && (
            <p>
              <Link href={`/blog/${data.blogSlug}`} className="charger-blog-link">Read the blog post →</Link>
            </p>
          )}
        </>
      }
      extraSection={
        <>
          <section className="tool-extra charger-gallery-section">
            <div className="section-inner">
              <div className="section-label">Sweet dreams</div>
              <div className="section-title">The <em>Beds</em></div>
              <div className="charger-gallery">
                {gallery.length > 0
                  ? gallery.map((img) => (
                      <figure key={img._key} className="charger-photo reveal">
                        <Image
                          src={urlFor(img).width(1200).url()}
                          alt={img.alt ?? ""}
                          width={img.width ?? 1200}
                          height={img.height ?? 1600}
                          sizes="(max-width: 800px) 100vw, 520px"
                        />
                        {img.caption && <figcaption>{img.caption}</figcaption>}
                      </figure>
                    ))
                  : fallback.photos.map((img) => (
                      <figure key={img.key} className="charger-photo reveal">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={1501}
                          height={2000}
                          sizes="(max-width: 800px) 100vw, 520px"
                        />
                        <figcaption>{img.caption}</figcaption>
                      </figure>
                    ))}
              </div>
            </div>
          </section>

          <section className="tool-extra charger-make" id="features">
            <div className="section-inner">
              <div className="reveal">
                <div className="section-label">DIY</div>
                <div className="section-title">Make Your <em>Own</em></div>
                <p className="charger-make-body">{data?.zineIntro || fallback.zineIntro}</p>
                {zineHref ? (
                  <a href={zineHref} className="study-btn charger-zine-btn">
                    Download the DIY Zine
                    <span className="charger-zine-meta">
                      PDF{data?.zineSize ? ` · ${formatFileSize(data.zineSize)}` : ""} <span aria-hidden="true">↓</span>
                    </span>
                  </a>
                ) : (
                  <span className="study-btn charger-zine-btn charger-zine-btn--soon">DIY Zine — Coming Soon</span>
                )}
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
