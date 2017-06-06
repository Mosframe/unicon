// -----------------------------------------------------------------------------
// serialized-object.ts
// -----------------------------------------------------------------------------
import {Ubject} from '../engine/ubject';

/**
 * SerializedObject are classes for editing properties on objects in a completely generic way that automatically handles undo and styling UI for prefabs.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class SerializedProperty
 */
export class SerializedObject {

    // [ Public Variables ]

    /*
    context:any;//	The context used to store and resolve ExposedReference types. This is set by the SerializedObject constructor.
    isEditingMultipleObjects:any;//	Does the serialized object represents multiple objects due to multi-object editing? (Read Only)
    maxArraySizeForMultiEditing:any;//	Defines the maximum size beyond which arrays cannot be edited when multiple objects are selected.
    */
    /**
     * The inspected object (Read Only).
     *
     * @type {Ubject}
     * @memberof SerializedObject
     */
    get targetObject() : Ubject { return this._targets[0]; }
    /**
     * The inspected objects (Read Only).
     *
     * @readonly
     * @type {Ubject[]}
     * @memberof SerializedObject
     */
    get targetObjects() : Ubject[] { return this._targets; }

    // [ Constructors ]

    /**
     * Creates an instance of SerializedObject.
     * @param {Ubject[]} targets
     * @param {Ubject} [context]
     *
     * @memberof SerializedObject
     */
    constructor( targets:Ubject[], context?:Ubject ) {
        this._targets   = targets;
        this._context   = context;
    }

    // [ Public Functions ]

    /*
    applyModifiedProperties(){}//	Apply property modifications.
    applyModifiedPropertiesWithoutUndo(){}//	Applies property modifications without registering an undo operation.
    copyFromSerializedProperty(){}//	Copies a value from a SerializedProperty to the same serialized property on this serialized object.
    findProperty(){}//	Find serialized property by name.
    getIterator(){}//	Get the first serialized property.
    setIsDifferentCacheDirty(){}//	Update hasMultipleDifferentValues cache on the next /Update()/ call.
    */
    /**
     * Update serialized object's representation.
     *
     *
     * @memberof SerializedObject
     */
    update(){}
    /*
    updateIfRequiredOrScript(){}//	Update serialized object's representation, only if the object has been modified since the last call to Update or if it is a script.
    */

    // [ Private Variables ]

    private _targets    : Ubject[];
    private _context    : Ubject;
}

