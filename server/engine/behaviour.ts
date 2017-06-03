// -----------------------------------------------------------------------------
// behaviour.ts
// -----------------------------------------------------------------------------
import {Component} from './component';

/**
 * Behaviour
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Behaviour
 * @extends {Component}
 */
export class Behaviour extends Component {

    // [Variables]

    /*
    enabled             : boolean;
    isActiveAndEnabled  : boolean;

    runInEditMode       : boolean;
    useGUILayout        : boolean;

    // [Public Functions]

    cancelInvoke() {}
    invoke() {}
    invokeRepeating() {}
    isInvoking() {}
    startCoroutines() {}
    stopAllCoroutines() {}
    stopCoroutine() {}

    static print() {}

    // [ Messages ]

    onAwake(){} //Awake is called when the script instance is being loaded.
    onFixedUpdate() {} //This function is called every fixed framerate frame, if the MonoBehaviour is enabled.
    onLateUpdate() {} //LateUpdate is called every frame, if the Behaviour is enabled.
    onAnimatorIK() {}//	Callback for setting up animation IK (inverse kinematics).
    onAnimatorMove() {}//	Callback for processing animation movements for modifying root motion.
    onApplicationFocus() {}//	Sent to all GameObjects when the player gets or loses focus.
    onApplicationPause() {}//	Sent to all GameObjects when the application pauses.
    onApplicationQuit() {}//	Sent to all game objects before the application is quit.
    onAudioFilterRead() {}//	If OnAudioFilterRead is implemented, Unity will insert a custom filter into the audio DSP chain.
    onBecameInvisible() {}//	OnBecameInvisible is called when the renderer is no longer visible by any camera.
    onBecameVisible() {}//	OnBecameVisible is called when the renderer became visible by any camera.
    onCollisionEnter() {}//	OnCollisionEnter is called when this collider/rigidbody has begun touching another rigidbody/collider.
    onCollisionEnter2D() {}//	Sent when an incoming collider makes contact with this object's collider (2D physics only).
    onCollisionExit() {}//	OnCollisionExit is called when this collider/rigidbody has stopped touching another rigidbody/collider.
    onCollisionExit2D() {}//	Sent when a collider on another object stops touching this object's collider (2D physics only).
    onCollisionStay() {}//	OnCollisionStay is called once per frame for every collider/rigidbody that is touching rigidbody/collider.
    onCollisionStay2D() {}//	Sent each frame where a collider on another object is touching this object's collider (2D physics only).
    onConnectedToServer() {}//	Called on the client when you have successfully connected to a server.
    onControllerColliderHit() {}//	OnControllerColliderHit is called when the controller hits a collider while performing a Move.
    onDestroy() {}//	This function is called when the MonoBehaviour will be destroyed.
    onDisable() {}//	This function is called when the behaviour becomes disabled () or inactive.
    onDisconnectedFromServer() {}//	Called on the client when the connection was lost or you disconnected from the server.
    onDrawGizmos() {}//	Implement OnDrawGizmos if you want to draw gizmos that are also pickable and always drawn.
    onDrawGizmosSelected() {}//	Implement OnDrawGizmosSelected to draw a gizmo if the object is selected.
    onEnable() {}//	This function is called when the object becomes enabled and active.
    onFailedToConnect() {}//	Called on the client when a connection attempt fails for some reason.
    onFailedToConnectToMasterServer() {}//	Called on clients or servers when there is a problem connecting to the MasterServer.
    onGUI() {}//	OnGUI is called for rendering and handling GUI events.
    onJointBreak() {}//	Called when a joint attached to the same game object broke.
    onJointBreak2D() {}//	Called when a Joint2D attached to the same game object breaks.
    onMasterServerEvent() {}//	Called on clients or servers when reporting events from the MasterServer.
    onMouseDown() {}//	OnMouseDown is called when the user has pressed the mouse button while over the GUIElement or Collider.
    onMouseDrag() {}//	OnMouseDrag is called when the user has clicked on a GUIElement or Collider and is still holding down the mouse.
    onMouseEnter() {}//	Called when the mouse enters the GUIElement or Collider.
    onMouseExit() {}//	Called when the mouse is not any longer over the GUIElement or Collider.
    onMouseOver() {}//	Called every frame while the mouse is over the GUIElement or Collider.
    onMouseUp() {}//	OnMouseUp is called when the user has released the mouse button.
    onMouseUpAsButton() {}//	OnMouseUpAsButton is only called when the mouse is released over the same GUIElement or Collider as it was pressed.
    onNetworkInstantiate() {}//	Called on objects which have been network instantiated with Network.Instantiate.
    onParticleCollision() {}//	OnParticleCollision is called when a particle hits a Collider.
    onParticleTrigger() {}//	OnParticleTrigger is called when any particles in a particle system meet the conditions in the trigger module.
    onPlayerConnected() {}//	Called on the server whenever a new player has successfully connected.
    onPlayerDisconnected() {}//	Called on the server whenever a player disconnected from the server.
    onPostRender() {}//	OnPostRender is called after a camera finished rendering the scene.
    onPreCull() {}//	OnPreCull is called before a camera culls the scene.
    onPreRender() {}//	OnPreRender is called before a camera starts rendering the scene.
    onRenderImage() {}//	OnRenderImage is called after all rendering is complete to render image.
    onRenderObject() {}//	OnRenderObject is called after camera has rendered the scene.
    onSerializeNetworkView() {}//	Used to customize synchronization of variables in a script watched by a network view.
    onServerInitialized() {}//	Called on the server whenever a Network.InitializeServer was invoked and has completed.
    onTransformChildrenChanged() {}//	This function is called when the list of children of the transform of the GameObject has changed.
    onTransformParentChanged() {}//	This function is called when the parent property of the transform of the GameObject has changed.
    onTriggerEnter() {}//	OnTriggerEnter is called when the Collider other enters the trigger.
    onTriggerEnter2D() {}//	Sent when another object enters a trigger collider attached to this object (2D physics only).
    onTriggerExit() {}//	OnTriggerExit is called when the Collider other has stopped touching the trigger.
    onTriggerExit2D() {}//	Sent when another object leaves a trigger collider attached to this object (2D physics only).
    onTriggerStay() {}//	OnTriggerStay is called once per frame for every Collider other that is touching the trigger.
    onTriggerStay2D() {}//	Sent each frame where another object is within a trigger collider attached to this object (2D physics only).
    onValidate() {}//	This function is called when the script is loaded or a value is changed in the inspector (Called in the editor only).
    onWillRenderObject() {}//	OnWillRenderObject is called for each camera if the object is visible.
    onReset() {}//	Reset to default values.
    onStart() {}//	Start is called on the frame when a script is enabled just before any of the Update methods is called the first time.
    onUpdate() {}//	Update is called every frame, if the MonoBehaviour is enabled.
    */
}

