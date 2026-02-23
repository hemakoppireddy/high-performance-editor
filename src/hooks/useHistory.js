import { useState } from "react";

export default function useHistory(initialValue = "") {
  const [content, setContent] = useState(initialValue);
  const [undoStack, setUndoStack] = useState([initialValue]);
  const [redoStack, setRedoStack] = useState([]);

  const updateContent = (newValue) => {
    setUndoStack((prev) => [...prev, newValue]);
    setRedoStack([]);
    setContent(newValue);
  };

  const undo = () => {
    setUndoStack((prev) => {
      if (prev.length <= 1) return prev;

      const newStack = [...prev];
      const last = newStack.pop();

      setRedoStack((r) => [...r, last]);
      setContent(newStack[newStack.length - 1]);

      return newStack;
    });
  };

  const redo = () => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;

      const newRedo = [...prev];
      const last = newRedo.pop();

      setUndoStack((u) => [...u, last]);
      setContent(last);

      return newRedo;
    });
  };

  return {
    content,
    updateContent,
    undo,
    redo,
    undoStack,
  };
}