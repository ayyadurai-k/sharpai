import React from "react";

export function Table({ children }) {
  return <table className="w-full border-collapse">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-200">{children}</thead>;
}

export function TableHead({ children }) {
  return (
    <th className="px-4 py-2 text-left text-gray-700 font-medium">{children}</th>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2">{children}</td>;
}
