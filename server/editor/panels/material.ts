// -----------------------------------------------------------------------------
// material.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from '../gui/panel';
import { Button     as UIButton     }   from '../gui/button';
import { Number     as UINumber     }   from '../gui/number';
import { Div        as UIDiv        }   from '../gui/div';
import { Span       as UISpan       }   from '../gui/span';
import { Row        as UIRow        }   from '../gui/row';
import { Color      as UIColor      }   from '../gui/color';
import { Text       as UIText       }   from '../gui/text';
import { Break      as UIBreak      }   from '../gui/break';
import { Select     as UISelect     }   from '../gui/select';
import { Boolean    as UIBoolean    }   from '../gui/boolean';
import { Input      as UIInput      }   from '../gui/input';
import { Checkbox   as UICheckbox   }   from '../gui/checkbox';
import { TextArea   as UITextArea   }   from '../gui/text-area';
import { Outliner   as UIOutliner   }   from '../gui/outliner';
import { Texture    as UITexture    }   from '../gui/texture';
import { SetMaterialCommand         }   from '../commands/set-material-command';
import { SetMaterialValueCommand    }   from '../commands/set-material-value-command';
import { SetMaterialColorCommand    }   from '../commands/set-material-color-command';
import { SetMaterialMapCommand      }   from '../commands/set-material-map-command';
import { IEditor                    }   from '../interface';
import { ISignals                   }   from '../interface';
import { EditorPanel                }   from './editor';


/**
 * material panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class MaterialPanel
 * @extends {EditorPanel}
 */
export class MaterialPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'material' );

        let signals = editor.signals;
        let currentObject;

        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );
        this.setPaddingRight( '0px' );

        // New / Copy / Paste

        let copiedMaterial;
        let managerRow = new UIRow();

        managerRow.add( new UIText( '' ).setWidth( '90px' ) );
        managerRow.add( new UIButton( 'New' ).onClick( () => {

            let material = new THREE[ materialClass.getValue() ]();
            editor.execute( new SetMaterialCommand( currentObject, material ), 'New Material: ' + materialClass.getValue() );
            update();

        } ) );

        managerRow.add( new UIButton( 'Copy' ).setMarginLeft( '4px' ).onClick( () => {

            copiedMaterial = currentObject.material;

        } ) );

        managerRow.add( new UIButton( 'Paste' ).setMarginLeft( '4px' ).onClick( () => {

            if ( copiedMaterial === undefined ) return;

            editor.execute( new SetMaterialCommand( currentObject, copiedMaterial ), 'Pasted Material: ' + materialClass.getValue() );
            refreshUI();
            update();

        } ) );

        this.add( managerRow );


        // type

        let materialClassRow = new UIRow();
        let materialClass = new UISelect().setOptions( {

            'LineBasicMaterial'     : 'LineBasicMaterial',
            'LineDashedMaterial'    : 'LineDashedMaterial',
            'MeshBasicMaterial'     : 'MeshBasicMaterial',
            'MeshDepthMaterial'     : 'MeshDepthMaterial',
            'MeshNormalMaterial'    : 'MeshNormalMaterial',
            'MeshLambertMaterial'   : 'MeshLambertMaterial',
            'MeshPhongMaterial'     : 'MeshPhongMaterial',
            'MeshStandardMaterial'  : 'MeshStandardMaterial',
            'MeshPhysicalMaterial'  : 'MeshPhysicalMaterial',
            'ShaderMaterial'        : 'ShaderMaterial',
            'SpriteMaterial'        : 'SpriteMaterial'

        } ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

        materialClassRow.add( new UIText( 'Type' ).setWidth( '90px' ) );
        materialClassRow.add( materialClass );

        this.add( materialClassRow );

        // uuid

        let materialUUIDRow = new UIRow();
        let materialUUID = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
        let materialUUIDRenew = new UIButton( 'New' ).setMarginLeft( '7px' ).onClick( () => {

            materialUUID.setValue( THREE.Math.generateUUID() );
            update();

        } );

        materialUUIDRow.add( new UIText( 'UUID' ).setWidth( '90px' ) );
        materialUUIDRow.add( materialUUID );
        materialUUIDRow.add( materialUUIDRenew );

        this.add( materialUUIDRow );

        // name

        let materialNameRow = new UIRow();
        let materialName = new UIInput().setWidth( '150px' ).setFontSize( '12px' ).onChange( () => {

            editor.execute( new SetMaterialValueCommand( editor.selected, 'name', materialName.getValue() ) );

        } );

        materialNameRow.add( new UIText( 'Name' ).setWidth( '90px' ) );
        materialNameRow.add( materialName );

        this.add( materialNameRow );

        // program

        let materialProgramRow = new UIRow();
        materialProgramRow.add( new UIText( 'Program' ).setWidth( '90px' ) );

        let materialProgramInfo = new UIButton( 'Info' );
        materialProgramInfo.setMarginLeft( '4px' );
        materialProgramInfo.onClick( () => {

            signals.editScript.dispatch( currentObject, 'programInfo' );

        } );
        materialProgramRow.add( materialProgramInfo );

        let materialProgramVertex = new UIButton( 'Vertex' );
        materialProgramVertex.setMarginLeft( '4px' );
        materialProgramVertex.onClick( () => {

            signals.editScript.dispatch( currentObject, 'vertexShader' );

        } );
        materialProgramRow.add( materialProgramVertex );

        let materialProgramFragment = new UIButton( 'Fragment' );
        materialProgramFragment.setMarginLeft( '4px' );
        materialProgramFragment.onClick( () => {

            signals.editScript.dispatch( currentObject, 'fragmentShader' );

        } );
        materialProgramRow.add( materialProgramFragment );

        this.add( materialProgramRow );

        // color

        let materialColorRow = new UIRow();
        let materialColor = new UIColor().onChange( update );

        materialColorRow.add( new UIText( 'Color' ).setWidth( '90px' ) );
        materialColorRow.add( materialColor );

        this.add( materialColorRow );

        // roughness

        let materialRoughnessRow = new UIRow();
        let materialRoughness = new UINumber( 0.5 ).setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

        materialRoughnessRow.add( new UIText( 'Roughness' ).setWidth( '90px' ) );
        materialRoughnessRow.add( materialRoughness );

        this.add( materialRoughnessRow );

        // metalness

        let materialMetalnessRow = new UIRow();
        let materialMetalness = new UINumber( 0.5 ).setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

        materialMetalnessRow.add( new UIText( 'Metalness' ).setWidth( '90px' ) );
        materialMetalnessRow.add( materialMetalness );

        this.add( materialMetalnessRow );

        // emissive

        let materialEmissiveRow = new UIRow();
        let materialEmissive = new UIColor().setHexValue( 0x000000 ).onChange( update );

        materialEmissiveRow.add( new UIText( 'Emissive' ).setWidth( '90px' ) );
        materialEmissiveRow.add( materialEmissive );

        this.add( materialEmissiveRow );

        // specular

        let materialSpecularRow = new UIRow();
        let materialSpecular = new UIColor().setHexValue( 0x111111 ).onChange( update );

        materialSpecularRow.add( new UIText( 'Specular' ).setWidth( '90px' ) );
        materialSpecularRow.add( materialSpecular );

        this.add( materialSpecularRow );

        // shininess

        let materialShininessRow = new UIRow();
        let materialShininess = new UINumber( 30 ).onChange( update );

        materialShininessRow.add( new UIText( 'Shininess' ).setWidth( '90px' ) );
        materialShininessRow.add( materialShininess );

        this.add( materialShininessRow );

        // clearCoat

        let materialClearCoatRow = new UIRow();
        let materialClearCoat = new UINumber( 1 ).setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

        materialClearCoatRow.add( new UIText( 'ClearCoat' ).setWidth( '90px' ) );
        materialClearCoatRow.add( materialClearCoat );

        this.add( materialClearCoatRow );

        // clearCoatRoughness

        let materialClearCoatRoughnessRow = new UIRow();
        let materialClearCoatRoughness = new UINumber( 1 ).setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

        materialClearCoatRoughnessRow.add( new UIText( 'ClearCoat Roughness' ).setWidth( '90px' ) );
        materialClearCoatRoughnessRow.add( materialClearCoatRoughness );

        this.add( materialClearCoatRoughnessRow );

        // vertex colors

        let materialVertexColorsRow = new UIRow();
        let materialVertexColors = new UISelect().setOptions( {

            0: 'No',
            1: 'Face',
            2: 'Vertex'

        } ).onChange( update );

        materialVertexColorsRow.add( new UIText( 'Vertex Colors' ).setWidth( '90px' ) );
        materialVertexColorsRow.add( materialVertexColors );

        this.add( materialVertexColorsRow );

        // skinning

        let materialSkinningRow = new UIRow();
        let materialSkinning = new UICheckbox( false ).onChange( update );

        materialSkinningRow.add( new UIText( 'Skinning' ).setWidth( '90px' ) );
        materialSkinningRow.add( materialSkinning );

        this.add( materialSkinningRow );

        // map

        let materialMapRow = new UIRow();
        let materialMapEnabled = new UICheckbox( false ).onChange( update );
        let materialMap = new UITexture().onChange( update );

        materialMapRow.add( new UIText( 'Map' ).setWidth( '90px' ) );
        materialMapRow.add( materialMapEnabled );
        materialMapRow.add( materialMap );

        this.add( materialMapRow );

        // alpha map

        let materialAlphaMapRow = new UIRow();
        let materialAlphaMapEnabled = new UICheckbox( false ).onChange( update );
        let materialAlphaMap = new UITexture().onChange( update );

        materialAlphaMapRow.add( new UIText( 'Alpha Map' ).setWidth( '90px' ) );
        materialAlphaMapRow.add( materialAlphaMapEnabled );
        materialAlphaMapRow.add( materialAlphaMap );

        this.add( materialAlphaMapRow );

        // bump map

        let materialBumpMapRow = new UIRow();
        let materialBumpMapEnabled = new UICheckbox( false ).onChange( update );
        let materialBumpMap = new UITexture().onChange( update );
        let materialBumpScale = new UINumber( 1 ).setWidth( '30px' ).onChange( update );

        materialBumpMapRow.add( new UIText( 'Bump Map' ).setWidth( '90px' ) );
        materialBumpMapRow.add( materialBumpMapEnabled );
        materialBumpMapRow.add( materialBumpMap );
        materialBumpMapRow.add( materialBumpScale );

        this.add( materialBumpMapRow );

        // normal map

        let materialNormalMapRow = new UIRow();
        let materialNormalMapEnabled = new UICheckbox( false ).onChange( update );
        let materialNormalMap = new UITexture().onChange( update );

        materialNormalMapRow.add( new UIText( 'Normal Map' ).setWidth( '90px' ) );
        materialNormalMapRow.add( materialNormalMapEnabled );
        materialNormalMapRow.add( materialNormalMap );

        this.add( materialNormalMapRow );

        // displacement map

        let materialDisplacementMapRow = new UIRow();
        let materialDisplacementMapEnabled = new UICheckbox( false ).onChange( update );
        let materialDisplacementMap = new UITexture().onChange( update );
        let materialDisplacementScale = new UINumber( 1 ).setWidth( '30px' ).onChange( update );

        materialDisplacementMapRow.add( new UIText( 'Displace Map' ).setWidth( '90px' ) );
        materialDisplacementMapRow.add( materialDisplacementMapEnabled );
        materialDisplacementMapRow.add( materialDisplacementMap );
        materialDisplacementMapRow.add( materialDisplacementScale );

        this.add( materialDisplacementMapRow );

        // roughness map

        let materialRoughnessMapRow = new UIRow();
        let materialRoughnessMapEnabled = new UICheckbox( false ).onChange( update );
        let materialRoughnessMap = new UITexture().onChange( update );

        materialRoughnessMapRow.add( new UIText( 'Rough. Map' ).setWidth( '90px' ) );
        materialRoughnessMapRow.add( materialRoughnessMapEnabled );
        materialRoughnessMapRow.add( materialRoughnessMap );

        this.add( materialRoughnessMapRow );

        // metalness map

        let materialMetalnessMapRow = new UIRow();
        let materialMetalnessMapEnabled = new UICheckbox( false ).onChange( update );
        let materialMetalnessMap = new UITexture().onChange( update );

        materialMetalnessMapRow.add( new UIText( 'Metal. Map' ).setWidth( '90px' ) );
        materialMetalnessMapRow.add( materialMetalnessMapEnabled );
        materialMetalnessMapRow.add( materialMetalnessMap );

        this.add( materialMetalnessMapRow );

        // specular map

        let materialSpecularMapRow = new UIRow();
        let materialSpecularMapEnabled = new UICheckbox( false ).onChange( update );
        let materialSpecularMap = new UITexture().onChange( update );

        materialSpecularMapRow.add( new UIText( 'Specular Map' ).setWidth( '90px' ) );
        materialSpecularMapRow.add( materialSpecularMapEnabled );
        materialSpecularMapRow.add( materialSpecularMap );

        this.add( materialSpecularMapRow );

        // env map

        let materialEnvMapRow = new UIRow();
        let materialEnvMapEnabled = new UICheckbox( false ).onChange( update );
        let materialEnvMap = new UITexture( THREE.SphericalReflectionMapping ).onChange( update );
        let materialReflectivity = new UINumber( 1 ).setWidth( '30px' ).onChange( update );

        materialEnvMapRow.add( new UIText( 'Env Map' ).setWidth( '90px' ) );
        materialEnvMapRow.add( materialEnvMapEnabled );
        materialEnvMapRow.add( materialEnvMap );
        materialEnvMapRow.add( materialReflectivity );

        this.add( materialEnvMapRow );

        // light map

        let materialLightMapRow = new UIRow();
        let materialLightMapEnabled = new UICheckbox( false ).onChange( update );
        let materialLightMap = new UITexture().onChange( update );

        materialLightMapRow.add( new UIText( 'Light Map' ).setWidth( '90px' ) );
        materialLightMapRow.add( materialLightMapEnabled );
        materialLightMapRow.add( materialLightMap );

        this.add( materialLightMapRow );

        // ambient occlusion map

        let materialAOMapRow = new UIRow();
        let materialAOMapEnabled = new UICheckbox( false ).onChange( update );
        let materialAOMap = new UITexture().onChange( update );
        let materialAOScale = new UINumber( 1 ).setRange( 0, 1 ).setWidth( '30px' ).onChange( update );

        materialAOMapRow.add( new UIText( 'AO Map' ).setWidth( '90px' ) );
        materialAOMapRow.add( materialAOMapEnabled );
        materialAOMapRow.add( materialAOMap );
        materialAOMapRow.add( materialAOScale );

        this.add( materialAOMapRow );

        // emissive map

        let materialEmissiveMapRow = new UIRow();
        let materialEmissiveMapEnabled = new UICheckbox( false ).onChange( update );
        let materialEmissiveMap = new UITexture().onChange( update );

        materialEmissiveMapRow.add( new UIText( 'Emissive Map' ).setWidth( '90px' ) );
        materialEmissiveMapRow.add( materialEmissiveMapEnabled );
        materialEmissiveMapRow.add( materialEmissiveMap );

        this.add( materialEmissiveMapRow );

        // side

        let materialSideRow = new UIRow();
        let materialSide = new UISelect().setOptions( {

            0: 'Front',
            1: 'Back',
            2: 'Double'

        } ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

        materialSideRow.add( new UIText( 'Side' ).setWidth( '90px' ) );
        materialSideRow.add( materialSide );

        this.add( materialSideRow );

        // shading

        let materialShadingRow = new UIRow();
        let materialShading = new UISelect().setOptions( {

            0: 'No',
            1: 'Flat',
            2: 'Smooth'

        } ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

        materialShadingRow.add( new UIText( 'Shading' ).setWidth( '90px' ) );
        materialShadingRow.add( materialShading );

        this.add( materialShadingRow );

        // blending

        let materialBlendingRow = new UIRow();
        let materialBlending = new UISelect().setOptions( {

            0: 'No',
            1: 'Normal',
            2: 'Additive',
            3: 'Subtractive',
            4: 'Multiply',
            5: 'Custom'

        } ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

        materialBlendingRow.add( new UIText( 'Blending' ).setWidth( '90px' ) );
        materialBlendingRow.add( materialBlending );

        this.add( materialBlendingRow );

        // opacity

        let materialOpacityRow = new UIRow();
        let materialOpacity = new UINumber( 1 ).setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

        materialOpacityRow.add( new UIText( 'Opacity' ).setWidth( '90px' ) );
        materialOpacityRow.add( materialOpacity );

        this.add( materialOpacityRow );

        // transparent

        let materialTransparentRow = new UIRow();
        let materialTransparent = new UICheckbox().setLeft( '100px' ).onChange( update );

        materialTransparentRow.add( new UIText( 'Transparent' ).setWidth( '90px' ) );
        materialTransparentRow.add( materialTransparent );

        this.add( materialTransparentRow );

        // alpha test

        let materialAlphaTestRow = new UIRow();
        let materialAlphaTest = new UINumber().setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

        materialAlphaTestRow.add( new UIText( 'Alpha Test' ).setWidth( '90px' ) );
        materialAlphaTestRow.add( materialAlphaTest );

        this.add( materialAlphaTestRow );

        // wireframe

        let materialWireframeRow = new UIRow();
        let materialWireframe = new UICheckbox( false ).onChange( update );
        let materialWireframeLinewidth = new UINumber( 1 ).setWidth( '60px' ).setRange( 0, 100 ).onChange( update );

        materialWireframeRow.add( new UIText( 'Wireframe' ).setWidth( '90px' ) );
        materialWireframeRow.add( materialWireframe );
        materialWireframeRow.add( materialWireframeLinewidth );

        this.add( materialWireframeRow );

        //

        function update() {

            let object = currentObject;

            let geometry = object.geometry;
            let material = object.material;

            let textureWarning = false;
            let objectHasUvs = false;

            if ( object instanceof THREE.Sprite ) objectHasUvs = true;
            if ( geometry instanceof THREE.Geometry && geometry.faceVertexUvs[ 0 ].length > 0 ) objectHasUvs = true;
            if ( geometry instanceof THREE.BufferGeometry && (<any>geometry.attributes).uv !== undefined ) objectHasUvs = true;

            if ( material ) {

                if ( material.uuid !== undefined && material.uuid !== materialUUID.getValue() ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'uuid', materialUUID.getValue() ) );

                }

                if ( material instanceof THREE[ materialClass.getValue() ] === false ) {

                    material = new THREE[ materialClass.getValue() ]();

                    editor.execute( new SetMaterialCommand( currentObject, material ), 'New Material: ' + materialClass.getValue() );
                    // TODO Copy other references in the scene graph
                    // keeping name and UUID then.
                    // Also there should be means to create a unique
                    // copy for the current object explicitly and to
                    // attach the current material to other objects.

                }

                if ( material.color !== undefined && material.color.getHex() !== materialColor.getHexValue() ) {

                    editor.execute( new SetMaterialColorCommand( currentObject, 'color', materialColor.getHexValue() ) );

                }

                if ( material.roughness !== undefined && Math.abs( material.roughness - materialRoughness.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'roughness', materialRoughness.getValue() ) );

                }

                if ( material.metalness !== undefined && Math.abs( material.metalness - materialMetalness.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'metalness', materialMetalness.getValue() ) );

                }

                if ( material.emissive !== undefined && material.emissive.getHex() !== materialEmissive.getHexValue() ) {

                    editor.execute( new SetMaterialColorCommand( currentObject, 'emissive', materialEmissive.getHexValue() ) );

                }

                if ( material.specular !== undefined && material.specular.getHex() !== materialSpecular.getHexValue() ) {

                    editor.execute( new SetMaterialColorCommand( currentObject, 'specular', materialSpecular.getHexValue() ) );

                }

                if ( material.shininess !== undefined && Math.abs( material.shininess - materialShininess.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'shininess', materialShininess.getValue() ) );

                }

                if ( material.clearCoat !== undefined && Math.abs( material.clearCoat - materialClearCoat.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'clearCoat', materialClearCoat.getValue() ) );

                }

                if ( material.clearCoatRoughness !== undefined && Math.abs( material.clearCoatRoughness - materialClearCoatRoughness.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'clearCoatRoughness', materialClearCoatRoughness.getValue() ) );

                }

                if ( material.vertexColors !== undefined ) {

                    let vertexColors = parseInt( materialVertexColors.getValue() );

                    if ( material.vertexColors !== vertexColors ) {

                        editor.execute( new SetMaterialValueCommand( currentObject, 'vertexColors', vertexColors ) );

                    }

                }

                if ( material.skinning !== undefined && material.skinning !== materialSkinning.getValue() ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'skinning', materialSkinning.getValue() ) );

                }

                if ( material.map !== undefined ) {

                    let mapEnabled = materialMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let map = mapEnabled ? materialMap.getValue() : null;
                        if ( material.map !== map ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'map', map ) );

                        }

                    } else {

                        if ( mapEnabled ) textureWarning = true;

                    }

                }

                if ( material.alphaMap !== undefined ) {

                    let mapEnabled = materialAlphaMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let alphaMap = mapEnabled ? materialAlphaMap.getValue() : null;
                        if ( material.alphaMap !== alphaMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'alphaMap', alphaMap ) );

                        }

                    } else {

                        if ( mapEnabled ) textureWarning = true;

                    }

                }

                if ( material.bumpMap !== undefined ) {

                    let bumpMapEnabled = materialBumpMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let bumpMap = bumpMapEnabled ? materialBumpMap.getValue() : null;
                        if ( material.bumpMap !== bumpMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'bumpMap', bumpMap ) );

                        }

                        if ( material.bumpScale !== materialBumpScale.getValue() ) {

                            editor.execute( new SetMaterialValueCommand( currentObject, 'bumpScale', materialBumpScale.getValue() ) );

                        }

                    } else {

                        if ( bumpMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.normalMap !== undefined ) {

                    let normalMapEnabled = materialNormalMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let normalMap = normalMapEnabled ? materialNormalMap.getValue() : null;
                        if ( material.normalMap !== normalMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'normalMap', normalMap ) );

                        }

                    } else {

                        if ( normalMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.displacementMap !== undefined ) {

                    let displacementMapEnabled = materialDisplacementMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let displacementMap = displacementMapEnabled ? materialDisplacementMap.getValue() : null;
                        if ( material.displacementMap !== displacementMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'displacementMap', displacementMap ) );

                        }

                        if ( material.displacementScale !== materialDisplacementScale.getValue() ) {

                            editor.execute( new SetMaterialValueCommand( currentObject, 'displacementScale', materialDisplacementScale.getValue() ) );

                        }

                    } else {

                        if ( displacementMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.roughnessMap !== undefined ) {

                    let roughnessMapEnabled = materialRoughnessMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let roughnessMap = roughnessMapEnabled ? materialRoughnessMap.getValue() : null;
                        if ( material.roughnessMap !== roughnessMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'roughnessMap', roughnessMap ) );

                        }

                    } else {

                        if ( roughnessMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.metalnessMap !== undefined ) {

                    let metalnessMapEnabled = materialMetalnessMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let metalnessMap = metalnessMapEnabled ? materialMetalnessMap.getValue() : null;
                        if ( material.metalnessMap !== metalnessMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'metalnessMap', metalnessMap ) );

                        }

                    } else {

                        if ( metalnessMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.specularMap !== undefined ) {

                    let specularMapEnabled = materialSpecularMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let specularMap = specularMapEnabled ? materialSpecularMap.getValue() : null;
                        if ( material.specularMap !== specularMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'specularMap', specularMap ) );

                        }

                    } else {

                        if ( specularMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.envMap !== undefined ) {

                    let envMapEnabled = materialEnvMapEnabled.getValue() === true;

                    let envMap = envMapEnabled ? materialEnvMap.getValue() : null;

                    if ( material.envMap !== envMap ) {

                        editor.execute( new SetMaterialMapCommand( currentObject, 'envMap', envMap ) );

                    }

                }

                if ( material.reflectivity !== undefined ) {

                    let reflectivity = materialReflectivity.getValue();

                    if ( material.reflectivity !== reflectivity ) {

                        editor.execute( new SetMaterialValueCommand( currentObject, 'reflectivity', reflectivity ) );

                    }

                }

                if ( material.lightMap !== undefined ) {

                    let lightMapEnabled = materialLightMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let lightMap = lightMapEnabled ? materialLightMap.getValue() : null;
                        if ( material.lightMap !== lightMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'lightMap', lightMap ) );

                        }

                    } else {

                        if ( lightMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.aoMap !== undefined ) {

                    let aoMapEnabled = materialAOMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let aoMap = aoMapEnabled ? materialAOMap.getValue() : null;
                        if ( material.aoMap !== aoMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'aoMap', aoMap ) );

                        }

                        if ( material.aoMapIntensity !== materialAOScale.getValue() ) {

                            editor.execute( new SetMaterialValueCommand( currentObject, 'aoMapIntensity', materialAOScale.getValue() ) );

                        }

                    } else {

                        if ( aoMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.emissiveMap !== undefined ) {

                    let emissiveMapEnabled = materialEmissiveMapEnabled.getValue() === true;

                    if ( objectHasUvs ) {

                        let emissiveMap = emissiveMapEnabled ? materialEmissiveMap.getValue() : null;
                        if ( material.emissiveMap !== emissiveMap ) {

                            editor.execute( new SetMaterialMapCommand( currentObject, 'emissiveMap', emissiveMap ) );

                        }

                    } else {

                        if ( emissiveMapEnabled ) textureWarning = true;

                    }

                }

                if ( material.side !== undefined ) {

                    let side = parseInt( materialSide.getValue() );
                    if ( material.side !== side ) {

                        editor.execute( new SetMaterialValueCommand( currentObject, 'side', side ) );

                    }


                }

                if ( material.shading !== undefined ) {

                    let shading = parseInt( materialShading.getValue() );
                    if ( material.shading !== shading ) {

                        editor.execute( new SetMaterialValueCommand( currentObject, 'shading', shading ) );

                    }

                }

                if ( material.blending !== undefined ) {

                    let blending = parseInt( materialBlending.getValue() );
                    if ( material.blending !== blending ) {

                        editor.execute( new SetMaterialValueCommand( currentObject, 'blending', blending ) );

                    }

                }

                if ( material.opacity !== undefined && Math.abs( material.opacity - materialOpacity.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'opacity', materialOpacity.getValue() ) );

                }

                if ( material.transparent !== undefined && material.transparent !== materialTransparent.getValue() ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'transparent', materialTransparent.getValue() ) );

                }

                if ( material.alphaTest !== undefined && Math.abs( material.alphaTest - materialAlphaTest.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'alphaTest', materialAlphaTest.getValue() ) );

                }

                if ( material.wireframe !== undefined && material.wireframe !== materialWireframe.getValue() ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'wireframe', materialWireframe.getValue() ) );

                }

                if ( material.wireframeLinewidth !== undefined && Math.abs( material.wireframeLinewidth - materialWireframeLinewidth.getValue() ) >= 0.01 ) {

                    editor.execute( new SetMaterialValueCommand( currentObject, 'wireframeLinewidth', materialWireframeLinewidth.getValue() ) );

                }

                refreshUI();

            }

            if ( textureWarning ) {

                console.warn( "Can't set texture, model doesn't have texture coordinates" );

            }

        }

        //

        function setRowVisibility() {

            let properties = {
                'name'                  : materialNameRow,
                'color'                 : materialColorRow,
                'roughness'             : materialRoughnessRow,
                'metalness'             : materialMetalnessRow,
                'emissive'              : materialEmissiveRow,
                'specular'              : materialSpecularRow,
                'shininess'             : materialShininessRow,
                'clearCoat'             : materialClearCoatRow,
                'clearCoatRoughness'    : materialClearCoatRoughnessRow,
                'vertexShader'          : materialProgramRow,
                'vertexColors'          : materialVertexColorsRow,
                'skinning'              : materialSkinningRow,
                'map'                   : materialMapRow,
                'alphaMap'              : materialAlphaMapRow,
                'bumpMap'               : materialBumpMapRow,
                'normalMap'             : materialNormalMapRow,
                'displacementMap'       : materialDisplacementMapRow,
                'roughnessMap'          : materialRoughnessMapRow,
                'metalnessMap'          : materialMetalnessMapRow,
                'specularMap'           : materialSpecularMapRow,
                'envMap'                : materialEnvMapRow,
                'lightMap'              : materialLightMapRow,
                'aoMap'                 : materialAOMapRow,
                'emissiveMap'           : materialEmissiveMapRow,
                'side'                  : materialSideRow,
                'shading'               : materialShadingRow,
                'blending'              : materialBlendingRow,
                'opacity'               : materialOpacityRow,
                'transparent'           : materialTransparentRow,
                'alphaTest'             : materialAlphaTestRow,
                'wireframe'             : materialWireframeRow
            };

            let material = currentObject.material;

            for ( let property in properties ) {

                properties[ property ].setDisplay( material[ property ] !== undefined ? '' : 'none' );

            }

        }


        function refreshUI( resetTextureSelectors?:any ) {

            if ( ! currentObject ) return;

            let material = currentObject.material;

            if ( material.uuid !== undefined ) {

                materialUUID.setValue( material.uuid );

            }

            if ( material.name !== undefined ) {

                materialName.setValue( material.name );

            }

            materialClass.setValue( material.type );

            if ( material.color !== undefined ) {

                materialColor.setHexValue( material.color.getHexString() );

            }

            if ( material.roughness !== undefined ) {

                materialRoughness.setValue( material.roughness );

            }

            if ( material.metalness !== undefined ) {

                materialMetalness.setValue( material.metalness );

            }

            if ( material.emissive !== undefined ) {

                materialEmissive.setHexValue( material.emissive.getHexString() );

            }

            if ( material.specular !== undefined ) {

                materialSpecular.setHexValue( material.specular.getHexString() );

            }

            if ( material.shininess !== undefined ) {

                materialShininess.setValue( material.shininess );

            }

            if ( material.clearCoat !== undefined ) {

                materialClearCoat.setValue( material.clearCoat );

            }

            if ( material.clearCoatRoughness !== undefined ) {

                materialClearCoatRoughness.setValue( material.clearCoatRoughness );

            }

            if ( material.vertexColors !== undefined ) {

                materialVertexColors.setValue( material.vertexColors );

            }

            if ( material.skinning !== undefined ) {

                materialSkinning.setValue( material.skinning );

            }

            if ( material.map !== undefined ) {

                materialMapEnabled.setValue( material.map !== null );

                if ( material.map !== null || resetTextureSelectors ) {

                    materialMap.setValue( material.map );

                }

            }

            if ( material.alphaMap !== undefined ) {

                materialAlphaMapEnabled.setValue( material.alphaMap !== null );

                if ( material.alphaMap !== null || resetTextureSelectors ) {

                    materialAlphaMap.setValue( material.alphaMap );

                }

            }

            if ( material.bumpMap !== undefined ) {

                materialBumpMapEnabled.setValue( material.bumpMap !== null );

                if ( material.bumpMap !== null || resetTextureSelectors ) {

                    materialBumpMap.setValue( material.bumpMap );

                }

                materialBumpScale.setValue( material.bumpScale );

            }

            if ( material.normalMap !== undefined ) {

                materialNormalMapEnabled.setValue( material.normalMap !== null );

                if ( material.normalMap !== null || resetTextureSelectors ) {

                    materialNormalMap.setValue( material.normalMap );

                }

            }

            if ( material.displacementMap !== undefined ) {

                materialDisplacementMapEnabled.setValue( material.displacementMap !== null );

                if ( material.displacementMap !== null || resetTextureSelectors ) {

                    materialDisplacementMap.setValue( material.displacementMap );

                }

                materialDisplacementScale.setValue( material.displacementScale );

            }

            if ( material.roughnessMap !== undefined ) {

                materialRoughnessMapEnabled.setValue( material.roughnessMap !== null );

                if ( material.roughnessMap !== null || resetTextureSelectors ) {

                    materialRoughnessMap.setValue( material.roughnessMap );

                }

            }

            if ( material.metalnessMap !== undefined ) {

                materialMetalnessMapEnabled.setValue( material.metalnessMap !== null );

                if ( material.metalnessMap !== null || resetTextureSelectors ) {

                    materialMetalnessMap.setValue( material.metalnessMap );

                }

            }

            if ( material.specularMap !== undefined ) {

                materialSpecularMapEnabled.setValue( material.specularMap !== null );

                if ( material.specularMap !== null || resetTextureSelectors ) {

                    materialSpecularMap.setValue( material.specularMap );

                }

            }

            if ( material.envMap !== undefined ) {

                materialEnvMapEnabled.setValue( material.envMap !== null );

                if ( material.envMap !== null || resetTextureSelectors ) {

                    materialEnvMap.setValue( material.envMap );

                }

            }

            if ( material.reflectivity !== undefined ) {

                materialReflectivity.setValue( material.reflectivity );

            }

            if ( material.lightMap !== undefined ) {

                materialLightMapEnabled.setValue( material.lightMap !== null );

                if ( material.lightMap !== null || resetTextureSelectors ) {

                    materialLightMap.setValue( material.lightMap );

                }

            }

            if ( material.aoMap !== undefined ) {

                materialAOMapEnabled.setValue( material.aoMap !== null );

                if ( material.aoMap !== null || resetTextureSelectors ) {

                    materialAOMap.setValue( material.aoMap );

                }

                materialAOScale.setValue( material.aoMapIntensity );

            }

            if ( material.emissiveMap !== undefined ) {

                materialEmissiveMapEnabled.setValue( material.emissiveMap !== null );

                if ( material.emissiveMap !== null || resetTextureSelectors ) {

                    materialEmissiveMap.setValue( material.emissiveMap );

                }

            }

            if ( material.side !== undefined ) {

                materialSide.setValue( material.side );

            }

            if ( material.shading !== undefined ) {

                materialShading.setValue( material.shading );

            }

            if ( material.blending !== undefined ) {

                materialBlending.setValue( material.blending );

            }

            if ( material.opacity !== undefined ) {

                materialOpacity.setValue( material.opacity );

            }

            if ( material.transparent !== undefined ) {

                materialTransparent.setValue( material.transparent );

            }

            if ( material.alphaTest !== undefined ) {

                materialAlphaTest.setValue( material.alphaTest );

            }

            if ( material.wireframe !== undefined ) {

                materialWireframe.setValue( material.wireframe );

            }

            if ( material.wireframeLinewidth !== undefined ) {

                materialWireframeLinewidth.setValue( material.wireframeLinewidth );

            }

            setRowVisibility();

        }

        // events

        signals.objectSelected.add( ( object ) => {

            if ( object && object.material &&
                Array.isArray( object.material ) === false ) {

                let objectChanged = object !== currentObject;

                currentObject = object;
                refreshUI( objectChanged );
                this.setDisplay( '' );

            } else {

                currentObject = null;
                this.setDisplay( 'none' );

            }

        } );

        signals.materialChanged.add( () => {

            refreshUI();

        } );

    }
}
