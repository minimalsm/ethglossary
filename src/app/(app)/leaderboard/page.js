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
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'

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
    <TableRow className="flex items-center justify-start border-none">
      <TableCell className="m-0 p-0">
        <div className="relative inline-block">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt="U" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'absolute right-0 top-0 flex h-4 w-4 -translate-y-1/4 translate-x-1/4 transform items-center justify-center rounded-full text-[10px] font-bold text-black',
              getPositionBgColor(position),
            )}
          >
            {position}
          </div>
        </div>
      </TableCell>
      <TableCell className="m-4 flex-1 p-0 font-semibold">
        {displayName}
      </TableCell>
      <TableCell className="m-4 flex gap-1 justify-self-end p-0 text-center">
        {translationCount !== undefined && (
          <div className="flex items-center gap-1 px-1 py-0.5">
            <TranslateIcon />
            <span>{translationCount}</span>
          </div>
        )}
        {commentCount !== undefined && (
          <div className="flex items-center gap-1 px-1 py-0.5">
            <CommentsIcon />
            <span>{commentCount}</span>
          </div>
        )}
        {voteCount !== undefined && (
          <div className="flex items-center gap-1 px-1 py-0.5">
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
      className="rounded-full border border-foreground bg-background p-0 px-3 py-2 text-[13px] text-foreground shadow-none data-[state=active]:bg-foreground data-[state=active]:text-background"
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
  loggedInUserId,
}) => {
  return (
    <Tabs defaultValue="total" className="w-full">
      <TabsList className="mb-4 flex w-full gap-2 bg-background max-[350px]:h-auto max-[350px]:flex-wrap">
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
        <DataTable
          columns={columns}
          data={orderedByTotal}
          loggedInUserId={loggedInUserId}
        />
      </TabsContent>
      <TabsContent value="translations">
        <DataTable
          columns={columns}
          data={orderedByTranslations}
          loggedInUserId={loggedInUserId}
        />
      </TabsContent>
      <TabsContent value="comments">
        <DataTable
          columns={columns}
          data={orderedByComments}
          loggedInUserId={loggedInUserId}
        />
      </TabsContent>
      <TabsContent value="votes">
        <DataTable
          columns={columns}
          data={orderedByVotes}
          loggedInUserId={loggedInUserId}
        />
      </TabsContent>
    </Tabs>
  )
}

const PageLeaderboardTabTrigger = ({ value, children }) => {
  return (
    <TabsTrigger
      value={value}
      className="basis-[120px] rounded-none text-base font-normal text-black data-[state='active']:border-b-[3px] data-[state='active']:border-black data-[state='active']:bg-none data-[state='active']:font-semibold data-[state='active']:text-black data-[state='active']:shadow-none"
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

  const {
    data: { user },
  } = await createSupabaseServerComponentClient().auth.getUser()
  const userId = user?.id
  // const userId = '7abece47-0c9a-4631-962b-1d161782c172'

  return (
    <div className="mx-auto max-w-screen-sm">
      <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>
      <UserLeaderboardTabs
        orderedByTotal={orderedByTotal}
        orderedByVotes={orderedByVotes}
        orderedByComments={orderedByComments}
        orderedByTranslations={orderedByTranslations}
        loggedInUserId={userId}
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
