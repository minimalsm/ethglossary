// Convert spaces to underscores
export function slugify(term) {
  return encodeURIComponent(term).replace(/%20/g, '_')
}

// Convert underscores back to spaces
export function deslugify(slug) {
  return decodeURIComponent(slug.replace(/_/g, ' '))
}
