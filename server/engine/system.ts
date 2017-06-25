/**
 * @author mr.doob / http://mrdoob.com/
 */

export namespace System {

	export function browser () : string|false {

        let ua = navigator.userAgent;

        if ( /Arora/i               .test( ua ) ) { return 'Arora'              ; } else
        if ( /Opera|OPR/            .test( ua ) ) { return 'Opera'              ; } else
        if ( /Maxthon/i             .test( ua ) ) { return 'Maxthon'            ; } else
        if ( /Vivaldi/i             .test( ua ) ) { return 'Vivaldi'            ; } else
        if ( /YaBrowser/i           .test( ua ) ) { return 'Yandex'             ; } else
        if ( /Chrome/i              .test( ua ) ) { return 'Chrome'             ; } else
        if ( /Epiphany/i            .test( ua ) ) { return 'Epiphany'           ; } else
        if ( /Firefox/i             .test( ua ) ) { return 'Firefox'            ; } else
        if ( /Mobile(\/.*)? Safari/i.test( ua ) ) { return 'Mobile Safari'      ; } else
        if ( /MSIE/i                .test( ua ) ) { return 'Internet Explorer'  ; } else
        if ( /Midori/i              .test( ua ) ) { return 'Midori'             ; } else
        if ( /Safari/i              .test( ua ) ) { return 'Safari'             ; }

        return false;
    }

    export function os () : string|false {

        var ua = navigator.userAgent;

        if ( /Android/i         .test( ua ) ) { return 'Android'    ; } else
        if ( /CrOS/i            .test( ua ) ) { return 'Chrome OS'  ; } else
        if ( /iP[ao]d|iPhone/i  .test( ua ) ) { return 'iOS'        ; } else
        if ( /Linux/i           .test( ua ) ) { return 'Linux'      ; } else
        if ( /Mac OS/i          .test( ua ) ) { return 'Mac OS'     ; } else
        if ( /windows/i         .test( ua ) ) { return 'Windows'    ; }

        return false;
    }

    export class Support {

        static get canvas () : boolean {
            return 'CanvasRenderingContext2D' in window;
        }

        static get localStorage () : boolean {

            try {
                return !! window.localStorage.getItem;
            } catch ( error ) {
                return false;
            }

        }

        static get file() : boolean {
            return  'File' in window && 'FileReader' in window && 'FileList' in window && 'Blob' in window;
        }

        static get fileSystem () : boolean {
            return 'requestFileSystem' in window || 'webkitRequestFileSystem' in window;
        }

        static get getUserMedia() : boolean {
            return 'getUserMedia' in window.navigator || 'webkitGetUserMedia' in window.navigator || 'mozGetUserMedia' in window.navigator || 'msGetUserMedia' in window.navigator;
        }

        static get requestAnimationFrame () : boolean {
            return 'mozRequestAnimationFrame' in window || 'webkitRequestAnimationFrame' in window || 'oRequestAnimationFrame' in window || 'msRequestAnimationFrame' in window;
        }

        static get sessionStorage () {
            try {
                return !! window.sessionStorage.getItem;
            } catch ( error ) {
                return false;
            }
        }

        static get svg () {
            try {
                return 'createElementNS' in document && !! document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect;
            } catch( e ) {
                return false;
            }
        }

        static get webgl() {
            try {
                return 'WebGLRenderingContext' in window && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
            } catch( e ) {
                return false;
            }
        }

        static get worker () {
            return 'Worker' in window;
        }

        static get notifications () {
            return 'Notification' in Window;
        }
    }
}

