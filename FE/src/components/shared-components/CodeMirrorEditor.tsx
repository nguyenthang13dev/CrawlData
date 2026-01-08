import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, basicSetup } from 'codemirror';
import React, { useEffect, useRef } from 'react';

interface CodeMirrorEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  value = '',
  onChange,
  placeholder = '',
  height = '200px',
  theme = 'light',
  readOnly = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      basicSetup,
      html(),
      EditorView.theme({
        '&': {
          height: height,
        },
        '.cm-content': {
          padding: '10px',
          minHeight: height,
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-editor': {
          fontSize: '14px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
        },
        '.cm-editor.cm-focused': {
          borderColor: '#1890ff',
          boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
        },
      }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onChange) {
          const newValue = update.state.doc.toString();
          onChange(newValue);
        }
      }),
    ];

    if (theme === 'dark') {
      extensions.push(oneDark);
    }

    if (readOnly) {
      extensions.push(EditorView.editable.of(false));
    }

    const view = new EditorView({
      doc: value,
      extensions,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, theme, readOnly]);

  useEffect(() => {
    if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value]);

  return <div ref={editorRef} style={{ border: 'none' }} />;
};

export default CodeMirrorEditor;
