export interface Post{
    category: any;
    _id:string;
    publishedAt: string;
    title: string;
    author: {
        name:string;
        image: string;
    };
    comments: Comment[];
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
    categories: Categorie[];
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    };
    publishedAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updateAt: string;
}

export interface Categorie {
    _id: string;
    title: string;
    description: string;
}