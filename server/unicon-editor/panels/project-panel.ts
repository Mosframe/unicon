// -----------------------------------------------------------------------------
// project-panel.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { System                     }   from '../../engine/system';
import { Panel      as UIPanel      }   from '../../editor/gui/panel';
import { Button     as UIButton     }   from '../../editor/gui/button';
import { Number     as UINumber     }   from '../../editor/gui/number';
import { Div        as UIDiv        }   from '../../editor/gui/div';
import { Span       as UISpan       }   from '../../editor/gui/span';
import { Row        as UIRow        }   from '../../editor/gui/row';
import { Color      as UIColor      }   from '../../editor/gui/color';
import { Text       as UIText       }   from '../../editor/gui/text';
import { Break      as UIBreak      }   from '../../editor/gui/break';
import { Select     as UISelect     }   from '../../editor/gui/select';
import { Boolean    as UIBoolean    }   from '../../editor/gui/boolean';
import { Outliner   as UIOutliner   }   from '../../editor/gui/outliner';
import { Checkbox   as UICheckbox   }   from '../../editor/gui/checkbox';
import { IEditor                    }   from '../interface';


/**
 * project panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class ProjectPanel
 * @extends {UIPanel}
 */
export class ProjectPanel extends UIPanel {

    editor                  : IEditor;
    config                  : any;
    signals                 : any;
    rendererTypes           : {}
    options                 : {};
    rendererTypeRow         : UIRow;
    rendererType            : UISelect;
    rendererPropertiesRow   : UIRow;
    rendererAntialias       : UIBoolean;
    rendererShadows         : UIBoolean;
    rendererGammaInput      : UIBoolean;
    rendererGammaOutput     : UIBoolean;
    vrRow                   : UIRow;
    vr                      : UICheckbox;

    constructor( editor:IEditor ) {
        super();

        this.editor     = editor;
        this.config     = editor.config;
        this.signals    = editor.signals;

        this.rendererTypes = {
            'WebGLRenderer': THREE.WebGLRenderer,
            'CanvasRenderer': THREE.CanvasRenderer,
            //'SVGRenderer': THREE.SVGRenderer,
            //'SoftwareRenderer': THREE.SoftwareRenderer,
            //'RaytracingRenderer': THREE.RaytracingRenderer
        };

        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );

        // class

        this.options = {};


        for ( let key in this.rendererTypes ) {

            console.log(System);
            if ( key.indexOf( 'WebGL' ) >= 0 && System.Support.webgl === false ) continue;

            this.options[ key ] = key;
        }

        this.rendererTypeRow = new UIRow();
        this.rendererType = new UISelect().setOptions( this.options ).setWidth( '150px' ).onChange( ()=> {

            let value = this.rendererType.getValue();

            this.config.setKey( 'project/renderer', value );

            this.updateRenderer();

        });

        this.rendererTypeRow.add( new UIText( 'Renderer' ).setWidth( '90px' ) );
        this.rendererTypeRow.add( this.rendererType );

        this.add( this.rendererTypeRow );

        if ( this.config.getKey( 'project/renderer' ) !== undefined ) {

            this.rendererType.setValue( this.config.getKey( 'project/renderer' ) );

        }

        // antialiasing

        this.rendererPropertiesRow = new UIRow().setMarginLeft( '90px' );

        this.rendererAntialias = new UIBoolean( this.config.getKey( 'project/renderer/antialias' ), 'antialias' ).onChange( ()=> {

            this.config.setKey( 'project/renderer/antialias', this.rendererAntialias.getValue() );
            this.updateRenderer();

        });
        this.rendererPropertiesRow.add( this.rendererAntialias );

        // shadow

        this.rendererShadows = new UIBoolean( this.config.getKey( 'project/renderer/shadows' ), 'shadows' ).onChange( () => {

            this.config.setKey( 'project/renderer/shadows', this.rendererShadows.getValue() );
            this.updateRenderer();

        });
        this.rendererPropertiesRow.add( this.rendererShadows );

        this.rendererPropertiesRow.add( new UIBreak() );

        // gamma input

        this.rendererGammaInput = new UIBoolean( this.config.getKey( 'project/renderer/gammaInput' ), 'γ input' ).onChange( () => {

            this.config.setKey( 'project/renderer/gammaInput', this.rendererGammaInput.getValue() );
            this.updateRenderer();

        });
        this.rendererPropertiesRow.add( this.rendererGammaInput );

        // gamma output

        this.rendererGammaOutput = new UIBoolean( this.config.getKey( 'project/renderer/gammaOutput' ), 'γ output' ).onChange( () => {

            this.config.setKey( 'project/renderer/gammaOutput', this.rendererGammaOutput.getValue() );
            this.updateRenderer();

        } );
        this.rendererPropertiesRow.add( this.rendererGammaOutput );

        this.add( this.rendererPropertiesRow );

        // VR

        this.vrRow = new UIRow();
        this.vr = new UICheckbox( this.config.getKey( 'project/vr' ) ).setLeft( '100px' ).onChange( () => {

            this.config.setKey( 'project/vr', this.vr.getValue() );
            // this.updateRenderer();
        });

        this.vrRow.add( new UIText( 'VR' ).setWidth( '90px' ) );
        this.vrRow.add( this.vr );

        this.add( this.vrRow );

        //
        this.createRenderer( this.config.getKey( 'project/renderer' ), this.config.getKey( 'project/renderer/antialias' ), this.config.getKey( 'project/renderer/shadows' ), this.config.getKey( 'project/renderer/gammaInput' ), this.config.getKey( 'project/renderer/gammaOutput' ) );
    }

    updateRenderer () {

        this.createRenderer( this.rendererType.getValue(), this.rendererAntialias.getValue(), this.rendererShadows.getValue(), this.rendererGammaInput.getValue(), this.rendererGammaOutput.getValue() );
    }

    createRenderer ( type, antialias, shadows, gammaIn, gammaOut ) {

        if ( type === 'WebGLRenderer' && System.Support.webgl === false ) {

            type = 'CanvasRenderer';

        }

        this.rendererPropertiesRow.setDisplay( type === 'WebGLRenderer' ? '' : 'none' );

        let renderer = new this.rendererTypes[ type ]( { antialias: antialias} );
        renderer.gammaInput = gammaIn;
        renderer.gammaOutput = gammaOut;
        if ( shadows && renderer.shadowMap ) {

            renderer.shadowMap.enabled = true;
            // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        }

        this.signals.rendererChanged.dispatch( renderer );

    }
}