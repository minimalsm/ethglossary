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
import { DataTable } from '@/components/leaderboard/data-table'
import { columns } from '@/components/leaderboard/columns'

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

const UserLeaderboardTabTrigger = ({ value, children }) => {
  return (
    <TabsTrigger
      // className="text-[13px] bg-white text-black data-[state='active']:bg-[black] data-[state='active']:text-white rounded-full p-0 py-2 px-3"
      // Hardcoding black/white for active state as it was causing a bug where the default styling woudl show
      className=" text-[13px] shadow-none bg-white text-black data-[state=active]:bg-[#000] data-[state=active]:text-[#fff] rounded-full p-0 py-2 px-3"
      value={value}
    >
      {children}
    </TabsTrigger>
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
      <TabsList className="flex gap-2 w-full max-[350px]:h-auto max-[350px]:flex-wrap mb-4">
        <UserLeaderboardTabTrigger value="total">
          Overall
        </UserLeaderboardTabTrigger>
        <UserLeaderboardTabTrigger value="translations">
          Translations
        </UserLeaderboardTabTrigger>
        <UserLeaderboardTabTrigger value="comments">
          Comments
        </UserLeaderboardTabTrigger>
        <UserLeaderboardTabTrigger value="votes">
          Votes
        </UserLeaderboardTabTrigger>
      </TabsList>

      <TabsContent value="total">
        <DataTable columns={columns} data={orderedByTotal} />
      </TabsContent>
      <TabsContent value="translations">
        <DataTable columns={columns} data={orderedByTranslations} />
      </TabsContent>
      <TabsContent value="comments">
        <DataTable columns={columns} data={orderedByComments} />
      </TabsContent>
      <TabsContent value="votes">
        <DataTable columns={columns} data={orderedByVotes} />
      </TabsContent>
    </Tabs>
  )
}

const PageLeaderboardTabTrigger = ({ value, children }) => {
  return (
    <TabsTrigger
      value={value}
      className="basis-[120px] text-base rounded-none text-black font-normal data-[state='active']:font-semibold data-[state='active']:text-black data-[state='active']:bg-none data-[state='active']:shadow-none data-[state='active']:border-b-[3px] data-[state='active']:border-black"
    >
      {children}
    </TabsTrigger>
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
      <TabsList className="flex justify-evenly bg-white">
        <PageLeaderboardTabTrigger value="users">
          Users
        </PageLeaderboardTabTrigger>
        <PageLeaderboardTabTrigger value="languages">
          Languages
        </PageLeaderboardTabTrigger>
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
      <UserLeaderboardTabs
        orderedByTotal={orderedByTotal}
        orderedByVotes={orderedByVotes}
        orderedByComments={orderedByComments}
        orderedByTranslations={orderedByTranslations}
      />

      {/* <PageLeaderboardTabs
        orderedByTotal={orderedByTotal}
        orderedByTranslations={orderedByTranslations}
        orderedByComments={orderedByComments}
        orderedByVotes={orderedByVotes}
      /> */}
    </div>
  )
}
