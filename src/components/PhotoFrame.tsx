import { hasPlaceholder } from "@/lib/placeholders";
import styles from "./PhotoFrame.module.css";

type PhotoFrameProps = {
  /** Image path in /public, or a "[PHOTO]" placeholder (shows a blank frame). */
  src: string;
  alt: string;
};

/** A 4:5 frame with print crop marks. Photos are shown in black and white. */
export function PhotoFrame({ src, alt }: PhotoFrameProps) {
  const empty = hasPlaceholder(src);

  return (
    <figure className={styles.frame}>
      <span className={styles.mark} data-corner="tl" aria-hidden="true" />
      <span className={styles.mark} data-corner="tr" aria-hidden="true" />
      <span className={styles.mark} data-corner="bl" aria-hidden="true" />
      <span className={styles.mark} data-corner="br" aria-hidden="true" />
      {empty ? (
        <div className={styles.empty} />
      ) : (
        // Plain <img>: the site is a static export, so there is no image server to optimise through.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={800} height={1000} loading="lazy" decoding="async" className={styles.img} />
      )}
    </figure>
  );
}
