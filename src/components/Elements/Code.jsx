import React from 'react';
import { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { useDarkTheme } from '@utils/color-scheme';

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (i) => lineNumbers.includes(i + 1);
  }

  return () => false;
};

function Code({ codeString, language, 'react-live': reactLive, metastring }) {
  const { currentTheme } = useDarkTheme();
  const theme = useTheme();
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  if (reactLive) {
    return (
      <LiveProvider code={codeString} noInline>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
  return (
    <Highlight
      {...defaultProps}
      theme={currentTheme === 'dark' ? nightOwl : nightOwlLight}
      code={codeString}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, backgroundColor: theme.colors.neutral[100] }}
        >
          <code>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }

              return (
                <div {...lineProps}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
}

Code.propTypes = {
  codeString: PropTypes.string.isRequired,
  language: PropTypes.string,
  'react-live': PropTypes.bool,
  metastring: PropTypes.string,
};

Code.defaultProps = {
  language: 'javascript',
  'react-live': undefined,
  metastring: '',
};

export default Code;
