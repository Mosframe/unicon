// -----------------------------------------------------------------------------
// transform.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Component   } from '../engine/component';
import {GameObject  } from '../engine/game-object';
import {Matrix4x4   } from '../engine/matrix4x4';
import {Quaternion  } from '../engine/quaternion';
import {Vector3     } from '../engine/vector3';

/**
 * Position, rotation and scale of an object.
 * Every object in a scene has a Transform.
 * It's used to store and manipulate the position, rotation and scale of the object.
 * Every Transform can have a parent, which allows you to apply position, rotation and scale hierarchically.
 * This is the hierarchy seen in the Hierarchy pane.
 * They also support enumerators so you can loop through children using
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Transform
 * @extends {Component}
 */
export class Transform extends Component {

    // [ Public Static Variables ]

    // [ Public Variables ]

    /**
     * get Object3D
     *
     * @readonly
     * @type {GL.Object3D}
     * @memberof Transform
     */
    get core() : GL.Object3D                { return this.gameObject.core; }

    /*
    childCount	The number of children the Transform has.
    */
    /**
     * The rotation as Euler angles in degrees.
     *
     * @type {Vector3}
     * @memberof Transform
     */
    get eulerAngles() : Vector3             { return this.core.localToWorld( this.localEulerAngles ); }
    set eulerAngles( value:Vector3 )        { this.localEulerAngles = this.core.worldToLocal(value); }
    /*
    forward	The blue axis of the transform in world space.
    hasChanged	Has the transform changed since the last time the flag was set to 'false'?
    hierarchyCapacity	The transform capacity of the transform's hierarchy data structure.
    hierarchyCount	The number of transforms in the transform's hierarchy data structure.
    */
    /**
     * The rotation as Euler angles in degrees relative to the parent transform's rotation.
     *
     * @type {Vector3}
     * @memberof Transform
     */
    get localEulerAngles() : Vector3        { return this.core.rotation.toVector3(); }
    set localEulerAngles( value:Vector3 )   { this.core.rotation.setFromVector3( value ); }
    /**
     * Position of the transform relative to the parent transform.
     *
     * @type {Vector3}
     * @memberof Transform
     */
    get localPosition() : Vector3           { return this.core.position; }
    set localPosition( value:Vector3 )      { this.core.position.set( value.x, value.y, value.z ); }
    /**
     * The rotation of the transform relative to the parent transform's rotation.
     *
     * @type {Quaternion}
     * @memberof Transform
     */
    get localRotation() : Quaternion        { return this.core.quaternion }
    set localRotation( value:Quaternion )   { this.core.rotation.setFromQuaternion( value ); }
    /**
     * The scale of the transform relative to the parent.
     *
     * @readonly
     * @type {Vector3}
     * @memberof Transform
     */
    get localScale() : Vector3              { return this.core.scale; }
    set localScale( value:Vector3 )         { this.core.scale.set( value.x, value.y, value.z ); }

    /**
     * Matrix that transforms a point from local space into world space (Read Only).
     *
     * @readonly
     * @type {Matrix4x4}
     * @memberof Transform
     */
    get localToWorldMatrix() : Matrix4x4    { return this.core.matrix; }
    /**
     * The global scale of the object (Read Only).
     *
     * @type {Vector3}
     * @memberof Transform
     */
    get lossyScale() : Vector3              { return this.core.getWorldScale(); }
    /*
    parent	The parent of the transform.
    */
    /**
     * The position of the transform in world space.
     *
     * @readonly
     * @type {Vector3}
     * @memberof Transform
     */
    get position() : Vector3                { return this.core.localToWorld(this.core.position); }
    set position( value:Vector3 )           { let localPos = this.core.worldToLocal(value); this.core.position.set( localPos.x, localPos.y, localPos.z ); }
    /*
    right	The red axis of the transform in world space.
    root	Returns the topmost transform in the hierarchy.
    */
    /**
     * The rotation of the transform in world space stored as a Quaternion.
     *
     * @readonly
     * @type {Quaternion}
     * @memberof Transform
     */
    get rotation() : Quaternion             { return this.core.quaternion; }
    set rotation( value:Quaternion )        { this.core.quaternion.set( value.x, value.y, value.z, value.w ); }
    /*
    up	The green axis of the transform in world space.
    */
    /**
     * Matrix that transforms a point from world space into local space (Read Only).
     *
     * @readonly
     * @type {Matrix4x4}
     * @memberof Transform
     */
    get worldToLocalMatrix() : Matrix4x4    { return this.core.matrixWorld; }

    // [ Constructors ]

    // [ Public Static Functions ]

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
    */
    /**
     * Rotates the transform so the forward vector points at /target/'s current position.
     *
     * @param {Transform} traget
     * @param {Vector3} [worldUp=Vector3.up]
     *
     * @memberof Transform
     */
    lookAt( traget:Transform, worldUp:Vector3=Vector3.up ) {
        // TODO : worldUp 처리가 필요함
        this.core.lookAt( traget.position );
    }
    lookAt2( traget:Vector3 ) {
        this.core.lookAt(traget);
    }

    /*
    Rotate	Applies a rotation of eulerAngles.z degrees around the z axis, eulerAngles.x degrees around the x axis, and eulerAngles.y degrees around the y axis (in that order).
    RotateAround	Rotates the transform about axis passing through point in world coordinates by angle degrees.
    SetAsFirstSibling	Move the transform to the start of the local transform list.
    SetAsLastSibling	Move the transform to the end of the local transform list.
    SetParent	Set the parent of the transform.
    SetPositionAndRotation	Sets the world space position and rotation of the Transform component.
    SetSiblingIndex	Sets the sibling index.
    TransformDirection	Transforms direction from local space to world space.
    TransformPoint	Transforms position from local space to world space.
    TransformVector	Transforms vector from local space to world space.
    Translate	Moves the transform in the direction and distance of translation.
    */

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
