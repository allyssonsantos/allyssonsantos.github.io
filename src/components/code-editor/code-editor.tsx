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
  const editorPrimaryColor = '#00fdfd';

  return (
    <SandpackProvider
      customSetup={customSetup}
      options={{ visibleFiles, activeFile }}
      {...props}
      theme={{
        ...cobalt2,
        colors: {
          ...cobalt2.colors,
          accent: editorPrimaryColor,
        },
        syntax: {
          ...cobalt2.syntax,
          keyword: editorPrimaryColor,
          property: editorPrimaryColor,
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
  );
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
