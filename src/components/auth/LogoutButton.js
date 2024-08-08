import { signOut } from '../../app/login/actions'

export default function LogoutButton() {
  //   return <button>Logout</button>
  return <button onClick={async () => signOut()}>Log out</button>
}
