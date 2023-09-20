"use client";

import { useState } from "react";

import Layout from '@/component/layout/layout';
import Background from '@/component/background/bg';
import Cursor from '@/component/cursor/cursor';
import Scroll from '@/component/scroll/scroll';

import Title from '@/component/title/title';
import Bio from '@/component/bio/bio';
import Display from "@/component/display/display";

function Home() {
  const [cursor, setCursor] = useState('');
  const [iconPos, setIconPos] = useState({x: 0, y: 0});

  return (
    <main> 
      <Cursor cursor={cursor}/>
      <Scroll/>

      <Layout>
          <div>
            <Title setCursor={setCursor}/> 
            <Bio setCursor={setCursor}/>
          </div>
          <Display/>
      </Layout>
  

      <Background/>     
    </main>
  )
}

export default Home;