import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as GeneralCreator from '../../store/action-creator/general';

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(GeneralCreator, dispatch)
}