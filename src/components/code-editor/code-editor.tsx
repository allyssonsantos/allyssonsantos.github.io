import { PropsWithChildren, useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole,
  SandpackLayout,
  useSandpack,
  type SandpackProviderProps,
} from '@codesandbox/sandpack-react';
import { cobalt2 } from '@codesandbox/sandpack-themes';

type CodeEditorProps = {
  showTabs?: boolean;
  closableTabs?: boolean;
  showPreview?: boolean;
  showConsole?: boolean;
  showFileExplorer?: boolean;
  visibleFiles?: string[];
  activeFile?: string;
  startRoute?: string;
} & SandpackProviderProps;

export function CodeEditor({
  showTabs,
  closableTabs = true,
  showPreview = true,
  showConsole,
  showFileExplorer,
  visibleFiles,
  activeFile,
  customSetup,
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
      customSetup={customSetup}
      options={{ visibleFiles, activeFile }}
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
      <SandpackCodeEditor showTabs={showTabs} closableTabs={closableTabs} />
      <SandpackLayout>
        {showPreview && <SandpackPreview showOpenInCodeSandbox={false} />}
        {showFileExplorer && <SandpackFileExplorer autoHiddenFiles />}
        {showConsole && <SandpackConsole />}
      </SandpackLayout>
    </SandpackProvider>
  ) : null;
}

export function GoToFile({
  children,
  path,
}: PropsWithChildren<{ path: string }>) {
  const {
    sandpack: { openFile },
  } = useSandpack();

  return <button onClick={() => openFile(path)}>{children}</button>;
}
