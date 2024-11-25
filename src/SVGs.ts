export class SVGs {
    // Union Jack SVG
    public static readonly UnionJack: string = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="60" height="30">
        <clipPath id="t">
          <path d="M30,15 v-15 h10 v15 h20 v10 h-20 v15 h-10 v-15 h-20 v-10 z"/>
        </clipPath>
        <g clip-path="url(#t)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" stroke-width="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#FFF" stroke-width="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
        </g>
      </svg>
    `;
  
    // Stars and Stripes SVG
    public static readonly StarsAndStripes: string = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1235 650" width="1235" height="650">
        <rect width="1235" height="650" fill="#b22234"/>
        <path d="M0,72.73h1235v72.73H0zm0,145.45h1235v72.73H0zm0,145.45h1235v72.73H0zm0,145.45h1235v72.73H0zm0,145.45h1235v72.73H0z" fill="#fff"/>
        <rect width="494" height="350" fill="#3c3b6e"/>
        <g fill="#fff">
          <g id="s18">
            <g id="s9">
              <g id="s5">
                <g id="s4">
                  <path id="s" d="M55,0l16.94,52.1h54.77l-44.32,32.2L82.32,136.3,55,104.1,27.68,136.3,37.61,84.3l-44.32-32.2H38.06Z"/>
                  <use xlink:href="#s" y="70"/>
                  <use xlink:href="#s" y="140"/>
                  <use xlink:href="#s" y="210"/>
                </g>
                <use xlink:href="#s" y="280"/>
              </g>
              <use xlink:href="#s4" x="74"/>
            </g>
            <use xlink:href="#s9" x="148"/>
          </g>
          <use xlink:href="#s18" x="296"/>
          <use xlink:href="#s18" x="592"/>
          <use xlink:href="#s18" x="888"/>
        </g>
      </svg>
    `;

    // Bluesky Img SVG
    public static readonly BlueSkyImg: string = `<svg fill="none" viewBox="0 0 24 24" width="24" height="24"><path fill="hsl(211, 99%, 56%)" fill-rule="evenodd" clip-rule="evenodd" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm2 1v7.213l1.246-.932.044-.03a3 3 0 0 1 3.863.454c1.468 1.58 2.941 2.749 4.847 2.749 1.703 0 2.855-.555 4-1.618V5H5Zm14 10.357c-1.112.697-2.386 1.097-4 1.097-2.81 0-4.796-1.755-6.313-3.388a1 1 0 0 0-1.269-.164L5 14.712V19h14v-3.643ZM15 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"></path></svg>`;
    
    // Bluesky Video SVG
    public static readonly BlueSkyVid: string = `<svg fill="none" viewBox="0 0 24 24" width="24" height="24"><path fill="hsl(211, 99%, 56%)" fill-rule="evenodd" clip-rule="evenodd" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm2 1v2h2V5H5Zm4 0v6h6V5H9Zm8 0v2h2V5h-2Zm2 4h-2v2h2V9Zm0 4h-2v2.444h2V13Zm0 4.444h-2V19h2v-1.556ZM15 19v-6H9v6h6Zm-8 0v-2H5v2h2Zm-2-4h2v-2H5v2Zm0-4h2V9H5v2Z"></path></svg>`;
    
    // Bluesky External SVG
    public static readonly BlueSkyExternal: string = `<svg fill="none" width="28" viewBox="0 0 24 24" height="28" style="color: rgb(241, 243, 245);"><path fill="hsl(211, 99%, 56%)" fill-rule="evenodd" clip-rule="evenodd" d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11c0 .889-.386 1.687-1 2.236V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1.764c-.614-.55-1-1.348-1-2.236V5Zm3 14v1h10v-1H7ZM7 4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7Zm0 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V6Zm2 1v4h6V7H9Zm4 8a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"></path></svg>`;
    
    // Bluesky Record SVG
    public static readonly BlueSkyRecord: string = `<svg fill="none" width="28" viewBox="0 0 24 24" height="28" style="color: rgb(241, 243, 245);"><path fill="hsl(211, 99%, 56%)" fill-rule="evenodd" clip-rule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM5 18v-6h14v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Zm0-8h14V6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4Zm6-3.5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6ZM7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path></svg>`;
    
    // Bluesky Butterfly SVG
    public static readonly BlueSkyButterfly: string = `<svg fill="none" viewBox="0 0 64 57" width="28" style="width: 28px; height: 24.9375px;"><path fill="#0085ff" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>`;
    
    // Bluesky Help SVG
    public static readonly BlueSkyHelp: string = `<svg fill="none" width="28" viewBox="0 0 24 24" height="28" style="color: rgb(241, 243, 245);"><path fill="hsl(211, 99%, 56%)" fill-rule="evenodd" clip-rule="evenodd" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z M12 9a1 1 0 0 0-.879.522 1 1 0 0 1-1.754-.96A3 3 0 0 1 12 7c1.515 0 2.567 1.006 2.866 2.189.302 1.189-.156 2.574-1.524 3.258A.62.62 0 0 0 13 13a1 1 0 1 1-2 0c0-.992.56-1.898 1.447-2.342.455-.227.572-.618.48-.978C12.836 9.314 12.529 9 12 9Z M13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`;
  
  }
  