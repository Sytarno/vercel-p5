import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { Md } from '@/component/interface';
import matter from 'gray-matter';
import path from 'path';

async function getMeta(req: NextApiRequest, res: NextApiResponse){
  try {
    //const fd = "src/proj/";
    const fd = path.join(process.cwd(), `src`, `proj`);
    const fi = await fs.readdir(fd);
    const mdf = fi.filter((file) => file.endsWith(".md"));
    const slugs = mdf.map((file) => file.replace(".md", ""));
    
    const projects: Md[] = await Promise.all(
        slugs.map(async (slug) => {
            const content = await fs.readFile(`src/proj/${slug}.md`, 'utf-8');
            const { data } = matter(content);
            return data as Md;
        })
    );
    
    res.status(200).json(projects);

  } catch (error) {

    console.error('Error reading files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getMeta;