import "./App.css";
import { ActionButtons } from "./components/Table/ActionButtons/ActionButtons";
import { ColumnFilter } from "./components/Table/ColumnFilter/ColumnFilter";
import Table from "./components/Table/Table";
import mockData from "./util/MOCK_DATA.json";
//Note: Searched a lot but none of the free api provide 100s of data, so need to use Json file

function App() {
    const tableColumns = [
        {
            Header: "Id",
            accessor: "id",
            Filter: ColumnFilter,
        },
        {
            Header: "First Name",
            accessor: "first_name",
            Filter: ColumnFilter,
        },
        {
            Header: "Last Name",
            accessor: "last_name",
            Filter: ColumnFilter,
        },
        {
            Header: "Email Id",
            accessor: "email",
            Filter: ColumnFilter,
        },
        {
            Header: "Gender",
            accessor: "gender",
            Filter: ColumnFilter,
        },
        // {
        //     Header: "actions",
        //     Filter: false,
        //     Cell: ({ cell }) => <ActionButtons cellObject={cell} />,
        // },
    ];
    return <Table columns={tableColumns} rowData={mockData} />;
}

export default App;
