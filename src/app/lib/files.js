import fs from 'fs/promises';

export async function getFiles(){
    const files = await fs.readdir('./src/app/content');
    console.log(files);
    return files;
}