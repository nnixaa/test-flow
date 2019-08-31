import { Injectable } from '@angular/core';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class DownloadService {

  download(fileList: { fileName: string, content: string }[]) {
    const zip = new JSZip();
    for (const file of fileList) {
      zip.file(file.fileName, file.content);
    }
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        // see FileSaver.js
        saveAs(content, 'e2e.zip');
      });
  }

}
