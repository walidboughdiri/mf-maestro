export default async function appManifestFetcher(manifestUrl) {
  const response = await fetch(manifestUrl);
  if (!response.ok) {
    switch (response.status) {
      case 404:
        return {
          error: response.statusText,
          errorDetail: `Unable to load the manifest file for '${manifestUrl}' (404)`,
          response
        };
    }
  }
  const data = await response.json();
  return data;
}
