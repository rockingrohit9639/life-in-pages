import Sidebar from './sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className="md:ml-14">{children}</div>
    </div>
  )
}
