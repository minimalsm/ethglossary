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

import { discordSignIn } from '../../app/login/actions'

export default function LoginWithDiscordButton() {
  return (
    <button onClick={async () => discordSignIn()}>
      Login w/Discord server action
    </button>
  )
}
