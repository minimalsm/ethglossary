// const LoginWithDiscordButton = () => {
//     const { signInWithDiscord } = oAuthSignIn()

//     return (
//         <Button
//             variant="outline"
//             onClick={() => signInWithDiscord('discord')}
//             className="w-full"
//         >
//             Login with Discord
//         </Button>
//     )
// }

import { googleSignIn } from '../../app/login/actions'

export default function LoginWithDiscordButton() {
  return <button onClick={async () => googleSignIn()}>Logout</button>
}
