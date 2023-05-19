import { ThemeProvider, Card, Text, Button } from '@gympass/yoga';

import { yogaCard } from '../../../../data/projects';

export function YogaCard({ ...props }) {
  return (
    <ThemeProvider>
      <Card {...props}>
        <Card.Header>
          <Text.H3 color="primary">{yogaCard.name}</Text.H3>
        </Card.Header>
        <Card.Content style={{ marginTop: 8 }}>
          <Text.Small>{yogaCard.description}</Text.Small>
        </Card.Content>
        <Card.Actions
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
            marginTop: 'auto',
          }}
        >
          <Button.Link small href={yogaCard.githubUrl}>
            repo
          </Button.Link>
          <Button.Link small href={yogaCard.website}>
            docs
          </Button.Link>
        </Card.Actions>
      </Card>
    </ThemeProvider>
  );
}
