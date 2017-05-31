// -----------------------------------------------------------------------------
// serialized-property.ts
// -----------------------------------------------------------------------------

/**
 * SerializedProperty are classes for editing properties on objects in a completely generic way that automatically handles undo and styling UI for prefabs.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class SerializedProperty
 */
export class SerializedProperty {

    // [Variables]

    /*
    animationCurveValue:any//	Value of a animation curve property.
    arrayElementType:any//	Type name of the element in an array property. (Read Only)
    arraySize:any//	The number of elements in the array. If the SerializedObject contains multiple objects it will return the smallest number of elements. So it is always possible to iterate through the SerializedObject and only get properties found in all objects.
    boolValue:any//	Value of a boolean property.
    boundsValue:any//	Value of bounds property.
    colorValue:any//	Value of a color property.
    depth:any//	Nesting depth of the property. (Read Only)
    displayName:any//	Nice display name of the property. (Read Only)
    doubleValue:any//	Value of a float property as a double.
    editable:any//	Is this property editable? (Read Only)
    enumDisplayNames:any//	Display-friendly names of enumeration of an enum property.
    enumNames:any//	Names of enumeration of an enum property.
    enumValueIndex:any//	Enum index of an enum property.
    exposedReferenceValue:any//	A reference to another Object in the Scene. This reference is resolved in the context of the SerializedObject containing the SerializedProperty.
    floatValue:any//	Value of a float property.
    hasChildren:any//	Does it have child properties? (Read Only)
    hasMultipleDifferentValues:any//	Does this property represent multiple different values due to multi-object editing? (Read Only)
    hasVisibleChildren:any//	Does it have visible child properties? (Read Only)
    intValue:any//	Value of an integer property.
    isArray:any//	Is this property an array? (Read Only)
    isExpanded:any//	Is this property expanded in the inspector?
    isInstantiatedPrefab:any//	Is property part of a prefab instance? (Read Only)
    longValue:any//	Value of a integer property as a long.
    name:any//	Name of the property. (Read Only)
    objectReferenceValue:any//	Value of an object reference property.
    prefabOverride:any//	Is property's value different from the prefab it belongs to?
    propertyPath:any//	Full path of the property. (Read Only)
    propertyType:any//	Type of this property (Read Only).
    quaternionValue:any//	Value of a quaternion property.
    rectValue:any//	Value of a rectangle property.
    serializedObject:any//	SerializedObject this property belongs to (Read Only).
    stringValue:any//	Value of a string property.
    tooltip:any//	Tooltip of the property. (Read Only)
    type:any//	Type name of the property. (Read Only)
    vector2Value:any//	Value of a 2D vector property.
    vector3Value:any//	Value of a 3D vector property.
    vector4Value:any//	Value of a 4D vector property.
    */

    /*
    clearArray(){}//		Remove all elements from the array.
    copy(){}//		Returns a copy of the SerializedProperty iterator in its current state. This is useful if you want to keep a reference to the current property but continue with the iteration.
    countInProperty(){}//		Count visible children of this property, including this property itself.
    countRemaining(){}//		Count remaining visible properties.
    deleteArrayElementAtIndex(){}//		Delete the element at the specified index in the array.
    deleteCommand(){}//		Deletes the serialized property.
    duplicateCommand(){}//		Duplicates the serialized property.
    findPropertyRelative(){}//		Retrieves the SerializedProperty at a relative path to the current property.
    getArrayElementAtIndex(){}//		Returns the element at the specified index in the array.
    getEndProperty(){}//		Retrieves the SerializedProperty that defines the end range of this property.
    getEnumerator(){}//		Retrieves an iterator that allows you to iterator over the current nexting of a serialized property.
    insertArrayElementAtIndex(){}//		Insert an empty element at the specified index in the array.
    moveArrayElement(){}//		Move an array element from srcIndex to dstIndex.
    next(){}//		Move to next property.
    nextVisible(){}//		Move to next visible property.
    reset(){}//		Move to first property of the object.
    */

    /*
    static equalContents(){}//	See if contained serialized properties are equal.
    */

    // [ private ] --------------------------------------------------------------------------------------------------
}

