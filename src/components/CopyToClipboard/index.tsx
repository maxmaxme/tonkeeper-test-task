import React from 'react';
import styles from './index.css';

type Props = {
  text: string;
  children: React.ReactNode;
}

export const CopyToClipboard = ({ text, children }: Props) => {
  const [copied, setCopied] = React.useState(false);
  const onClick = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <>
      {copied && (<div className={styles.copiedLabel}>Copied!</div>)}
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
    </>
  );
};
