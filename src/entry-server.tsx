import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from '@src/App';

export const render = (url: string) => {
  const sheet = new ServerStyleSheet();
  try {
    const appHtml = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <React.StrictMode>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </React.StrictMode>,
      ),
    );
    const styleTags = sheet.getStyleTags();
    return {
      appHtml,
      styleTags,
    };
  } catch (error) {
    console.log(error);
  }
};
