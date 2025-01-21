export default class Columns {
    public static getColumnDetail(
        announcement: string,
        announcement_name: string,
        photo: string,
        publication_date: string,
        status_in_table: string
    ) {
        return [
            {
                dataIndex: "id",
                key: "id",
                title: announcement,
                scopedSlots: {
                    customRender: "id",
                },
                width: "90px",
            },
            {
                title: announcement_name,
                dataIndex: "name",
                key: "name",
                scopedSlots: {
                    customRender: "name",
                },
                width: "150px",
            },
            {
                title: photo || "",
                dataIndex: "photo",
                key: "photo",
                scopedSlots: {
                    customRender: "photo",
                },
                width: "200px",
            },
            {
                title: publication_date,
                key: "publishedAt",
                dataIndex: "publishedAt",
                scopedSlots: {
                    customRender: "publishedAt",
                },
                width: "150px",
            },
            {
                title: status_in_table,
                key: "status",
                dataIndex: "status",
                scopedSlots: {
                    customRender: "status",
                },
                width: "130px",
            },
            {
                title: " ",
                width: "70px",
                key: "actions",
                dataIndex: "actions",
                scopedSlots: {
                    customRender: "actions",
                },
                // fixed: "right",
            },
        ];
    }
}
