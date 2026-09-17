import { useState } from "react"

import * as keygen from "@/keygen"
import { toast } from "@/lib/toast"

export function useDownloadArtifact() {
  const [isDownloading, setIsDownloading] = useState(false)

  const download = async (id: string, existingUrl?: string | null) => {
    setIsDownloading(true)
    try {
      const url = existingUrl || (await keygen.artifacts.download({ id }))
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (error) {
      toast({
        message:
          error instanceof Error
            ? error.message
            : "Failed to download artifact",
        variant: "error",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return { download, isDownloading }
}
