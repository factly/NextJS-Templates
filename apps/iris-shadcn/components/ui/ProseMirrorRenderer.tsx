"use client";
import React, { useEffect, useRef } from "react";
import { DOMParser as PMDOMParser, Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { schema as basicSchema } from "prosemirror-schema-basic";
import DOMPurify from "dompurify";
import "prosemirror-view/style/prosemirror.css";

interface ProseMirrorRendererProps {
  content: string;
}

const customSchema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    },
    text: basicSchema.spec.nodes.get("text"),
    paragraph: basicSchema.spec.nodes.get("paragraph"),
    blockquote: {
      content: "block+",
      group: "block",
      defining: true,
      parseDOM: [{ tag: "blockquote" }],
      toDOM: () => ["blockquote", 0],
    },
    image: {
      inline: true,
      attrs: {
        src: {},
        alt: { default: null },
      },
      group: "inline",
      draggable: true,
      parseDOM: [
        {
          tag: "img[src]",
          getAttrs: (dom: HTMLElement) => ({
            src: dom.getAttribute("src"),
            alt: dom.getAttribute("alt"),
          }),
        },
      ],
      toDOM: (node) => ["img", node.attrs],
    },
    ...basicSchema.spec.nodes,
  },
  marks: basicSchema.spec.marks,
});


const ProseMirrorRenderer = ({ content }: ProseMirrorRendererProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Sanitize and parse HTML
      const sanitizedHTML = DOMPurify.sanitize(content);
      const dom = document.createElement("div");
      dom.innerHTML = sanitizedHTML;

      let doc;
      try {
        doc = PMDOMParser.fromSchema(customSchema).parse(dom);
      } catch (error) {
        console.error("Error parsing content:", error);
        return;
      }

      // Initialize EditorState
      const state = EditorState.create({
        doc,
      });

      // Initialize EditorView
      editorViewRef.current = new EditorView(editorRef.current, {
        state,
        editable: () => false, // Read-only mode
      });

      return () => {
        if (editorViewRef.current) {
          editorViewRef.current.destroy();
        }
      };
    }
  }, [content]);


  return (
    <div
      ref={editorRef}
      style={{
        // border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    />
  );
};

export default ProseMirrorRenderer;
