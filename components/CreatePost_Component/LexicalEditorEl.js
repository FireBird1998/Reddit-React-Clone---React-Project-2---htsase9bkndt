import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListNode, ListItemNode } from '@lexical/list';
import * as React from "react";

import Theme from "./TextEditor/Theme";
import ToolbarPlugin from "./TextEditor/plugins/ToolbarPlugin";
import TreeViewPlugin from "./TextEditor/plugins/TreeViewPlugin";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

function Placeholder() {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        color:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.5)",
      }}
      className="editor-placeholder"
    >
      Enter some rich text...
    </Typography>
  );
}

const editorConfig = {
  namespace: "create-post-editor",
  nodes: [ListNode, ListItemNode],
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  theme: Theme,
};

const LexicalEditorEl = () => {
  const theme = useTheme();

  const editorContainerStyles = {
    margin: "20px auto",
    borderRadius: "2px",
    maxWidth: "600px",
    color: theme.palette.text.primary,
    position: "relative",
    lineHeight: "20px",
    fontWeight: 400,
    textAlign: "left",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
  };
  const editorInnerStyles = {
    background: theme.palette.background.paper,
    position: "relative",
  };
  const editorInputStyles = {
    minHeight: "150px",
    resize: "none",
    fontSize: "15px",
    caretColor: "rgb(5, 5, 5)",
    position: "relative",
    tabSize: 1,
    outline: 0,
    padding: "15px 10px",
    caretColor: "#444",
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Box sx={editorContainerStyles}>
        <ToolbarPlugin />
        <Box sx={editorInnerStyles}>
          <RichTextPlugin
            contentEditable={<ContentEditable style={editorInputStyles} />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <TreeViewPlugin /> */}
        </Box>
      </Box>
    </LexicalComposer>
  );
};

export default LexicalEditorEl;
