// -----------------------------------------------------------------------------
// selection-mode.ts
// -----------------------------------------------------------------------------

/**
 * SelectionMode can be used to tweak the selection returned by Selection.GetTransforms.
 *
 * The default transform selection mode is: SelectionMode.TopLevel | SelectionMode.ExcludePrefab | SelectionMode.Editable.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @enum {number}
 */
export enum SelectionMode {
    /** Return the whole selection. */
    Unfiltered,
    /** Only return the topmost selected transform. A selected child of another selected transform will be filtered out. */
    TopLevel,
    /** Return the selection and all child transforms of the selection. */
    Deep,
    /** Excludes any prefabs from the selection. */
    ExcludePrefab,
    /** Excludes any objects which shall not be modified. */
    Editable,
    /** Only return objects that are assets in the Asset directory. */
    Assets,
    /** If the selection contains folders, also include all assets and subfolders within that folder in the file hierarchy. */
    DeepAssets,
}