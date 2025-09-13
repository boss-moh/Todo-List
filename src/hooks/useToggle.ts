"use client";
import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  return { isOpen, toggle, close, open };
};
