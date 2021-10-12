import Numbers from '../../components/Numbers/Numbers'
import { BUY_NUMBER} from '../../globals/utils'
import { useDispatch } from 'react-redux';
import './NumbersPage.css';


export default function NumbersPage() {
    const dispatch = useDispatch();
    function buyNumbers(numbers){      
        dispatch({ type: BUY_NUMBER, numbers  })
    }
    function transferNumber({ date, transferredNumber, contactNumber }) {

        // !!!CONNECT Transfer Number POP UP HERE!!!
        console.log('Transfer Number Triggered')
        console.log(date, transferredNumber, contactNumber)
    }
    function buyEsim() {

        // !!!CONNECT Buy Esim POP UP HERE!!!
        console.log('EsimBUY Triggered')

    }
    return (
        <>
            <Numbers buyNumbers={buyNumbers} transferNumber={transferNumber} buyEsim={buyEsim} />
        </>
    )
}
