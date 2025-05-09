import fs from 'fs/promises';

export async function getFiles(){
    const files = await fs.readdir('/content');
    console.log(files);
    return files;
}