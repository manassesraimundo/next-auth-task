import type { Metadata } from 'next'

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

import NextSessionProvider from '@/provider/session-provider';
import SideBar from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'My tasks',
}

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions)

  return (
    <NextSessionProvider session={session}>
      <div className='container-layout'>
        <div className='container-sidebar-layout' id='menu'>
          <SideBar />
        </div>

        <div className='contaste-children'>
          {children}
        </div>
      </div>
    </NextSessionProvider>
  )
}
