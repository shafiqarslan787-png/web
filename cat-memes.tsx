import collage from "@/assets/cat-download_3.jpg";
import moon from "@/assets/cat-download_4.jpg";
import minecraft from "@/assets/cat-download_6.jpg";
import tongue from "@/assets/cat-meme.png";

const memes = [
  { image: minecraft, alt: "Cats chilling in a Minecraft lake", caption: "Amy's ideal birthday party: cats, fish, zero responsibilities." },
  { image: moon, alt: "Cat memes floating around the moon", caption: "astronomy club, but every planet is a cat." },
  { image: tongue, alt: "Cat sticking its tongue out", caption: "me reacting to literally any cat video Amy sends." },
  { image: collage, alt: "Collage of famous cat memes", caption: "the official Zama Zargi cat council. all members present." },
];

export function CatMemes() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {memes.map(({ image, alt, caption }, i) => (
        <figure key={image.asset_id} className="polaroid relative" style={{ transform: `rotate(${[-1.5, 1, 1.5, -1][i]}deg)` }}>
          <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2" />
          <div className="grid aspect-square place-items-center overflow-hidden bg-muted">
            <img src={image.url} alt={alt} loading="lazy" className="h-full w-full object-contain" />
          </div>
          <figcaption className="mt-3 text-center font-hand text-2xl leading-tight">{caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
