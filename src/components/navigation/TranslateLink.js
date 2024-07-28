import { getUserProfile } from '@/lib/userProfile'
import { getTranslateLinkPath } from '@/utils/getTranslateLink'

export default async function TranslateLink({ userId }) {
  let defaultLanguage = null

  if (userId) {
    const profile = await getUserProfile(userId)
    if (profile?.default_language) {
      defaultLanguage = profile.default_language
    }
  }

  const route = defaultLanguage ? `/${defaultLanguage}/hello` : '/languages'
  // const route = await getTranslateLinkPath(userId)

  return (
    <a href={route} className="btn btn-primary">
      Translate
    </a>
  )
}
