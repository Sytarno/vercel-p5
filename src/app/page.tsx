"use client"

import { CursorProvider } from '@/component/cursor/cursorContext';

import Layout from '@/component/layout/layout';
import Background from '@/component/background/bg';
import Cursor from '@/component/cursor/cursor';
import Scroll from '@/component/scroll/scroll';

import Title from '@/component/title/title';
import Bio from '@/component/bio/bio';
import Display from "@/component/display/display";
import Skills from '@/component/skills/skills';

import { Md } from '@/component/interface';
import { useEffect, useState } from 'react';

//const Display = dynamic(() => import("@/component/display/display"), {
//  ssr: false,
//})

const Page = () => {
  //const [cursor, setCursor] = useState('');
  //const [iconPos, setIconPos] = useState({x: 0, y: 0});
  
  const [projects, setProjects] = useState<Md[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        //await new Promise(resolve => setTimeout(resolve, 3000)) //for testing
        const response = await fetch(`/api/getMeta`);
        const data: Md[] = await response.json();
        setProjects(data);
        setLoading(false);

      } catch (error) {
        console.error("Error accessing md frontmatter:", error);
        setLoading(false);
        return [];  
      }
    }

    fetchData();
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Mobile/;

    setIsMobile(mobileRegex.test(userAgent));
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return(
      <main> 
      { isMobile ?
      
      <main> 
      <Layout>
        <div>
          <Title/> 
          <Bio/>
          <Skills projects = { projects } setQuery = { setQuery }/>
        </div>
        <Display projects = { projects } query = { query }/>
      </Layout>
      <Background/>   
      </main>   
      :

      <CursorProvider>
        <Cursor/>
        <Scroll projects = { projects }/>

        <Layout>
            <div>
                <Title/> 
                <Bio/>
                <Skills projects = { projects } setQuery = { setQuery }/>
            </div>
              <Display projects = { projects } query = { query }/>
        </Layout>
    

        <Background/>     
      </CursorProvider>
      }
      </main>
  )
}

export default Page;