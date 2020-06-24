export class dataTableConfig {
    tableData: Array<any>
    tableConfig: tableConfig[]
}

export class tableConfig {
    identifer: string;
    title: string;
    type: string; // Text | link | image
    size?: {
        height: string,
        width: string
    };
    navigate?
    buttonList?: Array<{
        name: string,
        class: string,
        iconClass?: string
    }>
}

export class tableEvent {
    tableItem: any;
    action: tableConfig;
    actionInfo: any;
}