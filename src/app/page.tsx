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

const LayoutObjects = ({ projects, setQuery, query, loading, setLogoPos}: any) => {
  return (
    <Layout>
        <div>
            <Title setLogoPos = { setLogoPos }/> 
            <Bio/>
            <Skills projects = { projects } setQuery = { setQuery }/>
        </div>
          <Display projects = { projects } query = { query } loading = { loading }/>
    </Layout>
  )
}

const Page = () => {
  //const [cursor, setCursor] = useState('');
  //const [iconPos, setIconPos] = useState({x: 0, y: 0});
  
  const [projects, setProjects] = useState<Md[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<string[]>([]);
  const [logoPos, setLogoPos] = useState<[number, number]>([-1, -1]);

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

      <LayoutObjects 
      projects = { projects } 
      query = {query} 
      setQuery = { setQuery } 
      loading = { loading }
      setLogoPos = { setLogoPos }
      />

      <Background logoPos = { logoPos }/>   
      </main>

      :

      <CursorProvider>
        <Cursor/>
        <Scroll projects = { projects }/>

        <LayoutObjects 
        projects = { projects }
        query = {query}  
        setQuery = { setQuery } 
        loading = { loading }
        setLogoPos = { setLogoPos }
        />
  
        <Background logoPos = { logoPos }/>     
      </CursorProvider>

      }

      </main>
  )
}

export default Page;