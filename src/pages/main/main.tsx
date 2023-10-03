"use client"

import { useState } from "react";

import Layout from '@/component/layout/layout';
import Background from '@/component/background/bg';
import Cursor from '@/component/cursor/cursor';
import Scroll from '@/component/scroll/scroll';

import Title from '@/component/title/title';
import Bio from '@/component/bio/bio';
import Display from "@/component/display/display";

const Portfolio = ({projects = []}: any) =>{
    const [cursor, setCursor] = useState('');
    //const [iconPos, setIconPos] = useState({x: 0, y: 0});
    
    return(
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

//import fs from "fs";
import fs from "fs/promises";

async function getMeta() {
  try{
  
    const fd = "src/proj/";
    const fi = await fs.readdir(fd);
    const mdf = fi.filter( (file) => file.endsWith(".md") );
    const slugs = mdf.map( (file) => file.replace(".md", "") );
    return slugs;
  
  } catch (error) {
  
    console.error("Error reading files:", error);
    return [];
  
  }
}

import matter from "gray-matter";
import { Md } from "../../component/interface";

export async function getStaticProps() {
//export const getServerSideProps: GetServerSideProps = async () => {
  console.log("EXECUTING FETCH");
  
  const projects = await getMeta();
  let exports: Md[] = [];

  projects.forEach( (slug) => {
    exports.push(matter.read("src/proj/" + slug + ".md").data as Md);
  })

  return {
    props: { projects: exports },
    revalidate: false,
  }
}

export default Portfolio;