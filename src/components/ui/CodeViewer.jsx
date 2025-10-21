import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeViewer({ code, language = 'bash' }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
        wrapLines={true}
  lineProps={{ style: { wordBreak: 'break-word' } }}

    customStyle={{
    borderRadius: '2rem',
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    fontSize: '0.8rem',
    backgroundColor: '#282c34',
    whiteSpace: 'pre-wrap',
  }}

    >
      {code}
    </SyntaxHighlighter>
  );
}