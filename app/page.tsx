import Image from 'next/image'
import UserControls from '@/components/UserControl'
import UserTable from '@/components/UserTable'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <UserControls />
      <UserTable />
    </main>
  )
}
