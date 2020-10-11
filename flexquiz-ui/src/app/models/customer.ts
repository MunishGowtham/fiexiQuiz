export class Customer {
    albumId: number = 0;
    id: number = 0;
    title: string = '';
    url: string = '';
    thumbnailUrl: string = 's';
    constructor(private data) {
        this.albumId = data.albumId;
        this.id = data.id;
        this.title = data.title;
        this.url = data.url;
        this.thumbnailUrl = data.thumbnailUrl;
    }
}
