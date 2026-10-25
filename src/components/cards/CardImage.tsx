import { useState } from "react";

type Props = { id: number; title: string; category: string; priority?: boolean; alt?: string };

/** Image availability is independent of access rights. Render only authorized cards. */
export default function CardImage({ id, title, category, priority = false, alt = "" }: Props) {
  const src = `/images/cards/card-${String(id).padStart(2, "0")}.png`;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (failedSrc === src) return <div className="ec-type-card"><span>ARGUMENT {String(id).padStart(2, "0")}</span><p>„{title}“</p><span>{category}</span></div>;
  return <img src={src} alt={alt} width="635" height="889"
    loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}
    onError={() => setFailedSrc(src)}
    ref={image => { if (image?.complete && image.naturalWidth === 0) setFailedSrc(src); }} />;
}
