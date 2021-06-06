import fs from 'fs';

const getPathsObject = () => {
    const fileObj = {};

    const walkSync = (dir) => {
        // Get all files of the current directory & iterate over them
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            // Construct whole file-path & retrieve file's stats
            const filePath = `${dir}${file}`;
            const fileStat = fs.statSync(filePath);

            if (fileStat.isDirectory()) {
                // Recurse one folder deeper
                walkSync(`${filePath}/`);
            } else {
                // Construct this file's pathname excluding the "pages" folder & its extension
                let cleanFileName = `/${filePath
                    .substr(0, filePath.lastIndexOf('.'))
                    .replace('pages/', '')}`;

                // Chop off any trailing "/index" from path
                if (cleanFileName.endsWith('/index')) {
                    cleanFileName = cleanFileName.substr(
                        0,
                        cleanFileName.lastIndexOf('/index')
                    );
                } else if (cleanFileName === '/index') cleanFileName = '';

                // Don't add Next.js reserved files to sitemap
                if (
                    cleanFileName.endsWith('_app') ||
                    cleanFileName.endsWith('_document')
                )
                    return;

                // Add this file to `fileObj`
                fileObj[cleanFileName] = {
                    page: cleanFileName,
                    lastModified: fileStat.mtime,
                };
            }
        });
    };

    // Start recursion to fill `fileObj`
    walkSync('pages/');

    return fileObj;
};

export default getPathsObject;
