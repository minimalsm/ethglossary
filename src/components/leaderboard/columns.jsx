'use client'

import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import CommentsIcon from '@/components/icons/CommentsIcon'
import TranslateIcon from '@/components/icons/TranslateIcon'
import VotesIcon from '@/components/icons/VotesIcon'

// import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

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

export const columns = [
  {
    accessorKey: 'status',
    header: 'Status',
    cellClassName: 'h-10 w-10 p-0',
    cell: ({ row }) => {
      const leaderboardPosition = row.original?.position || row.position
      const avatarUrl = row.original?.avatar_url || row.avatar_url

      return (
        <div className="relative inline-block">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt="U" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold',
              getPositionBgColor(leaderboardPosition),
            )}
          >
            {leaderboardPosition}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'display_name',
    header: 'Name',
    cellClassName : 'flex-1 p-0 my-0 mx-4 font-semibold',
    cell: ({ row }) => {
      console.log('row', row)
      // data is sorted so we can use index for leaderboard position
      const displayName = row.original?.display_name || row.display_name
      
      return (
        <span>
         {displayName}
        </span>
      )
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cellClassName: 'flex gap-1 p-0 text-center justify-self-end grow-0',
    cell: ({ row }) => {
      // conditional handles different data structure if it's an outer table highlight
      const translationsNumber = row.original?.translation_count || row.translation_count
      const commentsNumber = row.original?.comment_count || row.comment_count
      const votesNumber = row.original?.vote_count || row.vote_count

      return (
        <div className="flex gap-1 p-0 ml-4 text-center justify-self-end">
        {/* <div className="flex gap-1 p-0 m-4 text-center justify-self-end"> */}
         { translationsNumber >= 0 && (
           <div className="py-0.5 flex gap-1 items-center">
           <TranslateIcon /> <span>{translationsNumber}</span>
         </div>
         )}
         { commentsNumber >= 0 && (
          <div className="py-0.5 flex gap-1 items-center">
            <CommentsIcon /> <span>{commentsNumber}</span>
          </div>
         )}
         { votesNumber >=0 && (
          <div className="py-0.5 pr-1 flex gap-1 items-center">
            <VotesIcon /> <span>{votesNumber}</span>
          </div>
        )}
        </div>
      )
    },
  },
]

{
  /* <TableCell className="flex gap-1 p-0 m-4 text-center justify-self-end">
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
      </TableCell> */
}

// export const columns: ColumnDef<Payment>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)

//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]
