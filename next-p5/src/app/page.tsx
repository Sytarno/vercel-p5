import Background from '@/component/background/bg'
import Cursor from '@/component/cursor/cursor'

import Title from '@/component/title/title'

function Home() {
  return (
    <main> 
    
      <div className="layout">
        <div className="flex-column">
          <Title/> 
        </div>
      </div>

      <div className="bg">
        <Background/>     
      </div>  
      <Cursor/>
    </main>
  )
}

export default Home;