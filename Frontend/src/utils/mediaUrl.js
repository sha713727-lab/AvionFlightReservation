/**
 * Uploaded media is served by the API at /uploads/*, not Next public assets.
 * next/image treats relative /uploads paths as local files and returns 400.
 */
export function isUploadMediaPath(src) {
  return typeof src === 'string' && src.startsWith('/uploads/')
}
