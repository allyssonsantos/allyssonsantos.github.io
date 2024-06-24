import { useMDXComponent } from 'next-contentlayer2/hooks';
import { CodeEditor, GoToFile } from 'src/components/code-editor/code-editor';

export function PostBody({ code }: Readonly<{ code: string }>) {
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
