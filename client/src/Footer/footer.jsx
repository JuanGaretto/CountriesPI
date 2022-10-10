import React from 'react';
import './footer.css';
import { SiLinkedin } from 'react-icons/si';

export default function Footer(){
     return(
          <div className= "footer">
               <div className="container">
                    <div className="footerInfo">
                         <p>Proyecto API <span>Countries</span></p>
                         <p>Garetto Juan Cruz - Henry</p>
                    </div>
                    <div className="footerLink">                     
                         <a href="https://www.linkedin.com/in/juan-cruz-garetto-821399a6/">
                              <SiLinkedin/>
                         </a>
                    </div>
               </div>
          </div>
     )
};