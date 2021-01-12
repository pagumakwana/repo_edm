export class dataTableConfig {
    tableData: Array<any>
    tableConfig: tableConfig[]
    showCheckBox?: boolean
}

export class tableConfig {
    identifer: string;
    title: string;
    type: string; // Text | link | image
    dataType?: {
        type: string; // array | string |number
        path: Array<string>;
    }
    size?: {
        height: string,
        width: string
    };
    navigate?
    buttonList?: Array<{
        name: string,
        class: string,
        iconClass?: string,
        condition?: {
            type: string, //logic | boolean
            key?: string,
            value?: any
        }
    }>
    buttonIconList?: Array<{
        title: string,
        class: string,
        iconClass: string
    }>
}

export class tableEvent {
    tableItem: any;
    action: tableConfig;
    actionInfo: any;
    checkedData?: any;
}