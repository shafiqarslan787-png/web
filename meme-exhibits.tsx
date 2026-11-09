import bouquet from "@/assets/amy-meme-3.png";
import peace from "@/assets/amy-meme-4.png";
import smile from "@/assets/amy-meme-5.png";
import shy from "@/assets/amy-meme-6.png";
import chaos from "@/assets/amy-meme-7.png";
import lollipop from "@/assets/amy-meme-8.png";
import video from "@/assets/amy-chaos-stream.mp4";
import webmVideo from "@/assets/amy-chaos.webm";

const exhibits = [
  { image: bouquet, alt: "White meme character holding a bouquet", caption: "birthday flowers. delivered by the department of emotional support weirdos." },
  { image: peace, alt: "Blushing meme character making two peace signs", caption: "Amy entering her 24 era: peace signs, zero promises of normal behavior." },
  { image: smile, alt: "Meme character with a delighted grin", caption: "me when the gossip starts and suddenly my schedule is completely clear." },
  { image: shy, alt: "Shy meme character holding its hands together", caption: "me trying to say something heartfelt without becoming emotionally cooked." },
  { image: chaos, alt: "Meme character laughing with its tongue out", caption: "the shared brain cell after we say ‘one last meme’ for the 24th time." },
  { image: lollipop, alt: "Meme character with a propeller hat and giant lollipop", caption: "24 years old. mentally: propeller hat and a suspiciously large lollipop." },
];

export function MemeExhibits() {
  return (
    <section aria-label="The meme evidence">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exhibits.map(({ image, alt, caption }, i) => (
          <figure key={image.asset_id} className="polaroid relative flex flex-col items-center">
            <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2" />
            <div className="grid aspect-square w-full place-items-center bg-sky/20 p-4">
              <img src={image.url} alt={alt} loading="lazy" className="h-full max-h-64 w-full object-contain" />
            </div>
            <figcaption className="mt-4 text-center font-hand text-2xl leading-tight">
              <span className="mb-2 block font-display text-xs font-bold text-muted-foreground">EXHIBIT {i + 1}: TWIN BEHAVIOR</span>
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <figure className="mx-auto mt-10 max-w-xl">
        <div className="relative">
          <span aria-hidden className="tape -top-3 left-8 -rotate-3 z-10" />
          <video controls playsInline preload="metadata" aria-label="Birthday chaos video" className="aspect-[27/23] w-full rounded-lg border-2 border-ink bg-muted">
            <source src={webmVideo.url} type="video/webm" />
            <source src={video.url} type="video/mp4" />
            Your browser cannot play this video. <a href={video.url}>Open the birthday video</a>.
          </video>
        </div>
        <figcaption className="mt-4 text-center font-hand text-2xl">breaking news: the birthday committee has lost control of the cat department.</figcaption>
      </figure>
    </section>
  );
}