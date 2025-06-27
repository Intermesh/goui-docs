import {DateTime, Store} from "@intermesh/goui"

interface DemoStoreRecord {
	number: number,
	description: string
	createdAt: string
}

const records: DemoStoreRecord[] = [];

for (let i = 1; i <= 100; i++) {
	records.push({
		number: i,
		description: (Math.random() + 1).toString(36).substring(7),
		createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format("c")
	});
}

export class PagingStore extends Store<DemoStoreRecord> {
	hasNext(): boolean {
		return this.pos < 90;
	}

	hasPrevious(): boolean {
		return this.pos > 0;
	}

	private pos = -10;
	private pageSize = 10;

	async loadPrevious() {
		this.pos -= this.pageSize;
		this.loadData(records.slice(this.pos, this.pos + this.pageSize), false);
		return records;
	}

	async loadNext(append: boolean = false) {
		this.pos += this.pageSize;
		this.loadData(records.slice(this.pos, this.pos + this.pageSize), false);
		return records;
	}
}