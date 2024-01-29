export const ActionButtons = ({ cellObject }) => {
    const onDelete = (obj) => {
        console.log(obj);
        const filteredRows = obj.column.filteredRows;
        const filteredVal = filteredRows.slice(obj.row.index, 1);
        // const filteredVal = filteredRows.filter(
        //     (val) => parseInt(val.id) == parseInt(obj.row.id)
        // );
        console.log(filteredVal);
        cellObject.column.setFilter("Mpohls0@Nbcnews.Com");
    };

    return <button onClick={() => onDelete(cellObject)}>delete</button>;
};
