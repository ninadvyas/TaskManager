import React from "react";
import Link from "next/link";
export default function Links() {
  return (
    <div className="flex items-center px-2 space-x-4">
      <Link href='/' className="text-sm font-medium transition-colors hover:text-primary">
        Task
      </Link>
      <Link href='/progress' className="text-sm text-gray-600 font-medium cursor-not-allowed	">
        Progress
      </Link>
    </div>
  );
}
