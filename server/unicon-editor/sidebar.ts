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


/**
 * @author mrdoob / http://mrdoob.com/
 */

export class Sidebar {

    container : UIPanel;

    constructor ( editor : any ) {

        var container = this.container = new UIPanel();
        container.setId( 'sidebar' );

        //

        var sceneTab    = new UIText( 'SCENE' ).onClick( onClick );
        var projectTab  = new UIText( 'PROJECT' ).onClick( onClick );
        var settingsTab = new UIText( 'SETTINGS' ).onClick( onClick );

        var tabs = new UIDiv();
        tabs.setId( 'tabs' );
        tabs.add( sceneTab, projectTab, settingsTab );
        container.add( tabs );

        function onClick( event ) {
            select( event.target.textContent );
        }

        //
        var scene = new UISpan().add(
            new Sidebar_Scene( editor ).container,
            /*
            new Sidebar.Properties( editor ).container,
            new Sidebar.Animation( editor ).container,
            new Sidebar.Script( editor ).container
            */
        );
        container.add( scene );

        var project = new UISpan().add(
            /*
            new Sidebar.Project( editor )
            */
        );
        container.add( project );

        var settings = new UISpan().add(
            /*
            new Sidebar.Settings( editor ),
            new Sidebar.History( editor )
            */
        );
        container.add( settings );

        //

        function select( section ) {

            sceneTab.setClass( '' );
            projectTab.setClass( '' );
            settingsTab.setClass( '' );

            scene.setDisplay( 'none' );
            project.setDisplay( 'none' );
            settings.setDisplay( 'none' );

            switch ( section ) {
                case 'SCENE':
                    sceneTab.setClass( 'selected' );
                    scene.setDisplay( '' );
                    break;
                case 'PROJECT':
                    projectTab.setClass( 'selected' );
                    project.setDisplay( '' );
                    break;
                case 'SETTINGS':
                    settingsTab.setClass( 'selected' );
                    settings.setDisplay( '' );
                    break;
            }

        }

        select( 'SCENE' );
    }

}
