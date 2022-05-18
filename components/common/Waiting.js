import { useRef, useState } from 'react';
import MetaFox from '@metamask/logo';
import { useEffect } from 'react';

const Waiting = () => { 
  const metaFox = useRef(null);
  const metaFoxOn = useRef(false);

  useEffect(() => {
    if (window.document !== null && window.document !== undefined && !metaFoxOn.current) {
      metaFox.current = MetaFox({
        // Dictates whether width & height are px or multiplied
        pxNotRatio: true,
        width: 500,
        height: 400,
    
        // To make the face follow the mouse.
        followMouse: true,
      })

      const divMetaFox = document.getElementsByClassName('metafox')

      if (divMetaFox.length > 0) {
        divMetaFox[0].insertBefore(metaFox.current.container, divMetaFox[0].firstChild);
      }

      metaFoxOn.current = true;
    }

    return () => {
      delete metaFox.current;
    }
  }, []);

  return (
    <div className='metafox' style={{ alignContent: "center", justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100vw", height: "100vh" }}>
      <div style={{ width: "100%", textAlign: "center", fontSize: 32 }}>맛있는 커피를 끓이는 중...</div>
    </div>
  )
}

export default Waiting;
