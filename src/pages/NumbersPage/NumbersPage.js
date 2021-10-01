import Footer from '../../globals/Footer/Footer';
import Numbers from '../../components/Numbers/Numbers'
// import { BUY_NUMBER} from '../../globals/utils'

// import { useDispatch } from 'react-redux';
import './NumbersPage.css';

export default function NumbersPage() {
    // const dispatch = useDispatch();
    function buyNumbers(selectedNumbersArray){

        // !!!CONNECT POP UP HERE!!!
        
        // dispatch({ type: BUY_NUMBER, number: selectedNumber })
        console.log(selectedNumbersArray)
    }
    return (
        <>
            <Numbers buyNumbers={buyNumbers}/>
            <Footer />
        </>
    )
}
