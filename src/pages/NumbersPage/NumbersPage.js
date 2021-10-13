import Numbers from '../../components/Numbers/Numbers'
import { BUY_NUMBER, SHOW_MODAL} from '../../globals/utils'
import { useDispatch } from 'react-redux';
import './NumbersPage.css';


export default function NumbersPage() {
    const dispatch = useDispatch();
    function buyNumbers(numbers){      
        dispatch({ type: BUY_NUMBER, numbers  })
    }
    function transferNumber({ date, transferredNumber, contactNumber }) {
        dispatch({ type: SHOW_MODAL, payload: {toSubmit: true}  })
    }
    function buyEsim() {
        dispatch({ type: SHOW_MODAL, payload: { service: {eSim: true} } })
    }
    return (
        <>
            <Numbers buyNumbers={buyNumbers} transferNumber={transferNumber} buyEsim={buyEsim} />
        </>
    )
}
