// -----------------------------------------------------------------------------
// ubject.ts
// -----------------------------------------------------------------------------
import deprecated     from 'deprecated-decorator';
import * as UUID      from 'node-uuid';
import {Util        } from './util';
import {HideFlags   } from './hide-flags';
import {Quaternion  } from './quaternion';
import {Transform   } from './transform';
import {Scene       } from './scene';

interface IActivatable<T> {new():T;}


/**
 * Base class for all objects Unicon can reference.
 * Any public variable you make that derives from Object gets shown in the inspector as a drop target, allowing you to set the value from the GUI.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Ubject
 */
export class Ubject {

    // [ Variables ]

    /**
     * Should the object be hidden, saved with the scene or modifiable by the user?
     *
     * @type {HideFlags}
     * @memberof Object
     */
    hideFlags : HideFlags;
    /**
     * The name of the object.
     *
     * @type {string}
     * @memberof Object
     */
    name : string;

    // [ Constructors ]

    /**
     * Creates an instance of Object.
     *
     * @memberof Object
     */
    constructor() {
        this._setInstanceID();
    }

    // [ Public Functions ]

    /**
     * Returns the asset GUID of the object.
     *
     *
     * @memberof Ubject
     */
    get assetGUID () : string {
        return this._assetGUID;
    }
    /**
     * equal
     *
     * @param {Ubject} target
     * @returns
     *
     * @memberof Ubject
     */
    equal (target:Ubject) {
        return ( this.toString() === target.toString() );
    }
    /**
     * Returns the instance id of the object.
     *
     *
     * @memberof Ubject
     */
    getInstanceID = () : string => {
        return this._instanceID;
    }
    /**
     * Returns the name of the game object.
     *
     * @returns
     *
     * @memberof Ubject
     */
    toString () {
        return JSON.stringify(this);
    }

    // [ Static Functions ]


    /**
     *
     * Removes a gameobject, component or asset.
     * @static
     * @param {Object} obj
     * @param {number} delay
     *
     * @memberof Object
     */
    static destroy (obj:Ubject,delay:number):void {
        if(delay>0){
            setTimeout( obj._destroy, delay);
        } else {
            obj._destroy();
        }
    }
    /**
     * Destroys the object obj immediately. You are strongly recommended to use Destroy instead.
     *
     * @static
     * @param {Object} obj
     * @param {boolean} [allowDestroyingAssets=false]
     *
     * @memberof Object
     */
    static destroyImmediate (obj:Ubject, allowDestroyingAssets:boolean=false) {

        let type = Object.getPrototypeOf(obj).constructor.name;
        let list = Ubject._instancesOfTypes[type];
        if( !list ) {
            let index = list.findIndex( o=>o._instanceID===obj._instanceID );
            //list.fillter;
            if( list && list.length === 0 ) {
                delete Ubject._instancesOfTypes[type];
            }
        }

        delete Ubject._instances[obj._instanceID];


        if( allowDestroyingAssets ) {
            if( obj._assetGUID ) {
                delete Ubject._instances[obj._assetGUID];
            }
        }
    }
    /**
     * Makes the object target not be destroyed automatically when loading a new scene.
     *
     * @static
     * @param {Object} target
     *
     * @memberof Object
     */
    static dontDestroyOnLoad (target:Ubject) {
        target._dontDestroyOnLoad = true;
    }
    /**
     * Returns the first active loaded object of Type type.
     *
     * @static
     * @param {string} type The type of object to find.
     * @returns Ubject An array of objects which matched the specified type, cast as Ubject.
     *
     * @memberof Ubject
     */
    static findObjectOfType( type:string ) {
        let list = Ubject._instancesOfTypes[type];
        if( list ) {
            return list[0];
        }
    }

    /**
     * Returns a list of all active loaded objects of Type type.
     *
     * @static
     * @param {string} type The type of object to find.
     * @returns Object[] The array of objects found matching the type specified.
     *
     * @memberof Ubject
     */
    static findObjectsOfType( type:string ) {
        return Ubject._instancesOfTypes[type];
    }
    /**
     * Clones the object original and returns the clone.
     *
     * @static
     * @param {Ubject} original An existing object that you want to make a copy of.
     *
     * @memberof Ubject
     */
    static instantiate (original:Ubject) {
        let instance = <Ubject>Util.clone( original );
        if( instance ) {
            instance._setInstanceID();
            Ubject._instances[instance._instanceID] = instance;

            let type = Object.getPrototypeOf(instance).constructor.name;
            let list = Ubject._instancesOfTypes[type];
            if( !list ) {
                list = Ubject._instancesOfTypes[type] = [];
            }
            list.push(instance);
        }
    }

    // [ Private Variables ]

    protected static _instances          : {[id:string]:Ubject}     = {} ; // instance list
    protected static _instancesOfTypes   : {[type:string]:Ubject[]} = {} ; // type : instance list
    protected static _toBeDestroyed      : string[]                 = [] ; // destroy list after rendering : 렌더링이 끝난 후 파괴될 오브젝트들
    protected        _assetGUID          : string                        ; // asset GUID : 프리팹이나 리소드들
    protected        _instanceID         : string                        ; // instance id
    protected        _dontDestroyOnLoad  : boolean                       ; // not be destroyed automatically when loading a new scene.

    // [ Private Functions ]

    // create instance ID
    private _setInstanceID = () => {
        this._instanceID = UUID.v4();
    }
    // 파괴 예약한다.
    private _destroy = () => {
        Ubject._toBeDestroyed.push(this._instanceID);
    }
    // 씬이 렌더링 후에 호출 한다.
    private static _runToBeDestroyed = () => {
        for( let instanceID of Ubject._toBeDestroyed ) {
            delete Ubject._instances[instanceID];
        }
        Ubject._toBeDestroyed.length = 0;
    }
}


