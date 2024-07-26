// app/page.js
// import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import TranslateIcon from '@/components/icons/TranslateIcon'
import CommentsIcon from '@/components/icons/CommentsIcon'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default async function LeaderboardPage() {
  //   const {
  //     data: { session },
  //     error,
  //   } = await createSupabaseServerComponentClient().auth.getSession()

  //   const user = session?.user

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <Table className=" divide-y divide-gray-200">
        <TableCaption>A list of the top contributors.</TableCaption>

        <TableBody className="w-auto">
          <UserLeaderboardRow position={1} />
          <UserLeaderboardRow position={2} />
          <UserLeaderboardRow position={3} />
          <UserLeaderboardRow position={22} />
        </TableBody>
      </Table>
    </div>
  )
}

const UserLeaderboardRow = ({ position }) => {
  return (
    <TableRow className="border-none flex items-center justify-start">
      <TableCell className="p-0 m-0">
        <div className="relative inline-block">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar.png" alt="U" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
            {position}
          </div>
        </div>
      </TableCell>
      <TableCell className="flex-1 p-0 m-4 font-semibold">Lukassim</TableCell>
      <TableCell className="flex gap-1 p-0 m-4 text-center justify-self-end">
        <div className="py-0.5 px-1 flex gap-1 items-center">
          <TranslateIcon />
          <span>57</span>
        </div>
        <div className="py-0.5 px-1 flex gap-1 items-center">
          <CommentsIcon />
          <span>32</span>
        </div>
        <div className="py-0.5 px-1 flex gap-1 items-center">
          <TranslateIcon />
          <span>43</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
