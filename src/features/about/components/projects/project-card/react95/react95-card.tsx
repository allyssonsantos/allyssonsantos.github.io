import { ThemeProvider, Modal, Frame, List, Cursor } from '@react95/core';
import localFont from '@next/font/local';
import { Mailnews13 } from '@react95/icons';
import { cva } from 'class-variance-authority';
import styled from 'styled-components';

import { react95Card } from '../../../../data/projects';

import styles from './react95-card.module.css';
import React from 'react';

const msSansSerif = localFont({
  src: [
    {
      path: '../../../../../../../node_modules/@react95/core/cjs/GlobalStyle/font/MS-Sans-Serif.woff2',
      weight: '400',
    },
  ],
  variable: '--font-ms-sans-serif',
});

const CursorAuto = styled.div`
  ${Cursor.Auto};

  button {
    ${Cursor.Pointer};
  }

  p {
    ${Cursor.Text};
  }
`;

const react95CardStyles = cva(styles.react95);

function openRepository() {
  window.open(react95Card.githubUrl);
}

function openDocumentation() {
  window.open(react95Card.website);
}

export function React95Card({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ThemeProvider>
      <div
        className={`${msSansSerif.className} ${react95CardStyles({
          className,
        })}`}
      >
        <CursorAuto>
          <Modal
            icon={<Mailnews13 variant="32x32_4" />}
            title={react95Card.name}
            closeModal={() => {}}
            defaultPosition={{
              x: 0,
              y: 20,
            }}
            buttons={[
              { value: 'Repo', onClick: openRepository },
              { value: 'Docs', onClick: openDocumentation },
            ]}
            menu={[
              {
                name: 'File',
                list: (
                  <List>
                    <List.Item onClick={openRepository}>Repository</List.Item>
                    <List.Item onClick={openDocumentation}>
                      Documentation
                    </List.Item>
                  </List>
                ),
              },
            ]}
          >
            <Frame bg="white" boxShadow="in" h="100%" padding="0px 5px">
              <p>{react95Card.description}</p>
            </Frame>
          </Modal>
        </CursorAuto>
      </div>
    </ThemeProvider>
  );
}
