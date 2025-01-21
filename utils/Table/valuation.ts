export default class Columns {
  public static getColumnDetail(
    product_name: string,
    rating_title: string,
    comment: string,
    publication_date: string,
    status_in_table: string
  ) {
    return [
      {
        dataIndex: "productName",
        key: "productName",
        title: product_name,
        scopedSlots: {
          customRender: "productName",
        },
        width: "170px",
      },
      {
        title: rating_title,
        dataIndex: "rating",
        scopedSlots: {
          customRender: "rating",
        },
        width: "150px",
      },
      {
        title: comment,
        dataIndex: "comment",
        key: "comment",
        width: "170px",
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
        width: "105px",
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
