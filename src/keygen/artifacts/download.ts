import { APIError } from "@/types/api"

import get from "./get"

interface DownloadProps {
  id: string
}

export default async function download({ id }: DownloadProps): Promise<string> {
  const result = await get({ id, forDownload: true })

  if (result.errors?.[0]) {
    throw new APIError(result.errors[0])
  }

  const url = result.data?.links?.redirect
  if (!url) {
    throw new Error(
      "Keygen did not return a download URL. Confirm the artifact is uploaded and the release is not yanked.",
    )
  }

  return url
}
