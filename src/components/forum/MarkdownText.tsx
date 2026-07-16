import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
};

export default function MarkdownText({ content }: Props) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        allowedElements={[
          "p",
          "br",
          "strong",
          "em",
          "del",
          "u",
          "blockquote",
          "ul",
          "ol",
          "li",
          "a",
          "code",
          "pre",
        ]}
        components={{
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
          u: ({ children }) => <u>{children}</u>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}