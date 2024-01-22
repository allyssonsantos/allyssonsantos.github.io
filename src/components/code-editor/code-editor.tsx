import { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole,
  SandpackLayout,
  type SandpackProviderProps,
} from '@codesandbox/sandpack-react';
import { cobalt2 } from '@codesandbox/sandpack-themes';

type CodeEditorProps = {
  showConsole?: boolean;
  showFileExplorer?: boolean;
  visibleFiles?: string[];
} & SandpackProviderProps;

export function CodeEditor({
  showConsole,
  showFileExplorer,
  visibleFiles,
  template = 'react',
  ...props
}: CodeEditorProps) {
  const [primaryColor, setPrimaryColor] = useState<string>();

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      '--primary-200',
    );

    setPrimaryColor(color);
  }, []);

  return primaryColor ? (
    <SandpackProvider
      options={{ visibleFiles }}
      {...props}
      theme={{
        ...cobalt2,
        colors: {
          ...cobalt2.colors,
          accent: primaryColor,
        },
        syntax: {
          ...cobalt2.syntax,
          keyword: primaryColor,
          property: primaryColor,
        },
        font: {
          size: '14px',
        },
      }}
      template={template}
    >
      <SandpackCodeEditor showTabs closableTabs />
      <SandpackLayout>
        <SandpackPreview showOpenInCodeSandbox={false} />
        {showFileExplorer && <SandpackFileExplorer />}
        {showConsole && <SandpackConsole />}
      </SandpackLayout>
    </SandpackProvider>
  ) : null;
}
