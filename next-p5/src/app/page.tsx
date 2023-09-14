"use client";

import { useState } from "react";

import Layout from '@/component/layout/layout';
import Background from '@/component/background/bg';
import Cursor from '@/component/cursor/cursor';

import Title from '@/component/title/title';
import Bio from '@/component/bio/bio';

function Home() {
  const [cursor, setCursor] = useState('');

  return (
    <main> 
      <Cursor cursor={cursor}/>
      <Layout>
          <Title setCursor={setCursor}/> 
          <Bio setCursor={setCursor}/> 
      </Layout>

      <div className="bg">
        <Background/>     
      </div>  
    </main>
  )
}

export default Home;