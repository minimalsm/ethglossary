// import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import TranslateIcon from '@/components/icons/TranslateIcon'
import CommentsIcon from '@/components/icons/CommentsIcon'
// Todo: Readd VotesIcon
// import VotesIcon from '@/components/icons/VotesIcon' //
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchOrderedLeaderboardData } from '@/lib/leaderboards'
import { cn } from '@/lib/utils'

const getPositionBgColor = position => {
  switch (position) {
    case 1:
      return 'bg-yellow-500'
    case 2:
      return 'bg-gray-400'
    case 3:
      return 'bg-yellow-600'
    default:
      return 'bg-white'
  }
}

const UserLeaderboardRow = ({
  position,
  avatarUrl,
  displayName,
  translationCount,
  commentCount,
  voteCount,
}) => {
  return (
    <TableRow className="border-none flex items-center justify-start">
      <TableCell className="p-0 m-0">
        <div className="relative inline-block">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt="U" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold',
              getPositionBgColor(position),
            )}
          >
            {position}
          </div>
        </div>
      </TableCell>
      <TableCell className="flex-1 p-0 m-4 font-semibold">
        {displayName}
      </TableCell>
      <TableCell className="flex gap-1 p-0 m-4 text-center justify-self-end">
        {translationCount !== undefined && (
          <div className="py-0.5 px-1 flex gap-1 items-center">
            <TranslateIcon />
            <span>{translationCount}</span>
          </div>
        )}
        {commentCount !== undefined && (
          <div className="py-0.5 px-1 flex gap-1 items-center">
            <CommentsIcon />
            <span>{commentCount}</span>
          </div>
        )}
        {voteCount !== undefined && (
          <div className="py-0.5 px-1 flex gap-1 items-center">
            <CommentsIcon />
            <span>{voteCount}</span>
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}

const UserLeaderboardTable = ({ data }) => {
  return (
    <Table className="divide-y divide-gray-200">
      <TableBody className="w-auto">
        {data.map((user, index) => (
          <UserLeaderboardRow
            key={user.id}
            position={index + 1}
            avatarUrl={user.avatar_url}
            displayName={user.display_name}
            translationCount={user.translation_count}
            commentCount={user.comment_count}
            voteCount={user.vote_count}
          />
        ))}
      </TableBody>
    </Table>
  )
}

// UserLeaderboardTabs Component
const UserLeaderboardTabs = ({
  orderedByTotal,
  orderedByTranslations,
  orderedByComments,
  orderedByVotes,
}) => {
  return (
    <Tabs defaultValue="total" className="w-full">
      <TabsList className="flex gap-4">
        <TabsTrigger value="total">Total</TabsTrigger>
        <TabsTrigger value="translations">Translations</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="votes">Votes</TabsTrigger>
      </TabsList>

      <TabsContent value="total">
        <UserLeaderboardTable data={orderedByTotal} />
      </TabsContent>
      <TabsContent value="translations">
        <UserLeaderboardTable data={orderedByTranslations} />
      </TabsContent>
      <TabsContent value="comments">
        <UserLeaderboardTable data={orderedByComments} />
      </TabsContent>
      <TabsContent value="votes">
        <UserLeaderboardTable data={orderedByVotes} />
      </TabsContent>
    </Tabs>
  )
}

const PageLeaderboardTabs = ({
  orderedByTotal,
  orderedByTranslations,
  orderedByComments,
  orderedByVotes,
}) => {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="flex gap-4">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="languages">Languages</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <UserLeaderboardTabs
          orderedByTotal={orderedByTotal}
          orderedByTranslations={orderedByTranslations}
          orderedByComments={orderedByComments}
          orderedByVotes={orderedByVotes}
        />
      </TabsContent>
      <TabsContent value="languages">
        <UserLeaderboardTable data={orderedByTranslations} />
      </TabsContent>
    </Tabs>
  )
}

export default async function LeaderboardPage() {
  const {
    orderedByTotal,
    orderedByTranslations,
    orderedByComments,
    orderedByVotes,
  } = await fetchOrderedLeaderboardData()

  return (
    <div className="max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>

      <PageLeaderboardTabs
        orderedByTotal={orderedByTotal}
        orderedByTranslations={orderedByTranslations}
        orderedByComments={orderedByComments}
        orderedByVotes={orderedByVotes}
      />
    </div>
  )
}
