"use client";

import { useState } from "react";

import Layout from '@/component/layout/layout';
import Background from '@/component/background/bg';
import Cursor from '@/component/cursor/cursor';
import Scroll from '@/component/scroll/scroll';

import Title from '@/component/title/title';
import Bio from '@/component/bio/bio';
import Display from "@/component/display/display";

function Home({ projects }: any) {
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
          <Display projects={projects}/>
      </Layout>
  

      <Background/>     
    </main>
  )
}

import matter from "gray-matter";
//import fs from "fs";
import fs from "fs/promises";
import glob from "fast-glob";

const getMeta = async () => {
  console.log(process.cwd());
  try{
    const fd = "src/proj/";
    const fi = await fs.readdir(fd);
    const mdp = fi.filter( (file) => file.endsWith(".md") );
    const slugs = mdp.map( (file) => file.replace(".md", "") );
    return slugs;
  } catch (error) {
    console.error("Error reading files:", error);
    return [];
  }
}

export async function getStaticProps() {
  const projects = await getMeta();
  console.log("projects", projects);

  return {
    props: { projects: projects },
    revalidate: 1,
  }
}

export default Home;