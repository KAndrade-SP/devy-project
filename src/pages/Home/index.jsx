import { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar/Navbar';

export function Home() {

    useEffect(() => {
        const scriptIonic = document.createElement('script');
        const scriptIonicNoModule = document.createElement('script');

        scriptIonic.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
        scriptIonic.type = "module";
        scriptIonic.async = true;

        scriptIonicNoModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
        scriptIonicNoModule.noModule = true;
        scriptIonicNoModule.async = true;
      
        document.body.appendChild(scriptIonic);
        document.body.appendChild(scriptIonicNoModule);
      
        return () => {
          document.body.removeChild(scriptIonic);
          document.body.removeChild(scriptIonicNoModule);
        }
    }, []);

    return (
        <div>
            <Navbar></Navbar>
        </div>
    )
}