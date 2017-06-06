// -----------------------------------------------------------------------------
// transform.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';

import {Component   } from '../engine/component';
import {Quaternion  } from '../engine/quaternion';
import {Vector3     } from '../engine/vector3';


/**
 * Transform
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Transform
 * @extends {Component}
 */
export class Transform extends Component {

    // [ Variables ]


    /*
    childCount	The number of children the Transform has.
    */
    /**
     * The rotation as Euler angles in degrees.
     *
     * @readonly
     * @type {Vector3}
     * @memberof Transform
     */
    get eulerAngles() : Vector3         { return this._inner.getWorldDirection(); }
    set eulerAngles( value:Vector3 )    { this._inner.rotation = this._inner.rotation.setFromVector3(this._inner.worldToLocal(value)); }
    /*
    forward	The blue axis of the transform in world space.
    hasChanged	Has the transform changed since the last time the flag was set to 'false'?
    hierarchyCapacity	The transform capacity of the transform's hierarchy data structure.
    hierarchyCount	The number of transforms in the transform's hierarchy data structure.
    */
    /**
     * The rotation as Euler angles in degrees relative to the parent transform's rotation.
     *
     * @readonly
     * @type {Vector3}
     * @memberof Transform
     */
    get localEulerAngles() : Vector3        { return this._inner.rotation.toVector3(); }
    set localEularAngles( value:Vector3 )   { this._inner.rotation = this._inner.rotation.setFromVector3(value); }
    /*
    localPosition	Position of the transform relative to the parent transform.
    localRotation	The rotation of the transform relative to the parent transform's rotation.
    localScale	The scale of the transform relative to the parent.
    localToWorldMatrix	Matrix that transforms a point from local space into world space (Read Only).
    lossyScale	The global scale of the object (Read Only).
    */

    /**
     * The parent of the transform.
     *
     * @type {Transform}
     * @memberof Transform
     */
    parent : Transform;
    /**
     * The position of the transform in world space.
     *
     * @type {Vector3}
     * @memberof Transform
     */
    get position() : Vector3        { return this._inner.localToWorld(this._inner.position); }
    set position( value:Vector3 )   { this._inner.position = this._inner.worldToLocal(value); }

    /*
    right	The red axis of the transform in world space.
    root	Returns the topmost transform in the hierarchy.
    */
    /**
     * The rotation of the transform in world space stored as a Quaternion.
     *
     * @type {Quaternion}
     * @memberof Transform
     */
    get rotation() : Quaternion         { return this._inner.quaternion; }
    set rotation( value:Quaternion )    { this._inner.quaternion = value; }
    /*
    up	The green axis of the transform in world space.
    worldToLocalMatrix	Matrix that transforms a point from world space into local space (Read Only).
    */

    // [ Constructors ]

    // [ Public Functions ]

    /*
    DetachChildren	Unparents all children.
    Find	Finds a child by name and returns it.
    GetChild	Returns a transform child by index.
    GetSiblingIndex	Gets the sibling index.
    InverseTransformDirection	Transforms a direction from world space to local space. The opposite of Transform.TransformDirection.
    InverseTransformPoint	Transforms position from world space to local space.
    InverseTransformVector	Transforms a vector from world space to local space. The opposite of Transform.TransformVector.
    IsChildOf	Is this transform a child of parent?
    LookAt	Rotates the transform so the forward vector points at /target/'s current position.
    Rotate	Applies a rotation of eulerAngles.z degrees around the z axis, eulerAngles.x degrees around the x axis, and eulerAngles.y degrees around the y axis (in that order).
    RotateAround	Rotates the transform about axis passing through point in world coordinates by angle degrees.
    SetAsFirstSibling	Move the transform to the start of the local transform list.
    SetAsLastSibling	Move the transform to the end of the local transform list.
    */

    /**
     * Set the parent of the transform.
     *
     * @param {Transform} parent
     *
     * @memberof Transform
     */
    setParent( parent:Transform ) {
        this.parent = parent;
    }

    /*
    SetPositionAndRotation	Sets the world space position and rotation of the Transform component.
    SetSiblingIndex	Sets the sibling index.
    TransformDirection	Transforms direction from local space to world space.
    TransformPoint	Transforms position from local space to world space.
    TransformVector	Transforms vector from local space to world space.
    Translate	Moves the transform in the direction and distance of translation.
    */

    // [ Private Variables ]

    protected _inner : GL.Object3D;
}

