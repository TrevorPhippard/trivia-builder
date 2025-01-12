import fs from "fs";

function timeStampFile(originalFileName: string) {
    const fileName = originalFileName.split(".");
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    return `${fileName[0]}_${timestamp}.${fileName[1]}`;
}

function uploaderService(
    uploadFile: any,
    destination: string,
    cb: (result: any) => any
) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    const timeStampName = timeStampFile(uploadFile.name);
    const finalPath = `${destination}/${timeStampName}`;
    // const finalPath = __dirname + '/uploads/' + sampleFile.name;

    uploadFile.mv(finalPath, function (err: any) {
        if (err) {
            cb({ error: err });
        } else {
            cb({ timeStampName, finalPath });
        }
    });
}

export default uploaderService;
