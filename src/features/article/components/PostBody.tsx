import { useMDXComponent } from 'next-contentlayer/hooks';
import { CodeEditor, GoToFile } from 'src/components/code-editor/code-editor';

export function PostBody({ code }: { code: string }) {
  const Body = useMDXComponent(code);

  return (
    <Body
      components={{
        CodeEditor,
        GoToFile,
      }}
    />
  );
}
