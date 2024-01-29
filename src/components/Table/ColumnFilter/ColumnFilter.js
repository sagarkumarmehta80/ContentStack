import Input from "../../Input/Input";
import s from "./ColumnFIlter.module.scss";
export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter, id } = column;
    return (
        <Input
            customClass={s.input}
            type={id == "id" && "number"}
            value={filterValue || ""}
            onChange={(val) => setFilter(val)}
            placeholder="Search"
        />
    );
};
