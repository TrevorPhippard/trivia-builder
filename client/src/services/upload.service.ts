const baseEndPoint = import.meta.env.VITE_API_ENDPOINT
const fileEndpoint = baseEndPoint + "upload";
const uploadDataEndpoint = baseEndPoint + "resources";
const headers = { "content-type": "application/json" }

const UploadFilesService = {
  upload: (formData: any, cb: any) => {
    return fetch(fileEndpoint, { method: "POST", body: formData })
      .then(async response => await response.text())
      .then(response => {
        const { timeStampName } = JSON.parse(response);
        UploadFilesService.postUpload(timeStampName, cb)
      })
      .catch(error => console.error(error))
  },

  postUpload: (filename: string, cb: any) => {
    return fetch(uploadDataEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filename: filename
      })
    })
      .then(async response => await response.text())
      .then(data => cb(data))
      .catch(error => console.error(error))
  },

  getFiles: async (id: string, cb: any) => {
    return fetch(uploadDataEndpoint + `/${id}`, {
      method: "GET",
      headers,
    })
      .then(async response => await response.text())
      .then(data => cb(data))
      .catch(error => console.error(error))
  }
}

export default UploadFilesService;


