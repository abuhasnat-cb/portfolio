/**
 * Phone-number detector for privacy checks.
 * Tuned to catch real phone numbers (BD + common intl formats)
 * without matching webpack hashes, dates, or Upwork IDs.
 */
export const PHONE_PATTERN =
  /(?:\+880[\s.-]?)?0?1[3-9]\d{8}\b|\+\d{1,3}[\s.-]\(?\d{2,4}\)?[\s.-]\d{3,4}[\s.-]\d{3,4}\b|\b\d{3}[\s.-]\d{3}[\s.-]\d{4}\b|\b\(\d{3}\)\s*\d{3}[\s.-]\d{4}\b/;
