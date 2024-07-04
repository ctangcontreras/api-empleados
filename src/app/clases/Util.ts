import { ErrorHandler } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';


export class Util {


    constructor() { }
    public static clonar(objeto: any): any {
        const r: any = {};
        for (const prop in objeto) {
            if (objeto[prop] != null && objeto[prop] instanceof Array) {
                r[prop] = this.clonar_lista(objeto[prop]);
            } else {
                r[prop] = objeto[prop];
            }
            // r[prop] = this.clonar(objeto[prop]);
        }
        return r;
    }

    public static clonar_lista(lista: any): any {
        const r: any = [];
        lista.forEach((element: any) => {
            const re = this.clonar(element);
            r.push(re);
        });
        return r;
    }

   



    public static _base64ToArrayBuffer(base64: any): any {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    public static descargarReporte(formato: string): any {
        const a = document.createElement('a');
        document.body.appendChild(a);

        const b64Data = formato;
        const contentType3 = 'application/pdf';
        const file: File = new File([this._base64ToArrayBuffer(b64Data)], 'this.tempBien.nombreArchivoCompleto', { type: contentType3 });
        return file;
    }


}
