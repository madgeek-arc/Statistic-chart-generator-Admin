import { distinctUntilChanged, filter, first, takeUntil } from 'rxjs/operators';
import { DbSchemaService } from './../db-schema-service/db-schema.service';
import { MappingProfilesService, Profile } from './../mapping-profiles-service/mapping-profiles.service';
import { UrlProviderService } from './../url-provider-service/url-provider.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { EntityNode, DynamicEntityNode, CachedEntityNode } from './../../form-components/select-attribute/dynamic-entity-tree/entity-tree-nodes.types';
import { Injectable, OnDestroy } from '@angular/core';

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
 @Injectable()
 export class DynamicTreeDatabase {
   
    public loading = false;
    
    // The cached data of a Profile's Entities
    public get entityMap(): Map<string, CachedEntityNode> { return this._entityMap$.getValue(); }
    private _entityMap$ = new BehaviorSubject<Map<string, CachedEntityNode>>(null);

    constructor(private http: HttpClient, private urlProvider: UrlProviderService,
      private profileMappingService: MappingProfilesService, private dbService: DbSchemaService)
    {
      this.profileMappingService.selectedProfile$.pipe(distinctUntilChanged()).subscribe((profile: Profile)=>{this.changeEntityMap(profile);});
    }
  
    private getEntityRelations( profile: Profile, entity: string ): Observable<CachedEntityNode> {
      // const entityRelationsUrl = 'http://stats.madgik.di.uoa.gr:8180/schema/' + profile.name +'/entities/' + entity;
      const entityRelationsUrl = this.urlProvider.serviceURL + '/schema/' + profile.name +'/entities/' + entity;
  
      return this.http.get<CachedEntityNode>(entityRelationsUrl);
    }
  
    changeEntityMap(profile: Profile) {
  
      this.dbService.getAvailableEntities(profile).pipe(first())
      .subscribe((entityNames: string[]) => {
          console.log("Dynamic Tree DB");
          var entityMap = new Map<string, CachedEntityNode>(new Map<string, CachedEntityNode>());
          
          var array$ = entityNames.map(entity => this.getEntityRelations(profile, entity).pipe(first()));
          forkJoin(array$).subscribe((cachedEntityNodes: CachedEntityNode[]) => {
            
            // forkJoin results are in the same sequence as its Observable inputs
            // As such the cachedEntityNodes are matched in size and index by the entityNames
            for (let index = 0; index < entityNames.length; index++)
              entityMap.set(entityNames[index], cachedEntityNodes[index]);

            console.log("Cached Entity Map :", entityMap);
            if(entityMap.size > 0)
              this._entityMap$.next(entityMap);
          });
        });
    }
   
    getRootNode(entity: string): BehaviorSubject<DynamicEntityNode> | undefined
    {
      var root = new BehaviorSubject<DynamicEntityNode>(null);

      // We only care for the first map that has entries, in order to get the root node.
      this._entityMap$.pipe(filter(map => map?.size > 0), first()).subscribe(map =>{
        
        if( map == null)
          return;

        var rootEntityNode = map.get(entity);
        
        if(rootEntityNode != null)
          root.next(new DynamicEntityNode(rootEntityNode.fields, rootEntityNode.name, [], null));
      })

      return root;
    }

    getChildren( entityNode: DynamicEntityNode ): BehaviorSubject<DynamicEntityNode[]> | undefined {
      var children: DynamicEntityNode[] = [];
      var children$ = new BehaviorSubject<DynamicEntityNode[]>(children);

      console.log("Requesting children of DynamicEntityNode:", entityNode);

      if(entityNode == null)
        return children$;
  
      // Get the cached version of the given Entity Node, out of the first map that has entries.
      this._entityMap$.pipe(filter(map => map.size > 0), first()).subscribe(map =>{
        
        if( map == null)
          return;

        var cachedEntityNode = map.get(entityNode.name);
        if(cachedEntityNode.relations != null)
        {
          // Get the relations of the cached Entity Node
          cachedEntityNode.relations.forEach(relationNodeName => {
              
            // Get a cached Entity Node as a relation of the given Entity Node
            var cachedRelationEntityNode = map.get(relationNodeName);
    
            if(map.has(relationNodeName))
            {
              // Clone the path of the parent Entity node
              var deeperPath = new Array<string>();
              entityNode.path.map(node => deeperPath.push(node));
              
              // Create a new Entity Node based on the cached Entity node and the parent path
              children.push(new DynamicEntityNode( cachedRelationEntityNode.fields, cachedRelationEntityNode.name, deeperPath, undefined, entityNode));
            }
          });
        }
        children$.next(children);
      });

      return children$;
    }
   
}