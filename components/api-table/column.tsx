"use client";
import { ApiRequest } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type ApiProps = {
  id?: string;
  timestamp: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  usedApikey?: string;
  apiKeyId?: string;
};

export const columns: ColumnDef<ApiProps>[] = [
  {
    accessorKey: "apikey",
    header: "API key",
  },
  {
    accessorKey: "path",
    header: "Path",
  },
  {
    accessorKey: "recency",
    header: "Recency",
    cell: ({ row }) => {
      return <div>{row.getValue("recency")} ago</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return <div>{row.getValue("duration")} ms</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
