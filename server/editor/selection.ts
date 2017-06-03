// -----------------------------------------------------------------------------
// selection.ts
// -----------------------------------------------------------------------------
import {GameObject      } from '../engine/game-object';
import {Transform       } from '../engine/transform';
import {Ubject          } from '../engine/ubject';

import {SelectionMode   } from './selection-mode';
/**
 * Access to the selection in the editor.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Selection
 */
export class Selection {

    // [ Public Static Variables ]

    /**
     * Returns the current context object, as was set via setActiveObjectWithContext.
     *
     * @static
     * @type {Ubject}
     * @memberof Selection
     */
    static activeContext : Ubject;
    /**
     * Returns the active game object. (The one shown in the inspector).
     *
     * @static
     * @type {GameObject}
     * @memberof Selection
     */
    static activeGameObject : GameObject;
    /**
     * Returns the instanceID of the actual object selection.
     * Includes prefabs, non-modifyable objects.
     *
     * @static
     * @type {string}
     * @memberof Selection
     */
    static activeInstanceID : string;
    /**
     * Returns the actual object selection.
     * Includes prefabs, non-modifyable objects.
     *
     * @static
     * @type {Ubject}
     * @memberof Selection
     */
    static activeObject : Ubject;
    /**
     * Returns the active transform. (The one shown in the inspector).
     *
     * @static
     * @type {Transform}
     * @memberof Selection
     */
    static activeTransform : Transform;
    /**
     * Returns the guids of the selected assets.
     *
     * @static
     * @type {string[]}
     * @memberof Selection
     */
    static assetGUIDs : string[] = [];
    /**
     * Returns the actual game object selection. Includes prefabs, non-modifyable objects.
     *
     * @static
     * @type {GameObject[]}
     * @memberof Selection
     */
    static gameObjects : GameObject[] = [];
    /**
     * The actual unfiltered selection from the Scene returned as instance ids instead of objects.
     *
     * @static
     * @type {string[]}
     * @memberof Selection
     */
    static instanceIDs : string[] = [];
    /**
     * The actual unfiltered selection from the Scene.
     *
     * @static
     * @type {Ubject[]}
     * @memberof Selection
     */
    static objects	: Ubject[] = [];
    /**
     * Delegate callback triggered when currently active/selected item has changed.
     *
     * @static
     * @type {Function}
     * @memberof Selection
     */
    static selectionChanged : Function;
    /**
     * Returns the top level selection, excluding prefabs.
     *
     * @static
     * @type {Transform[]}
     * @memberof Selection
     */
    static transforms : Transform[] = [];

    // [ Public Static Functions ]

    /**
     * Returns whether an object is contained in the current selection.
     *
     * @static
     * @param {Ubject} obj
     * @returns {boolean}
     *
     * @memberof Selection
     */
    static Contains( obj:Ubject ) : boolean {
        return Selection.objects.indexOf(obj) >= 0;
    }
    /**
     * Returns the current selection filtered by type and mode.
     *
     * Note : Only SelectionMode.TopLevel can be used.
     *
     * @static
     * @template T
     * @param {SelectionMode} mode
     * @returns {Ubject[]}
     *
     * @memberof Selection
     */
    static GetFiltered<T extends Ubject>( mode:SelectionMode ) : Ubject[] {
        let type:{new():T};
        switch( mode ){
        case SelectionMode.Unfiltered:
            return Selection.objects.filter( o => o instanceof type );
        case SelectionMode.TopLevel:
            return Selection.objects.filter( o => o instanceof type );
        case SelectionMode.Deep:
            return Selection.objects.filter( o => o instanceof type );
        case SelectionMode.ExcludePrefab:
            return Selection.objects.filter( o => o instanceof type );
        case SelectionMode.Editable:
            return Selection.objects.filter( o => o instanceof type );
        case SelectionMode.Assets:
            return Selection.objects.filter( o => o instanceof type );
        case SelectionMode.DeepAssets:
            return Selection.objects.filter( o => o instanceof type );
        }
    }
    /**
     * Allows for fine grained control of the selection type using the SelectionMode bitmask.
     *
     * Note : Only SelectionMode.TopLevel can be used.
     *
     * @static
     * @param {SelectionMode} mode
     * @returns {Transform[]}
     *
     * @memberof Selection
     */
    static GetTransforms ( mode:SelectionMode ) : Transform[] {
        switch( mode ){
        case SelectionMode.Unfiltered:
            return Selection.gameObjects.map( o=>o.transform );
        case SelectionMode.TopLevel:
            return Selection.gameObjects.map( o=>o.transform );
        case SelectionMode.Deep:
            return Selection.gameObjects.map( o=>o.transform );
        case SelectionMode.ExcludePrefab:
            return Selection.gameObjects.map( o=>o.transform );
        case SelectionMode.Editable:
            return Selection.gameObjects.map( o=>o.transform );
        case SelectionMode.Assets:
            return Selection.gameObjects.map( o=>o.transform );
        case SelectionMode.DeepAssets:
            return Selection.gameObjects.map( o=>o.transform );
        }
    }
    /**
     * Selects an object with a context.
     *
     * @static
     * @param {Ubject} obj Object being selected (will be equal activeObject).
     * @param {Ubject} context Context object.
     *
     * @memberof Selection
     */
    static setActiveObjectWithContext (obj:Ubject, context:Ubject) {

        Selection.objects = [];
        Selection.transforms = [];

        Selection.objects.push(obj);
        Selection.activeObject = obj;
        if( Selection.activeObject ) {
            Selection.activeInstanceID = Selection.activeObject.getInstanceID();
        }

        if( obj instanceof GameObject ) {
            Selection.activeGameObject = obj;
            Selection.activeTransform = Selection.activeGameObject.transform;
        }
        Selection.activeContext = context;

        Selection.assetGUIDs = [];
        for( let obj of Selection.objects ) {
            Selection.assetGUIDs.push( obj.assetGUID );
            Selection.instanceIDs.push(obj.getInstanceID());
            if( obj instanceof GameObject ) {
                Selection.transforms.push(obj.transform);
            }
        }

        if( Selection.selectionChanged ) {
            Selection.selectionChanged();
        }
    }

    // [ Private Static Variables ]

    // [ Private Static Functions ]
}
