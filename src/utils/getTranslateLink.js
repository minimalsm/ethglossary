import { getUserProfile } from '@/lib/userProfile'

export async function getTranslateLinkPath({ userId }) {
  let defaultLanguage = null

  // console.log(userId)

  if (userId) {
    const profile = await getUserProfile(userId)
    if (profile?.default_language) {
      defaultLanguage = profile.default_language
    }
  }

  const route = defaultLanguage ? `/${defaultLanguage}/block` : '/languages'

  return route
}
