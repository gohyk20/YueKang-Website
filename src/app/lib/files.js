import fs from 'fs/promises';
import path from 'path';

export async function getFiles(){
    const filepath = path.join(process.cwd(), 'public/content');
    const files = await fs.readdir(filepath);
    console.log(files);
    return files;
}