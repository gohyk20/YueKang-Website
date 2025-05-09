

import FlowerDiv from '@/app/ui/flowerDiv';
import Topnav from '@/app/ui/topnav';
import {getFiles} from '@/app/lib/files';


export default async function Page() {
  const files = await getFiles();
  return (
    <FlowerDiv>
      <Topnav files={files}/>
    </FlowerDiv>
  );
}
