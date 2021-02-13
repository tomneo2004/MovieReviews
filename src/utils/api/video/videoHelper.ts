/**
 * Get video source url
 *
 * Support: YouTube, Vimeo
 * @param key video's id
 * @param site  video provider e.g YouTube, Vimeo
 */
export function getVideoURL(key: string, site: string) {
  switch (site) {
    case "YouTube":
      return `https://www.youtu.be/${key}`;
    case "Vimeo":
      return `https://vimeo.com/${key}`;
    default:
      return "";
  }
}
