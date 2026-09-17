import { useMemo } from "react"

import { Badge } from "@/components/ui/badge"

import {
  Artifact,
  ArtifactStatusLabels,
  ArtifactStatusVariants,
} from "@/types/artifacts"

import { formatByteSize } from "@/lib/bytes"
import { createTableColumnHelper } from "@/lib/tables"

import * as Tables from "@/components/tables"
import { TimestampCell } from "@/components/timestamp"
import ClipboardButton from "@/components/clipboard-button"
import ArtifactDownloadButton from "@/components/artifacts/download-button"

const column = createTableColumnHelper<Artifact>()

export function useArtifactTableColumns() {
  const columns = useMemo(
    () => [
      column.id({
        header: "ID",
        cell: (info) => <ClipboardButton value={info.getValue()} />,
      }),
      column.attr("filename", {
        header: "Filename",
      }),
      column.attr("filetype", {
        header: "Filetype",
      }),
      column.attr("filesize", {
        header: "Filesize",
        cell: (info) => {
          const value = info.getValue()
          if (value == null) return <Tables.EmptyCell />
          return formatByteSize(value)
        },
      }),
      column.attr("platform", {
        header: "Platform",
      }),
      column.attr("arch", {
        header: "Arch",
      }),
      column.attr("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue()
          return (
            <Badge variant={ArtifactStatusVariants[status]}>
              {ArtifactStatusLabels[status]}
            </Badge>
          )
        },
      }),
      column.attr("created", {
        header: "Created",
        cell: (info) => <TimestampCell value={info.getValue()} />,
        sortingFn: "datetime",
      }),
      column.attr("updated", {
        header: "Updated",
        cell: (info) => <TimestampCell value={info.getValue()} />,
        sortingFn: "datetime",
      }),
      column.id({
        id: "download",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <ArtifactDownloadButton
            artifact={row.original}
            size="sm"
            variant="outline"
          />
        ),
      }),
    ],
    [],
  )

  return columns
}
