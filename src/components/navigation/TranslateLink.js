import { getUserProfile } from '@/lib/userProfile'

export default async function TranslateLink({ userId }) {
  let defaultLanguage = null

  if (userId) {
    const profile = await getUserProfile(userId)
    if (profile?.default_language) {
      defaultLanguage = profile.default_language
    }
  }

  const route = defaultLanguage ? `/${defaultLanguage}/hello` : '/languages'

  return (
    <a href={route} className="btn btn-primary">
      Translate
    </a>
  )
}
