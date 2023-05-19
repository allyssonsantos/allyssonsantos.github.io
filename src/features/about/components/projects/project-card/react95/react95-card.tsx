import { ThemeProvider, Modal, Frame, List } from '@react95/core';
import { Mailnews13 } from '@react95/icons';
import { cva } from 'class-variance-authority';

import { react95Card } from '../../../../data/projects';

import styles from './react95-card.module.css';
import React from 'react';

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
      <div className={react95CardStyles({ className })}>
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
      </div>
    </ThemeProvider>
  );
}
