import Footer from '../../globals/Footer/Footer';
import Numbers from '../../components/Numbers/Numbers'
// import { BUY_NUMBER} from '../../globals/utils'

// import { useDispatch } from 'react-redux';
import './NumbersPage.css';

export default function NumbersPage() {
    // const dispatch = useDispatch();
    function buyNumbers(selectedNumbersArray) {

        // !!!CONNECT Buy numbers POP UP HERE!!!

        // dispatch({ type: BUY_NUMBER, number: selectedNumber })

        console.log('Buy numbers Triggered')
        console.log(selectedNumbersArray)
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
            <Footer />
        </>
    )
}
