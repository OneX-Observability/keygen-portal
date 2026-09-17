import config from "@/keygen/config"
import client from "@/keygen/client"
import { ArtifactResponse } from "@/types/artifacts"

config.validate()

interface GetProps {
  id: string
  /** When true, Keygen mints data.links.redirect. Page loads must omit this. */
  forDownload?: boolean
}

export default async function get({
  id,
  forDownload = false,
}: GetProps): Promise<ArtifactResponse> {
  const result = (await client.request(
    `/accounts/${config.id}/artifacts/${id}`,
    {
      method: "GET",
      headers: {
        // no-download skips the presigned URL so the details page can load.
        // no-redirect alone returns JSON with links.redirect instead of a 303.
        Prefer: forDownload ? "no-redirect" : "no-redirect, no-download",
      },
    },
  )) as ArtifactResponse

  return result
}
