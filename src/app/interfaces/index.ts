export interface NewsResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:      Source;
    author?:     string;
    title:       string;
    description?:string;
    url:         string;
    urlToImage?: string;
    publishedAt: Date;
    content?:    string;
}

export interface Source {
    id?:  string;
    name: string;
}


export interface ArticlesByCategoryAndPage{
    [key:string]:{
        page:number,
        articles: Article[]
    }
}


export interface Category {
    _id:    string;
    name:   string;
    parent: null | string;
    level:  number;
    url_survey: string;
    url_img: string;
    description: string;
}



export interface EncuestasRealizada {
    name: string;
    parent:string;
    reward:string;
    fx_taken: string;
}
  
export interface User {
    _id:string;
    name: string;
    surnames: string;
    genre: string;
    email: string;
    password: string;
    fx_creation: Date;
    surveys: EncuestasRealizada[];
}