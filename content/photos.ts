/**
 * Photography. Two real photographs of Juan Pablo anchor the personal brand.
 *
 * Drop the files into /public/images using any of the accepted extensions
 * (.avif, .webp, .jpg, .jpeg, .png — in that order of preference) and they
 * are picked up automatically. Until then the layout renders a neutral
 * placeholder of the exact same aspect ratio, so nothing shifts when the
 * real photograph arrives.
 */

export type Photo = {
  /** Basename inside /public/images, without extension. */
  basename: string;
  /** Describes the photograph, not the person's appearance. */
  alt: string;
  /** Focal point, kept away from the face when the frame crops tightly. */
  objectPosition: string;
  caption?: string;
};

export const photos = {
  /** Professional portrait: dark shirt, neutral background, clean framing. */
  portrait: {
    basename: 'juan-pablo-homez-retrato',
    alt: 'Juan Pablo Hómez, retrato profesional sobre fondo neutro.',
    objectPosition: '50% 28%',
  },
  /** Taken at a fintech event — used for talks and ecosystem context only. */
  fintechEvent: {
    basename: 'juan-pablo-homez-evento-fintech',
    alt: 'Juan Pablo Hómez durante un evento del ecosistema fintech.',
    objectPosition: '50% 38%',
    caption: 'Participación en el ecosistema fintech',
  },
} as const satisfies Record<string, Photo>;

export const PHOTO_EXTENSIONS = ['avif', 'webp', 'jpg', 'jpeg', 'png'] as const;
