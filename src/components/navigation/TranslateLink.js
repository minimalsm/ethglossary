// components/TranslateButton.js
import { getUserProfile } from '@/lib/userProfile'

export default async function TranslateLink({ userId }) {
  let defaultLanguage = null

  if (userId) {
    const userProfile = await getUserProfile(userId)
    defaultLanguage = userProfile.default_language
  }

  const path = defaultLanguage ? `/${defaultLanguage}/hello` : '/languages'

  return (
    <a href={path} className="btn btn-primary">
      Translate
    </a>
  )
}
