// -----------------------------------------------------------------------------
// object.ts
// -----------------------------------------------------------------------------
import * as UUID      from 'node-uuid';
import {Util        } from './util';
import {HideFlags   } from './hide-flags';
import {Quaternion  } from './quaternion';
import {Transform   } from './transform';
import {Scene       } from './scene';


/**
 * Base class for all objects Unicon can reference.
 * Any public variable you make that derives from Object gets shown in the inspector as a drop target, allowing you to set the value from the GUI.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class UObject
 */
export class UObject {

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
    /**
     * Creates an instance of Object.
     *
     * @memberof Object
     */
    constructor() {
        this._instanceID = UUID.v4();
    }
    /**
     * equal
     *
     * @param {UObject} target
     * @returns
     *
     * @memberof UObject
     */
    equal (target:UObject) {
        return ( this.toString() === target.toString() );
    }

    /**
     * Returns the instance id of the object.
     *
     * @returns {string}
     *
     * @memberof UObject
     */
    getInstanceID ():string {
        return this._instanceID;
    }
    /**
     * Returns the name of the game object.
     *
     * @returns
     *
     * @memberof UObject
     */
    toString () {
        return JSON.stringify(this);
    }
    /**
     *
     * Removes a gameobject, component or asset.
     * @static
     * @param {Object} obj
     * @param {number} delay
     *
     * @memberof Object
     */
    static destroy (obj:UObject,delay:number):void {
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
    static destroyImmediate (obj:UObject, allowDestroyingAssets:boolean=false) {
        delete UObject._instances[obj._instanceID];
        if( allowDestroyingAssets ) {
            if( obj._assetID ) {
                delete UObject._instances[obj._assetID];
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
    static dontDestroyOnLoad (target:UObject) {
        target._dontDestroyOnLoad = true;
    }
    /**
     * Returns the first active loaded object of Type type.
     *
     * @static
     * @param {string} type The type of object to find.
     * @returns UObject An array of objects which matched the specified type, cast as UObject.
     *
     * @memberof UObject
     */
    static findObjectOfType( type:string ) {
        for( let id in UObject._instances ) {
            let obj = UObject._instances[id];
            if( Object.getPrototypeOf(obj).constructor.name === type ) {
                return obj;
            }
        }
        return undefined;
    }
    /**
     * Returns a list of all active loaded objects of Type type.
     *
     * @static
     * @param {string} type The type of object to find.
     * @returns Object[] The array of objects found matching the type specified.
     *
     * @memberof UObject
     */
    static findObjectsOfType( type:string ) {
        let list:UObject[] = [];
        for( let id in UObject._instances ) {
            let obj = UObject._instances[id];
            if( Object.getPrototypeOf(obj).constructor.name === type ) {
                list.push(obj);
            }
        }
        return list;
    }
    /**
     * Clones the object original and returns the clone.
     *
     * @static
     * @param {UObject} original An existing object that you want to make a copy of.
     * @param {Transform} parent Parent that will be assigned to the new object.
     * @param {Vector3} position Position for the new object.
     * @param {Quaternion} rotation Orientation of the new object.
     *
     * @memberof UObject
     */
    static instantiate (original:UObject) {
        let instance = <UObject>Util.clone( original );
        if( instance ) {
            instance.setInstanceID();
            UObject._instances[instance._instanceID] = instance;
        }
    }



    // [ private ] --------------------------------------------------------------------------------------------------

    private static  _assets             : {[id:string]:UObject} = {} ; // asset list
    private static  _instances          : {[id:string]:UObject} = {} ; // instance list
    private static  _toBeDestroyed      : string[]              = [] ; // destroy list after rendering : 렌더링이 끝난 후 파괴될 오브젝트들
    private         _assetID            : string                     ; // asset id : 프리팹이나 리소드들
    private         _instanceID         : string                     ; // instance id
    private         _dontDestroyOnLoad  : boolean                    ; // not be destroyed automatically when loading a new scene.

    // create instance ID
    private setInstanceID = () => {
        this._instanceID = UUID.v4();
    }
    // 파괴 예약한다.
    private _destroy = () => {
        UObject._toBeDestroyed.push(this._instanceID);
    }
    // 씬이 렌더링 후에 호출 한다.
    private static _runToBeDestroyed () {
        for( let instanceID of UObject._toBeDestroyed ) {
            delete UObject._instances[instanceID];
        }
        UObject._toBeDestroyed.length = 0;
    }
}

