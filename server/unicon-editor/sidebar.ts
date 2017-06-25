// -----------------------------------------------------------------------------
// sidebar.ts
// -----------------------------------------------------------------------------
import {Panel           as UIPanel      }   from '../editor/gui/panel';
import {Button          as UIButton     }   from '../editor/gui/button';
import {Number          as UINumber     }   from '../editor/gui/number';
import {Div             as UIDiv        }   from '../editor/gui/div';
import {Span            as UISpan       }   from '../editor/gui/span';
import {Text            as UIText       }   from '../editor/gui/text';
import {Boolean         as UIBoolean    }   from '../editor/gui/boolean';
import {Sidebar_Scene                   }   from './sidebar.scene';
import {Sidebar_Project                 }   from './sidebar.project';


/**
 * @author mrdoob / http://mrdoob.com/
 */

export class Sidebar {

    container : UIPanel;

    constructor ( editor : any ) {

        this.container = new UIPanel();
        this.container.setId( 'sidebar' );

        // [ TAB ]

        this.sceneTab    = new UIText( 'SCENE' ).onClick( this.onTabClick );
        this.projectTab  = new UIText( 'PROJECT' ).onClick( this.onTabClick );
        this.settingsTab = new UIText( 'SETTINGS' ).onClick( this.onTabClick );

        let tabs = new UIDiv();
        tabs.setId( 'tabs' );
        tabs.add( this.sceneTab, this.projectTab, this.settingsTab );
        this.container.add( tabs );

        //
        this.scene = new UISpan().add(
            new Sidebar_Scene( editor ).container,
            /*
            new Sidebar.Properties( editor ).container,
            new Sidebar.Animation( editor ).container,
            new Sidebar.Script( editor ).container
            */
        );
        this.container.add( this.scene );

        this.project = new UISpan().add(
            new Sidebar_Project( editor ).container
        );
        this.container.add( this.project );

        this.settings = new UISpan().add(
            /*
            new Sidebar.Settings( editor ),
            new Sidebar.History( editor )
            */
        );
        this.container.add( this.settings );

        //
        this.select( 'SCENE' );
    }

    sceneTab    : UIText;
    projectTab  : UIText;
    settingsTab : UIText;
    scene       : UISpan;
    project     : UISpan;
    settings    : UISpan;

    onTabClick = ( event:MouseEvent ) => {
        this.select( event.target['textContent'] );
    }

    select ( section:string ) {

        this.sceneTab.setClass( '' );
        this.projectTab.setClass( '' );
        this.settingsTab.setClass( '' );

        this.scene.setDisplay( 'none' );
        this.project.setDisplay( 'none' );
        this.settings.setDisplay( 'none' );

        switch ( section ) {

        case 'SCENE':
            this.sceneTab.setClass( 'selected' );
            this.scene.setDisplay( '' );
            break;
        case 'PROJECT':
            this.projectTab.setClass( 'selected' );
            this.project.setDisplay( '' );
            break;
        case 'SETTINGS':
            this.settingsTab.setClass( 'selected' );
            this.settings.setDisplay( '' );
            break;
        }
    }
}
