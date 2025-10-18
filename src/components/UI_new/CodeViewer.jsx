import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeViewer({ code, language = 'bash' }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      customStyle={{
        borderRadius: '0.75rem',
        padding: '2rem',
        fontSize: '0.875rem',
        backgroundColor: '#282c34',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}