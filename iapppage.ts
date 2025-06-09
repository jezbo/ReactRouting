import { ComponentType, Dispatch, SetStateAction, useMemo } from "react";
import { Helper } from "../../helpers/helperFunctions";
import { IPageCollection } from "./ipage-collection";
import { createSPAPages } from "./pages";

export interface IProps {
    [key: string]: any;
}

export interface IPageProps extends IProps {
    queryString: string;
}

export class IPage {
    public title: string;
    public icon?: string;
    public route: string;
    public parentRoute?: string;
    public component: ComponentType;
    public isInitialiseOnly?: boolean = true;
    public isAdmin?: boolean = true;
    public partialProps?: IProps;

    public static pages: IPage[] = [];
    public static pageCollection: IPageCollection;

    private queryString: string;

    constructor() {
        IPage.pages.push(this);
    }

    public static getPage = (route: string): IPage => IPage.pages?.filter(page => page.route === route)[0];

    public static createPages() {
        createSPAPages();
        IPage.setPageCollection();
    }

    public setPropsWithQuery(setRouteProps: Dispatch<SetStateAction<IProps>>) {
        this.setQueryString();
        setRouteProps(prevProps => {
            const newProps = { ...this.partialProps, queryString: this.queryString };
            const isStateChanged = !Helper.object.shallowEqual(prevProps, newProps);
            if (isStateChanged) return newProps;
            return prevProps;
        })
    }

    public createProps<T extends IProps> (props: T): void {
        const result: IPageProps = { ...props, queryString: this.queryString };
        this.partialProps = result;
    }

    //public setChildren(pages: IPage[]): void {
    //    const result: Pages[] = [];
    //    pages.forEach(page => {
    //        if(page.parentId === this.pageId) result.push(page.pageId)
    //    })
    //    this.childrenIds = result;
    //}

    private static setPageCollection = () => IPage.pageCollection = new IPageCollection(IPage.pages);

    private setQueryString(): void {
        let result: string = "";
        const query = window.location.search.slice(1);
        if (!!query) result = query;
        this.queryString = result;
    }
}
