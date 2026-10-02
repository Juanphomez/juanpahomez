import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { PHOTO_EXTENSIONS, type Photo as PhotoData } from '@/content/photos';
import { cn } from '@/lib/cn';
import styles from './Photo.module.css';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

/**
 * Finds the first available file for a basename, preferring modern formats.
 * Resolved on the server at render time, so dropping a file into
 * /public/images is all that is needed to publish a photograph.
 */
function resolveSource(basename: string): string | null {
  for (const extension of PHOTO_EXTENSIONS) {
    const filename = `${basename}.${extension}`;
    if (fs.existsSync(path.join(IMAGES_DIR, filename))) {
      return `/images/${filename}`;
    }
  }
  return null;
}

type PhotoProps = {
  photo: PhotoData;
  /** CSS aspect-ratio for the frame. Identical for image and placeholder. */
  ratio: string;
  /** Responsive sizes hint — required for correct srcset selection. */
  sizes: string;
  /** Set only for the above-the-fold portrait, which is the LCP candidate. */
  priority?: boolean;
  className?: string;
  /** Initials shown by the placeholder. */
  initials?: string;
};

export function Photo({
  photo,
  ratio,
  sizes,
  priority = false,
  className,
  initials = 'JPH',
}: PhotoProps) {
  const src = resolveSource(photo.basename);

  return (
    <div className={cn(styles.frame, className)} style={{ aspectRatio: ratio }}>
      {src ? (
        <Image
          src={src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          quality={82}
          className={styles.image}
          style={{ objectPosition: photo.objectPosition }}
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={photo.alt}>
          <span className={styles.placeholderMark} aria-hidden="true">
            {initials}
          </span>
          <span className={styles.placeholderNote}>
            Fotografía pendiente
            <br />
            <span className={styles.placeholderPath}>
              public/images/{photo.basename}.jpg
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
