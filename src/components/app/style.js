import styled, { injectGlobal } from "react-emotion/macro";

export const global = ({
  theme: {
    typography: { primary }
  }
}) => injectGlobal`
  label: global;

  @font-face {
    font-display: fallback;
    font-family: 'FontAwesome';
    font-weight: normal;
    font-style: normal;
    src: url('/assets/font/font-awesome/font-awesome.eot');
    src: url('/assets/font/font-awesome/font-awesome.eot?#iefix') format('embedded-opentype'), url('/assets/font/font-awesome/font-awesome.woff2') format('woff2'), url('/assets/font/font-awesome/font-awesome.woff') format('woff'), url('/assets/font/font-awesome/font-awesome.ttf') format('truetype'), url('/assets/font/font-awesome/font-awesome.svg#font-awesome') format('svg');
  }

  @font-face {
    font-family: 'icomoon';
    font-display: fallback;
    font-style: normal;
    font-weight: normal;
    src:  url('/assets/font/icomoon/icomoon.eot');
    src:  url('/assets/font/icomoon/icomoon.eot#iefix') format('embedded-opentype'), url('/assets/font/icomoon/icomoon.ttf') format('truetype'), url('/assets/font/icomoon/icomoon.woff') format('woff'), url('/assets/font/icomoon/icomoon.svg#icomoon') format('svg');
  }

  * {
    box-sizing: border-box;
  }

  html {
    background-color: #fff;
  }

  body {
    font-family: ${primary};
    font-size: 16px;
  }
`;

export default component => styled(component)`
  label: app;

  ${props => global(props)};
`;
