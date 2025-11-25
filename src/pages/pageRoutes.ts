import { Router,Request,Response } from "express";
import path from "path";
import fs from 'fs';

const router =Router();

router.get('/',(req:Request,res:Response)=>{
  const currentWorkingDirectory=process.cwd();
  const filePath=path.join(currentWorkingDirectory,'src/pages/index.html');
  try{
    const content=fs.readFileSync(filePath);
    res.status(200).type('html').send(content);

  }catch{
    res.status(500).send('<h1>Error loading page</h1>');
  }
});
router.get('/contact-us',(req:Request,res:Response)=>{
  const currentWorkingDirectory=process.cwd();
  const filePath=path.join(currentWorkingDirectory,'src/pages/contact.html');
  try{
    const content=fs.readFileSync(filePath);
    res.status(200).type('html').send(content);

  }catch{
    res.status(500).send('<h1>Error loading page</h1>');
  }
});

router.get('/about-us',(req:Request,res:Response)=>{
  
})
export default router;