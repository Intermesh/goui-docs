import {
	AbstractDataSource,
	ArrayUtil,
	BaseEntity,
	browserStoreConnection,
	Changes,
	CommitResponse,
	DateTime,
	EntityID,
	GetResponse, MergeResponse,
	QueryParams,
	QueryResponse,
	SetRequest
} from "@intermesh/goui";

const data: Record<EntityID, DemoEntity> = {};


const groups = [];
for (let i = 0; i < 50; i++) {
	groups.push("Group " + i);
}

const max = 200, topLevel = Math.floor(max*0.1);

for (let i = 1; i <= max; i++) {
	let demo: DemoEntity = {
		id: i + "",
		parentId: i < topLevel ? undefined : (Math.floor(Math.random() * (max-topLevel)) + 1) + "",
		name: "Test " + i,
		group: groups[Math.floor(Math.random() * 50)],
		createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format('c')
	};

	data[demo.id] = demo;
}

/**
 * This Demo data source fill itself with 10 Demo records
 */
export class DemoDataSource extends AbstractDataSource<DemoEntity> {

	/**
	 * Don't store it in the browser storage
	 */
	persist = false;

	protected async internalCommit(params: SetRequest<DemoEntity>) {

		console.log("commit", params);

		const state = await this.getState();

		for(let id in params.update) {
			data[id] = Object.assign(data[id], params.update[id]);
		}

		for(let id in params.create) {
			data[id] = params.create[id] as DemoEntity;
		}

		params.destroy.forEach(entityId => {
			delete data[entityId];
		})

		return {
			updated: params.update,
			created: params.create,
			destroyed: params.destroy,
			newState: state!,
			oldState: state!
		} as CommitResponse<DemoEntity>;
	}

	protected internalGet(ids: string[]) {
		// Normal stores would fetch data from a remote source here
		const ret: GetResponse<DemoEntity> = {
			list: [],
			notFound: [],
			state: "1"
		};

		ids.forEach((id) => {
			ret.list.push(data[id]);
		})

		return Promise.resolve(ret);
	}

	protected internalUpdate() {
		// Normal stores would check for changes on a remote source here
		return Promise.resolve({});
	}

	protected internalQuery(params: QueryParams): Promise<QueryResponse> {
		// this Demo store returns the 10 Demo id's
		let ids: EntityID[] = [];

		const d = Object.values(data);

		const sorted = params.sort ? ArrayUtil.multiSort(d, params.sort) : d;

		if (params.filter) {
			//dummy filter that matches propery names
			sorted.forEach((e) => {
				let pass = true;
				for (let filterName in params.filter) {

					if(filterName == "parentId") {
						if (params.filter[filterName] !== e[filterName]) {
							pass = false;
							break;
						}
					} else {
						if (e[filterName].toLowerCase().indexOf(params.filter[filterName].toLowerCase()) == -1) {
							pass = false;
							break;
						}
					}
				}

				if (pass) {
					ids.push(e.id);
				}
			});

		} else {
			ids = sorted.map((e) => e.id);
		}

		if (params.limit) {
			params.position = params.position ?? 0;
			ids = ids.slice(params.position, params.position + params.limit)
		}

		return new Promise((resolve) => {
			// fake network delay
			setTimeout(() => {
				resolve({ids: ids, queryState: "1"});
			}, 0) //set fake network timeout
		});
	}

	protected internalRemoteChanges(): Promise<Changes> {
		return Promise.resolve({
			newState: "1",
			oldState: "1"
		});
	}

	protected internalMerge(ids: EntityID[]): Promise<MergeResponse<DemoEntity>> {
		throw "notimplemented";
	}

}

export interface DemoEntity extends BaseEntity {
	name: string,
	parentId?: string,
	createdAt: string,
	group: string
}

export const demoDataSource = new DemoDataSource("DemoId");