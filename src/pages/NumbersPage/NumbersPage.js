import Numbers from '../../components/Numbers/Numbers'
import { BUY_NUMBER, SHOW_MODAL } from '../../globals/utils'
import { useDispatch } from 'react-redux';
import './NumbersPage.css';
import { TransferNumber } from '../../globals/utils'


export default function NumbersPage() {
    const dispatch = useDispatch();
    function buyNumbers(numbers) {
        dispatch({ type: BUY_NUMBER, numbers })
    }
    
    function transferNumber({ date, transferredNumber, contactNumber }) {

        const inMoscow = localStorage.getItem('InMoscow');
        let fromMosсow
        if (inMoscow !== "false") {
            if (inMoscow === null) fromMosсow = "не указано"
            else fromMosсow = "из Москвы"
        } else {
            fromMosсow = "не из Москвы"

        }
        TransferNumber({
                transferDate: date,
                transferredNumber,
                userPhone: contactNumber,
                fromMosсow
            }).then((res)=>{
            dispatch({ type: SHOW_MODAL, payload: { toSubmit: true } })
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    function buyEsim() {
        dispatch({ type: SHOW_MODAL, payload: { service: { eSim: true } } })
    }
    return (
        <>
            <Numbers buyNumbers={buyNumbers} transferNumber={transferNumber} buyEsim={buyEsim} />
        </>
    )
}
