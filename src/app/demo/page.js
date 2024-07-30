import { Payment, columns } from '@/components/leaderboard/columns'
import { DataTable } from '@/components/leaderboard/data-table'

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      name: 'Lukasim',
      translations: 43,
      comments: 40,
      votes: 57,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '728ed22f',
      name: 'Joshua',
      amount: 100,
      comments: 0,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '728ef52f',
      name: 'Lukasim',
      translations: 43,
      comments: 40,
      votes: 57,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '728ef22f',
      name: 'Joshua',
      amount: 100,
      comments: 1,
      votes: 52,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '721ed52f',
      name: 'Lukasim',
      translations: 43,
      comments: 40,
      votes: 57,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '722ed22f',
      name: 'Joshua',
      amount: 100,
      comments: 0,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '721ed52f',
      name: 'Lukasim',
      translations: 43,
      comments: 40,
      votes: 57,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '725ed22f',
      name: 'Joshua',
      amount: 100,
      comments: 0,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '725ed2sdfsd',
      name: 'Joshua',
      amount: 100,
      comments: 0,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '725efsdfdsd22f',
      name: 'Joshua',
      amount: 100,
      comments: 0,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    {
      id: '725efsdfsdfdsd22f',
      name: 'Joshua',
      amount: 100,
      comments: 0,
      status: 'pending',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="max-w-screen-sm mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
