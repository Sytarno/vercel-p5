"use client";

import { useState } from "react";

import Background from '@/component/background/bg'
import Cursor from '@/component/cursor/cursor'

import Title from '@/component/title/title'


function Home() {
  const [cursor, setCursor] = useState('');

  return (
    <main> 
      <Cursor cursor={cursor}/>
      <div className="layout">
        <div className="flex-column">
          <Title setCursor={setCursor}/> 
        </div>
      </div>

      <div className="bg">
        <Background/>     
      </div>  
    </main>
  )
}

export default Home;