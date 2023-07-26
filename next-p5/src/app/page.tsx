import dynamic from 'next/dynamic'
import Background from '@/component/background/bg'
import Cursor from '@/component/cursor/cursor'

function Home() {
  return (
    <main>
      <Cursor/>
      {<Background/>
      }
    </main>
  )
}

export default Home;