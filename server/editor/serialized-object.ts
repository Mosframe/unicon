/**
 * serialized-object.ts
 *
 * @author jonghwa lee
 */


/**
 * SerializedObject are classes for editing properties on objects in a completely generic way that automatically handles undo and styling UI for prefabs.
 *
 * @export
 * @class SerializedProperty
 */
export class SerializedObject {

    context:any;//	The context used to store and resolve ExposedReference types. This is set by the SerializedObject constructor.
    isEditingMultipleObjects:any;//	Does the serialized object represents multiple objects due to multi-object editing? (Read Only)
    maxArraySizeForMultiEditing:any;//	Defines the maximum size beyond which arrays cannot be edited when multiple objects are selected.
    targetObject:any;//	The inspected object (Read Only).
    targetObjects:any;//	The inspected objects (Read Only).

    constructor(){

    }

    applyModifiedProperties(){}//	Apply property modifications.
    applyModifiedPropertiesWithoutUndo(){}//	Applies property modifications without registering an undo operation.
    copyFromSerializedProperty(){}//	Copies a value from a SerializedProperty to the same serialized property on this serialized object.
    findProperty(){}//	Find serialized property by name.
    getIterator(){}//	Get the first serialized property.
    setIsDifferentCacheDirty(){}//	Update hasMultipleDifferentValues cache on the next /Update()/ call.
    update(){}//	Update serialized object's representation.
    updateIfRequiredOrScript(){}//	Update serialized object's representation, only if the object has been modified since the last call to Update or if it is a script.

    // [ private ] --------------------------------------------------------------------------------------------------
}

