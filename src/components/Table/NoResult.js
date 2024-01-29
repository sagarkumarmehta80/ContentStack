import s from "./Table.module.scss";
import no_result from "../../assets/imgs/no_result.png";
export const NoResult = () => {
    return (
        <div className={s.no_result}>
            <img src={no_result} alt="No Result" />
            <p className="semi_bold">
                No results found for your search criteria
            </p>
            <p className={s.no_result_desc}>
                Don't worry though, we're here to help. Try adjusting your
                search terms or check if you misspelled anything.
            </p>
        </div>
    );
};
