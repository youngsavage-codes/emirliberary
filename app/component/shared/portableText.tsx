import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

// Custom PortableText components
export const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-6">
        <Image
          src={value.asset.url}
          alt={value.alt || ""}
          width={800}
          height={600}
          className="rounded-lg object-cover w-full"
        />
        {value.caption && <figcaption className="text-center text-gray-500 mt-2">{value.caption}</figcaption>}
      </figure>
    ),
    callout: ({ value }) => (
      <div className={`p-4 rounded-md my-6 ${value.tone === "warning" ? "bg-yellow-100 text-yellow-800" : value.tone === "success" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
        <h4 className="font-semibold">{value.title}</h4>
        <p>{value.body}</p>
      </div>
    ),
    videoEmbed: ({ value }) => (
      <div className="my-6 aspect-video">
        <iframe
          src={value.url}
          title={value.caption || "Embedded video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
        {value.caption && <p className="text-center text-gray-500 mt-2">{value.caption}</p>}
      </div>
    ),
    htmlBlock: ({ value }) => (
      <div
        className="my-6"
        dangerouslySetInnerHTML={{ __html: value.html }}
      />
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold my-2">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">{children}</blockquote>,
    normal: ({ children }) => <p className="my-2">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,
    link: ({ children, value }) => (
      <a href={value.href} target={value.openInNewTab ? "_blank" : "_self"} className="text-blue-600 underline">
        {children}
      </a>
    ),
  },
};
