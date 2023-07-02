import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole,
  SandpackLayout,
} from '@codesandbox/sandpack-react';
import { cobalt2 } from '@codesandbox/sandpack-themes';

type CodeEditorProps = {
  showFileExplorer?: boolean;
  visibleFiles?: string[];
};

export function CodeEditor({
  showFileExplorer,
  visibleFiles,
}: CodeEditorProps) {
  return (
    <SandpackProvider
      options={{ visibleFiles }}
      theme={{
        ...cobalt2,
        colors: {
          ...cobalt2.colors,
          accent: '#00c7c7',
        },
        syntax: {
          ...cobalt2.syntax,
          keyword: '#00c7c7',
          property: '#00c7c7',
        },
        font: {
          size: '14px',
        },
      }}
      template="vanilla"
    >
      <SandpackCodeEditor showTabs />
      <SandpackLayout>
        <SandpackPreview showOpenInCodeSandbox={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
