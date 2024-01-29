import { useMemo, useState, useEffect } from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useBlockLayout,
    useResizeColumns,
    useFilters,
} from "react-table";
import s from "./Table.module.scss";
import Input from "../Input/Input";
import no_sort from "../../assets/imgs/no_sort.png";
import asc_sort from "../../assets/imgs/asc.png";
import desc_sort from "../../assets/imgs/desc.png";
import { NoResult } from "./NoResult";
import { Loader } from "../Loader/Loader";

const Table = ({ columns, rowData }) => {
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataOver, setIsDataOver] = useState(false);

    //Registering scroll event on componentdidmount and removing on unmount
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //Fetching data on load
    useEffect(() => {
        fetchData();
    }, []);

    //Checking scroll if it is reached to bottom and
    //its not on loading state (For Infinite Scroll)
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isLoading
        ) {
            return;
        }
        fetchData();
    };

    //Fetching data
    const fetchData = () => {
        setIsLoading(true);
        try {
            const currentData = fetchedData;
            const leftOverValue = rowData.length - fetchedData.length;
            const limit = 50;
            console.log(leftOverValue, currentData.length);
            //Mocked API Call
            setTimeout(() => {
                currentData.length !== rowData.length
                    ? setFetchedData((oldVal) => {
                          return [
                              ...oldVal,
                              ...rowData.slice(
                                  oldVal.length,
                                  leftOverValue >= limit
                                      ? oldVal.length + limit
                                      : oldVal.length + leftOverValue
                              ),
                          ];
                      })
                    : setIsDataOver(true);
                setIsLoading(false);
            }, 1500);
        } catch (e) {
            console.log(e);
        }
    };

    //Setting width for column resize
    const defaultColumn = useMemo(
        () => ({
            minWidth: 200,
            width: 250,
            maxWidth: 400,
        }),
        []
    );

    const tableInstance = useTable(
        {
            columns,
            data: fetchedData,
            defaultColumn,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useBlockLayout,
        useResizeColumns
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance;

    const { globalFilter } = state;

    return (
        <>
            <div className={s.table_wrap}>
                <table {...getTableProps()}>
                    <thead>
                        <tr>
                            <th colSpan={columns.length}>
                                <Input
                                    type="text"
                                    customClass={s.input}
                                    onChange={(val) => {
                                        return setGlobalFilter(val);
                                    }}
                                    value={globalFilter}
                                    placeholder="Global Filter"
                                />
                            </th>
                        </tr>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                        <span
                                            {...column.getSortByToggleProps()}
                                        >
                                            <img
                                                src={
                                                    column.isSorted
                                                        ? column.isSortedDesc
                                                            ? desc_sort
                                                            : asc_sort
                                                        : no_sort
                                                }
                                                className={
                                                    !column.isSorted
                                                        ? s.no_sort
                                                        : ""
                                                }
                                            />
                                        </span>
                                        <div>
                                            {column.canFilter
                                                ? column.render("Filter")
                                                : null}
                                        </div>
                                        <div
                                            {...column.getResizerProps()}
                                            className={s.resizer}
                                        ></div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.length > 0 ? (
                            rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className={s.no_hover}>
                                <td colSpan={columns.length}>
                                    <NoResult />
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <div className={s.table_footer}>
                            Total : {rows && rows.length}
                            <div className={s.loader_wrap}>
                                {/* Loader copied from https://css-loaders.com/ */}
                                {isLoading && <Loader />}
                                {!isLoading && isDataOver && "Data Over"}
                            </div>
                        </div>
                    </tfoot>
                </table>
            </div>
        </>
    );
};
export default Table;
