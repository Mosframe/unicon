// -----------------------------------------------------------------------------
// resources.ts
// -----------------------------------------------------------------------------
import * as UUID          from 'node-uuid';
import deprecated         from 'deprecated-decorator';

import {AsyncOperation  } from '../engine/async-operation';
import {GameObject      } from '../engine/game-object';
import {IType           } from '../engine/interfaces/type';
import {ResourceRequest } from '../engine/resource-request';
import {Ubject          } from '../engine/ubject';

/**
 * The Resources class allows you to find and access Objects including assets.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Resources
 */
export class Resources {

//   // [ Public Variables ]
//
//   // [ Constructors ]
//
//   // [ Public Functions ]
//
//   // [ Public Static Variables ]
//
//
//   // [ Public Static Functions ]
//
//   /**
//    * convertObjects
//    *
//    * @static
//    * @template T
//    * @param {Ubject[]} rawObjects
//    * @returns {T[]}
//    *
//    * @memberof Resources
//    */
//   static convertObjects<T extends Ubject>( rawObjects:Ubject[] ) : T[] {
//       let objArray:T[] = [];
//       if(!rawObjects) return objArray;
//       for( let index=0; index < objArray.length; ++index ) {
//           objArray[index] = <T>rawObjects[index];
//       }
//       return objArray;
//   }
//
//   /**
//    * Returns a list of all objects of Type type.
//    *
//    * @static
//    * @template T
//    * @param {IActivatable<T>} [type]
//    * @returns {T[]}
//    *
//    * @memberof Resources
//    */
//   public static findObjectsOfTypeAll<T extends Ubject>( type:string ) : T[] {
//
//       //if( !type ) {
//       //    let t:IType<T>;
//       //    type = t;
//       //}
//       return <T[]>Resources.convertObjects( Resources._findObjectsOfTypeAll(type) );
//   }
//   /**
//    * Loads an asset stored at path in a Resources folder.
//    *
//    * @static
//    * @template T
//    * @param {string} path Pathname of the target folder. When using the empty string (i.e., ""), the function will load the entire contents of the Resources folder.
//    * @returns {T}
//    *
//    * @memberof Resources
//    */
//   public static load<T extends Ubject>( path:string ) : T
//   {
//       let type:IType<T>;
//       return <T>Resources._load(path,type.toString());
//   }
//   /**
//    * Loads all assets in a folder or file at path in a Resources folder.
//    *
//    * @static
//    * @template T
//    * @param {string} path Pathname of the target folder. When using the empty string (i.e., ""), the function will load the entire contents of the Resources folder.
//    * @returns {T[]}
//    *
//    * @memberof Resources
//    */
//   public static loadAll<T extends Ubject>( path:string ) : T[]
//   {
//       let type:IType<T>;
//       return <T[]>Resources._loadAll( path, type.toString() );
//   }
//   /**
//    * Asynchronously loads an asset stored at path in a Resources folder.
//    *
//    * @static
//    * @template T
//    * @param {string} path Pathname of the target folder. When using the empty string (i.e., ""), the function will load the entire contents of the Resources folder.
//    * @returns {IterableIterator<ResourceRequest>}
//    *
//    * @memberof Resources
//    */
//   public static *loadAsync<T>( path:string ) : IterableIterator<ResourceRequest>
//   {
//       let type:IType<T>;
//       return Resources._loadAsync( path, type.toString() );
//   }
//
//   /**
//    * getBuiltinResource
//    *
//    * @static
//    * @template T
//    * @param {string} path
//    * @returns {T}
//    *
//    * @memberof Resources
//    */
//   public static getBuiltinResource<T extends Ubject>( path:string ) : T
//   {
//       let type:IType<T>;
//       return <T>Resources._getBuiltinResource( type.toString(), path );
//   }
//   /**
//    * Unloads assetToUnload from memory.
//    *
//    * @static
//    * @param {Ubject} assetToUnload
//    *
//    * @memberof Resources
//    */
//   public static unloadAsset( assetToUnload:Ubject ) {
//       if(assetToUnload) {
//           let type = Object.getPrototypeOf(assetToUnload).constructor.name;
//           delete Resources._assetsOfTypes[type];
//           delete Resources._assets[assetToUnload.assetGUID];
//           assetToUnload = null;
//       }
//   }
//   /**
//    * Unloads assets that are not used.
//    *
//    * @static
//    * @returns {IterableIterator<AsyncOperation>} Object on which you can yield to wait until the operation completes.
//    *
//    * @memberof Resources
//    */
//   public static *unloadUnusedAssets() : IterableIterator<AsyncOperation> {
//       // TODO : 상용안하는 리소스들 언로드
//       let request = new AsyncOperation();
//       for( let c=0; c<100; ++c ) {
//           request._progress = c;
//           yield request;
//       }
//   }
//
//
//   // [ Protected Variables ]
//
//   // [ Protected Functions ]
//
//   // [ Protected Static Variables ]
//
//   protected static _assets             : {[guid:string]:Ubject}   = {} ; // guid : asset list
//   protected static _assetsOfTypes      : {[type:string]:Ubject[]} = {} ; // type : asset list
//
//   // [ Protected Static Functions ]
//
//   private static _findObjectsOfTypeAll( type:string ) : Ubject[] {
//       return Resources._assetsOfTypes[type];
//   }
//
//   private static _load( path:string, type:string ) : Ubject {
//
//       let instance = new Ubject();
//
//       // TODO : 각종 리소스 로드
//       switch(type){
//       case 'Ubject':
//           break;
//       case 'GameObject':
//           break;
//       case 'Texture':
//           break;
//       default:
//           break;
//       }
//       return instance;
//   }
//
//   private static _loadAll( path:string, type:string ) : Ubject[] {
//
//       let list:Ubject[] = [];
//
//       // TODO : 폴더 파일리스트를 얻어와서 처리해야 한다.
//       for( let c=0; c<1; ++c ) {
//           list.push( Resources._load(path,type) );
//       }
//
//       return list;
//   }
//   private static *_loadAsync( path:string, type:string ) : IterableIterator<ResourceRequest> {
//
//       // TODO : 각종 리소스 로드
//       let request = new ResourceRequest();
//       for( let c=0; c<100; ++c ) {
//           request._progress = c;
//           yield request;
//       }
//   }
//   private static _getBuiltinResource( type:string, path:string ) : Ubject {
//       // TODO : 내장 리소스를 로딩
//       return new Ubject();
//   }
}
