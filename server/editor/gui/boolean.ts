/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from 'three';
import {Element} from './element';
import {Span} from './span';
import {Checkbox} from './checkbox';
import {Text} from './text';

export class Boolean extends Span {

    getValue () : boolean       { return this.checkbox.getValue(); }
    setValue ( value:boolean )  { this.checkbox.setValue(value); return this; }

    constructor ( boolean, text ) {
        super();

        this.setMarginRight( '10px' );
        this.checkbox = new Checkbox( boolean );
        this.text = new Text( text ).setMarginLeft( '3px' );
        this.add( this.checkbox );
        this.add( this.text );
    }

    checkbox    : Checkbox;
    text        : any;
}

